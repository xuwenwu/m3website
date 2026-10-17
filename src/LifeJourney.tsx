import type { Language } from './i18n'

const timeline = [
  ['1982–1996', 'Yiyang, Hunan · Growing up in China', '湖南益陽：在中國成長'],
  ['1996–1999', 'Xiangtan · School years', '湘潭：求學時光'],
  ['1999–2003', 'Jishou University', '吉首大學'],
  ['2003–2006', 'Guilin University of Technology', '桂林理工大學'],
  ['2006–2009', 'Beijing University of Technology · Doctoral studies', '北京工業大學：博士研究'],
  ['2009', 'Jena, Germany · Visiting research', '德國耶拿：訪問研究'],
  ['2011', 'Beijing University of Technology · PhD awarded', '北京工業大學：取得博士學位'],
  ['2012', 'Friedrich Schiller University Jena · Postdoctoral research', '耶拿席勒大學：博士後研究'],
  ['2013–2015', 'The University of Manchester · Research in the United Kingdom', '英國曼徹斯特大學：研究工作'],
  ['2015', 'University of California, Berkeley · A California visit', '加州大學柏克萊分校：加州訪問之旅'],
  ['2015', 'The University of Manchester · Back to Manchester', '曼徹斯特大學：返回曼徹斯特'],
  ['2016–2017', 'University of California, Merced · Research and teaching', '加州大學美熹德分校：研究與教學'],
  ['2017–present', 'San Diego State University · Mechanical Engineering, M3 Lab', '聖地牙哥州立大學：機械工程學系、M3 實驗室'],
]

export default function LifeJourney({ language }: { language: Language }) {
  const chinese = language === 'zh-TW'
  const media = `${import.meta.env.BASE_URL}media/life-journey/`
  const title = chinese ? '我的 SDSU 之旅' : 'My journey to SDSU'
  return (
    <section className="life-journey" id="wenwu-xu-journey" aria-labelledby="life-journey-title">
      <h5 id="life-journey-title">{title}</h5>
      <p>{chinese
        ? '從湖南到聖地牙哥：用一段輕鬆的動畫，回顧我的求學、研究與教學旅程。片長 1 分 25 秒，點選播放。'
        : 'From Hunan to San Diego: a playful animated look at my education, research, and teaching journey. 1 min 25 sec — press play to watch.'}</p>
      <video
        controls
        playsInline
        preload="none"
        width="1080"
        height="1080"
        poster={`${media}wenwu-xu-journey-poster.webp`}
        aria-label={title}
      >
        <source src={`${media}wenwu-xu-journey-v2.mp4`} type="video/mp4" />
        <track kind="subtitles" src={`${media}journey-en.vtt`} srcLang="en" label="English milestones" />
        <track kind="subtitles" src={`${media}journey-zh-TW.vtt`} srcLang="zh-TW" label="繁體中文里程碑" />
        <a href={`${media}wenwu-xu-journey-v2.mp4`}>{chinese ? '下載影片（MP4）' : 'Download the video (MP4)'}</a>
      </video>
      <details className="life-journey-timeline">
        <summary>{chinese ? '閱讀文字版旅程' : 'Read the journey as a text timeline'}</summary>
        <ol>
          {timeline.map(([period, en, zh], index) => (
            <li key={`${period}-${index}`}>
              <strong>{chinese && period === '2017–present' ? '2017 至今' : period}</strong>
              <span>{chinese ? zh : en}</span>
            </li>
          ))}
        </ol>
      </details>
    </section>
  )
}
