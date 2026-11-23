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
        <div className="mark"><b>{profile.initials}</b> / health-ai</div>
        <ul>
          <li><a href="#research">Research</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#path">Path</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

function Hero() {
  const github = links.find((l) => l.label === 'GitHub')
  return (
    <header className="wrap hero">
      <div>
        {profile.photo && (
          <img className="avatar" src={profile.photo} alt={`Portrait of ${profile.firstName} ${profile.lastName}`} width="96" height="96" />
        )}
        <h1>{profile.firstName} <em>{profile.lastName}</em></h1>
        <div className="role">
          {profile.roles.map((r) => <span key={r}>{r}</span>)}
        </div>
        <p className="lede">{profile.lede}</p>
        <div className="cta">
          <a className="btn primary" href="#research">See the research</a>
          {github && <a className="btn" href={github.href}>GitHub ↗</a>}
        </div>
      </div>
      <figure className="slide" aria-label="Animated illustration: a stained tissue field being segmented into tubules and glomeruli">
        <TissueCanvas />
        <span className="tag l">input · Masson's trichrome</span>
        <span className="tag r">output · instance masks</span>
        <figcaption>
          {LEGEND.map((l) => (
            <span key={l.label}><i style={{ background: l.color }} />{l.label}</span>
          ))}
        </figcaption>
      </figure>
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

function Block({ id, num, label, children }) {
  return (
    <section className="block" id={id}>
      <div className="label"><b>{num}</b>{label}</div>
      <div>{children}</div>
    </section>
  )
}

function About() {
  return (
    <Block id="about" num="01" label="About">
      <div className="about-grid">
        <div className="prose">
          <h2>{about.title}</h2>
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {about.photo && (
          <figure className="photo">
            <img src={about.photo.src} alt={about.photo.alt} loading="lazy" width="664" height="830" />
            <figcaption>{about.photo.caption}</figcaption>
          </figure>
        )}
      </div>
    </Block>
  )
}

function Research() {
  return (
    <Block id="research" num="02" label="Research">
      <div className="entries">
        {research.map((r) => (
          <article className="entry" key={r.title}>
            <h3>{r.title}</h3>
            <div className="when">{r.when}</div>
            <div className="body">
              <div className="where">{r.where}</div>
              <p>{r.text}</p>
              {r.findings && (
                <ul className="find">
                  {r.findings.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              )}
              <div className="chips">
                <span className={'status' + (r.status.done ? ' done' : '')}>{r.status.text}</span>
                {r.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
              {r.link && <a href={r.link.href}>{r.link.text}</a>}
            </div>
          </article>
        ))}
      </div>
    </Block>
  )
}

function Projects() {
  return (
    <Block id="projects" num="03" label="Projects">
      <h2>Things I have built along the way.</h2>
      <div className="grid">
        {projects.map((p) => (
          <article className="proj" key={p.title}>
            <div className="k">{p.kind}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <Chips tags={p.tags} />
          </article>
        ))}
      </div>
    </Block>
  )
}

function Path() {
  return (
    <Block id="path" num="04" label="Path">
      <h2>Education and work.</h2>
      <ul className="timeline">
        {path.map((p) => (
          <li key={p.t + p.y}>
            <div className="y">{p.y}</div>
            <div><div className="t">{p.t}</div><div className="s">{p.s}</div></div>
          </li>
        ))}
      </ul>
    </Block>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <h2>Working on medical imaging, <em>or want to?</em></h2>
      <p className="contact-lede">I am happy to talk about collaborations, student projects, or segmentation problems that look harder than they should.</p>
      <div className="links">
        {links.map((l) => (
          <a href={l.href} key={l.label}><span>{l.label}</span><span>{l.text}</span></a>
        ))}
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
      <div className="wrap">
        <About />
        <Research />
        <Projects />
        <Path />
        <Contact />
        <footer>
          <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName} · {profile.location}</span>
          <em>{profile.motto}</em>
        </footer>
      </div>
    </>
  )
}
