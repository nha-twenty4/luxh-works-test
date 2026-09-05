import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  Menu,
  MoveRight,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";

const images = {
  villa: "/manus-storage/concrete-villa_29404eb5.png",
  office: "/manus-storage/dusk-office_d271c1a9.jpg",
  interior: "/manus-storage/warm-interior_d31e41d1.webp",
  coastal: "/manus-storage/coastal-villa_c80f7922.jpg",
  modern: "/manus-storage/modern-house_7b9e5ca5.jpg",
};

type Project = {
  slug: string;
  title: string;
  category: "Architecture" | "Interior" | "3D Visualization" | "Graphic Design" | "Branding";
  image: string;
  year: string;
  location: string;
  client: string;
  description: string;
  note: string;
  size: "wide" | "tall" | "standard";
};

const projects: Project[] = [
  {
    slug: "house-14",
    title: "House 14",
    category: "Architecture",
    image: images.villa,
    year: "2024",
    location: "Thu Duc City, Vietnam",
    client: "Private client",
    description: "A restrained concrete residence shaped around garden views, deep overhangs, and a continuous threshold between living space and landscape.",
    note: "Private residence · 420 m²",
    size: "wide",
  },
  {
    slug: "mori-residence",
    title: "Mori Residence",
    category: "Interior",
    image: images.interior,
    year: "2024",
    location: "Ho Chi Minh City, Vietnam",
    client: "Mori Family",
    description: "A study in warm minimalism: tactile timber, quiet limestone, and soft-edged forms designed for a slower daily rhythm.",
    note: "Residential interior · 185 m²",
    size: "tall",
  },
  {
    slug: "northpoint",
    title: "Northpoint",
    category: "3D Visualization",
    image: images.office,
    year: "2023",
    location: "Melbourne, Australia",
    client: "Northpoint Developments",
    description: "A dusk visualization series translating an urban mixed-use concept into a cinematic, human-scale visual narrative.",
    note: "Visualization · Mixed-use",
    size: "standard",
  },
  {
    slug: "seascape-house",
    title: "Seascape House",
    category: "Architecture",
    image: images.coastal,
    year: "2023",
    location: "Phan Thiet, Vietnam",
    client: "Private client",
    description: "A low coastal retreat composed as a sequence of sheltered courtyards, framing the horizon without competing with it.",
    note: "Holiday house · 360 m²",
    size: "tall",
  },
  {
    slug: "frame-house",
    title: "Frame House",
    category: "Architecture",
    image: images.modern,
    year: "2022",
    location: "Da Nang, Vietnam",
    client: "Private client",
    description: "A crisp composition of planes, voids, and framed light, made to feel at once precise and deeply domestic.",
    note: "Private residence · 310 m²",
    size: "standard",
  },
  {
    slug: "field-notes",
    title: "Field Notes No. 03",
    category: "Graphic Design",
    image: images.interior,
    year: "2024",
    location: "Ho Chi Minh City, Vietnam",
    client: "LUXH Works",
    description: "An editorial identity system for a small collection of observations on material, shadow, and everyday space.",
    note: "Editorial identity · Print + digital",
    size: "wide",
  },
];

const services = [
  {
    number: "01",
    title: "Architectural Design",
    items: ["Concept design", "Planning", "Design development"],
    text: "From first sketch to fully coordinated design, we shape buildings with a clear point of view and a practical path to making.",
  },
  {
    number: "02",
    title: "Interior & Exterior Concepts",
    items: ["Spatial direction", "Material palettes", "Atmosphere studies"],
    text: "We choreograph material, light, and proportion into spaces with a sense of calm and character.",
  },
  {
    number: "03",
    title: "3D Visualization",
    items: ["Architectural rendering", "Interior visualization", "Campaign imagery"],
    text: "Cinematic, precise images that help ambitious spaces feel real before they are built.",
  },
  {
    number: "04",
    title: "Branding & Graphic Design",
    items: ["Visual identities", "Print systems", "Digital materials"],
    text: "Thoughtful brand worlds for places, people, and ideas that need a memorable visual voice.",
  },
];

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["Contact", "/contact"],
] as const;

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomeTop = location === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`site-header ${isHomeTop ? "header-on-hero" : "header-solid"}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="LUXH Works home">
          <span>LUXH</span><i>WORKS</i>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className={location === href ? "nav-active" : ""}>{label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-contact">Start a project <ArrowUpRight size={14} /></Link>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Open navigation" aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={23} />}
        </button>
      </div>
      <div className={`mobile-nav ${open ? "mobile-nav-open" : ""}`}>
        {navItems.map(([label, href], index) => (
          <Link key={href} href={href} className="mobile-link" style={{ transitionDelay: `${index * 45}ms` }}>
            <span>0{index + 1}</span>{label}<ArrowUpRight size={20} />
          </Link>
        ))}
        <div className="mobile-nav-footer">hello@luxhworks.com<br />+84 28 7304 8890</div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link href="/" className="brand brand-light"><span>LUXH</span><i>WORKS</i></Link>
        <p>Architecture, design, visualization<br />and brand worlds made with intent.</p>
        <div className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
          <a href="mailto:hello@luxhworks.com">Email <ArrowUpRight size={13} /></a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 LUXH Works</span><span>Ho Chi Minh City, Vietnam</span><span>Built for considered things.</span></div>
    </footer>
  );
}

function SectionLabel({ number, children, dark = false }: { number: string; children: React.ReactNode; dark?: boolean }) {
  return <div className={`section-label ${dark ? "section-label-dark" : ""}`}><span>{number}</span><div /><p>{children}</p></div>;
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`project-card ${featured ? "project-card-featured" : ""}`}>
      <div className="project-image-wrap">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-image-overlay" />
        <span className="project-view">View project <ArrowUpRight size={16} /></span>
      </div>
      <div className="project-meta"><div><h3>{project.title}</h3><p>{project.note}</p></div><span>{project.year}</span></div>
    </Link>
  );
}

export function Home() {
  return (
    <PageShell>
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">Architecture · Design · Visualization · Branding</p>
          <h1>Making<br /><em>room for</em><br />what matters.</h1>
          <div className="hero-bottom">
            <p>We shape quietly expressive spaces, images, and identities for the people who inhabit them.</p>
            <Link href="/projects" className="button button-light">View projects <MoveRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-image"><img src={images.villa} alt="Modern concrete residence by LUXH Works" /><div className="hero-image-caption"><span>01 — House 14</span><span>2024</span></div></div>
        <a href="#intro" className="hero-scroll">Scroll to explore <ArrowDownRight size={16} /></a>
      </section>

      <section className="intro" id="intro">
        <SectionLabel number="01">LUXH Works / A multidisciplinary studio</SectionLabel>
        <div className="intro-grid">
          <h2>Quietly bold<br /><em>by design.</em></h2>
          <div className="intro-copy"><p>We are an independent design practice working across architecture, interiors, visualization, and identity. Our work starts with a simple question: what should this place make possible?</p><Link href="/about" className="text-link">More about the studio <ArrowUpRight size={16} /></Link></div>
        </div>
        <div className="intro-stats"><div><strong>08</strong><span>Years of shaping<br />thoughtful environments</span></div><div><strong>47</strong><span>Projects across<br />five countries</span></div><div><strong>11</strong><span>Creative disciplines<br />under one roof</span></div></div>
      </section>

      <section className="featured">
        <SectionLabel number="02">Selected work / 2022—2024</SectionLabel>
        <div className="featured-head"><h2>Selected<br /><em>projects.</em></h2><Link href="/projects" className="text-link">Explore all work <ArrowUpRight size={16} /></Link></div>
        <div className="featured-grid">
          <ProjectCard project={projects[0]} featured />
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-orb" />
        <SectionLabel number="03" dark>Our approach / Looking closely</SectionLabel>
        <div className="manifesto-content"><p className="manifesto-kicker">For us, design is not decoration.</p><h2>It is a way of<br /><em>paying attention.</em></h2><p className="manifesto-copy">To the changing light. To how a hand meets a surface. To a story that needs its own voice. We look for the small, specific moves that make a project feel inevitable.</p><Link href="/services" className="button button-outline-light">Our capabilities <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="services-preview">
        <SectionLabel number="04">What we do / One studio, many lenses</SectionLabel>
        <div className="service-rows">
          {services.map((service) => <Link href="/services" className="service-row" key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.items.join(" · ")}</p><ArrowUpRight size={20} /></Link>)}
        </div>
      </section>

      <CTA />
    </PageShell>
  );
}

function CTA() {
  return <section className="cta"><p>Have a project in mind?</p><h2>Let's create<br /><em>something great.</em></h2><Link href="/contact" className="button button-light">Start a conversation <ArrowUpRight size={17} /></Link><div className="cta-mark">LW</div></section>;
}

export function AboutPage() {
  return (
    <PageShell>
      <section className="page-hero page-hero-about">
        <p className="eyebrow">About LUXH Works</p>
        <h1>Small studio.<br /><em>Large intention.</em></h1>
        <p className="page-hero-copy">We bring architecture and visual communication into the same conversation—because the strongest ideas deserve to be felt from every angle.</p>
      </section>
      <section className="about-story">
        <div className="about-image"><img src={images.coastal} alt="Coastal architectural project" /><span>On site / Phan Thiet, 2023</span></div>
        <div className="about-copy"><SectionLabel number="01">The studio / Ho Chi Minh City</SectionLabel><h2>Design with<br /><em>a pulse.</em></h2><p>LUXH Works was founded on the belief that restraint can be memorable. We partner with private clients, developers, and cultural brands to make places and visual systems that feel as good as they look.</p><p>Our process is collaborative and exacting. We combine close listening with a deep respect for material, context, and the everyday rituals that give a project its life.</p><Link href="/contact" className="text-link">Work with us <ArrowUpRight size={16} /></Link></div>
      </section>
      <section className="founder"><div className="founder-title"><SectionLabel number="02" dark>Founder / Designer</SectionLabel><h2>Lin<strong>h</strong><br /><em>Nguyen.</em></h2></div><div className="founder-content"><p className="large-copy">An architect and creative director with an eye for the spaces between precision and feeling.</p><div className="founder-details"><div><span>Background</span><p>Architecture and visual design across residential, hospitality, and cultural projects.</p></div><div><span>Education</span><p>B.Arch, Ho Chi Minh City University of Architecture, 2015.</p></div><div><span>Experience</span><p>Independent practice since 2018, with work featured across Vietnam and Southeast Asia.</p></div></div></div></section>
      <section className="expertise"><SectionLabel number="03">Skills / How we think and make</SectionLabel><div className="expertise-grid"><div><span>01</span><h3>Spatial thinking</h3><p>Architecture, interiors, material, proportion, light.</p></div><div><span>02</span><h3>Visual narrative</h3><p>Art direction, visualization, image making, storytelling.</p></div><div><span>03</span><h3>Identity systems</h3><p>Brand strategy, visual identity, editorial, digital.</p></div></div></section>
      <CTA />
    </PageShell>
  );
}

export function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Architecture", "Interior", "3D Visualization", "Graphic Design", "Branding"];
  const filtered = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);
  return (
    <PageShell>
      <section className="page-hero projects-hero"><p className="eyebrow">Portfolio / Selected work</p><h1>Ideas made<br /><em>visible.</em></h1><p className="page-hero-copy">A selection of spaces, images, and identities shaped with care.</p></section>
      <section className="projects-section">
        <div className="filter-row" role="group" aria-label="Project categories">{filters.map((item) => <button onClick={() => setFilter(item)} className={filter === item ? "filter-active" : ""} key={item}>{item}</button>)}</div>
        <div className="projects-grid">{filtered.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        {filtered.length === 0 && <p className="empty">More work in this discipline is on its way.</p>}
      </section>
      <CTA />
    </PageShell>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2);
  return (
    <PageShell>
      <section className="project-detail-hero"><Link href="/projects" className="back-link"><ChevronLeft size={17} /> All projects</Link><p className="eyebrow">{project.category} / {project.year}</p><h1>{project.title}</h1><div className="project-detail-meta"><div><span>Location</span><p>{project.location}</p></div><div><span>Client</span><p>{project.client}</p></div><div><span>Scope</span><p>{project.note}</p></div></div></section>
      <section className="project-detail-image project-main-image"><img src={project.image} alt={project.title} /></section>
      <section className="project-narrative"><div><SectionLabel number="Project story">A deliberate response</SectionLabel></div><div><p className="large-copy">{project.description}</p><p>Every project begins with a close reading of its context—the site, the brief, the people who will use it. We turn those findings into a clear design language, testing each decision against the experience it creates.</p><p>Here, a limited palette and a sequence of framed openings became the foundation for an atmosphere that is both composed and generous.</p></div></section>
      <section className="project-pair"><img src={images.modern} alt="Architectural detail" /><div><img src={images.interior} alt="Interior material palette" /><p>Light, material, and scale are considered together from the first line to the final image.</p></div></section>
      <section className="related"><SectionLabel number="Related work">Continue exploring</SectionLabel><div className="related-grid">{related.map((item) => <ProjectCard key={item.slug} project={item} />)}</div></section>
    </PageShell>
  );
}

export function ServicesPage() {
  return (
    <PageShell>
      <section className="page-hero services-hero"><p className="eyebrow">Services / A full creative practice</p><h1>From first thought<br /><em>to final frame.</em></h1><p className="page-hero-copy">We bring the right mix of strategy, craft, and technical rigor to every phase of a project.</p></section>
      <section className="services-list">
        {services.map((service, index) => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><div className="service-card-main"><h2>{service.title}</h2><p>{service.text}</p><ul>{service.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div><Link href="/contact" className="circle-link" aria-label={`Start a ${service.title} project`}><ArrowUpRight size={22} /></Link><div className="service-ghost">0{index + 1}</div></article>)}
      </section>
      <section className="services-note"><p>Not sure which service you need?</p><h2>Bring the question.<br /><em>We’ll find the shape.</em></h2><Link href="/contact" className="text-link">Let’s talk about it <ArrowUpRight size={16} /></Link></section>
    </PageShell>
  );
}

export function ContactPage() {
  const submitForm = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); event.currentTarget.reset(); toast.success("Thank you — we’ll be in touch shortly."); };
  return (
    <PageShell>
      <section className="contact-hero"><p className="eyebrow eyebrow-light">Contact / New projects and thoughtful conversations</p><h1>Let's work<br /><em>together.</em></h1><div className="contact-intro"><p>Tell us a little about what you are making. We usually reply within two working days.</p><a href="mailto:hello@luxhworks.com" className="button button-light">hello@luxhworks.com <ArrowUpRight size={17} /></a></div><div className="contact-mark">LW</div></section>
      <section className="contact-main"><div className="contact-details"><SectionLabel number="01">Get in touch / Visit by appointment</SectionLabel><div className="contact-detail-block"><span>Phone</span><a href="tel:+842873048890">+84 28 7304 8890</a></div><div className="contact-detail-block"><span>Studio</span><p>82 Nguyen Hue, District 1<br />Ho Chi Minh City, Vietnam</p></div><div className="contact-detail-block"><span>Elsewhere</span><div className="social-row"><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={13} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a></div></div><a className="map-link" href="https://maps.google.com/?q=82+Nguyen+Hue+District+1+Ho+Chi+Minh+City" target="_blank" rel="noreferrer"><span>Open in Google Maps</span><ArrowUpRight size={16} /><div className="map-grid"><i /><i /><i /><b /></div></a></div>
        <form className="contact-form" onSubmit={submitForm}><div className="form-intro"><span>02</span><h2>Start a project</h2></div><label>Your name<input name="name" type="text" placeholder="Name" required /></label><label>Email address<input name="email" type="email" placeholder="you@company.com" required /></label><label>Phone number<input name="phone" type="tel" placeholder="Optional" /></label><label>What can we help with?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Architectural Design</option><option>Interior & Exterior Concepts</option><option>3D Visualization</option><option>Branding & Graphic Design</option><option>Something else</option></select></label><label>Tell us about the project<textarea name="details" placeholder="A few words about the brief, place, or idea…" rows={5} required /></label><div className="form-split"><label>Budget<input name="budget" type="text" placeholder="Optional" /></label><label>Timeline<input name="timeline" type="text" placeholder="Optional" /></label></div><button type="submit" className="button button-dark">Send inquiry <ArrowUpRight size={17} /></button></form>
      </section>
    </PageShell>
  );
}
