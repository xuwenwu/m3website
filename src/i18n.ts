export type Language = 'en' | 'zh-TW'

export const languageLabels: Record<Language, string> = {
  en: 'English',
  'zh-TW': '繁體中文',
}

export const languageLocales: Record<Language, string> = {
  en: 'en-US',
  'zh-TW': 'zh-TW',
}

export const siteCopy = {
  en: {
    name: 'Multiscale Modeling of Materials Lab',
    shortName: 'M3 Lab',
    pi: 'Wenwu Xu',
    department: 'Department of Mechanical Engineering',
    university: 'San Diego State University',
    address:
      'Department of Mechanical Engineering, San Diego State University, 5500 Campanile Drive, San Diego, CA 92182 USA',
    languageAria: 'Language switcher',
    documentTitle: 'Multiscale Modeling of Materials Lab | SDSU',
    documentDescription:
      "Dr. Wenwu Xu's Multiscale Modeling of Materials Lab at San Diego State University studies field-assisted processing, grain-boundary engineering, microstructure, and computational materials science.",
    heroNewsAria: 'Latest lab news',
    profileLinksAria: 'Profile and contact links',
    mainNavigationAria: 'Main navigation',
    labSnapshotAria: 'Lab snapshot',
    researchFilterAria: 'Research theme filters',
    publicationScopeAria: 'Publication list scope',
    publicationFilterAria: 'Publication theme filters',
    topicsSuffix: 'topics',
    featuredPublicationsHeading: 'Featured papers, sortable by theme.',
    allPublicationsHeading: 'All papers, sortable by theme.',
    selectedPublicationSummary: (count: number) =>
      `A curated set of ${count} recent and representative publications from the M3 Lab and collaborators.`,
    allPublicationSummary: (count: number) =>
      `A fuller publication list with ${count} entries from the M3 Lab and collaborators.`,
    deadline: (date: string) => `Deadline ${date}`,
    visitorStatsSummary: (first: string, last: string) =>
      `Recent available log records: ${first} – ${last}. This is not a complete 90-day total. Raw IP addresses and individual visitor identifiers are not published.`,
    visitorStatsFallback: 'Aggregated public traffic appears here when the server analytics snapshot is available.',
    copyright: (year: number) => `Copyright ${year} Wenwu Xu, San Diego State University.`,
  },
  'zh-TW': {
    name: '材料多尺度建模實驗室 (M3 Lab)',
    shortName: 'M3 Lab',
    pi: 'Wenwu Xu',
    department: '機械工程學系',
    university: '聖地牙哥州立大學',
    address:
      '機械工程學系，聖地牙哥州立大學，5500 Campanile Drive, San Diego, CA 92182 USA',
    languageAria: '語言切換',
    documentTitle: '材料多尺度建模實驗室 (M3 Lab) | SDSU',
    documentDescription:
      'Wenwu Xu 教授在聖地牙哥州立大學的材料多尺度建模實驗室，研究場輔助製程 (field-assisted processing)、晶界工程 (grain-boundary engineering)、微結構與計算材料科學。',
    heroNewsAria: '實驗室最新消息',
    profileLinksAria: '個人檔案與聯絡連結',
    mainNavigationAria: '主導覽',
    labSnapshotAria: '實驗室概覽',
    researchFilterAria: '研究主題篩選',
    publicationScopeAria: '論文清單範圍',
    publicationFilterAria: '論文主題篩選',
    topicsSuffix: '主題',
    featuredPublicationsHeading: '精選論文，可依主題篩選。',
    allPublicationsHeading: '完整論文清單，可依主題篩選。',
    selectedPublicationSummary: (count: number) =>
      `精選 ${count} 篇近期且具代表性的 M3 Lab 與合作研究論文。`,
    allPublicationSummary: (count: number) =>
      `較完整的論文清單，共 ${count} 筆 M3 Lab 與合作研究成果。`,
    deadline: (date: string) => `截止日期 ${date}`,
    visitorStatsSummary: (first: string, last: string) =>
      `近期現存記錄：${first} – ${last}。此數值並非完整 90 天的總數。原始 IP 位址與個別訪客識別資訊不會公開。`,
    visitorStatsFallback: '當伺服器分析快照可用時，這裡會顯示公開的彙整流量。',
    copyright: (year: number) => `Copyright ${year} Wenwu Xu, San Diego State University.`,
  },
} satisfies Record<Language, {
  name: string
  shortName: string
  pi: string
  department: string
  university: string
  address: string
  languageAria: string
  documentTitle: string
  documentDescription: string
  heroNewsAria: string
  profileLinksAria: string
  mainNavigationAria: string
  labSnapshotAria: string
  researchFilterAria: string
  publicationScopeAria: string
  publicationFilterAria: string
  topicsSuffix: string
  featuredPublicationsHeading: string
  allPublicationsHeading: string
  selectedPublicationSummary: (count: number) => string
  allPublicationSummary: (count: number) => string
  deadline: (date: string) => string
  visitorStatsSummary: (first: string, last: string) => string
  visitorStatsFallback: string
  copyright: (year: number) => string
}>

const zhText: Record<string, string> = {
  'Chapter 3 interactive demonstration': '第 3 章互動示範',
  'Seven crystal systems and lattice symmetry': '七大晶系與晶格對稱性',
  'Explore seven crystal systems with rotatable 3D lattice models. Animate inversion and rotational symmetry, compare lattice parameters, and use a ghost image to follow each operation.': '透過可旋轉的 3D 晶格模型探索七大晶系。播放反演與旋轉對稱操作、比較晶格參數，並利用起始位置的殘影觀察每項操作。',
  'Crystal systems': '晶系',
  '3D symmetry operations': '3D 對稱操作',
  'ME542: Materials Structure': 'ME542：材料結構',
  'Chapter 6 interactive demonstration': '第 6 章互動示範',
  'BCC crystal rotation and X-ray diffraction': 'BCC 晶體旋轉與 X 光繞射',
  'Rotate a BCC crystal and follow the corresponding reciprocal-lattice points, Ewald-sphere intersections, and detector spots. Play, pause, select another reflection, or accumulate diffraction spots in your browser.': '旋轉 BCC 晶體，觀察對應的倒晶格點、與 Ewald 球的交點及偵測器上的繞射斑點。可在瀏覽器中播放、暫停、選擇另一個反射，或累積繞射斑點。',
  'Reciprocal lattice': '倒晶格',
  'Ewald sphere': 'Ewald 球',
  'No sign-in required': '無需登入',
  'Open interactive demonstration': '開啟互動示範',
  'Home': '首頁',
  'Research': '研究',
  'Publications': '發表論文',
  'Grants': '研究經費',
  'People': '團隊成員',
  'News': '最新消息',
  'Opportunities': '機會',
  'Join Us': '加入我們',
  'Teaching': '教學',
  'Collaborators': '合作網絡',
  'Resources': '資源',
  'Stats': '訪客統計',
  'Contact': '聯絡',
  'Scholar': 'Google Scholar',
  'Google Scholar': 'Google Scholar',
  'LinkedIn': 'LinkedIn',
  'YouTube': 'YouTube',
  'Menu': '選單',
  'Skip to content': '跳至主要內容',
  'Diffraction primer video': '繞射導論影片',
  'What is light? A 2,500 year speed run': '光是什麼？兩千五百年的極速之旅',
  'A three minute cartoon history of light, from Empedocles and Newton to Young, Maxwell, Einstein and the Braggs. It sets up the diffraction chapters with one question: how can a wave reveal the spacing of atoms you cannot see?':
    '三分鐘的卡通光學簡史，從恩培多克勒、牛頓，到楊氏、馬克士威、愛因斯坦與布拉格父子，並以一個問題引出繞射章節：波如何揭示我們看不見的原子間距？',
  'Animated video': '動畫影片',
  '3 min, captioned': '3 分鐘，附字幕',
  'Watch the video': '觀看影片',
  'More': '更多',
  'San Diego State University / Mechanical Engineering': '聖地牙哥州立大學 / 機械工程',
  'Multiscale Modeling of Materials Lab': '材料多尺度建模實驗室 (M3 Lab)',
  'We combine simulation, microstructure characterization, and field-assisted processing to understand and design materials from atoms to engineered structures.':
    '我們結合模擬、微結構表徵 (microstructure characterization) 與場輔助製程 (field-assisted processing)，從原子尺度到工程結構理解並設計材料。',
  'Latest news': '最新消息',
  'active research themes': '進行中的研究主題',
  'current members and alumni listed': '現任成員與校友名錄',
  'featured publications highlighted': '精選發表論文',
  'grants and sponsored projects listed': '研究經費與贊助計畫',
  'Lab mission': '實驗室使命',
  'Materials questions, modeled and tested across scales.': '跨尺度建模與驗證材料科學問題。',
  'Computational materials science with experimental anchors.': '以實驗為錨點的計算材料科學。',
  'The M3 Lab studies nanoscale and microstructure mechanisms in metals, ceramics, composites, and field-assisted processing. We connect computational models with experimental evidence to understand how processing changes material structure and properties.':
    'M3 Lab 研究金屬、陶瓷、複合材料與場輔助製程中的奈米尺度與微結構機制。我們結合計算模型與實驗證據，探討製程如何改變材料結構與性質。',
  'SDSU Mechanical Engineering': 'SDSU 機械工程',
  'Big questions': '核心問題',
  'Our scientific questions.': '我們關注的科學問題。',
  'How do electric fields and nanosecond pulses alter grain-boundary structure and mobility?':
    '電場與奈秒脈衝如何改變晶界結構與遷移率 (grain-boundary mobility)？',
  'What mechanisms control flash sintering and current-driven ceramic processing in 8YSZ?':
    '哪些機制控制 8YSZ 中的閃速燒結 (flash sintering) 與電流驅動陶瓷製程？',
  'How can atomistic, continuum, and finite-element models pass useful information across scales?':
    '原子尺度、連續體與有限元素模型如何在不同尺度間傳遞有用資訊？',
  'Which microstructure descriptors best predict deformation, diffusion, and processing response?':
    '哪些微結構描述子最能預測變形、擴散與製程反應？',
  'Research projects.': '研究計畫。',
  'Current projects connect atomistic simulation, microstructure characterization, field-assisted processing, and data-driven materials design.':
    '目前研究連結原子尺度模擬、微結構表徵、場輔助製程與資料驅動材料設計。',
  'All': '全部',
  'AI/ML': 'AI/ML',
  'ENP': 'ENP',
  'Flash Sintering': '閃速燒結 (Flash Sintering)',
  'Characterization': '表徵 (Characterization)',
  'Modeling': '建模 (Modeling)',
  'Methods': '方法',
  'View project details': '查看計畫詳情',
  'Project details': '計畫詳情',
  'Detailed research directions.': '詳細研究方向。',
  'Each project summary below expands the overview cards with research focus and methods for readers who want more context.':
    '下方每個計畫摘要會延伸概覽卡片，提供研究重點與方法，方便需要更多脈絡的讀者。',
  'Research focus': '研究重點',
  'Show details': '顯示詳情',
  'Hide details': '隱藏詳情',
  'Related papers:': '相關論文：',
  'Featured': '精選',
  'All papers': '全部論文',
  'Publication search controls': '論文搜尋控制',
  'Search publications': '搜尋論文',
  'Showing': '顯示',
  'of': '共',
  'publications': '篇論文',
  'PDF': 'PDF',
  'DOI': 'DOI',
  'Sponsored projects supporting M3 Lab research.': '支持 M3 Lab 研究的贊助計畫。',
  'Current and recent awards supporting materials modeling, processing, characterization, and education innovation.':
    '目前與近期支持材料建模、製程、表徵與教育創新的研究經費。',
  'External record': '外部紀錄',
  'PI, graduate students, undergraduate researchers, and alumni.': '主持人、研究生、大學生研究員與校友。',
  'The M3 Lab brings together graduate students, undergraduate researchers, alumni, and collaborators working across modeling, processing, and characterization.':
    'M3 Lab 匯聚研究生、大學生研究員、校友與合作夥伴，研究橫跨建模、製程與表徵。',
  'Principal Investigator': '主持人',
  'Current Graduate Students': '現任研究生',
  'Undergraduate Researchers': '大學生研究員',
  'Alumni': '校友',
  'Former Members': '前成員',
  'Project:': '計畫：',
  'Current position:': '目前職位：',
  'Lab news.': '實驗室消息。',
  'Read more': '閱讀更多',
  'Dr. Wenwu Xu Serves as Facilitator at ASCENDᴿ Opportunity Advising Think Lab': 'Wenwu Xu 博士擔任 ASCENDᴿ Opportunity Advising Think Lab 分組討論引導人',
  "Dr. Wenwu Xu, Associate Professor of Mechanical Engineering at San Diego State University and director of the M3 Lab, is participating as a facilitator in the ASCENDᴿ Opportunity Advising Think Lab in the Washington, D.C., area, September 28–30, 2026. Organized by the Alliance of Hispanic Serving Research Universities (HSRU), the event includes a September 28 networking reception followed by two days of working sessions at the Virginia Tech Executive Briefing Center in Arlington, Virginia.\n\nThe Think Lab brings together university faculty, advisors, program leaders, students, and defense-sector partners to explore how institutions can help undergraduate and graduate students identify, prepare for, and pursue internships, fellowships, research experiences, and STEM career opportunities. Dr. Xu will facilitate discussions on Student Preparation & Competitiveness on September 29 and Regional Research Programs on September 30. Participants will exchange advising practices, examine barriers to student participation, and identify approaches that could be shared across HSRU institutions.\n\nDr. Xu's involvement builds on his participation in the inaugural ASCENDᴿ Research and Leadership Program, through which he leads a project on Thermal-Elastic Processing for defense-relevant interface engineering. The Think Lab connects this research engagement with his mentoring of undergraduate and graduate students.":
    "聖地牙哥州立大學機械工程學系副教授暨 M3 Lab 主持人 Wenwu Xu 博士，正以分組討論引導人的身分參與於 2026 年 9 月 28–30 日在華盛頓特區周邊舉行的 ASCENDᴿ Opportunity Advising Think Lab。活動由西語裔服務型研究大學聯盟（HSRU）主辦，9 月 28 日舉行交流招待會，接著於維吉尼亞州阿靈頓的 Virginia Tech Executive Briefing Center 進行兩天的工作會議。\n\n本次 Think Lab 匯聚大學教師、指導人員、計畫主管、學生與國防領域合作夥伴，探討各校如何協助大學生與研究生認識、準備並爭取實習、獎助學金、研究體驗及 STEM 職涯機會。Xu 博士將於 9 月 29 日引導「學生準備與競爭力」討論，並於 9 月 30 日引導「區域研究計畫」討論。與會者將交流輔導實務、檢視學生參與所面臨的障礙，並找出可供 HSRU 各校分享與採用的方法。\n\nXu 博士的參與延續了他在首屆 ASCENDᴿ Research and Leadership Program 中的工作；他透過該計畫主持以熱彈性製程進行國防相關界面工程的研究。本次 Think Lab 將此研究參與和他對大學生與研究生的指導相結合。",
  'ASCENDᴿ events': 'ASCENDᴿ 活動',
  'Inaugural ASCENDᴿ Research and Leadership Program cohort': '首屆 ASCENDᴿ 研究與領導力計畫成員',
  'Appointment': '任命',
  'Dr. Wenwu Xu Joins the Editorial Board of Materials': 'Wenwu Xu 博士加入 Materials 期刊編輯委員會',
  "Dr. Wenwu Xu, Associate Professor of Mechanical Engineering at San Diego State University and director of the M3 Lab, has joined the Editorial Board of Materials, published by MDPI. He will serve in the Materials Simulation and Design section for a renewable two-year term. In this role, he will support the section's development and serve as an Academic Editor for manuscripts within his areas of expertise. His research combines multiscale modeling and experimental characterization to investigate how processing shapes the microstructure and properties of metals, ceramics, and nanocomposites.":
    '聖地牙哥州立大學機械工程學系副教授暨 M3 Lab 主持人 Wenwu Xu 博士已加入 MDPI 出版的 Materials 期刊編輯委員會。他將於 Materials Simulation and Design（材料模擬與設計）分部擔任編輯委員，任期兩年，可續任。在此職務中，他將協助分部發展，並就其專業領域內的稿件擔任學術編輯。他的研究結合多尺度建模與實驗表徵，探討製程如何影響金屬、陶瓷及奈米複合材料的微結構與性質。',
  "View Dr. Xu's official Materials editorial-board profile": '查看 Xu 博士在 Materials 官網的編輯委員簡介',
  'Materials Simulation and Design section': 'Materials Simulation and Design（材料模擬與設計）分部',
  'Award': '獎助',
  'Talk': '演講',
  'For students and faculty': '供學生與教師使用',
  'Find funded defense-related internships, scholarships, fellowships, and research opportunities, with AI-assisted matching.':
    '透過 AI 輔助配對，尋找有經費支持的國防相關實習、獎學金、研究獎助與研究機會。',
  'Open opportunity finder': '開啟機會搜尋工具',
  'Academic calls and professional opportunities.': '學術徵稿與專業機會。',
  'Current and archived faculty positions, conference symposia, journal collections, special issues, calls for papers, calls for abstracts, and professional service opportunities.':
    '目前與過往的教師職缺、會議專題、期刊專輯、特刊、論文徵稿、摘要徵集與專業服務機會。',
  'No active calls are listed right now.': '目前沒有列出進行中的徵稿。',
  'Archived professional-service records remain visible below when available.': '若有過往專業服務紀錄，仍會顯示於下方。',
  'Open until filled': '職缺開放至錄用為止',
  'SDSU Assistant Professor of Mechanical Engineering': 'SDSU 機械工程學系助理教授職缺',
  'Faculty Position / Tenure-Track': '教師職缺 / 終身職軌',
  'View Position and Apply': '查看職缺與申請',
  'Sintering': '燒結',
  'San Diego State University seeks a tenure-track assistant professor in advanced processing of powder materials, with a focus on sintering science and technology. The position begins in Fall 2027.': '聖地牙哥州立大學誠徵粉末材料先進製程領域的終身職軌助理教授，研究重點為燒結科學與技術，預計於 2027 年秋季到任。',
  "Applications received on or before November 30, 2026, will receive full consideration; the position remains open until filled. The successful candidate will work in SDSU's Powder Technology Laboratory, establish an externally funded research program, and teach undergraduate and graduate courses. A terminal degree in Mechanical Engineering, Materials Science and Engineering, or a closely related discipline is required by the date of hire. See the official posting (job no. 562953) for full qualifications and application instructions.": '2026 年 11 月 30 日（含）以前收到的申請將獲完整審查；職缺持續開放至錄用為止。獲聘者將於 SDSU 粉末技術實驗室從事研究，建立獲外部經費支持的研究計畫，並教授大學部與研究所課程。到任前須取得機械工程、材料科學與工程或密切相關領域的最高學位。完整資格與申請方式請參閱官方職缺公告（職缺編號 562953）。',
  'Deadline passed': '截止日期已過',
  'Archived': '已封存',
  'Active': '進行中',
  'Upcoming deadline': '即將截止',
  'Role:': '角色：',
  'Organizers': '組織者',
  'Editors': '編輯',
  'Additional details': '更多資訊',
  'Join the M3 Lab.': '加入 M3 Lab。',
  'The lab welcomes prospective graduate, undergraduate, visiting, and collaborator inquiries that connect clearly to M3 Lab research.':
    '本實驗室歡迎與 M3 Lab 研究方向明確相關的研究生、大學生、訪問學者與合作夥伴洽詢。',
  'Graduate Researchers': '研究生研究員',
  'Visitors & Collaborators': '訪問學者與合作夥伴',
  'Best fit for graduate students interested in grain-boundary engineering, field-assisted processing, computational materials science, microscopy-informed modeling, characterization, instrumentation, or data-driven materials workflows. Prospective Ph.D. students may apply through SDSU joint doctoral programs.':
    '適合對晶界工程 (grain-boundary engineering)、場輔助製程、計算材料科學、以顯微證據輔助的建模、材料表徵、儀器開發或資料驅動材料流程感興趣的研究生。申請博士班的學生可透過 SDSU 聯合博士學位計畫申請。',
  'Hands-on pathways into sample preparation, SEM workflows, coding, visualization, and literature-driven research questions.':
    '透過樣品製備、SEM 流程、程式撰寫、視覺化與文獻導向研究問題，建立實作研究經驗。',
  'The lab welcomes collaborators in processing, microstructure characterization, computational modeling, and education technology.':
    '本實驗室歡迎在製程、微結構表徵、計算建模與教育科技方面的合作。',
  'materials science or mechanical engineering background': '材料科學或機械工程背景',
  'programming, simulation, or experimental experience': '程式、模擬或實驗經驗',
  'clear project ownership and regular progress communication': '清楚的計畫責任感與定期進度溝通',
  'reliability': '可靠度',
  'willingness to document work': '願意記錄研究工作',
  'interest in materials or computation': '對材料或計算有興趣',
  'shared research question': '共同研究問題',
  'clear collaboration scope': '明確合作範圍',
  'fit with lab methods or facilities': '與實驗室方法或設備契合',
  'What to include in your email': '來信請包含',
  'Brief research interests and target program': '簡短研究興趣與目標學程',
  'Relevant coursework, skills, or project experience': '相關課程、技能或計畫經驗',
  'CV or resume, transcript if available, and expected start term': '履歷、可提供的成績單，以及預計開始學期',
  'One or two M3 Lab projects that genuinely interest you': '一至兩個真正感興趣的 M3 Lab 研究計畫',
  'Email': 'Email',
  'Materials courses and student training.': '材料課程與學生訓練。',
  'Teaching Innovation': '教學創新',
  'CrystalCraft: VR/AR materials learning.': 'CrystalCraft：VR/AR 材料學習。',
  'CrystalCraft is an open-source virtual reality application for building atomic models and learning crystal structures at the molecular level. The project turns materials visualization into a calm, creative learning environment developed through an interdisciplinary SDSU student-faculty collaboration.':
    'CrystalCraft 是一套開源虛擬實境應用，用於建立原子模型並在分子層級學習晶體結構。此計畫將材料視覺化轉化為沉浸且具創造性的學習環境，由 SDSU 跨領域師生合作開發。',
  'Build atomic models in virtual reality': '在虛擬實境中建立原子模型',
  'Explore crystal structures at the molecular level': '在分子層級探索晶體結構',
  'Use FCC and HCP examples to support materials instruction': '以 FCC 與 HCP 範例支援材料教學',
  'Blend materials science, game design, and open-source development': '結合材料科學、遊戲設計與開源開發',
  'Project site': '計畫網站',
  'GitHub repository': 'GitHub 儲存庫',
  'Your browser does not support HTML5 video.': '您的瀏覽器不支援 HTML5 影片。',
  'Early footage from the user perspective in the CrystalCraft VR environment.': 'CrystalCraft VR 環境中的早期使用者視角影片。',
  '2x2 FCC array': '2x2 FCC 陣列',
  'HCP structure': 'HCP 結構',
  'Atom texture': '原子材質',
  'Early demo environment': '早期展示環境',
  'CrystalCraft in the VITAL Lab': 'VITAL Lab 中的 CrystalCraft',
  'Interdisciplinary SDSU project team': 'SDSU 跨領域專案團隊',
  'CrystalCraft was created through collaboration across software engineering, game design, mechanical engineering, materials science, 3D modeling, and faculty advising.':
    'CrystalCraft 由軟體工程、遊戲設計、機械工程、材料科學、3D 建模與教師指導等領域合作完成。',
  'Collaborators and Professional Network - Past and Present.': '合作夥伴與專業網絡：過去與現在。',
  'Profile cards include collaborators, co-authors, co-editors, advisors, and proposal collaborators across universities, national laboratories, and industry working on computational materials science, atomistic simulations, grain-boundary engineering, field-assisted materials processing, AI/ML-enabled materials research, materials informatics, and engineering education.':
    '這些卡片包含大學、國家實驗室與產業界的合作夥伴、共同作者、共同編輯、導師與提案合作對象，研究範圍涵蓋計算材料科學、原子尺度模擬、晶界工程、場輔助材料製程、AI/ML 材料研究、材料資訊學與工程教育。',
  'Experimental and computing resources.': '實驗與計算資源。',
  'Shared infrastructure supporting M3 Lab experiments, simulations, data analysis, and computational materials research.':
    '支援 M3 Lab 實驗、模擬、資料分析與計算材料研究的共享基礎設施。',
  'Experimental Resources': '實驗資源',
  'Customized and lab-developed experimental platforms supporting Xu group studies of field-assisted processing, in-situ microscopy, thermal-mechanical coupling, and rapid high-temperature testing.':
    '客製化與實驗室自行開發的平台，支援 Xu 團隊研究場輔助製程、原位顯微觀察 (in-situ microscopy)、熱機耦合與快速高溫測試。',
  'Computing Resources': '計算資源',
  'The Xu Research Group uses high-performance computing resources at San Diego State University to support computational materials science, atomistic simulations, molecular dynamics, data analysis, and simulation-driven materials design.':
    'Xu 研究團隊使用聖地牙哥州立大學的高效能運算資源，支援計算材料科學、原子尺度模擬、分子動力學、資料分析與模擬驅動材料設計。',
  'Resource overview': '資源概覽',
  'Visitor Stats': '訪客統計',
  'Recorded cumulative pageviews': '已記錄的累計頁面瀏覽次數',
  'Cumulative pageviews': '累計頁面瀏覽次數',
  'Cumulative bot requests excluded': '累計排除的機器人請求次數',
  'Automated requests excluded from pageviews.': '自動化請求，不計入頁面瀏覽次數。',
  'Since': '起始日期',
  'Estimated cumulative pageviews': '估計累計頁面瀏覽次數',
  'Estimated period': '估計期間',
  'Central estimate based on surviving traffic records and modeled gaps, rounded to the nearest 1,000. Historical records are incomplete; this is not an exact recorded count.':
    '依現存流量記錄與缺漏期間的模型推估，採用中間情境估計值，四捨五入至千位。歷史記錄不完整，此數值並非精確的實際記錄總數。',
  'At least': '至少',
  'Minimum from retained logs and recovered statistics. Older records are incomplete; the full lifetime total and original tracking start date are unknown. Repeat views are included; known bots and static files are excluded.':
    '依現存記錄與復原統計得到的最低值。早期記錄不完整，網站歷來完整總數與最初開始追蹤的日期均無法確認。包含重複瀏覽，排除已知機器流量與靜態檔案。',
  'First recorded pageview': '最早記錄的頁面瀏覽日期',
  'Records through': '資料截至',
  'Based on available records. Older logs are incomplete, so this is not the full lifetime total. Repeat views are included; known bots and static files are excluded.':
    '依現存記錄統計。早期記錄不完整，因此並非網站自成立以來的完整總數。包含重複瀏覽，排除已知機器流量與靜態檔案。',
  'Public website activity.': '公開網站活動。',
  'Pageviews': '頁面瀏覽',
  'Unique visitors': '不重複訪客',
  'Countries': '國家/地區',
  'Bots excluded': '已排除機器流量',
  'Recent daily activity': '近期每日活動',
  'Top countries': '主要國家/地區',
  'By pageviews': '依頁面瀏覽排序',
  'Analytics snapshot pending': '分析快照等待中',
  'The live server will show privacy-preserving aggregate traffic here after the public analytics file is generated.':
    '公開分析檔案產生後，正式伺服器會在此顯示保護隱私的彙整流量。',
  'Connect with the M3 Lab at SDSU.': '聯絡 SDSU M3 Lab。',
  'Address': '地址',
  'Publication profile': '發表論文檔案',
  'Back to top': '回到頁首',
  'Accessibility': '無障礙',
  'Current Graduate Student': '現任研究生',
  'Associate Professor': '副教授',
  'Graduate Student': '研究生',
  'Undergraduate Researcher': '大學生研究員',
  'Ph.D. Student': '博士生',
  'M.S. Student': '碩士生',
  'machine learning': '機器學習 (machine learning)',
  'feature engineering': '特徵工程 (feature engineering)',
  'multiscale data': '多尺度資料 (multiscale data)',
  'model validation': '模型驗證 (model validation)',
  'finite element analysis': '有限元素分析 (FEA)',
  'atomistic modeling': '原子尺度建模 (atomistic modeling)',
  'microscopy': '顯微分析 (microscopy)',
  'electrical pulsing': '電脈衝處理 (electrical pulsing)',
  'molecular dynamics': '分子動力學 (molecular dynamics)',
  'in-situ SEM': '原位 SEM (in-situ SEM)',
  'sample preparation': '樣品製備',
  '8YSZ processing': '8YSZ 製程',
  'SEM': 'SEM',
  'TEM': 'TEM',
  'X-ray diffraction': 'X 光繞射 (XRD)',
  'tomography': '斷層成像 (tomography)',
  '3D reconstruction': '三維重建',
  'DFT': 'DFT',
  'continuum modeling': '連續體建模 (continuum modeling)',
  'AI/ML for Materials Microstructure and Processing': '材料微結構與製程的 AI/ML',
  'Data-driven models can help connect processing conditions, microstructure descriptors, and material response.':
    '資料驅動模型可協助連結製程條件、微結構描述子與材料反應。',
  'The lab uses machine-learning ideas to accelerate multiscale modeling and identify interpretable links among simulated microstructures, processing routes, and properties.':
    '本實驗室運用機器學習概念加速多尺度建模，並尋找模擬微結構、製程路徑與材料性質之間可解釋的連結。',
  'Electro-Nano-Pulsing and Grain Boundary Engineering': '電奈米脈衝 (ENP) 與晶界工程',
  'Nanosecond electrical pulses may offer a route to manipulate grain boundaries and design stronger materials.':
    '奈秒電脈衝可能提供操控晶界並設計更高強度材料的新路徑。',
  'This project studies whether short, intense electrical pulses can alter grain-boundary structures and open new processing pathways for advanced materials. The work combines multiphysics modeling, nanoscale mechanism hypotheses, and microstructure evidence.':
    '此計畫研究短而強的電脈衝是否能改變晶界結構，並為先進材料開啟新的製程路徑。研究結合多物理場建模、奈米尺度機制假說與微結構證據。',
  'Flash Sintering and Current-Driven Ceramic Processes': '閃速燒結與電流驅動陶瓷製程',
  'Field-assisted ceramic processing can accelerate densification and reveal new coupling among current, heat, defects, and microstructure.':
    '場輔助陶瓷製程可加速緻密化，並揭示電流、熱、缺陷與微結構之間的新耦合關係。',
  'The lab studies 8 mol% yttria-stabilized zirconia and related ceramic systems to understand how electric fields, temperature, and microstructure interact during rapid sintering.':
    '本實驗室研究 8 mol% 氧化釔穩定氧化鋯 (8YSZ) 與相關陶瓷系統，以理解電場、溫度與微結構在快速燒結中的交互作用。',
  'Microstructure Characterization and 3D/4D Imaging': '微結構表徵與 3D/4D 成像',
  'Microscopy, diffraction, and three-dimensional reconstruction provide evidence for processing-structure-property relationships.':
    '顯微術、繞射與三維重建為製程-結構-性質關係提供證據。',
  "Experimental characterization grounds the lab's modeling work, helping the group compare mechanisms against microstructure, deformation, and processing evidence.":
    '實驗表徵為實驗室的建模工作提供基礎，協助團隊以微結構、變形與製程證據檢驗機制。',
  'Multiscale Modeling: DFT, MD, FEA, Continuum': '多尺度建模：DFT、MD、FEA、連續體',
  'Computation connects electronic, atomic, microstructural, and component scales for materials design.':
    '計算方法連結電子、原子、微結構與元件尺度，用於材料設計。',
  'The M3 Lab develops and applies modeling workflows across length scales, using simulation to interpret mechanisms and connect materials structure to performance.':
    'M3 Lab 開發並應用跨長度尺度的建模流程，以模擬詮釋機制並連結材料結構與性能。',
  'W.M. Keck Foundation Supports Electro-Nano-Pulsing Research': 'W.M. Keck Foundation 支持電奈米脈衝 (ENP) 研究',
  'SDSU researchers received W.M. Keck Foundation support for research on powerful nanosecond pulses as a possible route to manipulate grain-boundary structures.':
    'SDSU 研究團隊獲得 W.M. Keck Foundation 支持，研究強奈秒脈衝作為操控晶界結構的可能途徑。',
  'M3 Lab Joins Inaugural ASCEND Research and Leadership Program Cohort': 'M3 Lab 入選首屆 ASCEND Research and Leadership Program',
  'Wenwu Xu received a $199,772 ASCEND Research and Leadership Program award from the Alliance of Hispanic Serving Research Universities for Thermal-Elastic Processing (TEP) for Defense-Relevant Localized Interface Engineering via Coupled Atomistic Modeling and in Situ Electron Microscopy. The project develops TEP as a localized interface-engineering strategy for defense-relevant structural metals, coupling atomistic modeling with in situ electron microscopy.':
    'Wenwu Xu 獲得 Alliance of Hispanic Serving Research Universities 頒發的 ASCEND Research and Leadership Program 獎助，金額 $199,772。計畫題目為 Thermal-Elastic Processing (TEP) for Defense-Relevant Localized Interface Engineering via Coupled Atomistic Modeling and in Situ Electron Microscopy。此計畫發展 TEP 作為國防相關結構金屬的局部介面工程策略，結合原子尺度建模與原位電子顯微術。',
  'Invited Talk at GFMAT-3 / HTCMC-12 in San Diego': '於聖地牙哥 GFMAT-3 / HTCMC-12 發表邀請演講',
  'Prof. Wenwu Xu delivered an invited talk at GFMAT-3 / HTCMC-12 in San Diego on June 4, 2026. His talk, "Flash Sintering of YSZ from Atomistic Modeling and Experiment: Mechanisms and Grain Growth," presented the lab\'s integrated simulation-experiment work on flash sintering mechanisms, field-enhanced diffusion, and grain growth in yttria-stabilized zirconia.':
    'Wenwu Xu 教授於 2026 年 6 月 4 日在聖地牙哥 GFMAT-3 / HTCMC-12 發表邀請演講。演講題目為「Flash Sintering of YSZ from Atomistic Modeling and Experiment: Mechanisms and Grain Growth」，介紹實驗室在氧化釔穩定氧化鋯中，結合模擬與實驗研究閃速燒結機制、場增強擴散與晶粒成長的成果。',
  'Journal Topical Collection / Call for Papers': '期刊專題集 / 論文徵稿',
  'Conference Symposium / Call for Abstracts': '會議專題 / 摘要徵集',
  'Topical Collection Organizer or Editor': '專題集組織者或編輯',
  'Symposium Organizer': '會議專題組織者',
  'View Collection': '查看專題集',
  'View Symposium Details': '查看會議專題詳情',
  'Collection details': '專題集資訊',
  'AI-ICME details': 'AI-ICME 資訊',
  'Field-Assisted Material Processing and Solidification details': '場輔助材料製程與凝固資訊',
  'IMMI Topical Collection: AI Applications in Integrated Computational Materials Engineering':
    'IMMI 專題集：人工智慧在整合式計算材料工程 (ICME) 中的應用',
  'Submissions are invited for an IMMI topical collection on AI applications in ICME.':
    'IMMI 專題集徵求有關 AI 在 ICME 中應用的投稿。',
  'Submissions are invited to the Integrating Materials and Manufacturing Innovation topical collection "Artificial Intelligence Applications in Integrated Computational Materials Engineering (AI-ICME)." The collection welcomes contributions on AI/ML-enabled materials modeling, materials informatics, process-structure-property relationships, multiscale modeling, uncertainty quantification, digital twins, and AI-enabled ICME workflows.':
    'Integrating Materials and Manufacturing Innovation 專題集「Artificial Intelligence Applications in Integrated Computational Materials Engineering (AI-ICME)」徵求投稿。歡迎 AI/ML 輔助材料建模、材料資訊學、製程-結構-性質關係、多尺度建模、不確定性量化、數位分身 (digital twins) 與 AI 輔助 ICME 工作流程等主題。',
  'TMS 2027 Symposium: Artificial Intelligence Applications in ICME':
    'TMS 2027 會議專題：人工智慧在 ICME 中的應用',
  'Abstracts are invited for the TMS 2027 AI-ICME symposium on AI-enabled ICME methods and workflows.':
    'TMS 2027 AI-ICME 會議專題徵求摘要，主題聚焦 AI 輔助 ICME 方法與工作流程。',
  'Dr. Wenwu Xu will co-organize the symposium "Artificial Intelligence Applications in Integrated Computational Materials Engineering (AI-ICME)" at the TMS 2027 Annual Meeting & Exhibition, March 14-18, 2027, in Orlando, Florida. The symposium focuses on AI/ML, physics-informed modeling, surrogate models, foundation models, uncertainty quantification, and digital workflows for process-structure-property-performance linkages in ICME.':
    'Wenwu Xu 博士將共同組織 TMS 2027 Annual Meeting & Exhibition 的「Artificial Intelligence Applications in Integrated Computational Materials Engineering (AI-ICME)」會議專題，會議將於 2027 年 3 月 14-18 日在佛羅里達州奧蘭多舉行。此專題聚焦 AI/ML、物理知情建模 (physics-informed modeling)、代理模型 (surrogate models)、基礎模型 (foundation models)、不確定性量化，以及 ICME 中製程-結構-性質-性能連結的數位工作流程。',
  'TMS 2027 Symposium: Field-Assisted Material Processing and Solidification':
    'TMS 2027 會議專題：場輔助材料製程與凝固',
  'Abstracts are invited for a TMS 2027 symposium on external-field control of processing and solidification.':
    'TMS 2027 會議專題徵求摘要，主題為外場控制製程與凝固。',
  'Dr. Wenwu Xu will co-organize the symposium "Field-Assisted Material Processing and Solidification" at the TMS 2027 Annual Meeting & Exhibition, March 14-18, 2027, in Orlando, Florida. The symposium focuses on the use of external fields, including electric, magnetic, ultrasonic, electromagnetic, photonic, plasma, electrochemical, mechanical, and gravitational fields, to control transport, phase transformations, interfacial chemistry, processing, and solidification.':
    'Wenwu Xu 博士將共同組織 TMS 2027 Annual Meeting & Exhibition 的「Field-Assisted Material Processing and Solidification」會議專題，會議將於 2027 年 3 月 14-18 日在佛羅里達州奧蘭多舉行。此專題聚焦使用外場，包括電場、磁場、超音波場、電磁場、光子、電漿、電化學、機械與重力場，來控制傳輸、相變、介面化學、製程與凝固。',
  'AI-ICME': 'AI-ICME',
  'Materials Informatics': '材料資訊學 (materials informatics)',
  'Materials Modeling': '材料建模 (materials modeling)',
  'Uncertainty Quantification': '不確定性量化 (uncertainty quantification)',
  'Digital Twins': '數位分身 (digital twins)',
  'ICME Workflows': 'ICME 工作流程',
  'TMS 2027': 'TMS 2027',
  'ICME': 'ICME',
  'Artificial Intelligence': '人工智慧 (AI)',
  'Machine Learning': '機器學習 (machine learning)',
  'Materials Science': '材料科學',
  'Materials Engineering': '材料工程',
  'Field-Assisted Processing': '場輔助製程 (field-assisted processing)',
  'Solidification': '凝固 (solidification)',
  'Materials Processing': '材料製程',
  'External Fields': '外場 (external fields)',
  'CrystalCraft image gallery': 'CrystalCraft 圖片集',
  'Electro-Nano-Pulsing (ENP) Advance 4X Platform': '電奈米脈衝 (ENP) Advance 4X 平台',
  'Nanosecond pulsed-current processing for grain-boundary engineering.':
    '用於晶界工程的奈秒脈衝電流製程。',
  'Real benchtop ENP system overview with pulsed-current supply, fixture board, monitoring electronics, and oscilloscope.':
    '實際桌上型 ENP 系統，包含脈衝電源、夾具板、監測電子設備與示波器。',
  'Real lab image: full benchtop ENP setup with pulsed-current supply, fixture board, measurement electronics, and oscilloscope.':
    '實驗室實拍：完整桌上型 ENP 裝置，包含脈衝電源、夾具板、量測電子設備與示波器。',
  'The Xu group develops customized electro-nano-pulsing platforms for grain-boundary engineering in metallic materials. The ENP Advance 4X system applies programmable nanosecond-scale current pulses to small metallic specimens to probe localized electrical, thermal, and electron-wind effects at grain boundaries.':
    'Xu 團隊開發客製化電奈米脈衝平台，用於金屬材料的晶界工程。ENP Advance 4X 系統對小型金屬試片施加可程式化奈秒級電流脈衝，以探測晶界附近的局部電效應、熱效應與電子風效應 (electron-wind effects)。',
  'Ultra-intense nanosecond pulsed-current processing': '超高強度奈秒脈衝電流製程',
  'Four-pair copper feed-plate architecture on alumina-ceramic PCB': '氧化鋁陶瓷 PCB 上的四對銅饋電板架構',
  'Removable central chamber for inert Ar or liquid-nitrogen operation': '可拆式中央腔體，支援惰性氬氣或液態氮操作',
  'Designed for small metallic strip specimens': '為小型金屬帶狀試片設計',
  'Supports studies separating Joule-heating and electron-wind effects': '支援區分焦耳加熱與電子風效應的研究',
  'Real lab image': '實驗室實拍',
  'Custom SEM In-Situ Thermo-Mechanical Testing Device': '客製化 SEM 原位熱機測試裝置',
  'Lab-made fixture for direct SEM observation during thermal-straining.':
    '實驗室自製夾具，用於熱應變過程中的 SEM 直接觀察。',
  'Real thermal-straining SEM tester with heating stage, sample position, and force-capacity label.':
    '實際熱應變 SEM 測試裝置，包含加熱台、樣品位置與力容量標示。',
  'Real lab image: thermal-straining SEM tester with heating stage, sample zone, and mechanical loading hardware.':
    '實驗室實拍：熱應變 SEM 測試裝置，包含加熱台、樣品區與機械載入硬體。',
  'The group has developed a customized SEM-compatible mechanical testing device for in-situ thermal-straining studies. Paired with an SEM heating stage, the fixture supports direct observation of deformation and microstructural evolution under coupled thermal and mechanical loading.':
    '本團隊開發了客製化、相容 SEM 的機械測試裝置，用於原位熱應變研究。此夾具搭配 SEM 加熱台，可在熱-機耦合載入下直接觀察變形與微結構演化。',
  'Lab-made SEM-compatible mechanical fixture': '實驗室自製 SEM 相容機械夾具',
  'Compatible with in-situ SEM imaging workflows': '相容原位 SEM 成像流程',
  'Pairs with a heating stage for thermal-straining experiments': '可搭配加熱台進行熱應變實驗',
  'Supports observation of strain localization, cracking, and interface evolution': '支援觀察應變局部化、裂紋與介面演化',
  'Adaptable to customized specimen geometries and loading configurations': '可適應客製化試片幾何與載入組態',
  'SEM High-Temperature Heating Stage / Furnace Capability': 'SEM 高溫加熱台 / 爐體能力',
  'Elevated-temperature SEM observation and thermal-processing studies.':
    '高溫 SEM 觀察與熱製程研究。',
  'Real SEM hot-stage assembly installed inside an SEM chamber with heater surface and electrical connections.':
    '安裝於 SEM 腔體內的實際熱台組件，包含加熱表面與電性連接。',
  'Real lab image: SEM hot-stage assembly installed in the SEM chamber for elevated-temperature experiments.':
    '實驗室實拍：安裝在 SEM 腔體中的熱台組件，用於高溫實驗。',
  'The group uses high-temperature SEM-stage capabilities to observe microstructural evolution during thermal exposure and coupled thermal-mechanical loading. These resources support SEM-based high-temperature and flash-sintering studies of ceramic and metallic materials.':
    '本團隊使用高溫 SEM 載台能力，觀察熱暴露與熱-機耦合載入期間的微結構演化。這些資源支援以 SEM 為基礎的陶瓷與金屬材料高溫及閃速燒結研究。',
  'SEM-based observation during controlled heating': '受控加熱期間的 SEM 觀察',
  'Integrates with customized mechanical loading hardware': '可整合客製化機械載入硬體',
  'Supports thermal exposure, thermal-straining, and flash-sintering studies': '支援熱暴露、熱應變與閃速燒結研究',
  'Tracks morphology, cracking, and grain-boundary behavior': '追蹤形貌、裂紋與晶界行為',
  'Apreo 2-compatible heating-stage path with detector compatibility considerations': 'Apreo 2 相容加熱台路徑，並考量偵測器相容性',
  'Custom Rapid-Heat Tube Furnace / ENP-Compatible Rapid Heating System Integrated with Mechanical Testing':
    '客製化快速升溫管式爐 / 與機械測試整合的 ENP 相容快速加熱系統',
  'Fast high-temperature experiments under mechanical loading.':
    '機械載入下的快速高溫實驗。',
  'Real rapid-heating furnace assembly mounted in an Instron mechanical testing frame.':
    '安裝於 Instron 機械測試機架中的實際快速加熱爐組件。',
  'Real lab image: custom rapid-heating furnace integrated with an Instron frame for coupled thermal-mechanical testing.':
    '實驗室實拍：客製化快速加熱爐與 Instron 機架整合，用於熱-機耦合測試。',
  'The Xu group operates a custom rapid-heat tube furnace designed for thermal-elastic processing and high-temperature mechanical testing. The system integrates with an Instron universal testing machine to enable coupled heating and mechanical loading of small cylindrical specimens.':
    'Xu 團隊操作客製化快速升溫管式爐，用於熱彈性製程 (thermal-elastic processing) 與高溫機械測試。此系統整合 Instron 萬能材料試驗機，可對小型圓柱試片進行加熱與機械載入耦合實驗。',
  'Custom-built compact rapid-heat tube furnace': '客製化小型快速升溫管式爐',
  'Designed to bolt directly to an Instron universal testing machine': '設計為可直接固定於 Instron 萬能材料試驗機',
  'Four silicon-carbide heating elements with SCR power control': '四組碳化矽加熱元件，搭配 SCR 電力控制',
  'Watlow PM6+ PID control with Type N thermocouple': 'Watlow PM6+ PID 控制，搭配 Type N 熱電偶',
  'Can also operate as a standalone table-mounted furnace': '亦可作為獨立桌上型爐體使用',
  'SDSU High Performance Computing Cluster': 'SDSU 高效能運算叢集',
  'The group uses SDSU High Performance Computing Cluster resources for CPU- and GPU-based computational research. SDSU HPCC infrastructure provides shared high-performance computing nodes, GPU-enabled resources, and networked storage capacity that support large-scale simulations and data-intensive post-processing.':
    '本團隊使用 SDSU 高效能運算叢集資源，進行 CPU 與 GPU 計算研究。SDSU HPCC 基礎設施提供共享高效能運算節點、GPU 資源與網路儲存容量，支援大規模模擬與資料密集型後處理。',
  'SDSU TIDE Research Cluster': 'SDSU TIDE 研究叢集',
  'The group also uses SDSU Technology Infrastructure for Data Exploration (TIDE) research cluster. TIDE provides SDSU researchers access to research-class CPU, GPU, and storage resources. These resources support containerized research workflows, including computational materials modeling, atomistic simulations, data analysis, and machine-learning-assisted materials research.':
    '本團隊也使用 SDSU Technology Infrastructure for Data Exploration (TIDE) 研究叢集。TIDE 提供 SDSU 研究人員研究級 CPU、GPU 與儲存資源，支援容器化研究流程，包括計算材料建模、原子尺度模擬、資料分析與機器學習輔助材料研究。',
}

export function getLanguageFromPath(pathname: string): Language {
  return pathname.split('/').some((part) => part.toLowerCase() === 'zh-tw') ? 'zh-TW' : 'en'
}

export function getLanguagePath(pathname: string, language: Language, hash = '') {
  const parts = pathname
    .split('/')
    .filter(Boolean)
    .filter((part) => part.toLowerCase() !== 'zh-tw')

  if (language === 'zh-TW') {
    parts.push('zh-TW')
  }

  const path = parts.length ? `/${parts.join('/')}/` : '/'
  return `${path}${hash}`
}

export function translate(language: Language, value: string) {
  if (language === 'en') return value
  return zhText[value] ?? value
}

export function updateDocumentLanguage(language: Language) {
  const copy = siteCopy[language]
  document.documentElement.lang = language === 'zh-TW' ? 'zh-Hant' : 'en'
  document.title = copy.documentTitle

  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description) description.content = copy.documentDescription

  const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  if (ogTitle) ogTitle.content = copy.documentTitle

  const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
  if (ogDescription) ogDescription.content = copy.documentDescription
}
