import type { Language } from './i18n'
import { conferenceTimeline } from './data/conferenceJourney'

export default function ConferenceJourney({ language, compact = false }: { language: Language; compact?: boolean }) {
  const chinese = language === 'zh-TW'
  const media = `${import.meta.env.BASE_URL}media/conference-journey/`
  const href = `${import.meta.env.BASE_URL}${chinese ? 'zh-TW/' : ''}people/#wenwu-xu-conference-journey`
  const title = chinese ? '我的學術會議之旅' : 'My conference journey'

  if (compact) return (
    <section className="conference-journey conference-journey-preview" aria-labelledby="conference-journey-preview-title">
      <h5 id="conference-journey-preview-title">{title}</h5>
      <p>{chinese
        ? '從博士研究到學術交流與專題籌備：以地圖與時間軸回顧 2008–2026 年的會議活動。'
        : 'From doctoral research to presentations and symposium leadership: a map-led retrospective of conference activities, 2008–2026.'}</p>
      <a className="conference-journey-link" href={href}>
        {chinese ? '觀看學術會議之旅（2 分 36 秒）' : 'Watch my conference journey (2 min 36 sec)'}
        <span aria-hidden="true"> →</span>
      </a>
    </section>
  )

  return (
    <section className="conference-journey" id="wenwu-xu-conference-journey" aria-labelledby="conference-journey-title">
      <h5 id="conference-journey-title">{title}</h5>
      <p>{chinese
        ? '從博士研究到學術交流、合作與專題籌備，回顧 2008–2026 年的會議活動，並展望 TMS 2027。片長 2 分 36 秒，點選播放。'
        : 'From doctoral research to presentations, collaborations, and symposium leadership: conference activities from 2008–2026, with a look ahead to TMS 2027. 2 min 36 sec — press play to watch.'}</p>
      <video controls playsInline preload="none" width="1920" height="1080"
        poster={`${media}conference-journey-poster-v1.webp`} aria-label={title}>
        <source src={`${media}wenwu-xu-conference-journey-v1.mp4`} type="video/mp4" />
        <track kind="subtitles" src={`${media}conference-en.vtt`} srcLang="en" label="English milestones" />
        <track kind="subtitles" src={`${media}conference-zh-TW.vtt`} srcLang="zh-TW" label="繁體中文里程碑" />
        <a href={`${media}wenwu-xu-conference-journey-v1.mp4`}>{chinese ? '下載影片（MP4）' : 'Download the video (MP4)'}</a>
      </video>
      <p className="conference-journey-download">
        <a href={`${media}wenwu-xu-conference-journey-v1.mp4`} download>
          {chinese ? '下載影片（MP4）' : 'Download video (MP4)'}
        </a>
        <span>{chinese ? '附英文及繁體中文字幕；影片配樂為原創。' : 'English and Traditional Chinese subtitles · Original instrumental score'}</span>
      </p>
      <details className="life-journey-timeline conference-journey-timeline">
        <summary>{chinese ? '閱讀會議時間軸與參與角色' : 'Read the conference timeline and roles'}</summary>
        <p>{chinese
          ? '依據 2026 年 9 月 10 日履歷，列出 22 項過去的會議紀錄（含一場線上會議）及一場未來會議；共同作者研究成果與報告、籌備角色分別標示。'
          : 'Based on the September 10, 2026 CV: 22 past meeting records, including one virtual meeting, and one future meeting. Coauthored research contributions are distinguished from speaking and organizing roles.'}</p>
        <ol>
          {conferenceTimeline.map((event, index) => (
            <li key={`${event.year}-${index}`} className={event.future ? 'is-future' : undefined}>
              <strong>{event.year} · {chinese ? event.cityZh : event.city}
                {event.future && <em>{chinese ? '未來場次' : 'Future meeting'}</em>}
              </strong>
              <span>{chinese ? event.meetingZh : event.meeting}</span>
              <span className="conference-journey-role">{chinese ? event.roleZh : event.role}</span>
              <span>{chinese ? event.subjectZh : event.subject}</span>
            </li>
          ))}
        </ol>
      </details>
      <details className="life-journey-timeline conference-journey-notes">
        <summary>{chinese ? '影片來源與地圖' : 'Video sources and maps'}</summary>
        <p>{chinese
          ? '會議資料：履歷 v1.44（2026 年 9 月 10 日），第 6–11、31–32 頁。地點連線表示紀錄的時間順序，並非實際航線。'
          : 'Conference source: CV v1.44 (September 10, 2026), pp. 6–11 and 31–32. Connections show the chronology of records, rather than actual flight paths.'}</p>
        <p>{chinese
          ? '中國章節使用完整的中國官方標準地圖，保留臺灣、南海諸島附圖及原審圖號 GS(2016)2923。'
          : 'China chapters retain the complete official PRC standard map, including Taiwan, the South China Sea islands inset, and approval number GS(2016)2923.'}{' '}
          <a href="https://beijing.tianditu.gov.cn/bzdt/" target="_blank" rel="noreferrer">{chinese ? '北京天地图標準地圖服務' : 'Beijing Tianditu standard maps'}</a>
          {' · '}<a href="https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/" target="_blank" rel="noreferrer">{chinese ? 'Natural Earth：地球動畫海岸線' : 'Natural Earth globe coastlines'}</a>
        </p>
      </details>
    </section>
  )
}
