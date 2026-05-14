// shell.jsx — nav, footer, shared primitives, product catalog
// Exposes: Nav, Footer, Section, Container, Button, Pill, Badge, Field,
// Hairline, PRODUCTS, goTo (routing helper).

const { useState, useEffect, useRef } = React;

// ----- routing helper (state lives in App; this just dispatches) -----
const goTo = (route, params = {}) => {
    window.dispatchEvent(
        new CustomEvent("tim:navigate", { detail: { route, params } }),
    );
    window.scrollTo({ top: 0, behavior: "instant" });
};

// ----- product catalog (single source of truth) -----
const PRODUCTS = window.PRODUCTS || {};

const fmt = (n) => "$" + n.toLocaleString("en-US");
const priceOf = (p) =>
    p.priceLabel ? p.priceLabel : p.price === 0 ? "Free" : fmt(p.price);

// ----- shared chrome -----

const Nav = ({ route }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        const onClickAway = (e) => {
            if (navRef.current && !navRef.current.contains(e.target))
                setOpenMenu(null);
        };
        document.addEventListener("click", onClickAway);
        return () => document.removeEventListener("click", onClickAway);
    }, []);

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [sidebarOpen]);

    const G = window.GLOBAL || {};
    const menus = G.navMenus || [];

    const closeSidebar = () => {
        setSidebarOpen(false);
        setExpandedId(null);
    };

    const handleSidebarNav = (m) => {
        if (m.route) {
            goTo(m.route);
            closeSidebar();
        } else {
            setExpandedId(expandedId === m.id ? null : m.id);
        }
    };

    const handleSidebarSubNav = (it) => {
        goTo(it.route, it.params);
        closeSidebar();
    };

    return (
        <>
            <header className="nav" ref={navRef}>
                <div className="nav-inner">
                    <a className="brand" onClick={() => goTo("home")}>
                        <img
                            className="brand-logo"
                            src="assets/logo-transparent.png"
                            alt="True Influence Method"
                        />
                        <span className="brand-name">
                            {(window.GLOBAL && window.GLOBAL.siteName) ||
                                "True Influence Method"}
                        </span>
                    </a>
                    <nav className="nav-items">
                        {menus.map((m) => (
                            <div
                                key={m.id}
                                className={
                                    "nav-item" + (openMenu === m.id ? " open" : "")
                                }
                                onMouseEnter={() => m.items && setOpenMenu(m.id)}
                                onMouseLeave={() => m.items && setOpenMenu(null)}
                            >
                                <button
                                    type="button"
                                    className="nav-link"
                                    onClick={() => {
                                        if (m.route) {
                                            goTo(m.route);
                                            setOpenMenu(null);
                                        } else
                                            setOpenMenu(
                                                openMenu === m.id ? null : m.id,
                                            );
                                    }}
                                >
                                    {m.label}
                                    {m.items && (
                                        <span className="nav-caret">▾</span>
                                    )}
                                </button>
                                {m.items && openMenu === m.id && (
                                    <div className="nav-menu">
                                        {m.items.map((it, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                className="nav-menu-item"
                                                onClick={() => {
                                                    goTo(it.route, it.params);
                                                    setOpenMenu(null);
                                                }}
                                            >
                                                {it.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    {/* Desktop Start button — hidden on mobile via CSS */}
                    <button
                        className="btn btn-primary btn-sm btn-start-desktop"
                        onClick={() => goTo("start")}
                    >
                        Start →
                    </button>

                    {/* Hamburger — visible on mobile */}
                    <button
                        className={"hamburger" + (sidebarOpen ? " open" : "")}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            {/* Sidebar overlay + drawer (outside header to avoid backdrop-filter containment) */}
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar} />
            )}
            <div className={"sidebar" + (sidebarOpen ? " open" : "")}>
                <div className="sidebar-header">
                    <span className="sidebar-title">Menu</span>
                    <button className="sidebar-close" onClick={closeSidebar}>
                        ✕
                    </button>
                </div>
                <nav className="sidebar-nav">
                    {menus.map((m) => (
                        <div key={m.id} className="sidebar-group">
                            <button
                                type="button"
                                className={"sidebar-link" + (expandedId === m.id ? " expanded" : "")}
                                onClick={() => handleSidebarNav(m)}
                            >
                                {m.label}
                                {m.items && (
                                    <span className={"sidebar-caret" + (expandedId === m.id ? " open" : "")}>▾</span>
                                )}
                            </button>
                            {m.items && expandedId === m.id && (
                                <div className="sidebar-sub">
                                    {m.items.map((it, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            className="sidebar-sub-link"
                                            onClick={() => handleSidebarSubNav(it)}
                                        >
                                            {it.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="sidebar-cta">
                        <button
                            className="btn btn-primary"
                            onClick={() => { goTo("start"); closeSidebar(); }}
                        >
                            Start →
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

const Footer = () => {
    const G = window.GLOBAL || {};
    const cols = G.footerCols || [];
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <img
                        className="footer-logo"
                        src="assets/logo-transparent.png"
                        alt={G.siteName || "True Influence Method"}
                    />
                    <div className="footer-sig">— with Joanna</div>
                </div>
                <div className="footer-cols">
                    {cols.map((col, i) => (
                        <div key={i}>
                            <div className="footer-h">{col.heading}</div>
                            {(col.links || []).map((link, j) => (
                                <a
                                    key={j}
                                    onClick={() =>
                                        goTo(link.route, link.params)
                                    }
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer-base">
                <span>
                    &copy; {G.year || 2026}{" "}
                    {G.siteName || "True Influence Method"}
                </span>
                <span>{G.email || "info@trueinfluencemethod.com"}</span>
                <span>Instagram &middot; LinkedIn</span>
            </div>
        </footer>
    );
};

// ----- primitives -----

const Container = ({ children, narrow, style }) => (
    <div className={"container" + (narrow ? " narrow" : "")} style={style}>
        {children}
    </div>
);

const Section = ({ children, tone = "paper", style, id }) => (
    <section id={id} className={"section section-" + tone} style={style}>
        {children}
    </section>
);

const Button = ({
    children,
    primary,
    secondary,
    ghost,
    size = "md",
    onClick,
    style,
}) => {
    const cls = ["btn"];
    if (primary) cls.push("btn-primary");
    else if (secondary) cls.push("btn-secondary");
    else if (ghost) cls.push("btn-ghost");
    if (size === "lg") cls.push("btn-lg");
    if (size === "sm") cls.push("btn-sm");
    return (
        <button
            type="button"
            className={cls.join(" ")}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
};

const Pill = ({ children, tone = "ink" }) => (
    <span className={"pill pill-" + tone}>{children}</span>
);

const Eyebrow = ({ children, style }) => (
    <div className="eyebrow" style={style}>
        {children}
    </div>
);

const Hairline = ({ style }) => <div className="hairline" style={style} />;

// Sketchy underline accent for headlines
const Underline = ({ children }) => (
    <span className="underline-accent">
        {children}
        <svg
            className="underline-svg"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
        >
            <path
                d="M2 8 Q 50 2 100 7 T 198 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
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

const Field = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    style,
}) => (
    <label className="field" style={style}>
        <span className="field-label">{label}</span>
        <input
            type={type}
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    </label>
);

// Lightweight image-placeholder block — labeled so the design reads clearly
const Plate = ({ label = "photo", h = 320, w, src, style }) => (
    <div className="plate" style={{ height: h, width: w, ...style }}>
        {src ? <img src={src} alt={label} /> : <span>{label}</span>}
    </div>
);

// ----- external checkout URL mapping (redirects, no static form) -----
const CHECKOUT_URLS = {
    "dollar-message": "https://go.trueinfluencemethod.com/million-dollar-purchase-checkout-page",
    "phase-1": "https://go.trueinfluencemethod.com/checkout-phase-1-375961",
    "phase-2": "https://go.trueinfluencemethod.com/checkout-phase-2-487563",
    "phase-3": "https://go.trueinfluencemethod.com/checkout-phase-3-888428",
    "phase-4": "https://go.trueinfluencemethod.com/checkout-phase-4-471085",
    "phase-5":
        "https://go.trueinfluencemethod.com/phase-5-be-remembered---legacy-framework-9258",
    breakthrough:
        "https://go.trueinfluencemethod.com/checkout---breakthrough-session",
    "four-session":
        "https://go.trueinfluencemethod.com/checkout-4-session-training-package",
};

// ----- per-page SEO metadata -----
const PAGE_SEO = {
    home:      { title: "True Influence Method \u2014 with Joanna", desc: "Leaders find their message, build trust, and earn influence \u2014 without speaking. Work with Joanna." },
    speaker:   { title: "The Speaker \u2014 Find Your Message | True Influence Method", desc: "You know you have something to say \u2014 but you can\u2019t clearly say what defines you yet. Start Phase 1 and find your message." },
    authority: { title: "The Authority \u2014 Build Your Talk | True Influence Method", desc: "You know your work \u2014 but you over-explain it when it matters most. Build your signature talk in Phase 2." },
    legacy:    { title: "The Legacy \u2014 Define Your Legacy | True Influence Method", desc: "You\u2019ve built something significant but you aren\u2019t clearly known for what you do differently. Define your legacy." },
    about:     { title: "About Joanna \u2014 True Influence Method", desc: "Joanna helps leaders find the words for the work they already do \u2014 and build the rooms where those words land." },
    journey:   { title: "The Journey \u2014 True Influence Method", desc: "How Joanna found the work \u2014 from a caf\u00e9 conversation to 300+ leaders guided." },
    stories:   { title: "Success Stories \u2014 True Influence Method", desc: "Real women, real results across every phase of the True Influence Method." },
    faq:       { title: "FAQ \u2014 True Influence Method", desc: "Answers to common questions about the True Influence Method, programs, and getting started." },
    speaking:  { title: "Book Joanna to Speak \u2014 True Influence Method", desc: "Book Joanna for your next event, keynote, or corporate training." },
    community: { title: "Community \u2014 True Influence Method", desc: "Monthly gatherings, events, and community for leaders using the True Influence Method." },
    corporate: { title: "Corporate Training \u2014 True Influence Method", desc: "The True Influence Method delivered to leadership teams of 6\u201324." },
    work:      { title: "All Programs \u2014 True Influence Method", desc: "Explore all True Influence Method programs and find the path that fits where you are." },
    product:   { title: "Program Details \u2014 True Influence Method", desc: "Detailed information about True Influence Method programs and products." },
    assessment:{ title: "Influence Path Assessment \u2014 True Influence Method", desc: "Take the 5-minute assessment to find your phase in the True Influence Method." },
};

Object.assign(window, {
    goTo,
    PRODUCTS,
    CHECKOUT_URLS,
    PAGE_SEO,
    priceOf,
    fmt,
    Nav,
    Footer,
    Container,
    Section,
    Button,
    Pill,
    Eyebrow,
    Hairline,
    Underline,
    Quote,
    Field,
    Plate,
});
