// Run with the bundled Playwright runtime. Checks rendered static pages and the React homepage.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.CODEX_TASK_PLAYWRIGHT_MODULE);
const [origin = 'http://127.0.0.1:4187', label = 'local', output = '../drafts/conference-publish-20261017'] = process.argv.slice(2);
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch(fs.existsSync(chromium.executablePath()) ? { headless: true } : { channel: 'msedge', headless: true });
  const results = [];
  try {
    for (const width of [393, 1440]) for (const language of ['', '/zh-TW']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: width === 393, isMobile: width === 393 });
      const page = await context.newPage();
      const errors = [], mediaRequests = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', r => { if (r.url().includes('wenwu-xu-conference-journey-v1.mp4')) mediaRequests.push(r.url()); });
      const expectedLink = new URL(origin + language + '/people/#wenwu-xu-conference-journey').href;

      await page.goto(origin + language + '/', { waitUntil: 'load' });
      const preview = page.locator('.conference-journey-preview');
      await preview.scrollIntoViewIfNeeded();
      console.log((await preview.ariaSnapshot()).slice(0, 450));
      assert.equal(await preview.count(), 1);
      assert.equal(await preview.locator('video').count(), 0);
      const link = preview.getByRole('link');
      assert.equal(await link.evaluate(a => a.href), expectedLink);
      assert.equal(mediaRequests.length, 0, 'Homepage must not request the conference MP4');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
      assert((await page.locator('#wenwu-xu-journey source').getAttribute('src')).endsWith('wenwu-xu-journey-v4.mp4'));
      await preview.screenshot({ path: path.join(output, `${label}-${language ? 'zh' : 'en'}-home-${width}.png`) });

      await link.click();
      await page.waitForURL(expectedLink);
      const section = page.locator('#wenwu-xu-conference-journey');
      const video = section.locator('video');
      await section.scrollIntoViewIfNeeded();
      console.log((await section.ariaSnapshot()).slice(0, 650));
      assert.equal(await video.count(), 1);
      assert.equal(await video.getAttribute('preload'), 'none');
      assert.equal(await video.getAttribute('autoplay'), null);
      assert.notEqual(await video.getAttribute('playsinline'), null);
      assert((await video.locator('source').getAttribute('src')).endsWith('wenwu-xu-conference-journey-v1.mp4'));
      assert.equal(mediaRequests.length, 0, 'People page must not fetch the MP4 before play');
      assert((await context.request.get(new URL(await video.getAttribute('poster'), page.url()).href)).ok());
      const box = await video.boundingBox();
      assert(box.width > 230 && box.width <= width && Math.abs(box.width / box.height - 16 / 9) < .025);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));

      await video.focus();
      await page.keyboard.press('Space');
      await page.waitForFunction(() => {
        const v = document.querySelector('#wenwu-xu-conference-journey video');
        return v.currentTime > .2 && v.videoWidth === 1920 && v.videoHeight === 1080 && !v.error;
      }, null, { timeout: 45000 });
      await video.evaluate(v => v.pause());
      const duration = await video.evaluate(v => v.duration);
      assert(Math.abs(duration - 156) < .2);
      for (const time of [11, 143, 151]) {
        await video.evaluate((v, t) => { v.currentTime = t; }, time);
        await page.waitForFunction(t => {
          const v = document.querySelector('#wenwu-xu-conference-journey video');
          return !v.seeking && Math.abs(v.currentTime - t) < .2 && v.readyState >= 2 && !v.error;
        }, time);
        if (time === 11) {
          const pixels = await video.evaluate(v => {
            const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight;
            const d = c.getContext('2d'); d.drawImage(v, 0, 0);
            return [[90, 210], [990, 880]].map(([x, y]) => [...d.getImageData(x, y, 1, 1).data].slice(0, 3));
          });
          assert(pixels.every(rgb => Math.min(...rgb) > 180), 'Full official China map panel and South China Sea inset must decode');
          if (width === 1440 && !language) await video.screenshot({ path: path.join(output, `${label}-china-map.png`) });
        }
      }
      assert.equal(await video.locator('track').count(), 2);
      await video.evaluate(v => { for (const track of v.textTracks) track.mode = 'hidden'; });
      await page.waitForFunction(() => [...document.querySelector('#wenwu-xu-conference-journey video').textTracks].every(t => t.cues?.length === 25));
      const timeline = section.locator('.conference-journey-timeline');
      await timeline.locator('summary').click();
      assert.equal(await timeline.locator('li').count(), 23);
      assert.equal(await timeline.locator('li.is-future').count(), 1);
      assert((await timeline.locator('li.is-future').innerText()).includes(language ? '未來場次' : 'Future meeting'));
      assert((await timeline.innerText()).includes('Eugene Olevsky'));
      await timeline.locator('summary').click();
      await video.evaluate(v => { v.currentTime = 11; });
      await page.waitForFunction(() => !document.querySelector('#wenwu-xu-conference-journey video').seeking);
      await section.screenshot({ path: path.join(output, `${label}-${language ? 'zh' : 'en'}-people-${width}.png`) });
      assert.deepEqual(errors, []);
      results.push({ width, language: language || 'en', homepageLink: true, clickToPlay: true, decoded: true, duration, seek: true, subtitleCues: 50, timelineRecords: 23, futureLabel: true, passed: true });
      await context.close();
    }
    fs.writeFileSync(path.join(output, `${label}-checks.json`), JSON.stringify(results, null, 2));
    console.log(JSON.stringify({ label, pages: results.length * 2, allPassed: true }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
