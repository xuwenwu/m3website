// Run with the bundled Playwright runtime; checks actual media decoding and seeking.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.CODEX_TASK_PLAYWRIGHT_MODULE);
const [origin = 'http://127.0.0.1:4179', label = 'local', output = 'tmp/journey-check'] = process.argv.slice(2);
fs.mkdirSync(output, { recursive: true });
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  try {
    for (const width of [393, 1440]) for (const language of ['', '/zh-TW']) for (const route of ['/people/', '/#people']) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width === 393, isMobile: width === 393 });
      const page = await context.newPage();
      const errors = [], requests = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', r => { if (/wenwu-xu-journey-v\d+\.mp4/.test(r.url())) requests.push(r.url()); });
      await page.goto(origin + language + route, { waitUntil: 'load' });
      const section = page.locator('#wenwu-xu-journey');
      const video = section.locator('video');
      await video.scrollIntoViewIfNeeded();
      console.log((await section.ariaSnapshot()).slice(0, 330));
      assert.equal(await video.count(), 1);
      assert.equal(await video.getAttribute('preload'), 'none');
      assert((await video.locator('source').getAttribute('src')).endsWith('wenwu-xu-journey-v4.mp4'));
      assert.equal(await video.getAttribute('autoplay'), null);
      assert.notEqual(await video.getAttribute('playsinline'), null);
      assert.equal(requests.length, 0, 'Video should not download before interaction');
      const poster = await video.getAttribute('poster');
      assert((await context.request.get(new URL(poster, page.url()).href)).ok());
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
      const box = await video.boundingBox();
      assert(box.width > 230 && box.width <= width);
      // Use the native player's keyboard action; then verify decoded frames, not only HTTP 200.
      await video.focus();
      await page.keyboard.press('Space');
      await page.waitForFunction(() => {
        const v = document.querySelector('#wenwu-xu-journey video');
        return v && v.currentTime > 0.2 && v.videoWidth === 1080 && !v.error;
      }, null, { timeout: 30000 });
      await video.evaluate(v => v.pause());
      const duration = await video.evaluate(v => v.duration);
      assert(Math.abs(duration - 85) < 0.2);
      // Seek to the revised SDSU scene and then to the closing card.
      for (const time of [3, 74, 82]) {
        await video.evaluate((v, t) => { v.currentTime = t; }, time);
        await page.waitForFunction(t => {
          const v = document.querySelector('#wenwu-xu-journey video');
          return !v.seeking && Math.abs(v.currentTime - t) < 0.2 && v.readyState >= 2 && !v.error;
        }, time);
        if (time === 3) {
          const samples = await video.evaluate(v => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => {
            const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight;
            const ctx = c.getContext('2d'); ctx.drawImage(v, 0, 0);
            resolve([[755, 480], [350, 350]].map(([x, y]) => Array.from(ctx.getImageData(x, y, 1, 1).data).slice(0, 3)));
          }))));
          assert(Math.max(...samples[0].map((v, i) => Math.abs(v - samples[1][i]))) < 12, 'Taiwan and mainland highlight colors must match');
        }
      }
      assert.equal(await video.locator('track').count(), 2);
      await video.evaluate(v => { for (const track of v.textTracks) track.mode = 'hidden'; });
      await page.waitForFunction(() => [...document.querySelector('#wenwu-xu-journey video').textTracks].every(t => t.cues?.length === 14));
      const summary = section.locator('details > summary');
      await summary.click();
      assert(await section.locator('details').getAttribute('open') !== null);
      assert.equal(await section.locator('li').count(), 13);
      await summary.click();
      await video.scrollIntoViewIfNeeded();
      if (!language && route === '/people/') await section.screenshot({ path: `${output}/${label}-${width}.png` });
      assert.deepEqual(errors, []);
      results.push({ width, language: language || 'en', route, duration, decode: true, seek: true, mapColorMatch: true, subtitleCues: 28, timeline: true, noPreload: true, passed: true });
      await context.close();
    }
    fs.writeFileSync(`${output}/${label}-checks.json`, JSON.stringify(results, null, 2));
    console.log(JSON.stringify({ label, cases: results.length, passed: true }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
