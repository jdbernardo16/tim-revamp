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
const PRODUCTS = window.PRODUCTS || {};

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

  const G = window.GLOBAL || {};
  const menus = G.navMenus || [];

  return (
    <header className="nav" ref={navRef}>
      <div className="nav-inner">
        <a className="brand" onClick={() => goTo('home')}>
          <img className="brand-logo" src="assets/logo-transparent.png" alt="True Influence Method" />
          <span className="brand-name">{(window.GLOBAL && window.GLOBAL.siteName) || 'True Influence Method'}</span>
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

const Footer = () => {
  const G = window.GLOBAL || {};
  const cols = G.footerCols || [];
  return (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <img className="footer-logo" src="assets/logo-transparent.png" alt={G.siteName || 'True Influence Method'} />
        <div className="footer-sig">— with Joanna</div>
      </div>
      <div className="footer-cols">
        {cols.map((col, i) => (
          <div key={i}>
            <div className="footer-h">{col.heading}</div>
            {(col.links || []).map((link, j) => (
              <a key={j} onClick={() => goTo(link.route, link.params)}>{link.label}</a>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="footer-base">
      <span>&copy; {G.year || 2026} {G.siteName || 'True Influence Method'}</span>
      <span>{G.email || 'hello@trueinfluencemethod.com'}</span>
      <span>Instagram &middot; LinkedIn</span>
    </div>
  </footer>
  );
};

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
