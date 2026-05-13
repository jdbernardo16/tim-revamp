// shell.jsx — nav, footer, shared primitives, product catalog
// Exposes: Nav, Footer, Section, Container, Button, Pill, Badge, Field,
// Hairline, PRODUCTS, goTo (routing helper).

const { useState, useEffect, useRef } = React;

// ----- routing helper (state lives in App; this just dispatches) -----
const goTo = (route, params = {}) => {
  window.dispatchEvent(new CustomEvent('tim:navigate', { detail: { route, params } }));
  window.scrollTo({ top: 0, behavior: 'instant' });
};

// ----- product catalog (single source of truth) -----
const PRODUCTS = {
  'dollar-message': {
    id: 'dollar-message',
    name: 'Your Dollar Message',
    tagline: 'A $29 mini-training to find the one sentence that sells you.',
    price: 29, currency: '$',
    bullets: [
      '60-minute self-paced training',
      'The "Dollar Message" worksheet',
      'Joanna\'s 3-question clarity prompt',
      'Lifetime access',
    ],
    cta: 'Get it for $29',
    kind: 'lead-magnet',
  },
  'vault': {
    id: 'vault',
    name: 'The Vault',
    tagline: 'A free live session with Joanna — June 5.',
    price: 0, currency: 'FREE',
    bullets: [
      'Live with Joanna · June 5',
      'Get a feel for the work',
      'Q&A — bring your message',
      'Replay sent to attendees',
    ],
    cta: 'Save my seat — free',
    kind: 'free',
  },
  'breakthrough': {
    id: 'breakthrough',
    name: 'A Breakthrough Session',
    tagline: 'One session with Joanna to see clearly.',
    price: 2000,
    bullets: [
      'A single private session',
      'You bring what you\'ve been trying to say',
      'We find what\'s actually true underneath it',
      'You leave with: clear direction, a sharper message, the next step',
    ],
    cta: 'Book',
    kind: 'private',
  },
  'four-session': {
    id: 'four-session',
    name: '4-Session Training Package',
    tagline: 'For leaders ready to build this with consistency.',
    price: 8000,
    bullets: [
      'Four private sessions with Joanna',
      'Uncover your defining moment',
      'Clarify your message — your deeper why',
      'Build your first leadership message + differentiator',
    ],
    cta: 'Book',
    kind: 'private',
  },
  'phase-1': {
    id: 'phase-1',
    phase: 'PHASE 1',
    name: 'Tell Your Story — My Why',
    tagline: 'The 90-day Mastermind. Includes the retreat.',
    price: 3200, value: 12000,
    bullets: [
      'Your defining moment (written + spoken)',
      'Your deeper why',
      'Your first leadership message',
      'Your unique differentiator',
      'Live 3–5 minute story share at the retreat',
      'Peer feedback and refinement',
    ],
    leaveWith: '"I know what defines me and why it matters."',
    cta: 'Join the program',
    icp: 'speaker',
    kind: 'program',
  },
  'phase-2': {
    id: 'phase-2',
    phase: 'PHASE 2',
    name: 'Move the Room — My Signature Talk',
    tagline: 'Your story becomes a structured talk that moves people.',
    price: 12000, value: 20000,
    bullets: [
      'A 7-minute signature talk',
      'A clear problem → solution message',
      'Emotional connection points + defined CTA',
      'Live coaching with Joanna',
      'Retreat speaking opportunity (featured)',
      'Professional video + photos · social content',
    ],
    leaveWith: '"I can clearly communicate a message that lands."',
    cta: 'Take the stage',
    icp: 'authority',
    kind: 'program',
  },
  'phase-3': {
    id: 'phase-3',
    phase: 'PHASE 3',
    name: 'Master My Message — Keynote or TEDx',
    tagline: 'This is where you become known.',
    price: 25000, value: 40000,
    bullets: [
      'A refined, repeatable signature message',
      'Your thought-leader perspective',
      'Your "special sauce" (what you do differently)',
      'A one-liner people can repeat',
      'Speaker cohort training + private sessions',
      'Full speaking reel + 1-minute social clip',
    ],
    leaveWith: '"I am known for something specific and valuable."',
    cta: 'Create my keynote',
    icp: 'authority',
    kind: 'program',
  },
  'phase-4': {
    id: 'phase-4',
    phase: 'PHASE 4',
    name: 'Build My Team — My Scaling Strategy',
    tagline: 'Your message becomes a system.',
    price: 250000, priceLabel: 'Starts at $250,000',
    bullets: [
      'Your leadership framework',
      'A team communication system',
      'A mentorship structure based on your message',
      'Psychological safety + trust inside your team',
      'A business strategy to scale',
    ],
    leaveWith: '"I build leaders, not just results."',
    cta: 'Scale my business',
    icp: 'legacy',
    kind: 'program',
  },
  'phase-5': {
    id: 'phase-5',
    phase: 'PHASE 5',
    name: 'Be Remembered — My Legacy Framework',
    tagline: 'Your work outlives you.',
    price: 1000000, priceLabel: 'Starts at $1M',
    bullets: [
      'Your legacy blueprint',
      'Your impact thesis',
      'Your succession plan',
      'Voice + wealth + long-term contribution, aligned',
      'A body of work that defines your legacy',
    ],
    leaveWith: '"My life\'s work carries beyond me."',
    cta: 'Craft my legacy',
    icp: 'legacy',
    kind: 'program',
  },
};

const fmt = (n) => '$' + n.toLocaleString('en-US');
const priceOf = (p) => p.priceLabel ? p.priceLabel : (p.price === 0 ? 'Free' : fmt(p.price));

// ----- shared chrome -----

const Nav = ({ route }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onClickAway = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('click', onClickAway);
    return () => document.removeEventListener('click', onClickAway);
  }, []);

  const menus = [
    { id: 'about', label: 'About', items: [
      { label: 'About Joanna', route: 'about' },
      { label: 'The Journey', route: 'journey' },
    ]},
    { id: 'work', label: 'Work With Me', items: [
      { label: 'All Programs', route: 'work' },
      { label: 'Tell Your Story (Phase 1)', route: 'product', params: { id: 'phase-1' } },
      { label: 'Signature Talk (Phase 2)', route: 'product', params: { id: 'phase-2' } },
      { label: 'Keynote · TEDx (Phase 3)', route: 'product', params: { id: 'phase-3' } },
      { label: 'Private Training', route: 'legacy' },
      { label: 'Corporate', route: 'corporate' },
      { label: '— Book Joanna to speak', route: 'speaking' },
    ]},
    { id: 'stories', label: 'Success Stories', route: 'stories' },
    { id: 'community', label: 'Community', items: [
      { label: 'The Vault (Free · June 5)', route: 'product', params: { id: 'vault' } },
      { label: 'Monthly Gathering', route: 'community' },
      { label: 'Events', route: 'community' },
    ]},
    { id: 'faq', label: 'FAQ', route: 'faq' },
  ];

  return (
    <header className="nav" ref={navRef}>
      <div className="nav-inner">
        <a className="brand" onClick={() => goTo('home')}>
          <img className="brand-logo" src="assets/logo-transparent.png" alt="True Influence Method" />
          <span className="brand-name">True Influence Method</span>
        </a>
        <nav className="nav-items">
          {menus.map((m) => (
            <div
              key={m.id}
              className={"nav-item" + (openMenu === m.id ? ' open' : '')}
              onMouseEnter={() => m.items && setOpenMenu(m.id)}
              onMouseLeave={() => m.items && setOpenMenu(null)}
            >
              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  if (m.route) { goTo(m.route); setOpenMenu(null); }
                  else setOpenMenu(openMenu === m.id ? null : m.id);
                }}
              >
                {m.label}
                {m.items && <span className="nav-caret">▾</span>}
              </button>
              {m.items && openMenu === m.id && (
                <div className="nav-menu">
                  {m.items.map((it, i) => (
                    <button key={i} type="button"
                      className="nav-menu-item"
                      onClick={() => { goTo(it.route, it.params); setOpenMenu(null); }}>
                      {it.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <button className="btn btn-primary btn-sm" onClick={() => goTo('start')}>
          Start →
        </button>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <img className="footer-logo" src="assets/logo-transparent.png" alt="True Influence Method" />
        <div className="footer-sig">— with Joanna</div>
      </div>
      <div className="footer-cols">
        <div>
          <div className="footer-h">Start</div>
          <a onClick={() => goTo('start')}>Find your path</a>
          <a onClick={() => goTo('product', { id: 'dollar-message' })}>Your Dollar Message · $29</a>
          <a onClick={() => goTo('product', { id: 'vault' })}>The Vault · Free June 5</a>
        </div>
        <div>
          <div className="footer-h">Work with me</div>
          <a onClick={() => goTo('speaker')}>The Speaker</a>
          <a onClick={() => goTo('authority')}>The Authority</a>
          <a onClick={() => goTo('legacy')}>The Legacy</a>
        </div>
        <div>
          <div className="footer-h">More</div>
          <a onClick={() => goTo('speaking')}>Book Joanna to speak</a>
          <a onClick={() => goTo('about')}>About Joanna</a>
          <a onClick={() => goTo('stories')}>Success Stories</a>
          <a onClick={() => goTo('faq')}>FAQ</a>
        </div>
      </div>
    </div>
    <div className="footer-base">
      <span>© 2026 True Influence Method</span>
      <span>hello@trueinfluencemethod.com</span>
      <span>Instagram · LinkedIn</span>
    </div>
  </footer>
);

// ----- primitives -----

const Container = ({ children, narrow, style }) => (
  <div className={"container" + (narrow ? ' narrow' : '')} style={style}>{children}</div>
);

const Section = ({ children, tone = 'paper', style, id }) => (
  <section id={id} className={"section section-" + tone} style={style}>{children}</section>
);

const Button = ({ children, primary, secondary, ghost, size = 'md', onClick, style }) => {
  const cls = ['btn'];
  if (primary) cls.push('btn-primary');
  else if (secondary) cls.push('btn-secondary');
  else if (ghost) cls.push('btn-ghost');
  if (size === 'lg') cls.push('btn-lg');
  if (size === 'sm') cls.push('btn-sm');
  return <button type="button" className={cls.join(' ')} onClick={onClick} style={style}>{children}</button>;
};

const Pill = ({ children, tone = 'ink' }) => (
  <span className={"pill pill-" + tone}>{children}</span>
);

const Eyebrow = ({ children, style }) => (
  <div className="eyebrow" style={style}>{children}</div>
);

const Hairline = ({ style }) => <div className="hairline" style={style} />;

// Sketchy underline accent for headlines
const Underline = ({ children }) => (
  <span className="underline-accent">
    {children}
    <svg className="underline-svg" viewBox="0 0 200 12" preserveAspectRatio="none">
      <path d="M2 8 Q 50 2 100 7 T 198 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  </span>
);

const Quote = ({ children, by }) => (
  <figure className="pull-quote">
    <span className="pull-quote-mark">"</span>
    <blockquote>{children}</blockquote>
    {by && <figcaption>— {by}</figcaption>}
  </figure>
);

const Field = ({ label, type = 'text', placeholder, value, onChange, style }) => (
  <label className="field" style={style}>
    <span className="field-label">{label}</span>
    <input type={type} placeholder={placeholder} value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)} />
  </label>
);

// Lightweight image-placeholder block — labeled so the design reads clearly
const Plate = ({ label = 'photo', h = 320, w, src, style }) => (
  <div className="plate" style={{ height: h, width: w, ...style }}>
    {src ? <img src={src} alt={label} /> : <span>{label}</span>}
  </div>
);

Object.assign(window, {
  goTo, PRODUCTS, priceOf, fmt,
  Nav, Footer, Container, Section, Button, Pill, Eyebrow,
  Hairline, Underline, Quote, Field, Plate,
});
