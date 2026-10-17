import { useEffect, useMemo, useRef, useState } from 'react'
import { startCollaboratorMap } from './collaborator-map'
import {
  Atom,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Mail,
  Menu,
  MapPin,
  Play,
  Search,
  Send,
  X,
} from 'lucide-react'
import heroImage from './assets/materials-hero.webp'
import groupImage from './assets/lab-group.jpg'
import missionImage from './assets/lab-mission-visual.svg'
import bioImage from './assets/bio-overview.png'
import modelingImage from './assets/research-modeling.jpg'
import characterizationImage from './assets/research-characterization.jpg'
import m3LogoImage from './assets/logo-m3-lab.svg'
import enpImage from './assets/research-enp.svg'
import flashSinteringImage from './assets/research-flash-sintering.svg'
import multiscaleImage from './assets/research-multiscale.svg'
import imagingImage from './assets/research-imaging.svg'
import aiMlImage from './assets/research-ai-ml.svg'
import gfmatTalkImage from './assets/news/gfmat-htcmc-invited-talk.jpg'
import mesaSuraTepInstronImage from './assets/news/mesa-sura-tep-instron.jpg'
import mesaSuraTepPresentationImage from './assets/news/mesa-sura-tep-presentation.jpg'
import mesaSuraTepSamplePrepImage from './assets/news/mesa-sura-tep-sample-prep.jpg'
import molssiActCmsWorkshopImage from './assets/news/molssi-act-cms-workshop.jpg'
import skyImage from './assets/sky-soltero.jpg'
import maraonBaniImage from './assets/team/maraon-bani.jpg'
import adamMonroeImage from './assets/team/adam-monroe.jpg'
import henryBahiniImage from './assets/team/henry-bahini.jpg'
import ethanPudasainiImage from './assets/team/ethan-pudasaini.jpg'
import isaiahClemonsImage from './assets/team/isaiah-clemons.webp'
import diegoCeaImage from './assets/team/diego-cea.webp'
import andersTorgersonImage from './assets/team/anders-torgerson.webp'
import wenwuImage from './assets/team/wenwu-xu.jpg'
import LifeJourney from './LifeJourney'
import ConferenceJourney from './ConferenceJourney'
import shahrierImage from './assets/team/shahrier-hasan.jpg'
import katherineImage from './assets/team/katherine-whitmore.jpeg'
import sherwinImage from './assets/team/sherwin-navindaran.webp'
import cameronImage from './assets/team/cameron-aires.webp'
import rachellImage from './assets/team/rachell-lee.jpg'
import jamesImage from './assets/team/james-murray.jpg'
import jamesBurnsImage from './assets/team/james-burns.jpg'
import nicolasMosquedaImage from './assets/team/nicolas-mosqueda.jpg'
import amauryImage from './assets/team/amaury-reed.jpg'
import coleImage from './assets/team/cole-waterhouse.webp'
import kenImage from './assets/team/ken-ramirez.webp'
import sanamImage from './assets/team/sanam-nagvekar.jpeg'
import saraImage from './assets/team/sara-gomez.jpg'
import xavierImage from './assets/team/xavier-lovato.webp'
import zeshanImage from './assets/team/zeshan-ahmed.png'
import marivelImage from './assets/team/marivel-alfaro.webp'
import adrianImage from './assets/team/adrian-contreras.webp'
import joseImage from './assets/team/jose-morales.webp'
import carsonImage from './assets/team/carson-sutton.webp'
import seanImage from './assets/team/sean-ogrady.webp'
import zacharyImage from './assets/team/zachary-mclaughlin.webp'
import colinImage from './assets/team/colin-delaney.png'
import rebecaImage from './assets/team/rebeca-contreras.jpg'
import theodoreImage from './assets/team/theodore-norris.jpg'
import ethanAndersonImage from './assets/team/ethan-anderson.jpg'
import ethanMorrisonImage from './assets/team/ethan-morrison.jpg'
import edgarDiazImage from './assets/team/edgar-diaz.png'
import oliviaTowersImage from './assets/team/olivia-towers.jpg'
import roselynnConradyImage from './assets/team/roselynn-conrady.jpg'
import gabrielPortilloPaunaImage from './assets/team/gabriel-portillo-pauna.jpg'
import kyrelPolifroneImage from './assets/team/kyrel-polifrone.jpg'
import micheleBorbaPavaoImage from './assets/team/michele-borba-pavao.jpg'
import wadeAndersonImage from './assets/team/wade-anderson.jpg'
import williamFischerImage from './assets/team/william-fischer.jpg'
import juliaGurfinkelImage from './assets/team/julia-gurfinkel.jpg'
import simhalMaharajImage from './assets/team/simhal-maharaj.jpg'
import brandonDimmickImage from './assets/team/brandon-dimmick.jpg'
import matthewSimonImage from './assets/team/matthew-simon.jpg'
import juanRomanImage from './assets/team/juan-roman.jpg'
import allenOrtizImage from './assets/team/allen-ortiz.jpg'
import pabloHinojosaAmayaImage from './assets/team/pablo-hinojosa-amaya.jpg'
import madisonRogersImage from './assets/team/madison-rogers.jpg'
import katieHardwickeImage from './assets/team/katie-hardwicke.jpg'
import sabrinaAbdelhamedImage from './assets/team/sabrina-abdelhamed.jpg'
import jadynYamashitaImage from './assets/team/jadyn-yamashita.jpg'
import lanaAyyashImage from './assets/team/lana-ayyash.jpg'
import christopherForondaImage from './assets/team/christopher-foronda.jpg'
import junailPauleImage from './assets/team/junail-paule.jpg'
import crystalCraftAtomImage from './assets/crystalcraft/atom.png'
import crystalCraftCarterImage from './assets/crystalcraft/carter.jpg'
import crystalCraftDemoImage from './assets/crystalcraft/demo.webp'
import crystalCraftDownloadImage from './assets/crystalcraft/download.png'
import crystalCraftFccImage from './assets/crystalcraft/fcc.webp'
import crystalCraftGitImage from './assets/crystalcraft/git.png'
import crystalCraftHcpImage from './assets/crystalcraft/hcp.webp'
import crystalCraftKainImage from './assets/crystalcraft/kain.jpg'
import crystalCraftPatrickImage from './assets/crystalcraft/patrick.jpg'
import crystalCraftRosImage from './assets/crystalcraft/ros.jpg'
import crystalCraftTeamImage from './assets/crystalcraft/team.webp'
import crystalCraftTvImage from './assets/crystalcraft/TV.png'
import crystalCraftWenImage from './assets/crystalcraft/wen.jpg'
import enpAdvance4xImage from './assets/resources/enp_advance4x_real.webp'
import rapidHeatFurnaceImage from './assets/resources/rapid_heat_furnace_instron_real.webp'
import semHighTemperatureStageImage from './assets/resources/sem_high_temperature_stage_real.webp'
import semInsituMechanicalImage from './assets/resources/sem_insitu_mechanical_heating_real.webp'
import publicationsRaw from './data/publications.yaml?raw'
import fundingRaw from './data/funding.yaml?raw'
import collaboratorsRaw from './data/collaborators.yaml?raw'
import {
  getLanguageFromPath,
  languageLabels,
  languageLocales,
  siteCopy,
  translate,
  updateDocumentLanguage,
  type Language,
} from './i18n'
import './App.css'

type MetadataValue = string | number | boolean | string[]

type ContentEntry = {
  slug: string
  body: string
  meta: Record<string, MetadataValue>
}

type Person = {
  slug: string
  name: string
  role: string
  group: string
  dates: string
  sortOrder: number
  image?: string
  project: string
  tags: string[]
  currentPosition?: string
  featured: boolean
  body: string
}

type Project = {
  slug: string
  title: string
  summary: string
  theme: string
  image?: string
  methods: string[]
  funding: string[]
  people: string[]
  papers: string[]
  featured: boolean
  body: string
}

type NewsPost = {
  slug: string
  date: string
  title: string
  category: string
  visibility: string
  image?: string
  images: string[]
  link?: string
  linkLabel?: string
  secondaryLink?: string
  secondaryLinkLabel?: string
  body: string
}

type OpportunityStatus = 'Active' | 'Featured' | 'Archived'

type Opportunity = {
  slug: string
  title: string
  type: string
  deadline: string
  status: OpportunityStatus
  summary: string
  topics: string[]
  role: string
  peopleHeading: string
  people: string[]
  link: string
  linkLabel: string
  secondaryLink?: string
  secondaryLinkLabel?: string
  cta: string
  body: string
}

type Publication = {
  title: string
  authors: string
  year: number
  venue: string
  themes: string[]
  selected: boolean
  doi?: string
  pdf?: string
}

type NamedItem = {
  id?: string
  name: string
  detail: string
  link?: string
  linkLabel?: string
}

type Collaborator = {
  name: string
  position: string
  affiliation: string
  networkNote?: string
  location: string
  country: string
  latitude: number
  longitude: number
  researchAreas: string[]
  links: {
    label: string
    href: string
  }[]
}

type CollaboratorMapPoint = {
  location: string
  country: string
  latitude: number
  longitude: number
  x: number
  y: number
  collaborators: Collaborator[]
}

type VisitorStats = {
  generated_at: string
  days: number
  first_date: string
  last_date: string
  pageviews: number
  cumulative?: {
    pageviews: number
    first_date: string
    last_date: string
    coverage: string
  }
  unique_visitors: number
  countries: number
  bot_requests_excluded: number
  cumulative_bots_excluded?: { requests: number; coverage: string }
  country_source_attribution: string
  privacy_note: string
  daily: {
    date: string
    pageviews: number
    unique_visitors: number
  }[]
  country_totals: {
    country_code: string
    pageviews: number
    unique_visitors: number
  }[]
  top_pages: {
    path: string
    pageviews: number
    unique_visitors: number
  }[]
}

// User-approved historical baseline from cumulative-pageviews-estimate.ipynb.
// Add only growth beyond the recorded total at adoption (October 11, 2026).
// Preserve the raw analytics history separately from this display baseline.
const historicalPageviewBaseline = {
  pageviews: 55000,
  recordedPageviews: 13374,
  firstDate: '2024-05-01',
}

// User-selected historical baseline (October 11, 2026), replacing the model's 125,000.
// Retain source measurements separately; add subsequent recorded growth only.
const historicalBotBaseline = { requests: 95000, recordedRequests: 20832 }

const peopleModules = import.meta.glob('./content/people/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const projectModules = import.meta.glob('./content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const newsModules = import.meta.glob('./content/news/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const opportunityModules = import.meta.glob('./content/opportunities/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const imageRegistry: Record<string, string> = {
  'materials-hero': heroImage,
  'lab-group': groupImage,
  'lab-mission': missionImage,
  'bio-overview': bioImage,
  'research-modeling': modelingImage,
  'research-characterization': characterizationImage,
  'm3-logo': m3LogoImage,
  'research-enp': enpImage,
  'research-flash-sintering': flashSinteringImage,
  'research-multiscale': multiscaleImage,
  'research-imaging': imagingImage,
  'research-ai-ml': aiMlImage,
  'news/gfmat-htcmc-invited-talk': gfmatTalkImage,
  'news/mesa-sura-tep-instron': mesaSuraTepInstronImage,
  'news/mesa-sura-tep-presentation': mesaSuraTepPresentationImage,
  'news/mesa-sura-tep-sample-prep': mesaSuraTepSamplePrepImage,
  'news/molssi-act-cms-workshop': molssiActCmsWorkshopImage,
  'sky-soltero': skyImage,
  'team/maraon-bani': maraonBaniImage,
  'team/adam-monroe': adamMonroeImage,
  'team/henry-bahini': henryBahiniImage,
  'team/ethan-pudasaini': ethanPudasainiImage,
  'team/isaiah-clemons': isaiahClemonsImage,
  'team/diego-cea': diegoCeaImage,
  'team/anders-torgerson': andersTorgersonImage,
  'team/wenwu-xu': wenwuImage,
  'team/shahrier-hasan': shahrierImage,
  'team/katherine-whitmore': katherineImage,
  'team/sherwin-navindaran': sherwinImage,
  'team/cameron-aires': cameronImage,
  'team/rachell-lee': rachellImage,
  'team/james-murray': jamesImage,
  'team/james-burns': jamesBurnsImage,
  'team/nicolas-mosqueda': nicolasMosquedaImage,
  'team/amaury-reed': amauryImage,
  'team/cole-waterhouse': coleImage,
  'team/ken-ramirez': kenImage,
  'team/sanam-nagvekar': sanamImage,
  'team/sarah-gomez': saraImage,
  'team/xavier-lovato': xavierImage,
  'team/zeshan-ahmed': zeshanImage,
  'team/marivel-alfaro': marivelImage,
  'team/adrian-contreras': adrianImage,
  'team/jose-morales': joseImage,
  'team/carson-sutton': carsonImage,
  'team/sean-ogrady': seanImage,
  'team/zachary-mclaughlin': zacharyImage,
  'team/colin-delaney': colinImage,
  'team/rebeca-contreras': rebecaImage,
  'team/theodore-norris': theodoreImage,
  'team/ethan-anderson': ethanAndersonImage,
  'team/ethan-morrison': ethanMorrisonImage,
  'team/edgar-diaz': edgarDiazImage,
  'team/olivia-towers': oliviaTowersImage,
  'team/roselynn-conrady': roselynnConradyImage,
  'team/gabriel-portillo-pauna': gabrielPortilloPaunaImage,
  'team/kyrel-polifrone': kyrelPolifroneImage,
  'team/michele-borba-pavao': micheleBorbaPavaoImage,
  'team/wade-anderson': wadeAndersonImage,
  'team/william-fischer': williamFischerImage,
  'team/julia-gurfinkel': juliaGurfinkelImage,
  'team/simhal-maharaj': simhalMaharajImage,
  'team/brandon-dimmick': brandonDimmickImage,
  'team/matthew-simon': matthewSimonImage,
  'team/juan-roman': juanRomanImage,
  'team/allen-ortiz': allenOrtizImage,
  'team/pablo-hinojosa-amaya': pabloHinojosaAmayaImage,
  'team/madison-rogers': madisonRogersImage,
  'team/katie-hardwicke': katieHardwickeImage,
  'team/sabrina-abdelhamed': sabrinaAbdelhamedImage,
  'team/jadyn-yamashita': jadynYamashitaImage,
  'team/lana-ayyash': lanaAyyashImage,
  'team/christopher-foronda': christopherForondaImage,
  'team/junail-paule': junailPauleImage,
}

const site = {
  name: 'Multiscale Modeling of Materials Lab',
  shortName: 'M3 Lab',
  pi: 'Wenwu Xu',
  department: 'Department of Mechanical Engineering',
  university: 'San Diego State University',
  email: 'wenwu.xu@sdsu.edu',
  address:
    'Department of Mechanical Engineering, San Diego State University, 5500 Campanile Drive, San Diego, CA 92182 USA',
  scholar: 'https://scholar.google.com/citations?user=AdbfEI4AAAAJ&hl=en',
  linkedin: 'https://www.linkedin.com/in/wenwuxu',
  youtube: 'https://www.youtube.com/@TwoDadsSurrogacy',
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research/' },
  { label: 'Publications', href: '/publications/' },
  { label: 'People', href: '/people/' },
  { label: 'Opportunities', href: '/opportunities/' },
  { label: 'Join Us', href: '/join/' },
  { label: 'Contact', href: '/contact/' },
]

const secondaryNavItems = [
  { label: 'Grants', href: '/grants/' },
  { label: 'News', href: '/news/' },
  { label: 'Teaching', href: '/teaching/' },
  { label: 'Collaborators', href: '/collaborators/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Stats', href: '/#visitor-stats' },
]

const researchQuestions = [
  'How do electric fields and nanosecond pulses alter grain-boundary structure and mobility?',
  'What mechanisms control flash sintering and current-driven ceramic processing in 8YSZ?',
  'How can atomistic, continuum, and finite-element models pass useful information across scales?',
  'Which microstructure descriptors best predict deformation, diffusion, and processing response?',
]

const joinTracks = [
  {
    title: 'Graduate Researchers',
    body: 'Best fit for graduate students interested in grain-boundary engineering, field-assisted processing, computational materials science, microscopy-informed modeling, characterization, instrumentation, or data-driven materials workflows. Prospective Ph.D. students may apply through SDSU joint doctoral programs.',
    skills: ['materials science or mechanical engineering background', 'programming, simulation, or experimental experience', 'clear project ownership and regular progress communication'],
    links: [
      {
        label: 'SDSU-UCSD Joint Doctoral Program',
        href: 'https://www.engineering.sdsu.edu/admissions/joint-doctoral',
      },
      {
        label: 'SDSU-UCI Joint Doctoral Program',
        href: 'https://www.csrc.sdsu.edu/ph-d-program/',
      },
    ],
  },
  {
    title: 'Undergraduate Researchers',
    body: 'Hands-on pathways into sample preparation, SEM workflows, coding, visualization, and literature-driven research questions.',
    skills: ['reliability', 'willingness to document work', 'interest in materials or computation'],
  },
  {
    title: 'Visitors & Collaborators',
    body: 'The lab welcomes collaborators in processing, microstructure characterization, computational modeling, and education technology.',
    skills: ['shared research question', 'clear collaboration scope', 'fit with lab methods or facilities'],
  },
]

const teachingItems = [
  'ME240: Introduction to Engineering Materials',
  'ME241: Materials Lab',
  'ME304: Mechanics of Materials',
  'ME542: Materials Structure',
  'ME640: Nanomaterials',
  'ME642: Materials Modeling',
]

const teachingResources = [
  {
    course: 'ME542: Materials Structure',
    label: 'Chapter 3 interactive demonstration',
    title: 'Seven crystal systems and lattice symmetry',
    body: 'Explore seven crystal systems with rotatable 3D lattice models. Animate inversion and rotational symmetry, compare lattice parameters, and use a ghost image to follow each operation.',
    meta: ['Crystal systems', '3D symmetry operations', 'No sign-in required'],
    href: 'https://mmm.sdsu.edu/teaching/me542/crystal-systems/',
    linkLabel: 'Open interactive demonstration',
  },
  {
    course: 'ME542: Materials Structure',
    label: 'Diffraction primer video',
    title: 'What is light? A 2,500 year speed run',
    body: 'A three minute cartoon history of light, from Empedocles and Newton to Young, Maxwell, Einstein and the Braggs. It sets up the diffraction chapters with one question: how can a wave reveal the spacing of atoms you cannot see?',
    meta: ['Animated video', '3 min, captioned', 'No sign-in required'],
    href: 'https://mmm.sdsu.edu/teaching/me542/what-is-light/',
    linkLabel: 'Watch the video',
  },
  {
    course: 'ME542: Materials Structure',
    label: 'Chapter 6 interactive demonstration',
    title: 'BCC crystal rotation and X-ray diffraction',
    body: 'Rotate a BCC crystal and follow the corresponding reciprocal-lattice points, Ewald-sphere intersections, and detector spots. Play, pause, select another reflection, or accumulate diffraction spots in your browser.',
    meta: ['Reciprocal lattice', 'Ewald sphere', 'No sign-in required'],
    href: 'https://mmm.sdsu.edu/teaching/me542/bcc-xrd/',
    linkLabel: 'Open interactive demonstration',
  },
  {
    course: 'ME642: Materials Modeling',
    label: 'MolSSI ACT-CMS Module',
    title: 'Introduction to AI-Molecular Dynamics',
    body: 'A seven-lesson module developed through the MolSSI ACT-CMS program, introducing molecular dynamics, atomistic model construction, LAMMPS, Atomsk, OVITO visualization, and responsible AI/LLM-assisted MD workflows for materials modeling students.',
    meta: ['Multi-part module', '8-12 hours', 'Beginner programming'],
    href: 'https://act-cms.molssi.org/portal/lessons/Introduction-to-AI-Molecular-Dynamics/',
  },
]

const experimentalResources = [
  {
    id: 'enp-advance-4x',
    title: 'Electro-Nano-Pulsing (ENP) Advance 4X Platform',
    tagline: 'Nanosecond pulsed-current processing for grain-boundary engineering.',
    image: enpAdvance4xImage,
    alt: 'Real benchtop ENP system overview with pulsed-current supply, fixture board, monitoring electronics, and oscilloscope.',
    caption: 'Real lab image: full benchtop ENP setup with pulsed-current supply, fixture board, measurement electronics, and oscilloscope.',
    description: 'The Xu group develops customized electro-nano-pulsing platforms for grain-boundary engineering in metallic materials. The ENP Advance 4X system applies programmable nanosecond-scale current pulses to small metallic specimens to probe localized electrical, thermal, and electron-wind effects at grain boundaries.',
    features: [
      'Ultra-intense nanosecond pulsed-current processing',
      'Four-pair copper feed-plate architecture on alumina-ceramic PCB',
      'Removable central chamber for inert Ar or liquid-nitrogen operation',
      'Designed for small metallic strip specimens',
      'Supports studies separating Joule-heating and electron-wind effects',
    ],
    imageStatus: 'Real lab image',
  },
  {
    id: 'sem-insitu-thermomechanical',
    title: 'Custom SEM In-Situ Thermo-Mechanical Testing Device',
    tagline: 'Lab-made fixture for direct SEM observation during thermal-straining.',
    image: semInsituMechanicalImage,
    alt: 'Real thermal-straining SEM tester with heating stage, sample position, and force-capacity label.',
    caption: 'Real lab image: thermal-straining SEM tester with heating stage, sample zone, and mechanical loading hardware.',
    description: 'The group has developed a customized SEM-compatible mechanical testing device for in-situ thermal-straining studies. Paired with an SEM heating stage, the fixture supports direct observation of deformation and microstructural evolution under coupled thermal and mechanical loading.',
    features: [
      'Lab-made SEM-compatible mechanical fixture',
      'Compatible with in-situ SEM imaging workflows',
      'Pairs with a heating stage for thermal-straining experiments',
      'Supports observation of strain localization, cracking, and interface evolution',
      'Adaptable to customized specimen geometries and loading configurations',
    ],
    imageStatus: 'Real lab image',
  },
  {
    id: 'sem-high-temperature-stage',
    title: 'SEM High-Temperature Heating Stage / Furnace Capability',
    tagline: 'Elevated-temperature SEM observation and thermal-processing studies.',
    image: semHighTemperatureStageImage,
    alt: 'Real SEM hot-stage assembly installed inside an SEM chamber with heater surface and electrical connections.',
    caption: 'Real lab image: SEM hot-stage assembly installed in the SEM chamber for elevated-temperature experiments.',
    description: 'The group uses high-temperature SEM-stage capabilities to observe microstructural evolution during thermal exposure and coupled thermal-mechanical loading. These resources support SEM-based high-temperature and flash-sintering studies of ceramic and metallic materials.',
    features: [
      'SEM-based observation during controlled heating',
      'Integrates with customized mechanical loading hardware',
      'Supports thermal exposure, thermal-straining, and flash-sintering studies',
      'Tracks morphology, cracking, and grain-boundary behavior',
      'Apreo 2-compatible heating-stage path with detector compatibility considerations',
    ],
    imageStatus: 'Real lab image',
  },
  {
    id: 'rapid-heat-tube-furnace-instron',
    title: 'Custom Rapid-Heat Tube Furnace / ENP-Compatible Rapid Heating System Integrated with Mechanical Testing',
    tagline: 'Fast high-temperature experiments under mechanical loading.',
    image: rapidHeatFurnaceImage,
    alt: 'Real rapid-heating furnace assembly mounted in an Instron mechanical testing frame.',
    caption: 'Real lab image: custom rapid-heating furnace integrated with an Instron frame for coupled thermal-mechanical testing.',
    description: 'The Xu group operates a custom rapid-heat tube furnace designed for thermal-elastic processing and high-temperature mechanical testing. The system integrates with an Instron universal testing machine to enable coupled heating and mechanical loading of small cylindrical specimens.',
    features: [
      'Custom-built compact rapid-heat tube furnace',
      'Designed to bolt directly to an Instron universal testing machine',
      'Four silicon-carbide heating elements with SCR power control',
      'Watlow PM6+ PID control with Type N thermocouple',
      'Can also operate as a standalone table-mounted furnace',
    ],
    imageStatus: 'Real lab image',
  },
]

const computingResources = [
  {
    name: 'SDSU High Performance Computing Cluster',
    body: 'The group uses SDSU High Performance Computing Cluster resources for CPU- and GPU-based computational research. SDSU HPCC infrastructure provides shared high-performance computing nodes, GPU-enabled resources, and networked storage capacity that support large-scale simulations and data-intensive post-processing.',
    link: 'https://hpcc.sdsu.edu/hpc-computing-resource-overview/',
  },
  {
    name: 'SDSU TIDE Research Cluster',
    body: 'The group also uses SDSU Technology Infrastructure for Data Exploration (TIDE) research cluster. TIDE provides SDSU researchers access to research-class CPU, GPU, and storage resources. These resources support containerized research workflows, including computational materials modeling, atomistic simulations, data analysis, and machine-learning-assisted materials research.',
    link: 'https://sdsu-research-ci.github.io/researchcluster/',
  },
]

const crystalCraftLinks = [
  {
    label: 'Project site',
    href: 'https://carterandrews.github.io/CrystalCraftWebsite/#',
    image: crystalCraftDownloadImage,
  },
  {
    label: 'GitHub repository',
    href: 'https://github.com/CarterAndrews/CrystalCraft',
    image: crystalCraftGitImage,
  },
]

const crystalCraftFeatures = [
  'Build atomic models in virtual reality',
  'Explore crystal structures at the molecular level',
  'Use FCC and HCP examples to support materials instruction',
  'Blend materials science, game design, and open-source development',
]

const crystalCraftGallery = [
  { title: '2x2 FCC array', image: crystalCraftFccImage },
  { title: 'HCP structure', image: crystalCraftHcpImage },
  { title: 'Atom texture', image: crystalCraftAtomImage },
  { title: 'Early demo environment', image: crystalCraftDemoImage },
  { title: 'CrystalCraft in the VITAL Lab', image: crystalCraftTvImage },
]

const crystalCraftTeam = [
  { name: 'Carter Andrews', role: 'Software engineer, web developer, and game designer', image: crystalCraftCarterImage },
  { name: 'Roselynn Conrady', role: 'Mechanical engineer, content designer, and materials scientist', image: crystalCraftRosImage },
  { name: 'Patrick Perrine', role: 'Software engineer, game designer, and film maker', image: crystalCraftPatrickImage },
  { name: 'Kain Kun', role: 'Programmer, graphic artist, and 3D modeler', image: crystalCraftKainImage },
  { name: 'Wenwu Xu', role: 'SDSU faculty advisor and materials simulation specialist', image: crystalCraftWenImage },
]

function slugFromPath(path: string) {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? path
}

function parseValue(value: string): MetadataValue {
  const clean = value.trim()

  if (!clean) return ''
  if (clean === 'true') return true
  if (clean === 'false') return false

  if (clean.startsWith('[') && clean.endsWith(']')) {
    return clean
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  }

  if (/^\d+$/.test(clean)) return Number(clean)

  return clean.replace(/^["']|["']$/g, '')
}

function parseMarkdown(raw: string, slug: string): ContentEntry {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { slug, meta: {}, body: raw.trim() }

  const meta: Record<string, MetadataValue> = {}
  match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const separator = line.indexOf(':')
      if (separator === -1) return
      meta[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1))
    })

  return { slug, meta, body: match[2].trim() }
}

function parseYamlList(raw: string): Record<string, MetadataValue>[] {
  const rows: Record<string, MetadataValue>[] = []
  let current: Record<string, MetadataValue> | null = null

  raw
    .replace(/^---\s*/, '')
    .split(/\r?\n/)
    .forEach((line) => {
      if (!line.trim()) return

      if (line.startsWith('- ')) {
        current = {}
        rows.push(current)
        const rest = line.slice(2)
        const separator = rest.indexOf(':')
        if (separator !== -1) {
          current[rest.slice(0, separator).trim()] = parseValue(rest.slice(separator + 1))
        }
        return
      }

      if (!current) return
      const trimmed = line.trim()
      const separator = trimmed.indexOf(':')
      if (separator !== -1) {
        current[trimmed.slice(0, separator).trim()] = parseValue(trimmed.slice(separator + 1))
      }
    })

  return rows
}

function asString(value: MetadataValue | undefined) {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

function asArray(value: MetadataValue | undefined) {
  return Array.isArray(value) ? value : asString(value) ? [asString(value)] : []
}

function asBoolean(value: MetadataValue | undefined) {
  return value === true
}

function formatDate(value: string, language: Language = 'en') {
  const date = new Date(`${value}T12:00:00`)
  return date.toLocaleDateString(languageLocales[language], { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatNumber(value: number, language: Language = 'en') {
  return new Intl.NumberFormat(languageLocales[language]).format(value)
}

function daysUntil(value: string) {
  if (!value) return Number.POSITIVE_INFINITY
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const deadline = new Date(`${value}T12:00:00`)
  return Math.ceil((deadline.getTime() - today.getTime()) / 86_400_000)
}

function normalizeOpportunityStatus(value: string): OpportunityStatus {
  return value === 'Featured' || value === 'Archived' ? value : 'Active'
}

function opportunityRank(opportunity: Opportunity) {
  if (opportunity.status === 'Archived' || daysUntil(opportunity.deadline) < 0) return 2
  if (opportunity.status === 'Featured') return 0
  return 1
}

function countryName(code: string, language: Language = 'en') {
  if (!code || code === 'ZZ') return 'Unknown'
  try {
    const displayNames = new Intl.DisplayNames([languageLocales[language]], { type: 'region' })
    return displayNames.of(code) ?? code
  } catch {
    return code
  }
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function projectWorldPoint(latitude: number, longitude: number) {
  return {
    x: clamp(((longitude + 180) / 360) * 100, 1.5, 98.5),
    y: clamp(((90 - latitude) / 180) * 100, 4, 96),
  }
}


function normalizeSearchText(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function matchesSearchQuery(values: string[], query: string) {
  if (!query) return true
  return normalizeSearchText(values.join(' ')).includes(query)
}

function getImage(key?: string) {
  return key ? imageRegistry[key] : undefined
}

function getImages(keys: string[]) {
  return keys
    .map((key) => getImage(key))
    .filter((image): image is string => Boolean(image))
}

function alumniDegreeRank(role: string) {
  const normalized = role.toLowerCase().replace(/[^a-z]/g, '')
  if (normalized.includes('phd')) return 0
  if (normalized.includes('ms') || normalized.includes('master')) return 1
  if (normalized.includes('undergraduate')) return 2
  return 3
}

function departureYear(dates: string) {
  const years = dates.match(/\b(19|20)\d{2}\b/g)
  return years?.length ? Number(years[years.length - 1]) : 0
}

function comparePeople(a: Person, b: Person) {
  if (a.group === 'Alumni' && b.group === 'Alumni') {
    return (
      alumniDegreeRank(a.role) - alumniDegreeRank(b.role)
      || departureYear(b.dates) - departureYear(a.dates)
      || a.sortOrder - b.sortOrder
      || a.name.localeCompare(b.name)
    )
  }

  return a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
}

const people: Person[] = Object.entries(peopleModules)
  .map(([path, raw]) => parseMarkdown(raw, slugFromPath(path)))
  .map((entry) => ({
    slug: entry.slug,
    name: asString(entry.meta.name),
    role: asString(entry.meta.role),
    group: asString(entry.meta.group),
    dates: asString(entry.meta.dates),
    sortOrder: Number(entry.meta.sortOrder) || 1000,
    image: getImage(asString(entry.meta.image)),
    project: asString(entry.meta.project),
    tags: asArray(entry.meta.tags),
    currentPosition: asString(entry.meta.currentPosition),
    featured: asBoolean(entry.meta.featured),
    body: entry.body,
  }))
  .sort(comparePeople)

const projects: Project[] = Object.entries(projectModules)
  .map(([path, raw]) => parseMarkdown(raw, slugFromPath(path)))
  .map((entry) => ({
    slug: entry.slug,
    title: asString(entry.meta.title),
    summary: asString(entry.meta.summary),
    theme: asString(entry.meta.theme),
    image: getImage(asString(entry.meta.image)),
    methods: asArray(entry.meta.methods),
    funding: asArray(entry.meta.funding),
    people: asArray(entry.meta.people),
    papers: asArray(entry.meta.papers),
    featured: asBoolean(entry.meta.featured),
    body: entry.body,
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

const newsPosts: NewsPost[] = Object.entries(newsModules)
  .map(([path, raw]) => parseMarkdown(raw, slugFromPath(path)))
  .map((entry) => {
    const primaryImage = getImage(asString(entry.meta.image))
    const galleryImages = getImages(asArray(entry.meta.images))

    return {
      slug: entry.slug,
      date: asString(entry.meta.date),
      title: asString(entry.meta.title),
      category: asString(entry.meta.category),
      visibility: asString(entry.meta.visibility),
      image: primaryImage,
      images: galleryImages.length > 0 ? galleryImages : primaryImage ? [primaryImage] : [],
      link: asString(entry.meta.link),
      linkLabel: asString(entry.meta.linkLabel),
      secondaryLink: asString(entry.meta.secondaryLink),
      secondaryLinkLabel: asString(entry.meta.secondaryLinkLabel),
      body: entry.body,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

const opportunities: Opportunity[] = Object.entries(opportunityModules)
  .map(([path, raw]) => parseMarkdown(raw, slugFromPath(path)))
  .map((entry) => ({
    slug: entry.slug,
    title: asString(entry.meta.title),
    type: asString(entry.meta.type),
    deadline: asString(entry.meta.deadline),
    status: normalizeOpportunityStatus(asString(entry.meta.status)),
    summary: asString(entry.meta.summary),
    topics: asArray(entry.meta.topics),
    role: asString(entry.meta.role),
    peopleHeading: asString(entry.meta.peopleHeading),
    people: asArray(entry.meta.people),
    link: asString(entry.meta.link),
    linkLabel: asString(entry.meta.linkLabel),
    secondaryLink: asString(entry.meta.secondaryLink),
    secondaryLinkLabel: asString(entry.meta.secondaryLinkLabel),
    cta: asString(entry.meta.cta) || 'View details',
    body: entry.body,
  }))
  .sort((a, b) => (
    opportunityRank(a) - opportunityRank(b)
    || a.deadline.localeCompare(b.deadline)
    || a.title.localeCompare(b.title)
  ))

const publications = parseYamlList(publicationsRaw)
  .map((item) => ({
    title: asString(item.title),
    authors: asString(item.authors),
    year: Number(item.year) || 0,
    venue: asString(item.venue),
    themes: asArray(item.themes),
    selected: asBoolean(item.selected),
    doi: asString(item.doi),
    pdf: asString(item.pdf),
  }))
  .sort((a, b) => b.year - a.year) satisfies Publication[]

const funding = parseYamlList(fundingRaw).map((item) => ({
  id: asString(item.id),
  name: asString(item.name),
  detail: asString(item.detail),
  link: asString(item.link),
  linkLabel: asString(item.linkLabel),
})) satisfies NamedItem[]

const collaboratorLinkFields = [
  ['labWebsite', 'Lab website'],
  ['personalWebsite', 'Personal website'],
  ['googleScholar', 'Google Scholar'],
  ['linkedIn', 'LinkedIn'],
  ['orcid', 'ORCID'],
  ['institutionalProfile', 'Institutional profile'],
  ['facultyProfile', 'Faculty profile'],
  ['professionalProfile', 'Professional profile'],
  ['researchGate', 'ResearchGate'],
  ['scienceDirect', 'ScienceDirect'],
  ['profile', 'Profile'],
  ['openReview', 'OpenReview'],
] as const

const collaborators = parseYamlList(collaboratorsRaw).map((item) => ({
  name: asString(item.name),
  position: asString(item.position),
  affiliation: asString(item.affiliation),
  networkNote: asString(item.networkNote),
  location: asString(item.location),
  country: asString(item.country),
  latitude: Number(item.latitude),
  longitude: Number(item.longitude),
  researchAreas: asArray(item.researchAreas),
  links: collaboratorLinkFields
    .map(([key, label]) => ({ label, href: asString(item[key]) }))
    .filter((link) => link.href),
})).sort((a, b) => a.name.localeCompare(b.name)) satisfies Collaborator[]

const collaboratorMapLocations = Array.from(
  collaborators
    .filter((collaborator) => (
      collaborator.location
      && Number.isFinite(collaborator.latitude)
      && Number.isFinite(collaborator.longitude)
    ))
    .reduce((locations, collaborator) => {
      const key = collaborator.location
      const group = locations.get(key)

      if (group) {
        group.collaborators.push(collaborator)
        return locations
      }

      const projected = projectWorldPoint(collaborator.latitude, collaborator.longitude)
      locations.set(key, {
        location: collaborator.location,
        country: collaborator.country,
        latitude: collaborator.latitude,
        longitude: collaborator.longitude,
        x: projected.x,
        y: projected.y,
        collaborators: [collaborator],
      })

      return locations
    }, new Map<string, CollaboratorMapPoint>())
    .values(),
).sort((a, b) => a.location.localeCompare(b.location))

const collaboratorMapCountryCount = new Set(
  collaboratorMapLocations.map((point) => point.country).filter(Boolean),
).size

type AppProps = {
  initialPath?: string
  staticMode?: boolean
}

function App({ initialPath, staticMode = false }: AppProps) {
  const pathname = initialPath ?? (typeof window === 'undefined' ? '/' : window.location.pathname)
  const language = useMemo(
    () => getLanguageFromPath(pathname),
    [pathname],
  )
  const copy = siteCopy[language]
  const localizedSite = { ...site, ...copy }
  const tx = (value: string) => translate(language, value)
  const deploymentBase = import.meta.env.BASE_URL.replace(/\/$/, '')
  const sitePath = (route: string, targetLanguage: Language = language) => {
    const localizedPrefix = targetLanguage === 'zh-TW' ? '/zh-TW' : ''
    return `${deploymentBase}${localizedPrefix}${route}` || '/'
  }
  const languagePath = (targetLanguage: Language) => {
    const withoutBase = pathname.startsWith(deploymentBase) ? pathname.slice(deploymentBase.length) : pathname
    const withoutLanguage = withoutBase.replace(/^\/zh-TW(?=\/|$)/i, '') || '/'
    return sitePath(withoutLanguage, targetLanguage)
  }
  const newsLink = (href: string) => href.startsWith('#grant-') ? sitePath(`/grants/${href}`) : href
  const [researchFilter, setResearchFilter] = useState('All')
  const [publicationScope, setPublicationScope] = useState<'Selected' | 'All'>(staticMode ? 'All' : 'Selected')
  const [publicationFilter, setPublicationFilter] = useState('All')
  const [publicationQuery, setPublicationQuery] = useState('')
  const [publicationYear, setPublicationYear] = useState('All')
  const [collaboratorQuery, setCollaboratorQuery] = useState('')
  const [collaboratorCountry, setCollaboratorCountry] = useState('All')
  const [collaboratorArea, setCollaboratorArea] = useState('All')
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null)
  const [showProjectDetails, setShowProjectDetails] = useState(staticMode)
  const collaboratorMapElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    updateDocumentLanguage(language)
  }, [language])

  useEffect(() => {
    if (!window.location.hash) return
    const id = window.location.hash.slice(1)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, 0)
  }, [visitorStats])

  useEffect(() => {
    let active = true

    async function loadVisitorStats(): Promise<VisitorStats | null> {
      // Keep the last saved report available if the server refresh fails.
      for (const endpoint of ['visitor-stats.php', 'visitor-stats.json']) {
        try {
          const response = await fetch(`/analytics/${endpoint}?ts=${Date.now()}`, {
            cache: 'no-store',
            signal: AbortSignal.timeout(8000),
          })
          if (!response.ok) continue
          const data: VisitorStats = await response.json()
          if (data?.daily?.length) return data
        } catch {
          // Try the saved JSON report after an error or timeout.
        }
      }
      return null
    }

    loadVisitorStats()
      .then((data: VisitorStats | null) => {
        if (active && data?.daily?.length) {
          setVisitorStats(data)
        }
      })
      .catch(() => {
        if (active) setVisitorStats(null)
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const element = collaboratorMapElementRef.current
    if (element) return startCollaboratorMap(element, collaboratorMapLocations)
  }, [language])

  const researchThemes = useMemo(() => ['All', ...new Set(projects.map((project) => project.theme))], [])
  const selectedPublications = useMemo(() => publications.filter((publication) => publication.selected), [])
  const publicationPool = publicationScope === 'Selected' ? selectedPublications : publications
  const publicationThemes = useMemo(
    () => ['All', ...new Set(publicationPool.flatMap((publication) => publication.themes))],
    [publicationPool],
  )
  const publicationYears = useMemo(
    () => ['All', ...new Set(publicationPool.map((publication) => String(publication.year)).filter((year) => year !== '0'))],
    [publicationPool],
  )
  const collaboratorCountries = useMemo(
    () => ['All', ...Array.from(new Set(collaborators.map((collaborator) => collaborator.country).filter(Boolean))).sort()],
    [],
  )
  const collaboratorAreas = useMemo(
    () => ['All', ...Array.from(new Set(collaborators.flatMap((collaborator) => collaborator.researchAreas))).sort()],
    [],
  )

  const filteredProjects = projects.filter(
    (project) => researchFilter === 'All' || project.theme === researchFilter,
  )

  const publicationSearchQuery = normalizeSearchText(publicationQuery)
  const filteredPublications = publicationPool.filter((publication) => (
    (publicationFilter === 'All' || publication.themes.includes(publicationFilter))
    && (publicationYear === 'All' || String(publication.year) === publicationYear)
    && matchesSearchQuery([
      publication.title,
      publication.authors,
      publication.venue,
      String(publication.year),
      publication.doi ?? '',
      publication.pdf ?? '',
      ...publication.themes,
    ], publicationSearchQuery)
  ))

  const collaboratorSearchQuery = normalizeSearchText(collaboratorQuery)
  const filteredCollaborators = collaborators.filter((collaborator) => (
    (collaboratorCountry === 'All' || collaborator.country === collaboratorCountry)
    && (collaboratorArea === 'All' || collaborator.researchAreas.includes(collaboratorArea))
    && matchesSearchQuery([
      collaborator.name,
      collaborator.position,
      collaborator.affiliation,
      collaborator.networkNote ?? '',
      collaborator.location,
      collaborator.country,
      ...collaborator.researchAreas,
    ], collaboratorSearchQuery)
  ))

  function updatePublicationScope(scope: 'Selected' | 'All') {
    setPublicationScope(scope)
    setPublicationFilter('All')
    setPublicationYear('All')
  }

  const groupedPeople = ['Principal Investigator', 'Current Graduate Students', 'Undergraduate Researchers', 'Alumni', 'Former Members']
    .map((group) => ({ group, members: people.filter((person) => person.group === group) }))
    .filter((section) => section.members.length > 0)

  const highlightedNews = newsPosts.filter((post) => post.visibility !== 'archive')
  const latestNews = staticMode ? highlightedNews : highlightedNews.slice(0, 4)
  const archivedNews = newsPosts.filter((post) => post.visibility === 'archive')
  const archivedNewsByYear = Array.from(
    archivedNews.reduce((years, post) => {
      const year = post.date.slice(0, 4) || 'Archive'
      const posts = years.get(year) ?? []
      posts.push(post)
      years.set(year, posts)
      return years
    }, new Map<string, NewsPost[]>()).entries(),
  ).sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
  const activeOpportunities = opportunities.filter((opportunity) => opportunityRank(opportunity) < 2)
  const recentVisitorDays = visitorStats?.daily.slice(-14) ?? []
  const maxDailyPageviews = Math.max(1, ...recentVisitorDays.map((day) => day.pageviews))
  const visibleSecondaryNavItems = secondaryNavItems

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{tx('Skip to content')}</a>
      <header className="topbar">
        <a className="brand" href={sitePath('/')} aria-label={`${localizedSite.shortName} ${tx('Home')}`}>
          <img className="brand-logo" src={m3LogoImage} alt="" decoding="async" />
          <span>
            <strong>{localizedSite.name}</strong>
            <small>{localizedSite.university}</small>
          </span>
        </a>
        <div className="topbar-links" aria-label={copy.profileLinksAria}>
          <div className="language-switch" aria-label={copy.languageAria}>
            {(['en', 'zh-TW'] as const).map((option) => (
              <a
                aria-current={language === option ? 'true' : undefined}
                className={language === option ? 'active' : ''}
                href={languagePath(option)}
                key={option}
                onClick={(event) => {
                  event.preventDefault()
                  window.location.href = languagePath(option)
                }}
              >
                {languageLabels[option]}
              </a>
            ))}
          </div>
          <a className="topbar-link" href={site.scholar} target="_blank" rel="noreferrer">
            <Atom size={16} aria-hidden="true" />
            {tx('Scholar')}
          </a>
          <a className="topbar-link secondary-profile-link" href={site.linkedin} target="_blank" rel="noreferrer">
            <ExternalLink size={16} aria-hidden="true" />
            {tx('LinkedIn')}
          </a>
          <a className="topbar-link secondary-profile-link" href={site.youtube} target="_blank" rel="noreferrer">
            <Play size={16} aria-hidden="true" />
            {tx('YouTube')}
          </a>
          <a className="topbar-link email-pill" href={`mailto:${site.email}`}>
            <Mail size={16} aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </header>

      <nav className="site-nav" aria-label={copy.mainNavigationAria}>
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="main-navigation-links"
        >
          <Menu className="menu-icon" size={18} aria-hidden="true" />
          <X className="close-icon" size={18} aria-hidden="true" />
          <span>{tx('Menu')}</span>
        </button>
        <div className="site-nav-links" id="main-navigation-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href.startsWith('#') ? item.href : sitePath(item.href)}
              aria-current={pathname === sitePath(item.href) ? 'page' : undefined}
            >
              {tx(item.label)}
            </a>
          ))}
          <details className="nav-more">
            <summary className="nav-more-button">{tx('More')}</summary>
            <div id="secondary-navigation-links">
              {visibleSecondaryNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href.startsWith('#') ? item.href : sitePath(item.href)}
                  aria-current={pathname === sitePath(item.href) ? 'page' : undefined}
                >
                  {tx(item.label)}
                </a>
              ))}
            </div>
          </details>
        </div>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <section className="hero-section" id="home">
          <img src={heroImage} alt="" className="hero-bg" decoding="async" fetchPriority="high" />
          <div className="hero-copy">
            <p className="eyebrow">{tx('San Diego State University / Mechanical Engineering')}</p>
            <h1>{localizedSite.name}</h1>
            <p>
              {tx('We combine simulation, microstructure characterization, and field-assisted processing to understand and design materials from atoms to engineered structures.')}
            </p>
            <div className="button-row">
              <a className="button primary" href={sitePath('/research/')}>
                {tx('Research')}
                <ChevronRight size={18} aria-hidden="true" />
              </a>
              <a className="button light" href={sitePath('/join/')}>
                {tx('Join Us')}
                <BriefcaseBusiness size={18} aria-hidden="true" />
              </a>
              <a className="button light" href={sitePath('/publications/')}>
                {tx('Publications')}
                <FileText size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          {latestNews.length > 0 && (
            <aside className="hero-panel" aria-label={copy.heroNewsAria}>
              <p className="panel-label">{tx('Latest news')}</p>
              {latestNews.slice(0, 2).map((post) => (
                <a key={post.slug} href={sitePath(`/news/${post.slug}/`)}>
                  <span>{tx(post.category)}</span>
                  <strong>{tx(post.title)}</strong>
                  <small>{formatDate(post.date, language)}</small>
                </a>
              ))}
            </aside>
          )}
        </section>

        <section className="metric-strip" aria-label={copy.labSnapshotAria}>
          <div>
            <strong>{projects.length}</strong>
            <span>{tx('active research themes')}</span>
          </div>
          <div>
            <strong>{people.length}</strong>
            <span>{tx('current members and alumni listed')}</span>
          </div>
          <div>
            <strong>{selectedPublications.length}</strong>
            <span>{tx('featured publications highlighted')}</span>
          </div>
          <div>
            <strong>{funding.length}</strong>
            <span>{tx('grants and sponsored projects listed')}</span>
          </div>
        </section>

        <section className="section intro-section">
          <div className="section-heading">
            <p className="eyebrow">{tx('Lab mission')}</p>
            <h2>{tx('Materials questions, modeled and tested across scales.')}</h2>
          </div>
          <article className="intro-story">
            <img
              src={missionImage}
              alt="Materials modeling workflow from atoms to microstructure and properties"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3>{tx('Computational materials science with experimental anchors.')}</h3>
              <p>
                {tx('The M3 Lab studies nanoscale and microstructure mechanisms in metals, ceramics, composites, and field-assisted processing. We connect computational models with experimental evidence to understand how processing changes material structure and properties.')}
              </p>
              <div className="story-links">
                <a href={site.scholar} target="_blank" rel="noreferrer">
                  {tx('Google Scholar')}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
                <a href="https://mechanical.sdsu.edu/" target="_blank" rel="noreferrer">
                  {tx('SDSU Mechanical Engineering')}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </section>

        <section className="section question-section">
          <div className="section-heading">
            <p className="eyebrow">{tx('Big questions')}</p>
            <h2>{tx('Our scientific questions.')}</h2>
          </div>
          <div className="question-grid">
            {researchQuestions.map((question) => (
              <article key={question}>
                <Search size={20} aria-hidden="true" />
                <p>{tx(question)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section research-section" id="research">
          <div className="section-heading wide">
            <p className="eyebrow">{tx('Research')}</p>
            <h2>{tx('Research projects.')}</h2>
            <p>
              {tx('Current projects connect atomistic simulation, microstructure characterization, field-assisted processing, and data-driven materials design.')}
            </p>
          </div>
          <div className="filter-row" aria-label={copy.researchFilterAria}>
            {researchThemes.map((theme) => (
              <button
                aria-pressed={researchFilter === theme}
                className={researchFilter === theme ? 'active' : ''}
                key={theme}
                type="button"
                onClick={() => setResearchFilter(theme)}
              >
                {tx(theme)}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.slug}>
                {project.image && <img src={project.image} alt="" loading="lazy" decoding="async" />}
                <div className="project-copy">
                  <span className="tag">{tx(project.theme)}</span>
                  <h3>{tx(project.title)}</h3>
                  <p className="summary">{tx(project.summary)}</p>
                  <p>{tx(project.body)}</p>
                  <div className="mini-list">
                    <strong>{tx('Methods')}</strong>
                    <div>{project.methods.map((method) => <span key={method}>{tx(method)}</span>)}</div>
                  </div>
                  <a
                    className="project-detail-link"
                    href={sitePath(`/research/${project.slug}/`)}
                  >
                    {tx('View project details')}
                    <ChevronRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          {filteredProjects.length > 0 && (
            <div className="project-detail-section" aria-labelledby="project-detail-title">
              <div className="section-heading wide compact project-detail-heading">
                <p className="eyebrow">{tx('Project details')}</p>
                <h2 id="project-detail-title">{tx('Detailed research directions.')}</h2>
                <p>{tx('Each project summary below expands the overview cards with research focus and methods for readers who want more context.')}</p>
                <button
                  className="button detail-toggle"
                  type="button"
                  aria-expanded={showProjectDetails}
                  aria-controls="project-detail-grid"
                  onClick={() => setShowProjectDetails((open) => !open)}
                >
                  {showProjectDetails ? tx('Hide details') : tx('Show details')}
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
              {showProjectDetails && (
                <div className="project-detail-grid" id="project-detail-grid">
                  {filteredProjects.map((project) => (
                    <article className="project-detail-card" id={`project-${project.slug}`} key={project.slug}>
                      <div className="project-detail-card-heading">
                        <span className="tag">{tx(project.theme)}</span>
                        <h3>{tx(project.title)}</h3>
                        <p>{tx(project.summary)}</p>
                      </div>
                      <div className="project-detail-body">
                        <section>
                          <h4>{tx('Research focus')}</h4>
                          <p>{tx(project.body)}</p>
                        </section>
                        <section>
                          <h4>{tx('Methods')}</h4>
                          <div className="inline-tags">
                            {project.methods.map((method) => <span key={method}>{tx(method)}</span>)}
                          </div>
                        </section>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {publications.length > 0 && (
          <section className="section publication-section" id="publications">
            <div className="section-heading wide">
              <p className="eyebrow">{tx('Publications')}</p>
              <h2>{publicationScope === 'Selected' ? copy.featuredPublicationsHeading : copy.allPublicationsHeading}</h2>
              <p>
                {publicationScope === 'Selected'
                  ? copy.selectedPublicationSummary(selectedPublications.length)
                  : copy.allPublicationSummary(publications.length)}
              </p>
            </div>
            <div className="filter-row scope-row" aria-label={copy.publicationScopeAria}>
              {(['Selected', 'All'] as const).map((scope) => (
                <button
                  aria-pressed={publicationScope === scope}
                  className={publicationScope === scope ? 'active' : ''}
                  key={scope}
                  type="button"
                  onClick={() => updatePublicationScope(scope)}
                >
                  {scope === 'Selected' ? tx('Featured') : tx('All papers')}
                </button>
              ))}
            </div>
            <div className="filter-row" aria-label={copy.publicationFilterAria}>
              {publicationThemes.map((theme) => (
                <button
                  aria-pressed={publicationFilter === theme}
                  className={publicationFilter === theme ? 'active' : ''}
                  key={theme}
                  type="button"
                  onClick={() => setPublicationFilter(theme)}
                >
                  {tx(theme)}
                </button>
              ))}
            </div>
            <div className="search-filter-bar" aria-label={tx('Publication search controls')}>
              <label className="search-field">
                <Search size={18} aria-hidden="true" />
                <span>{tx('Search publications')}</span>
                <input
                  type="search"
                  value={publicationQuery}
                  onChange={(event) => setPublicationQuery(event.target.value)}
                  placeholder={tx('Title, author, venue, keyword')}
                />
              </label>
              <label className="select-field">
                <span>{tx('Year')}</span>
                <select value={publicationYear} onChange={(event) => setPublicationYear(event.target.value)}>
                  {publicationYears.map((year) => (
                    <option key={year} value={year}>{year === 'All' ? tx('All years') : year}</option>
                  ))}
                </select>
              </label>
            </div>
            <p className="result-summary">
              {tx('Showing')} {filteredPublications.length} {tx('of')} {publicationPool.length} {tx('publications')}
            </p>
            <div className="publication-layout">
              <div className="publication-list">
                {filteredPublications.length > 0 ? filteredPublications.map((publication) => (
                  <article key={publication.title}>
                    <span>{publication.year}</span>
                    <div>
                      <h3>{publication.title}</h3>
                      <p>{publication.authors}. {publication.venue}.</p>
                      <div className="inline-tags">
                        {publication.themes.map((theme) => <span key={theme}>{tx(theme)}</span>)}
                      </div>
                      <div className="paper-links">
                        {publication.doi && <a href={publication.doi}>{tx('DOI')}</a>}
                        {publication.pdf && <a href={publication.pdf}>{tx('PDF')}</a>}
                        <a href={site.scholar} target="_blank" rel="noreferrer">{tx('Google Scholar')}</a>
                      </div>
                    </div>
                  </article>
                )) : (
                  <article className="empty-results">
                    <span>{tx('No results')}</span>
                    <div>
                      <h3>{tx('No publications match these filters.')}</h3>
                      <p>{tx('Try another year, theme, or search term.')}</p>
                    </div>
                  </article>
                )}
              </div>
            </div>
          </section>
        )}

        {funding.length > 0 && (
          <section className="section grant-section" id="grants">
            <div className="section-heading wide">
              <p className="eyebrow">{tx('Grants')}</p>
              <h2>{tx('Sponsored projects supporting M3 Lab research.')}</h2>
              <p>{tx('Current and recent awards supporting materials modeling, processing, characterization, and education innovation.')}</p>
            </div>
            <div className="grant-grid">
              {funding.map((item) => (
                <article className="grant-card" id={item.id ? `grant-${item.id}` : undefined} key={item.name}>
                  <Handshake size={24} aria-hidden="true" />
                  <div>
                    <h3>{tx(item.name)}</h3>
                    <p>{tx(item.detail)}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        {item.linkLabel ? tx(item.linkLabel) : tx('External record')}
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {groupedPeople.length > 0 && (
          <section className="section people-section" id="people">
            <div className="section-heading wide">
              <p className="eyebrow">{tx('People')}</p>
              <h2>{tx('PI, graduate students, undergraduate researchers, and alumni.')}</h2>
              <p>
                {tx('The M3 Lab brings together graduate students, undergraduate researchers, alumni, and collaborators working across modeling, processing, and characterization.')}
              </p>
            </div>
            <div className="people-groups">
              {groupedPeople.map((section) => (
                <section key={section.group} className="people-group" aria-labelledby={`${section.group}-title`}>
                  <h3 id={`${section.group}-title`}>{tx(section.group)}</h3>
                  <div className="person-grid">
                    {section.members.map((person) => (
                      <article className="person-card" key={person.slug}>
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={`${person.name}, ${person.role}`}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="avatar" aria-hidden="true">{initials(person.name)}</div>
                        )}
                        <div>
                          <span className="tag">{tx(person.role)}</span>
                          <h4>{person.name}</h4>
                          <p className="dates">{person.dates}</p>
                          {person.project && <p><strong>{tx('Project:')}</strong> {tx(person.project)}</p>}
                          {person.currentPosition && <p><strong>{tx('Current position:')}</strong> {tx(person.currentPosition)}</p>}
                          <p>{tx(person.body)}</p>
                          <div className="inline-tags">
                            {person.tags.map((tag) => <span key={tag}>{tx(tag)}</span>)}
                          </div>
                          {person.slug === 'wenwu-xu' && <LifeJourney language={language} />}
                          {person.slug === 'wenwu-xu' && <ConferenceJourney language={language} compact={!/\/people\/?$/.test(pathname)} />}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        )}

        {latestNews.length > 0 && (
          <section className="section news-section" id="news">
            <div className="section-heading">
              <p className="eyebrow">{tx('News')}</p>
              <h2>{tx('Lab news.')}</h2>
            </div>
            <div className="news-grid">
              {latestNews.map((post) => (
                <article className="news-card" id={`news-${post.slug}`} key={post.slug}>
                  {post.images.length > 0 && (
                    <div className={`news-card-media${post.images.length > 1 ? ' is-gallery' : ''}`}>
                      {post.images.map((image, index) => (
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          key={`${post.slug}-image-${index}`}
                        />
                      ))}
                    </div>
                  )}
                  <div>
                    <span>{tx(post.category)}</span>
                    <h3><a href={sitePath(`/news/${post.slug}/`)}>{tx(post.title)}</a></h3>
                    <p className="date"><CalendarDays size={15} aria-hidden="true" />{formatDate(post.date, language)}</p>
                    <p>{tx(post.body)}</p>
                    {post.link && (
                      <a href={newsLink(post.link)} target={post.link.startsWith('http') ? '_blank' : undefined} rel={post.link.startsWith('http') ? 'noreferrer' : undefined}>
                        {tx(post.linkLabel || 'Read more')}
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    )}
                    {post.secondaryLink && (
                      <div>
                        <a href={post.secondaryLink} target={post.secondaryLink.startsWith('http') ? '_blank' : undefined} rel={post.secondaryLink.startsWith('http') ? 'noreferrer' : undefined}>
                          {tx(post.secondaryLinkLabel || 'Additional details')}
                          <ExternalLink size={15} aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
            {archivedNewsByYear.length > 0 && (
              <div className="news-archive" aria-labelledby="news-archive-title">
                <div className="news-archive-heading">
                  <FileText size={22} aria-hidden="true" />
                  <div>
                    <p className="eyebrow">{tx('News Archive')}</p>
                    <h3 id="news-archive-title">{tx('Documentation records by year.')}</h3>
                  </div>
                </div>
                <div className="news-archive-years">
                  {archivedNewsByYear.map(([year, posts]) => (
                    <section className="news-archive-year" key={year} aria-labelledby={`news-archive-${year}`}>
                      <h4 id={`news-archive-${year}`}>{year}</h4>
                      <div>
                        {posts.map((post) => (
                          <article className="news-archive-item" id={`news-${post.slug}`} key={post.slug}>
                            <span>{tx(post.category)}</span>
                            <div>
                              <h5><a href={sitePath(`/news/${post.slug}/`)}>{tx(post.title)}</a></h5>
                              <p className="date"><CalendarDays size={15} aria-hidden="true" />{formatDate(post.date, language)}</p>
                              <p>{tx(post.body)}</p>
                              {post.link && (
                                <a href={newsLink(post.link)} target={post.link.startsWith('http') ? '_blank' : undefined} rel={post.link.startsWith('http') ? 'noreferrer' : undefined}>
                                  {tx(post.linkLabel || 'Read more')}
                                  <ExternalLink size={15} aria-hidden="true" />
                                </a>
                              )}
                              {post.secondaryLink && (
                                <div>
                                  <a href={post.secondaryLink} target={post.secondaryLink.startsWith('http') ? '_blank' : undefined} rel={post.secondaryLink.startsWith('http') ? 'noreferrer' : undefined}>
                                    {tx(post.secondaryLinkLabel || 'Additional details')}
                                    <ExternalLink size={15} aria-hidden="true" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <section className="section opportunity-section" id="opportunities" aria-labelledby="opportunities-title">
          <div className="section-heading wide">
            <p className="eyebrow">{tx('Opportunities')}</p>
            <h2 id="opportunities-title">{tx('Academic calls and professional opportunities.')}</h2>
            <p>
              {tx('Current and archived faculty positions, conference symposia, journal collections, special issues, calls for papers, calls for abstracts, and professional service opportunities.')}
            </p>
          </div>
          <article className="opportunity-card opportunity-finder" aria-labelledby="dow-finder-title">
            <div>
              <p className="eyebrow">{tx('For students and faculty')}</p>
              <h3 id="dow-finder-title">DoW Opportunity Finder</h3>
              <p>{tx('Find funded defense-related internships, scholarships, fellowships, and research opportunities, with AI-assisted matching.')}</p>
            </div>
            <div className="opportunity-finder-actions">
              <a className="button primary" href="https://hsrufinder.pages.dev/" target="_blank" rel="noopener noreferrer">
                {tx('Open opportunity finder')}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
          {activeOpportunities.length === 0 && (
            <article className="opportunity-empty">
              <CalendarDays size={24} aria-hidden="true" />
              <div>
                <h3>{tx('No active calls are listed right now.')}</h3>
                <p>{tx('Archived professional-service records remain visible below when available.')}</p>
              </div>
            </article>
          )}
          {opportunities.length > 0 && (
            <div className="opportunity-grid">
              {opportunities.map((opportunity) => {
                const deadlineDays = daysUntil(opportunity.deadline)
                const isArchived = opportunity.status === 'Archived' || deadlineDays < 0
                const isUpcoming = !isArchived && deadlineDays <= 60
                return (
                  <article
                    className={`opportunity-card${isUpcoming ? ' is-upcoming' : ''}${isArchived ? ' is-archived' : ''}`}
                    key={opportunity.slug}
                  >
                    <div className="opportunity-card-header">
                      <span className="opportunity-type">{tx(opportunity.type)}</span>
                      <span className={`deadline-pill${isUpcoming ? ' urgent' : ''}`}>
                        <CalendarDays size={15} aria-hidden="true" />
                        {isArchived ? tx('Deadline passed') : opportunity.deadline ? copy.deadline(formatDate(opportunity.deadline, language)) : tx('Open until filled')}
                      </span>
                    </div>
                    <div className="opportunity-status-row">
                      <span>{isArchived ? tx('Archived') : tx(opportunity.status)}</span>
                      {isUpcoming && <strong>{tx('Upcoming deadline')}</strong>}
                    </div>
                    <h3>{tx(opportunity.title)}</h3>
                    <p className="opportunity-summary">{tx(opportunity.summary)}</p>
                    <p>{tx(opportunity.body)}</p>
                    {opportunity.role && <p className="opportunity-role"><strong>{tx('Role:')}</strong> {tx(opportunity.role)}</p>}
                    {opportunity.people.length > 0 && (
                      <div className="opportunity-people">
                        <strong>{opportunity.peopleHeading ? tx(opportunity.peopleHeading) : tx('Organizers')}</strong>
                        <ul>
                          {opportunity.people.map((person) => {
                            const [name, affiliation] = person.split('|').map((part) => part.trim())
                            return (
                              <li key={person}>
                                <span>{name}</span>
                                {affiliation && <small>{affiliation}</small>}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                    {opportunity.topics.length > 0 && (
                      <div className="inline-tags opportunity-tags" aria-label={`${tx(opportunity.title)} ${copy.topicsSuffix}`}>
                        {opportunity.topics.map((topic) => <span key={topic}>{tx(topic)}</span>)}
                      </div>
                    )}
                    <div className="opportunity-actions">
                      {opportunity.link && (
                        <a className="button primary" href={opportunity.link} target="_blank" rel="noreferrer">
                          {tx(opportunity.cta)}
                          <Send size={16} aria-hidden="true" />
                        </a>
                      )}
                      {opportunity.secondaryLink && (
                        <a className="secondary-action" href={opportunity.secondaryLink} target="_blank" rel="noreferrer">
                          {opportunity.secondaryLinkLabel ? tx(opportunity.secondaryLinkLabel) : tx('Additional details')}
                          <ExternalLink size={15} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <section className="section join-section" id="join">
          <div className="section-heading wide">
            <p className="eyebrow">{tx('Join Us')}</p>
            <h2>{tx('Join the M3 Lab.')}</h2>
            <p>
              {tx('The lab welcomes prospective graduate, undergraduate, visiting, and collaborator inquiries that connect clearly to M3 Lab research.')}
            </p>
          </div>
          <div className="join-grid">
            {joinTracks.map((track) => (
              <article key={track.title}>
                <BriefcaseBusiness size={22} aria-hidden="true" />
                <h3>{tx(track.title)}</h3>
                <p>{tx(track.body)}</p>
                <ul>
                  {track.skills.map((skill) => <li key={skill}>{tx(skill)}</li>)}
                </ul>
                {'links' in track && track.links && (
                  <div className="join-links">
                    {track.links.map((link) => (
                      <a className="join-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                        {tx(link.label)}
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          <section className="email-checklist" aria-labelledby="email-checklist-title">
            <h3 id="email-checklist-title">{tx('What to include in your email')}</h3>
            <ul>
              <li><CheckCircle2 size={18} aria-hidden="true" />{tx('Brief research interests and target program')}</li>
              <li><CheckCircle2 size={18} aria-hidden="true" />{tx('Relevant coursework, skills, or project experience')}</li>
              <li><CheckCircle2 size={18} aria-hidden="true" />{tx('CV or resume, transcript if available, and expected start term')}</li>
              <li><CheckCircle2 size={18} aria-hidden="true" />{tx('One or two M3 Lab projects that genuinely interest you')}</li>
            </ul>
            <a className="button primary" href={`mailto:${site.email}`}>{tx('Email')} {site.email}</a>
          </section>
        </section>

        <section className="section teaching-section" id="teaching">
          <div className="teaching-panel">
            <GraduationCap size={28} aria-hidden="true" />
            <p className="eyebrow">{tx('Teaching')}</p>
            <h2>{tx('Materials courses and student training.')}</h2>
            <ul>
              {teachingItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="teaching-resource-list" aria-label={tx('Featured teaching resources')}>
              {teachingResources.map((resource) => (
                <article className="teaching-resource-card" key={resource.title}>
                  <span>{tx(resource.course)} · {tx(resource.label)}</span>
                  <h3>{tx(resource.title)}</h3>
                  <p>{tx(resource.body)}</p>
                  <div className="inline-tags teaching-resource-tags">
                    {resource.meta.map((item) => <span key={item}>{tx(item)}</span>)}
                  </div>
                  <a href={resource.href} target="_blank" rel="noreferrer">
                    {tx(resource.linkLabel ?? 'Open ACT-CMS Module')}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
          <article className="teaching-innovation">
            <div className="innovation-copy">
              <BookOpen size={28} aria-hidden="true" />
              <p className="eyebrow">{tx('Teaching Innovation')}</p>
              <h2>{tx('CrystalCraft: VR/AR materials learning.')}</h2>
              <p>
                {tx('CrystalCraft is an open-source virtual reality application for building atomic models and learning crystal structures at the molecular level. The project turns materials visualization into a calm, creative learning environment developed through an interdisciplinary SDSU student-faculty collaboration.')}
              </p>
              <ul>
                {crystalCraftFeatures.map((feature) => <li key={feature}>{tx(feature)}</li>)}
              </ul>
              <div className="crystalcraft-links">
                {crystalCraftLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    <img src={link.image} alt="" loading="lazy" decoding="async" />
                    {tx(link.label)}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="crystalcraft-video">
              <video controls preload="metadata" poster={crystalCraftDemoImage}>
                <source src={`${import.meta.env.BASE_URL}crystalcraft/vrvid.mp4`} type="video/mp4" />
                {tx('Your browser does not support HTML5 video.')}
              </video>
              <p>{tx('Early footage from the user perspective in the CrystalCraft VR environment.')}</p>
            </div>
            <div className="crystalcraft-gallery" aria-label={tx('CrystalCraft image gallery')}>
              {crystalCraftGallery.map((item) => (
                <figure key={item.title}>
                  <img src={item.image} alt={tx(item.title)} loading="lazy" decoding="async" />
                  <figcaption>{tx(item.title)}</figcaption>
                </figure>
              ))}
            </div>
            <div className="crystalcraft-team">
              <img
                src={crystalCraftTeamImage}
                alt="CrystalCraft student and faculty project team"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{tx('Interdisciplinary SDSU project team')}</h3>
                <p>
                  {tx('CrystalCraft was created through collaboration across software engineering, game design, mechanical engineering, materials science, 3D modeling, and faculty advising.')}
                </p>
                <div className="crystalcraft-team-grid">
                  {crystalCraftTeam.map((member) => (
                    <article key={member.name}>
                      <img src={member.image} alt={member.name} loading="lazy" decoding="async" />
                      <div>
                        <strong>{member.name}</strong>
                        <span>{tx(member.role)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>

        {collaborators.length > 0 && (
          <section className="section partner-section" id="collaborators">
            <div className="section-heading wide">
              <p className="eyebrow">{tx('Collaborators')}</p>
              <h2>{tx('Collaborators and Professional Network - Past and Present.')}</h2>
              <p>
                {tx('Meet collaborators, co-authors, advisors, and professional colleagues connected through research, teaching, scientific symposia, committees, and workshops across universities, national laboratories, industry, and research organizations.')}
              </p>
            </div>
            {collaboratorMapLocations.length > 0 && (
              <div className="collaborator-map-panel" aria-labelledby="collaborator-map-title">
                <div className="collaborator-map-header">
                  <div>
                    <h3 id="collaborator-map-title">
                      <Globe2 size={24} aria-hidden="true" />
                      {tx('Global collaboration map')}
                    </h3>
                    <p>
                      {tx('Interactive OpenStreetMap view of institutional locations for current and past collaborators, co-authors, advisors, and professional network colleagues. Zoom, pan, and select markers for names.')}
                    </p>
                  </div>
                  <div className="collaborator-map-metrics" aria-label={tx('Collaboration map summary')}>
                    <span>
                      <strong>{collaborators.length}</strong>
                      {tx('people')}
                    </span>
                    <span>
                      <strong>{collaboratorMapLocations.length}</strong>
                      {tx('locations')}
                    </span>
                    <span>
                      <strong>{collaboratorMapCountryCount}</strong>
                      {tx('countries')}
                    </span>
                  </div>
                </div>
                <div className="collaborator-map-shell collaborator-real-map-shell">
                  <div
                    className="collaborator-leaflet-map"
                    ref={collaboratorMapElementRef}
                    data-locations={staticMode ? JSON.stringify(collaboratorMapLocations.map(({ location, country, latitude, longitude, collaborators }) => ({ location, country, latitude, longitude, collaborators: collaborators.map(({ name }) => ({ name })) }))) : undefined}
                    data-loading-message={tx('Loading collaboration map…')}
                    data-error-message={tx('The map could not load. Please use the location list below.')}
                    role="application"
                    aria-label={tx('Interactive world map with collaborator location markers')}
                  />
                </div>
                <p className="collaborator-map-note">
                  {tx('Map data and tiles by OpenStreetMap contributors. Use the plus and minus controls to zoom; drag to pan.')}
                  {' '}
                  <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noreferrer">
                    {tx('Report a map issue')}
                  </a>
                </p>
                <div className="collaborator-location-list" role="region" tabIndex={0} aria-label={tx('Collaborator locations')}>
                  {collaboratorMapLocations.map((point) => (
                    <div className="collaborator-location-item" key={point.location}>
                      <MapPin size={16} aria-hidden="true" />
                      <div>
                        <strong>{point.location}</strong>
                        <span>
                          {point.collaborators.map((collaborator) => collaborator.name).join(', ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="search-filter-bar collaborator-search-controls" aria-label={tx('Collaborator search controls')}>
              <label className="search-field">
                <Search size={18} aria-hidden="true" />
                <span>{tx('Search collaborators')}</span>
                <input
                  type="search"
                  value={collaboratorQuery}
                  onChange={(event) => setCollaboratorQuery(event.target.value)}
                  placeholder={tx('Name, institution, city, topic')}
                />
              </label>
              <label className="select-field">
                <span>{tx('Country')}</span>
                <select value={collaboratorCountry} onChange={(event) => setCollaboratorCountry(event.target.value)}>
                  {collaboratorCountries.map((country) => (
                    <option key={country} value={country}>{country === 'All' ? tx('All countries') : tx(country)}</option>
                  ))}
                </select>
              </label>
              <label className="select-field">
                <span>{tx('Research area')}</span>
                <select value={collaboratorArea} onChange={(event) => setCollaboratorArea(event.target.value)}>
                  {collaboratorAreas.map((area) => (
                    <option key={area} value={area}>{area === 'All' ? tx('All areas') : tx(area)}</option>
                  ))}
                </select>
              </label>
            </div>
            <p className="result-summary">
              {tx('Showing')} {filteredCollaborators.length} {tx('of')} {collaborators.length} {tx('collaborators')}
            </p>
            <div className="partner-layout">
              <div>
                {filteredCollaborators.length > 0 ? filteredCollaborators.map((collaborator) => (
                  <article className="collaborator-card" key={collaborator.name}>
                    <h3>
                      <Handshake size={22} aria-hidden="true" />
                      {collaborator.name}
                    </h3>
                    <p className="collaborator-position">{collaborator.position}</p>
                    <p>{collaborator.affiliation}</p>
                    {collaborator.networkNote && (
                      <p className="collaborator-network-note">
                        <strong>{tx('Network note')}:</strong> {tx(collaborator.networkNote)}
                      </p>
                    )}
                    <div className="inline-tags collaborator-tags">
                      {collaborator.researchAreas.map((area) => <span key={area}>{tx(area)}</span>)}
                    </div>
                    <div className="collaborator-links">
                      {collaborator.links.map((link) => (
                        <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                          {link.label}
                          <ExternalLink size={15} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </article>
                )) : (
                  <article className="collaborator-card empty-results">
                    <h3>
                      <Handshake size={22} aria-hidden="true" />
                      {tx('No collaborators match these filters.')}
                    </h3>
                    <p>{tx('Try another country, research area, or search term.')}</p>
                  </article>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="section resource-section" id="resources">
          <div className="section-heading wide">
            <p className="eyebrow">{tx('Resources')}</p>
            <h2>{tx('Experimental and computing resources.')}</h2>
            <p>
              {tx('Shared infrastructure supporting M3 Lab experiments, simulations, data analysis, and computational materials research.')}
            </p>
          </div>
          <div className="resource-layout">
            <section className="resource-block" aria-labelledby="experimental-resources-title">
              <div className="resource-block-heading">
                <Atom size={24} aria-hidden="true" />
                <div>
                  <h3 id="experimental-resources-title">{tx('Experimental Resources')}</h3>
                  <p>
                    {tx('Customized and lab-developed experimental platforms supporting Xu group studies of field-assisted processing, in-situ microscopy, thermal-mechanical coupling, and rapid high-temperature testing.')}
                  </p>
                </div>
              </div>
              <div className="experimental-resource-grid">
                {experimentalResources.map((resource) => (
                  <article className="experimental-resource-card" key={resource.id}>
                    <figure>
                      <img
                        src={resource.image}
                        alt={resource.alt}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>{tx(resource.caption)}</figcaption>
                      <span>{tx(resource.imageStatus)}</span>
                    </figure>
                    <div>
                      <h4>{tx(resource.title)}</h4>
                      <p className="resource-tagline">{tx(resource.tagline)}</p>
                      <p>{tx(resource.description)}</p>
                      <ul>
                        {resource.features.map((feature) => <li key={feature}>{tx(feature)}</li>)}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section className="resource-block" aria-labelledby="computing-resources-title">
              <div className="resource-block-heading">
                <BarChart3 size={24} aria-hidden="true" />
                <div>
                  <h3 id="computing-resources-title">{tx('Computing Resources')}</h3>
                  <p>
                    {tx('The Xu Research Group uses high-performance computing resources at San Diego State University to support computational materials science, atomistic simulations, molecular dynamics, data analysis, and simulation-driven materials design.')}
                  </p>
                </div>
              </div>
              <div className="resource-list">
                {computingResources.map((resource) => (
                  <article key={resource.name}>
                    <h4>{tx(resource.name)}</h4>
                    <p>{tx(resource.body)}</p>
                    <a href={resource.link} target="_blank" rel="noreferrer">
                      {tx('Resource overview')}
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        {visitorStats && (
          <section className="section visitor-stats-section" id="visitor-stats">
            <div className="section-heading wide">
              <p className="eyebrow">{tx('Visitor Stats')}</p>
              <h2>{tx('Public website activity.')}</h2>
            </div>
            {visitorStats.cumulative?.first_date && (
              <article className="stats-cumulative" aria-label={tx('Cumulative pageviews')}>
                <div>
                  <span>{tx('Cumulative pageviews')}</span>
                  <strong>{formatNumber(historicalPageviewBaseline.pageviews + Math.max(0, visitorStats.cumulative.pageviews - historicalPageviewBaseline.recordedPageviews), language)}</strong>
                </div>
                <div>
                  <p>{tx('Since')}: <strong>{formatDate(historicalPageviewBaseline.firstDate, language)}</strong></p>
                </div>
              </article>
            )}
            {visitorStats.cumulative_bots_excluded && (
              <article className="stats-cumulative stats-cumulative-bots" aria-label={tx('Cumulative bot requests excluded')}>
                <div>
                  <span>{tx('Cumulative bot requests excluded')}</span>
                  <strong>{formatNumber(historicalBotBaseline.requests + Math.max(0, visitorStats.cumulative_bots_excluded.requests - historicalBotBaseline.recordedRequests), language)}</strong>
                </div>
                <div>
                  <p>{tx('Since')}: <strong>{formatDate(historicalPageviewBaseline.firstDate, language)}</strong></p>
                  <p className="stats-coverage-note">{tx('Automated requests excluded from pageviews.')}</p>
                </div>
              </article>
            )}
            <p className="stats-recent-summary">{copy.visitorStatsSummary(formatDate(visitorStats.first_date, language), formatDate(visitorStats.last_date, language))}</p>
            <>
              <div className="stats-summary-grid">
                <article>
                  <BarChart3 size={24} aria-hidden="true" />
                  <span>{tx('Pageviews')}</span>
                  <strong>{formatNumber(visitorStats.pageviews, language)}</strong>
                </article>
                <article>
                  <Search size={24} aria-hidden="true" />
                  <span>{tx('Unique visitors')}</span>
                  <strong>{formatNumber(visitorStats.unique_visitors, language)}</strong>
                </article>
                <article>
                  <Globe2 size={24} aria-hidden="true" />
                  <span>{tx('Countries')}</span>
                  <strong>{formatNumber(visitorStats.countries, language)}</strong>
                </article>
                <article>
                  <CheckCircle2 size={24} aria-hidden="true" />
                  <span>{tx('Bots excluded')}</span>
                  <strong>{formatNumber(visitorStats.bot_requests_excluded, language)}</strong>
                </article>
              </div>
              <div className="stats-layout">
                <article className="stats-panel">
                  <div className="stats-panel-heading">
                    <h3>{tx('Recent daily activity')}</h3>
                    <span>{formatDate(visitorStats.first_date, language)} - {formatDate(visitorStats.last_date, language)}</span>
                  </div>
                  <div className="daily-bars" aria-label="Daily pageviews for the most recent 14 days">
                    {recentVisitorDays.map((day) => (
                      <div className="daily-bar" key={day.date}>
                        <span>{new Date(`${day.date}T12:00:00`).toLocaleDateString(languageLocales[language], { month: 'numeric', day: 'numeric' })}</span>
                        <div>
                          <i style={{ width: `${Math.max(4, (day.pageviews / maxDailyPageviews) * 100)}%` }} />
                        </div>
                        <strong>{formatNumber(day.pageviews, language)}</strong>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="stats-panel">
                  <div className="stats-panel-heading">
                    <h3>{tx('Top countries')}</h3>
                    <span>{tx('By pageviews')}</span>
                  </div>
                  <div className="stats-list">
                    {visitorStats.country_totals.slice(0, 8).map((country) => (
                      <div key={country.country_code}>
                        <span>{countryName(country.country_code, language)}</span>
                        <strong>{formatNumber(country.pageviews, language)}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </>
          </section>
        )}

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">{tx('Contact')}</p>
            <h2>{tx('Connect with the M3 Lab at SDSU.')}</h2>
          </div>
          <div className="contact-grid">
            <a href={`mailto:${site.email}`}>
              <Mail size={22} aria-hidden="true" />
              <span><strong>{tx('Email')}</strong>{site.email}</span>
            </a>
            <div>
              <MapPin size={22} aria-hidden="true" />
              <span><strong>{tx('Address')}</strong>{localizedSite.address}</span>
            </div>
            <a href={site.scholar} target="_blank" rel="noreferrer">
              <Atom size={22} aria-hidden="true" />
              <span><strong>{tx('Google Scholar')}</strong>{tx('Publication profile')}</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>{localizedSite.shortName}</strong>
          <span>{localizedSite.department} / {localizedSite.university}</span>
        </div>
        <div>
          <a href={sitePath('/')}>{tx('Home')}</a>
          <a href={`mailto:${site.email}`}>{tx('Contact')}</a>
          <a href={site.scholar} target="_blank" rel="noreferrer">{tx('Google Scholar')}</a>
          <a href="https://accessibility.sdsu.edu/" target="_blank" rel="noreferrer">{tx('Accessibility')}</a>
        </div>
        <span>{copy.copyright(new Date().getFullYear())}</span>
      </footer>
    </div>
  )
}

export default App
