import { useEffect, useMemo, useState } from 'react'
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
  MapPin,
  Play,
  Search,
} from 'lucide-react'
import heroImage from './assets/materials-hero.png'
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
import skyImage from './assets/sky-soltero.jpg'
import wenwuImage from './assets/team/wenwu-xu.jpg'
import shahrierImage from './assets/team/shahrier-hasan.jpg'
import katherineImage from './assets/team/katherine-whitmore.jpeg'
import sherwinImage from './assets/team/sherwin-navindaran.jpg'
import cameronImage from './assets/team/cameron-aires.png'
import rachellImage from './assets/team/rachell-lee.jpg'
import jamesImage from './assets/team/james-murray.jpg'
import jamesBurnsImage from './assets/team/james-burns.jpg'
import nicolasMosquedaImage from './assets/team/nicolas-mosqueda.jpg'
import amauryImage from './assets/team/amaury-reed.jpg'
import coleImage from './assets/team/cole-waterhouse.png'
import kenImage from './assets/team/ken-ramirez.png'
import sanamImage from './assets/team/sanam-nagvekar.jpeg'
import saraImage from './assets/team/sara-gomez.jpg'
import xavierImage from './assets/team/xavier-lovato.png'
import zeshanImage from './assets/team/zeshan-ahmed.png'
import marivelImage from './assets/team/marivel-alfaro.png'
import adrianImage from './assets/team/adrian-contreras.png'
import joseImage from './assets/team/jose-morales.png'
import carsonImage from './assets/team/carson-sutton.png'
import seanImage from './assets/team/sean-ogrady.png'
import zacharyImage from './assets/team/zachary-mclaughlin.png'
import colinImage from './assets/team/colin-delaney.png'
import rebecaImage from './assets/team/rebeca-contreras.jpg'
import theodoreImage from './assets/team/theodore-norris.jpg'
import ethanAndersonImage from './assets/team/ethan-anderson.jpg'
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
import crystalCraftDemoImage from './assets/crystalcraft/demo.jpg'
import crystalCraftDownloadImage from './assets/crystalcraft/download.png'
import crystalCraftFccImage from './assets/crystalcraft/fcc.png'
import crystalCraftGitImage from './assets/crystalcraft/git.png'
import crystalCraftHcpImage from './assets/crystalcraft/hcp.png'
import crystalCraftKainImage from './assets/crystalcraft/kain.jpg'
import crystalCraftPatrickImage from './assets/crystalcraft/patrick.jpg'
import crystalCraftRosImage from './assets/crystalcraft/ros.jpg'
import crystalCraftTeamImage from './assets/crystalcraft/team.jpg'
import crystalCraftTvImage from './assets/crystalcraft/TV.png'
import crystalCraftWenImage from './assets/crystalcraft/wen.jpg'
import publicationsRaw from './data/publications.yaml?raw'
import fundingRaw from './data/funding.yaml?raw'
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
  image?: string
  link?: string
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
  name: string
  detail: string
  link?: string
}

type VisitorStats = {
  generated_at: string
  days: number
  first_date: string
  last_date: string
  pageviews: number
  unique_visitors: number
  countries: number
  bot_requests_excluded: number
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
  'sky-soltero': skyImage,
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
  youtube: 'https://www.youtube.com/@2dadsfamily',
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Grants', href: '#grants' },
  { label: 'People', href: '#people' },
  { label: 'News', href: '#news' },
  { label: 'Join Us', href: '#join' },
  { label: 'Teaching & Outreach', href: '#teaching' },
  { label: 'Visitor Stats', href: '#visitor-stats' },
  { label: 'Contact', href: '#contact' },
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

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00`)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function countryName(code: string) {
  if (!code || code === 'ZZ') return 'Unknown'
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' })
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

function getImage(key?: string) {
  return key ? imageRegistry[key] : undefined
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
  .map((entry) => ({
    slug: entry.slug,
    date: asString(entry.meta.date),
    title: asString(entry.meta.title),
    category: asString(entry.meta.category),
    image: getImage(asString(entry.meta.image)),
    link: asString(entry.meta.link),
    body: entry.body,
  }))
  .sort((a, b) => b.date.localeCompare(a.date))

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
  name: asString(item.name),
  detail: asString(item.detail),
  link: asString(item.link),
})) satisfies NamedItem[]

function App() {
  const [researchFilter, setResearchFilter] = useState('All')
  const [publicationFilter, setPublicationFilter] = useState('All')
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null)

  useEffect(() => {
    if (!window.location.hash) return
    const id = window.location.hash.slice(1)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView()
    }, 0)
  }, [])

  useEffect(() => {
    let active = true

    fetch(`/analytics/visitor-stats.php?ts=${Date.now()}`, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
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

  const researchThemes = useMemo(() => ['All', ...new Set(projects.map((project) => project.theme))], [])
  const publicationThemes = useMemo(
    () => ['All', ...new Set(publications.flatMap((publication) => publication.themes))],
    [],
  )

  const filteredProjects = projects.filter(
    (project) => researchFilter === 'All' || project.theme === researchFilter,
  )

  const filteredPublications = publications.filter(
    (publication) => publicationFilter === 'All' || publication.themes.includes(publicationFilter),
  )

  const groupedPeople = ['Principal Investigator', 'Current Graduate Students', 'Undergraduate Researchers', 'Alumni', 'Former Members']
    .map((group) => ({ group, members: people.filter((person) => person.group === group) }))
    .filter((section) => section.members.length > 0)

  const latestNews = newsPosts.slice(0, 4)
  const recentVisitorDays = visitorStats?.daily.slice(-14) ?? []
  const maxDailyPageviews = Math.max(1, ...recentVisitorDays.map((day) => day.pageviews))

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label={`${site.shortName} home`}>
          <img className="brand-logo" src={m3LogoImage} alt="" />
          <span>
            <strong>{site.name}</strong>
            <small>{site.university}</small>
          </span>
        </a>
        <div className="topbar-links" aria-label="Profile and contact links">
          <a className="topbar-link" href={site.scholar} target="_blank" rel="noreferrer">
            <Atom size={16} aria-hidden="true" />
            Scholar
          </a>
          <a className="topbar-link" href={site.linkedin} target="_blank" rel="noreferrer">
            <ExternalLink size={16} aria-hidden="true" />
            LinkedIn
          </a>
          <a className="topbar-link" href={site.youtube} target="_blank" rel="noreferrer">
            <Play size={16} aria-hidden="true" />
            YouTube
          </a>
          <a className="topbar-link email-pill" href={`mailto:${site.email}`}>
            <Mail size={16} aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </header>

      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <main>
        <section className="hero-section" id="home">
          <img src={heroImage} alt="" className="hero-bg" />
          <div className="hero-copy">
            <p className="eyebrow">San Diego State University / Mechanical Engineering</p>
            <h1>Multiscale Modeling of Materials Lab</h1>
            <p>
              We combine simulation, microstructure characterization, and field-assisted processing to understand and design materials from atoms to engineered structures.
            </p>
            <div className="button-row">
              <a className="button primary" href="#research">
                Research
                <ChevronRight size={18} aria-hidden="true" />
              </a>
              <a className="button light" href="#join">
                Join Us
                <BriefcaseBusiness size={18} aria-hidden="true" />
              </a>
              <a className="button light" href="#publications">
                Publications
                <FileText size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          {latestNews.length > 0 && (
            <aside className="hero-panel" aria-label="Latest lab news">
              <p className="panel-label">Latest news</p>
              {latestNews.slice(0, 2).map((post) => (
                <a key={post.slug} href={post.link || '#news'}>
                  <span>{post.category}</span>
                  <strong>{post.title}</strong>
                  <small>{formatDate(post.date)}</small>
                </a>
              ))}
            </aside>
          )}
        </section>

        <section className="metric-strip" aria-label="Lab snapshot">
          <div>
            <strong>{projects.length}</strong>
            <span>active research themes</span>
          </div>
          <div>
            <strong>{people.length}</strong>
            <span>current members and alumni listed</span>
          </div>
          <div>
            <strong>{publications.length}</strong>
            <span>selected publications in data file</span>
          </div>
          <div>
            <strong>{funding.length}</strong>
            <span>grants and sponsored projects listed</span>
          </div>
        </section>

        <section className="section intro-section">
          <div className="section-heading">
            <p className="eyebrow">Lab mission</p>
            <h2>Materials questions, modeled and tested across scales.</h2>
          </div>
          <article className="intro-story">
            <img src={missionImage} alt="Materials modeling workflow from atoms to microstructure and properties" />
            <div>
              <h3>Computational materials science with experimental anchors.</h3>
              <p>
                The M3 Lab studies nanoscale and microstructure mechanisms in metals, ceramics, composites, and field-assisted processing. The site is organized so research updates, people, news, and publications can be maintained through content files instead of layout code.
              </p>
              <div className="story-links">
                <a href={site.scholar} target="_blank" rel="noreferrer">
                  Google Scholar
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
                <a href="https://mechanical.sdsu.edu/" target="_blank" rel="noreferrer">
                  SDSU Mechanical Engineering
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </section>

        <section className="section question-section">
          <div className="section-heading">
            <p className="eyebrow">Big questions</p>
            <h2>Our scientific questions.</h2>
          </div>
          <div className="question-grid">
            {researchQuestions.map((question) => (
              <article key={question}>
                <Search size={20} aria-hidden="true" />
                <p>{question}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section research-section" id="research">
          <div className="section-heading wide">
            <p className="eyebrow">Research</p>
            <h2>Research projects.</h2>
            <p>
              Current projects connect atomistic simulation, microstructure characterization, field-assisted processing, and data-driven materials design.
            </p>
          </div>
          <div className="filter-row" aria-label="Research theme filters">
            {researchThemes.map((theme) => (
              <button
                className={researchFilter === theme ? 'active' : ''}
                key={theme}
                type="button"
                onClick={() => setResearchFilter(theme)}
              >
                {theme}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.slug}>
                {project.image && <img src={project.image} alt="" />}
                <div className="project-copy">
                  <span className="tag">{project.theme}</span>
                  <h3>{project.title}</h3>
                  <p className="summary">{project.summary}</p>
                  <p>{project.body}</p>
                  <div className="mini-list">
                    <strong>Methods</strong>
                    <div>{project.methods.map((method) => <span key={method}>{method}</span>)}</div>
                  </div>
                  <div className="project-meta">
                    <p><strong>Related papers:</strong> {project.papers.join('; ')}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {publications.length > 0 && (
          <section className="section publication-section" id="publications">
            <div className="section-heading wide">
              <p className="eyebrow">Publications</p>
              <h2>Selected papers, sortable by theme.</h2>
              <p>
                Recent and selected publications from the M3 Lab and collaborators.
              </p>
            </div>
            <div className="filter-row" aria-label="Publication theme filters">
              {publicationThemes.map((theme) => (
                <button
                  className={publicationFilter === theme ? 'active' : ''}
                  key={theme}
                  type="button"
                  onClick={() => setPublicationFilter(theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
            <div className="publication-layout">
              <div className="publication-list">
                {filteredPublications.map((publication) => (
                  <article key={publication.title}>
                    <span>{publication.year}</span>
                    <div>
                      <h3>{publication.title}</h3>
                      <p>{publication.authors}. {publication.venue}.</p>
                      <div className="inline-tags">
                        {publication.themes.map((theme) => <span key={theme}>{theme}</span>)}
                      </div>
                      <div className="paper-links">
                        {publication.doi && <a href={publication.doi}>DOI</a>}
                        {publication.pdf && <a href={publication.pdf}>PDF</a>}
                        <a href={site.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {funding.length > 0 && (
          <section className="section grant-section" id="grants">
            <div className="section-heading wide">
              <p className="eyebrow">Grants</p>
              <h2>Sponsored projects supporting M3 Lab research.</h2>
              <p>Current and recent awards supporting materials modeling, processing, characterization, and education innovation.</p>
            </div>
            <div className="grant-grid">
              {funding.map((item) => (
                <article className="grant-card" key={item.name}>
                  <Handshake size={24} aria-hidden="true" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.detail}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        Program page
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
              <p className="eyebrow">People</p>
              <h2>PI, graduate students, undergraduate researchers, and alumni.</h2>
              <p>
                The M3 Lab brings together graduate students, undergraduate researchers, alumni, and collaborators working across modeling, processing, and characterization.
              </p>
            </div>
            <div className="people-groups">
              {groupedPeople.map((section) => (
                <section key={section.group} className="people-group" aria-labelledby={`${section.group}-title`}>
                  <h3 id={`${section.group}-title`}>{section.group}</h3>
                  <div className="person-grid">
                    {section.members.map((person) => (
                      <article className="person-card" key={person.slug}>
                        {person.image ? (
                          <img src={person.image} alt={`${person.name}, ${person.role}`} />
                        ) : (
                          <div className="avatar" aria-hidden="true">{initials(person.name)}</div>
                        )}
                        <div>
                          <span className="tag">{person.role}</span>
                          <h4>{person.name}</h4>
                          <p className="dates">{person.dates}</p>
                          {person.project && <p><strong>Project:</strong> {person.project}</p>}
                          {person.currentPosition && <p><strong>Current position:</strong> {person.currentPosition}</p>}
                          <p>{person.body}</p>
                          <div className="inline-tags">
                            {person.tags.map((tag) => <span key={tag}>{tag}</span>)}
                          </div>
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
              <p className="eyebrow">News</p>
              <h2>Lab news.</h2>
            </div>
            <div className="news-grid">
              {latestNews.map((post) => (
                <article className="news-card" key={post.slug}>
                  {post.image && <img src={post.image} alt="" />}
                  <div>
                    <span>{post.category}</span>
                    <h3>{post.title}</h3>
                    <p className="date"><CalendarDays size={15} aria-hidden="true" />{formatDate(post.date)}</p>
                    <p>{post.body}</p>
                    {post.link && (
                      <a href={post.link} target={post.link.startsWith('http') ? '_blank' : undefined} rel={post.link.startsWith('http') ? 'noreferrer' : undefined}>
                        Read more
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="section join-section" id="join">
          <div className="section-heading wide">
            <p className="eyebrow">Join Us</p>
            <h2>Join the M3 Lab.</h2>
            <p>
              The lab welcomes prospective graduate, undergraduate, visiting, and collaborator inquiries that connect clearly to M3 Lab research.
            </p>
          </div>
          <div className="join-grid">
            {joinTracks.map((track) => (
              <article key={track.title}>
                <BriefcaseBusiness size={22} aria-hidden="true" />
                <h3>{track.title}</h3>
                <p>{track.body}</p>
                <ul>
                  {track.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
                {'links' in track && track.links && (
                  <div className="join-links">
                    {track.links.map((link) => (
                      <a className="join-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                        {link.label}
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          <aside className="email-checklist">
            <h3>What to include in your email</h3>
            <ul>
              <li><CheckCircle2 size={18} aria-hidden="true" />Brief research interests and target program</li>
              <li><CheckCircle2 size={18} aria-hidden="true" />Relevant coursework, skills, or project experience</li>
              <li><CheckCircle2 size={18} aria-hidden="true" />CV or resume, transcript if available, and expected start term</li>
              <li><CheckCircle2 size={18} aria-hidden="true" />One or two M3 Lab projects that genuinely interest you</li>
            </ul>
            <a className="button primary" href={`mailto:${site.email}`}>Email {site.email}</a>
          </aside>
        </section>

        <section className="section teaching-section" id="teaching">
          <div className="teaching-panel">
            <GraduationCap size={28} aria-hidden="true" />
            <p className="eyebrow">Teaching</p>
            <h2>Materials courses and student training.</h2>
            <ul>
              {teachingItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <article className="teaching-innovation">
            <div className="innovation-copy">
              <BookOpen size={28} aria-hidden="true" />
              <p className="eyebrow">Teaching Innovation</p>
              <h2>CrystalCraft: VR/AR materials learning.</h2>
              <p>
                CrystalCraft is an open-source virtual reality application for building atomic models and learning crystal structures at the molecular level. The project turns materials visualization into a calm, creative learning environment developed through an interdisciplinary SDSU student-faculty collaboration.
              </p>
              <ul>
                {crystalCraftFeatures.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <div className="crystalcraft-links">
                {crystalCraftLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    <img src={link.image} alt="" />
                    {link.label}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="crystalcraft-video">
              <video controls preload="metadata" poster={crystalCraftDemoImage}>
                <source src={`${import.meta.env.BASE_URL}crystalcraft/vrvid.mp4`} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
              <p>Early footage from the user perspective in the CrystalCraft VR environment.</p>
            </div>
            <div className="crystalcraft-gallery" aria-label="CrystalCraft image gallery">
              {crystalCraftGallery.map((item) => (
                <figure key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <figcaption>{item.title}</figcaption>
                </figure>
              ))}
            </div>
            <div className="crystalcraft-team">
              <img src={crystalCraftTeamImage} alt="CrystalCraft student and faculty project team" />
              <div>
                <h3>Interdisciplinary SDSU project team</h3>
                <p>
                  CrystalCraft was created through collaboration across software engineering, game design, mechanical engineering, materials science, 3D modeling, and faculty advising.
                </p>
                <div className="crystalcraft-team-grid">
                  {crystalCraftTeam.map((member) => (
                    <article key={member.name}>
                      <img src={member.image} alt={member.name} />
                      <div>
                        <strong>{member.name}</strong>
                        <span>{member.role}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>

        {visitorStats && (
          <section className="section visitor-stats-section" id="visitor-stats">
            <div className="section-heading wide">
              <p className="eyebrow">Visitor Stats</p>
              <h2>Public website activity.</h2>
              <p>
                Aggregated traffic for the last {visitorStats.days} days. Raw IP addresses and individual visitor identifiers are not published.
              </p>
            </div>
            <div className="stats-summary-grid">
              <article>
                <BarChart3 size={24} aria-hidden="true" />
                <span>Pageviews</span>
                <strong>{formatNumber(visitorStats.pageviews)}</strong>
              </article>
              <article>
                <Search size={24} aria-hidden="true" />
                <span>Unique visitors</span>
                <strong>{formatNumber(visitorStats.unique_visitors)}</strong>
              </article>
              <article>
                <Globe2 size={24} aria-hidden="true" />
                <span>Countries</span>
                <strong>{formatNumber(visitorStats.countries)}</strong>
              </article>
              <article>
                <CheckCircle2 size={24} aria-hidden="true" />
                <span>Bots excluded</span>
                <strong>{formatNumber(visitorStats.bot_requests_excluded)}</strong>
              </article>
            </div>
            <div className="stats-layout">
              <article className="stats-panel">
                <div className="stats-panel-heading">
                  <h3>Recent daily activity</h3>
                  <span>{formatDate(visitorStats.first_date)} - {formatDate(visitorStats.last_date)}</span>
                </div>
                <div className="daily-bars" aria-label="Daily pageviews for the most recent 14 days">
                  {recentVisitorDays.map((day) => (
                    <div className="daily-bar" key={day.date}>
                      <span>{new Date(`${day.date}T12:00:00`).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}</span>
                      <div>
                        <i style={{ width: `${Math.max(4, (day.pageviews / maxDailyPageviews) * 100)}%` }} />
                      </div>
                      <strong>{formatNumber(day.pageviews)}</strong>
                    </div>
                  ))}
                </div>
              </article>
              <article className="stats-panel">
                <div className="stats-panel-heading">
                  <h3>Top countries</h3>
                  <span>By pageviews</span>
                </div>
                <div className="stats-list">
                  {visitorStats.country_totals.slice(0, 8).map((country) => (
                    <div key={country.country_code}>
                      <span>{countryName(country.country_code)}</span>
                      <strong>{formatNumber(country.pageviews)}</strong>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        )}

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Connect with the M3 Lab at SDSU.</h2>
          </div>
          <div className="contact-grid">
            <a href={`mailto:${site.email}`}>
              <Mail size={22} aria-hidden="true" />
              <span><strong>Email</strong>{site.email}</span>
            </a>
            <div>
              <MapPin size={22} aria-hidden="true" />
              <span><strong>Address</strong>{site.address}</span>
            </div>
            <a href={site.scholar} target="_blank" rel="noreferrer">
              <Atom size={22} aria-hidden="true" />
              <span><strong>Google Scholar</strong>Publication profile</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>{site.shortName}</strong>
          <span>{site.department} / {site.university}</span>
        </div>
        <div>
          <a href="#home">Back to top</a>
          <a href={`mailto:${site.email}`}>Contact</a>
          <a href={site.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
          <a href="https://accessibility.sdsu.edu/" target="_blank" rel="noreferrer">Accessibility</a>
        </div>
        <span>Copyright {new Date().getFullYear()} Wenwu Xu, San Diego State University.</span>
      </footer>
    </div>
  )
}

export default App
