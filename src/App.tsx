import { useMemo, useState } from 'react'
import {
  Atom,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
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
import skyImage from './assets/sky-soltero.jpg'
import wenwuImage from './assets/team/wenwu-xu.jpg'
import shahrierImage from './assets/team/shahrier-hasan.jpg'
import katherineImage from './assets/team/katherine-whitmore.jpeg'
import sherwinImage from './assets/team/sherwin-navindaran.jpg'
import cameronImage from './assets/team/cameron-aires.png'
import rachellImage from './assets/team/rachell-lee.jpg'
import jamesImage from './assets/team/james-murray.jpg'
import amauryImage from './assets/team/amaury-reed.jpg'
import coleImage from './assets/team/cole-waterhouse.png'
import kenImage from './assets/team/ken-ramirez.png'
import sanamImage from './assets/team/sanam-nagvekar.jpeg'
import saraImage from './assets/team/sara-gomez.jpg'
import xavierImage from './assets/team/xavier-lovato.png'
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
  'sky-soltero': skyImage,
  'team/wenwu-xu': wenwuImage,
  'team/shahrier-hasan': shahrierImage,
  'team/katherine-whitmore': katherineImage,
  'team/sherwin-navindaran': sherwinImage,
  'team/cameron-aires': cameronImage,
  'team/rachell-lee': rachellImage,
  'team/james-murray': jamesImage,
  'team/amaury-reed': amauryImage,
  'team/cole-waterhouse': coleImage,
  'team/ken-ramirez': kenImage,
  'team/sanam-nagvekar': sanamImage,
  'team/sarah-gomez': saraImage,
  'team/xavier-lovato': xavierImage,
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
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'People', href: '#people' },
  { label: 'News', href: '#news' },
  { label: 'Join Us', href: '#join' },
  { label: 'Teaching & Outreach', href: '#teaching' },
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
    body: 'Best fit for graduate students interested in grain-boundary engineering, field-assisted processing, computational materials science, microscopy-informed modeling, characterization, instrumentation, or data-driven materials workflows.',
    skills: ['materials science or mechanical engineering background', 'programming, simulation, or experimental experience', 'clear project ownership and regular progress communication'],
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
  .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))

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

  const featuredPublications = publications.filter((publication) => publication.selected).slice(0, 3)
  const latestNews = newsPosts.slice(0, 4)

  return (
    <div className="site-shell" id="home">
      <header className="topbar">
        <a className="brand" href="#home" aria-label={`${site.shortName} home`}>
          <img className="brand-logo" src={m3LogoImage} alt="" />
          <span>
            <strong>{site.name}</strong>
            <small>{site.university}</small>
          </span>
        </a>
        <a className="email-pill" href={`mailto:${site.email}`}>
          <Mail size={16} aria-hidden="true" />
          {site.email}
        </a>
      </header>

      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <main>
        <section className="hero-section">
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
            <strong>Static</strong>
            <span>content-driven site ready for deployment</span>
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
            <h2>Framing projects as scientific questions.</h2>
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
            <h2>Project cards generated from Markdown files.</h2>
            <p>
              Each project includes a short summary, motivation, methods, related people, funding, papers, and collaboration signals.
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
                    <p><strong>People:</strong> {project.people.join(', ')}</p>
                    <p><strong>Funding:</strong> {project.funding.join(', ')}</p>
                    <p><strong>Related papers:</strong> {project.papers.join('; ')}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {featuredPublications.length > 0 && (
          <section className="section publication-section" id="publications">
            <div className="section-heading wide">
              <p className="eyebrow">Publications</p>
              <h2>Selected papers, sortable by theme.</h2>
              <p>
                Publications are stored in <code>src/data/publications.yaml</code> and sorted by year automatically.
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
              <aside className="featured-papers">
                <p className="panel-label">Featured on homepage</p>
                {featuredPublications.map((publication) => (
                  <article key={publication.title}>
                    <strong>{publication.title}</strong>
                    <span>{publication.year} / {publication.themes.slice(0, 2).join(', ')}</span>
                  </article>
                ))}
              </aside>
            </div>
          </section>
        )}

        {groupedPeople.length > 0 && (
          <section className="section people-section" id="people">
            <div className="section-heading wide">
              <p className="eyebrow">People</p>
              <h2>PI, students, undergraduate researchers, and alumni.</h2>
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
                          <p><strong>Project:</strong> {person.project}</p>
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
              <h2>Latest updates from Markdown posts.</h2>
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
            <h2>Recruiting-ready pathways into the lab.</h2>
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
          <div className="teaching-panel dark">
            <BookOpen size={28} aria-hidden="true" />
            <p className="eyebrow">Outreach</p>
            <h2>CrystalCraft and visual materials learning.</h2>
            <p>
              Teaching and outreach content can grow into demos, VR/AR resources, crystal-structure explainers, and student project showcases.
            </p>
          </div>
        </section>

        <section className="section partner-section">
          <div className="section-heading">
            <p className="eyebrow">Selected grants</p>
            <h2>External research support for M3 Lab projects.</h2>
          </div>
          <div className="partner-layout">
            <div>
              <h3><Handshake size={20} aria-hidden="true" /> Grants and sponsored projects</h3>
              {funding.map((item) => (
                <article key={item.name}>
                  <strong>{item.name}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

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
