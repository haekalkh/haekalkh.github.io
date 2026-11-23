import TissueCanvas, { LEGEND } from './components/TissueCanvas.jsx'
import { profile, links, stats, about, research, projects, path } from './data.js'

function Chips({ tags }) {
  return (
    <div className="chips">
      {tags.map((t) => <span className="chip" key={t}>{t}</span>)}
    </div>
  )
}

function Nav() {
  return (
    <nav aria-label="Main">
      <div className="wrap">
        <a className="mark" href="#top">{profile.firstName.split(' ')[0]} <b>{profile.lastName}</b></a>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#research">Research</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#path">Path</a></li>
          <li><a className="nav-cta" href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

function Hero() {
  const github = links.find((l) => l.label === 'GitHub')
  return (
    <header className="wrap hero" id="top">
      <div className="hero-text">
        <p className="greeting">{profile.greeting}</p>
        <h1>{profile.firstName} <span>{profile.lastName}</span></h1>
        <div className="roles">
          {profile.roles.map((r) => <span className="pill" key={r}>{r}</span>)}
        </div>
        <p className="lede">{profile.lede}</p>
        <div className="cta">
          <a className="btn primary" href="#research">See my research</a>
          <a className="btn" href="#contact">Get in touch</a>
          {github && <a className="btn ghost" href={github.href}>GitHub ↗</a>}
        </div>
      </div>
      <div className="hero-photo">
        <img src={profile.photo} alt={`Portrait of ${profile.firstName} ${profile.lastName}`} width="360" height="450" />
        <dl className="facts">
          {profile.quickFacts.map((f) => (
            <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
          ))}
        </dl>
      </div>
    </header>
  )
}

function Stats() {
  return (
    <div className="wrap">
      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.d}>
            <div className="n">{s.n}{s.unit && <small>{s.unit}</small>}</div>
            <div className="d">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Section({ id, kicker, title, children }) {
  return (
    <section className="section" id={id}>
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" kicker="About me" title={about.title}>
      <div className="about-grid">
        <div className="prose">
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <p className="motto">“{profile.motto}” <span>— the line I work by</span></p>
        </div>
        {about.photo && (
          <figure className="photo">
            <img src={about.photo.src} alt={about.photo.alt} loading="lazy" width="664" height="830" />
            <figcaption>{about.photo.caption}</figcaption>
          </figure>
        )}
      </div>
    </Section>
  )
}

function Research() {
  return (
    <Section id="research" kicker="Research" title="What I work on.">
      <figure className="demo" aria-label="Animated illustration: a stained tissue field being segmented into tubules and glomeruli">
        <TissueCanvas />
        <span className="tag l">input · Masson's trichrome</span>
        <span className="tag r">output · instance masks</span>
        <figcaption>
          {LEGEND.map((l) => (
            <span key={l.label}><i style={{ background: l.color }} />{l.label}</span>
          ))}
        </figcaption>
      </figure>
      <div className="entries">
        {research.map((r) => (
          <article className="card entry" key={r.title}>
            <div className="entry-head">
              <span className={'status' + (r.status.done ? ' done' : '')}>{r.status.text}</span>
              <span className="when">{r.when}</span>
            </div>
            <h3>{r.title}</h3>
            <p className="where">{r.where}</p>
            <p>{r.text}</p>
            {r.findings && (
              <ul className="find">
                {r.findings.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
            <Chips tags={r.tags} />
            {r.link && <a className="more" href={r.link.href}>{r.link.text}</a>}
          </article>
        ))}
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" kicker="Projects" title="Things I have built along the way.">
      <div className="grid">
        {projects.map((p) => (
          <article className="card proj" key={p.title}>
            <p className="k">{p.kind}</p>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <Chips tags={p.tags} />
          </article>
        ))}
      </div>
    </Section>
  )
}

function Path() {
  return (
    <Section id="path" kicker="Path" title="Education and work.">
      <ol className="timeline">
        {path.map((p) => {
          const now = p.y.includes('now')
          return (
            <li key={p.t + p.y} className={now ? 'is-now' : ''}>
              <div className="y">{p.y}</div>
              <div><div className="t">{p.t}</div><div className="s">{p.s}</div></div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="contact-card">
          <img src={profile.photo} alt="" width="72" height="90" />
          <div>
            <h2>Let's talk about medical imaging.</h2>
            <p>I am happy to talk about collaborations, student projects, or segmentation problems that look harder than they should.</p>
            <div className="links">
              {links.map((l) => (
                <a href={l.href} key={l.label}><span>{l.label}</span><b>{l.text}</b></a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Research />
      <Projects />
      <Path />
      <Contact />
      <footer className="wrap">
        <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
        <span>{profile.motto}</span>
      </footer>
    </>
  )
}
