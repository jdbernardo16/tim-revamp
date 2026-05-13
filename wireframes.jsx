// Women of Influence — sketchy wireframe set
// Single source of truth for all the artboards.

const { useState } = React;

// -------- shared sketchy primitives --------
const InkBox = ({ children, style, className = '', dashed = false, ...rest }) => (
  <div
    className={className}
    style={{
      border: `1.5px ${dashed ? 'dashed' : 'solid'} var(--ink)`,
      borderRadius: 6,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

const Ph = ({ label = 'photo', h = 120, style = {} }) => (
  <div
    style={{
      height: h,
      border: '1.5px dashed var(--ink-soft)',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ink-soft)',
      fontFamily: 'ui-monospace, "SF Mono", monospace',
      fontSize: 10,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      background:
        'repeating-linear-gradient(45deg, transparent 0 8px, rgba(0,0,0,0.04) 8px 9px)',
      position: 'relative',
      ...style,
    }}
  >
    <span style={{ background: 'var(--paper)', padding: '2px 6px' }}>{label}</span>
  </div>
);

const Btn = ({ children, primary, full, style = {} }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: '10px 18px',
      border: `1.5px solid ${primary ? 'var(--accent)' : 'var(--ink)'}`,
      background: primary ? 'var(--accent)' : 'transparent',
      color: primary ? 'var(--paper)' : 'var(--ink)',
      borderRadius: 999,
      fontFamily: 'Caveat, cursive',
      fontSize: 20,
      fontWeight: 700,
      width: full ? '100%' : 'auto',
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

const Squiggle = ({ w = 80 }) => (
  <svg width={w} height="10" viewBox={`0 0 ${w} 10`} style={{ display: 'block' }}>
    <path
      d={`M0 5 Q ${w * 0.1} 0, ${w * 0.2} 5 T ${w * 0.4} 5 T ${w * 0.6} 5 T ${w * 0.8} 5 T ${w} 5`}
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const SectLabel = ({ children }) => (
  <div
    style={{
      fontFamily: 'ui-monospace, monospace',
      fontSize: 9,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-soft)',
      marginBottom: 6,
    }}
  >
    {children}
  </div>
);

// -------- top nav (shared across all homepage variants) --------
const Nav = ({ variant = 'light', condensed = false }) => {
  const items = [
    { label: 'About', drop: ['About Joanna', 'The Journey'] },
    {
      label: 'Work With Me',
      drop: ['All Programs', 'Retreat', 'Private Training', 'Corporate', 'Speaking'],
    },
    { label: 'Success Stories' },
    { label: 'Community', drop: ['Monthly Gathering', 'Events'] },
    { label: 'FAQ' },
  ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: condensed ? '10px 18px' : '14px 18px',
        borderBottom: '1px dashed var(--ink-soft)',
        background: variant === 'transparent' ? 'transparent' : 'var(--paper)',
      }}
    >
      <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 22, lineHeight: 1 }}>
        Joanna
        <div
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 7,
            letterSpacing: '0.2em',
            color: 'var(--ink-soft)',
            textTransform: 'uppercase',
            marginTop: -2,
          }}
        >
          Women of Influence
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {items.map((it) => (
          <div
            key={it.label}
            style={{
              fontFamily: 'Patrick Hand, cursive',
              fontSize: 13,
              color: 'var(--ink)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {it.label}
            {it.drop && <span style={{ fontSize: 9, marginLeft: 1 }}>▾</span>}
          </div>
        ))}
        <Btn primary style={{ padding: '6px 14px', fontSize: 16 }}>
          Get Started →
        </Btn>
      </div>
    </div>
  );
};

// shows the dropdown menu pulled out so we can sketch it
const NavWithDropOpen = () => (
  <div style={{ position: 'relative' }}>
    <Nav />
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: '38%',
        background: 'var(--paper)',
        border: '1.5px solid var(--ink)',
        borderRadius: 6,
        padding: '10px 14px',
        boxShadow: '4px 4px 0 var(--ink-soft)',
        fontFamily: 'Patrick Hand, cursive',
        fontSize: 13,
        zIndex: 5,
      }}
    >
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 8, color: 'var(--ink-soft)', marginBottom: 6, letterSpacing: '.15em' }}>
        WORK WITH ME ▾
      </div>
      {['Retreat (start here)', 'Private Training', 'The Vault', 'Corporate', 'Speaking'].map((x) => (
        <div key={x} style={{ padding: '3px 0' }}>{x}</div>
      ))}
    </div>
  </div>
);

const Footer = () => (
  <div
    style={{
      padding: '20px 18px 24px',
      borderTop: '1px dashed var(--ink-soft)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      fontFamily: 'Patrick Hand, cursive',
      fontSize: 12,
      color: 'var(--ink-soft)',
    }}
  >
    <div>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: 'var(--ink)' }}>Joanna</div>
      <div>© Women of Influence</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}>
      <div>hello@joanna.co</div>
      <div>instagram · linkedin</div>
    </div>
  </div>
);

// -------- LogoBar + testimonial primitives --------
const LogoBar = () => (
  <div style={{ padding: '14px 18px', borderTop: '1px dashed var(--ink-soft)', borderBottom: '1px dashed var(--ink-soft)' }}>
    <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '.18em', textAlign: 'center', marginBottom: 8 }}>
      AS SEEN / CLIENTS FROM
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around', gap: 8 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          height: 22, flex: 1,
          border: '1.5px dashed var(--ink-soft)', borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--ink-soft)',
        }}>logo</div>
      ))}
    </div>
  </div>
);

const Testimonial = ({ quote, name, role, compact }) => (
  <div style={{
    border: '1.5px solid var(--ink)',
    borderRadius: 8,
    padding: compact ? '10px 12px' : '14px 14px',
    background: 'var(--paper)',
    position: 'relative',
  }}>
    <div style={{
      position: 'absolute', top: -10, left: 10,
      fontFamily: 'Caveat, cursive', fontSize: 32, lineHeight: 1,
      color: 'var(--accent)', background: 'var(--paper)', padding: '0 4px',
    }}>“</div>
    <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: compact ? 12 : 13, lineHeight: 1.4, color: 'var(--ink)' }}>
      {quote}
    </div>
    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        border: '1.5px dashed var(--ink-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'ui-monospace, monospace', fontSize: 8, color: 'var(--ink-soft)',
      }}>{name[0]}</div>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 11 }}>
        <b>{name}</b> · <span style={{ color: 'var(--ink-soft)' }}>{role}</span>
      </div>
    </div>
  </div>
);

// =====================================================================
// HOMEPAGE V1 — Big Statement / Single Path
// =====================================================================
const HomeV1 = () => (
  <div style={{ width: 480, minHeight: 1400, background: 'var(--paper)', position: 'relative' }}>
    <Nav />

    {/* hero */}
    <div style={{ padding: '60px 28px 36px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '.2em', marginBottom: 18 }}>
        ↓ ONE PATH · ONE NEXT STEP
      </div>
      <div style={{
        fontFamily: 'Caveat, cursive',
        fontSize: 52, lineHeight: 0.95, fontWeight: 700,
        color: 'var(--ink)',
      }}>
        Speak Your Story.
        <br />
        <span style={{ color: 'var(--accent)' }}>Create Influence.</span>
      </div>
      <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
        <Squiggle w={140} />
      </div>
      <div style={{ marginTop: 14, fontFamily: 'Patrick Hand, cursive', fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.4, maxWidth: 360, margin: '14px auto 0' }}>
        A retreat-led path for women ready to be heard — in the room, on the stage, in the world.
      </div>
      <div style={{ marginTop: 28 }}>
        <Btn primary style={{ fontSize: 24, padding: '14px 32px' }}>Get Started →</Btn>
      </div>
      <div style={{ marginTop: 10, fontFamily: 'Patrick Hand, cursive', fontSize: 11, color: 'var(--ink-soft)' }}>
        no application · instant enrollment
      </div>
    </div>

    {/* 3 tier cards — preview */}
    <div style={{ padding: '14px 22px 28px' }}>
      <SectLabel>Choose your starting line</SectLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { t: 'Beginner', s: 'Phase 1', d: 'The Retreat', tag: '← start here' },
          { t: 'Intermediate', s: 'Phase 2', d: 'Mastermind' },
          { t: 'Advanced', s: 'Phase 3', d: 'Private Training' },
        ].map((c, i) => (
          <div key={i} style={{
            border: '1.5px solid var(--ink)', borderRadius: 8, padding: '12px 10px',
            background: i === 0 ? 'var(--accent-soft)' : 'var(--paper)',
            position: 'relative',
          }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '.15em' }}>{c.s}</div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{c.t}</div>
            <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 12, color: 'var(--ink-soft)', marginTop: 4 }}>{c.d}</div>
            {c.tag && <div style={{
              position: 'absolute', top: -10, right: -6,
              background: 'var(--accent)', color: 'var(--paper)',
              fontFamily: 'Caveat, cursive', fontSize: 14, fontWeight: 700,
              padding: '2px 8px', borderRadius: 999,
              transform: 'rotate(4deg)',
            }}>{c.tag}</div>}
          </div>
        ))}
      </div>
    </div>

    {/* what you'll get strip */}
    <div style={{ padding: '20px 22px', borderTop: '1px dashed var(--ink-soft)' }}>
      <SectLabel>What you walk away with</SectLabel>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>
        ✶ a story worth telling<br/>
        ✶ a voice the room leans toward<br/>
        ✶ a path to paid speaking & press
      </div>
    </div>

    <LogoBar />

    {/* testimonials */}
    <div style={{ padding: '22px 22px 12px' }}>
      <SectLabel>From women in the room</SectLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Testimonial
          quote="I came in unsure of my voice. Left with a keynote and three booked stages."
          name="Maya"
          role="Founder · Tech"
        />
        <Testimonial
          quote="Joanna gives you the language. Everything else opens after that."
          name="Renée"
          role="VP, Media"
        />
      </div>
    </div>

    <Footer />
  </div>
);

// =====================================================================
// HOMEPAGE V2 — Image-First Hero
// =====================================================================
const HomeV2 = () => (
  <div style={{ width: 480, minHeight: 1400, background: 'var(--paper)' }}>
    <Nav variant="transparent" />

    {/* big photo hero with overlay headline */}
    <div style={{ position: 'relative', padding: 0 }}>
      <Ph label="hero portrait of Joanna" h={420} style={{ borderRadius: 0, borderLeft: 0, borderRight: 0 }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '0 24px 28px',
      }}>
        <div style={{ textAlign: 'center', background: 'var(--paper)', padding: '14px 18px', border: '1.5px solid var(--ink)', borderRadius: 10 }}>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 42, lineHeight: 0.95, fontWeight: 700 }}>
            Speak your story.
            <br/>
            <span style={{ color: 'var(--accent)' }}>Create influence.</span>
          </div>
          <div style={{ marginTop: 10 }}>
            <Btn primary style={{ fontSize: 20 }}>Get Started →</Btn>
          </div>
        </div>
      </div>
    </div>

    {/* one-line value prop */}
    <div style={{ padding: '28px 28px 16px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 17, lineHeight: 1.45, color: 'var(--ink)' }}>
        I help women turn lived experience into <i>the kind of voice</i> rooms remember.
      </div>
    </div>

    {/* horizontal 3-step path */}
    <div style={{ padding: '12px 18px 28px' }}>
      <SectLabel>How the path works</SectLabel>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 6 }}>
        {[
          { n: '01', t: 'Beginner', sub: 'The Retreat', open: true },
          { n: '02', t: 'Intermediate', sub: 'Mastermind' },
          { n: '03', t: 'Advanced', sub: 'Private' },
        ].map((s, i) => (
          <React.Fragment key={i}>
            <div style={{
              flex: 1,
              border: '1.5px solid var(--ink)',
              background: s.open ? 'var(--accent-soft)' : 'var(--paper)',
              borderRadius: 8, padding: '12px 8px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--ink-soft)' }}>{s.n}</div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{s.t}</div>
              <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 11, color: 'var(--ink-soft)' }}>{s.sub}</div>
            </div>
            {i < 2 && (
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-soft)', fontFamily: 'Caveat, cursive', fontSize: 22 }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 12, textAlign: 'center', fontFamily: 'Patrick Hand, cursive', fontSize: 12, color: 'var(--ink-soft)' }}>
        most women start with the Retreat ↑
      </div>
    </div>

    <LogoBar />

    {/* testimonials carousel */}
    <div style={{ padding: '20px 18px' }}>
      <SectLabel>Stories</SectLabel>
      <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
        <div style={{ flex: '0 0 70%' }}>
          <Testimonial quote="The first time someone paid me to speak, it was because of what I built here." name="Jules" role="Coach" compact />
        </div>
        <div style={{ flex: '0 0 25%', opacity: 0.4 }}>
          <Testimonial quote="—" name="—" role="—" compact />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 8 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i===1?'var(--ink)':'var(--ink-soft)' }}/>
        ))}
      </div>
    </div>

    {/* secondary CTA band */}
    <div style={{ padding: '22px 28px', textAlign: 'center', background: 'var(--accent-soft)', borderTop: '1.5px dashed var(--ink)', borderBottom: '1.5px dashed var(--ink)' }}>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 28, lineHeight: 1, fontWeight: 700 }}>
        Ready to be heard?
      </div>
      <div style={{ marginTop: 10 }}>
        <Btn primary>Get Started →</Btn>
      </div>
    </div>

    <Footer />
  </div>
);

// =====================================================================
// HOMEPAGE V3 — Split-Screen Editorial
// =====================================================================
const HomeV3 = () => (
  <div style={{ width: 480, minHeight: 1500, background: 'var(--paper)' }}>
    <Nav />

    {/* split hero */}
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', minHeight: 320 }}>
      <div style={{ padding: '36px 22px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '.2em', marginBottom: 14 }}>
          JOANNA ·  COACH · SPEAKER
        </div>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 44, lineHeight: 0.95, fontWeight: 700 }}>
          Speak<br/>your story.<br/><span style={{ color: 'var(--accent)' }}>Create<br/>influence.</span>
        </div>
        <div style={{ marginTop: 14, fontFamily: 'Patrick Hand, cursive', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.4 }}>
          A clear, retreat-led path for women ready to be heard.
        </div>
        <div style={{ marginTop: 18 }}>
          <Btn primary>Get Started →</Btn>
        </div>
      </div>
      <Ph label="editorial portrait" h="auto" style={{ borderRadius: 0, borderRight: 0, borderTop: 0, borderBottom: 0, borderLeft: '1.5px dashed var(--ink-soft)' }} />
    </div>

    {/* 3 wide tier rows */}
    <div style={{ padding: '24px 22px 4px' }}>
      <SectLabel>The path · three phases</SectLabel>
    </div>
    {[
      { tag: 'Phase 01 · start here', t: 'Beginner', sub: 'The Retreat', body: 'A guided in-person reset. Find your story, your stage voice, your first audience.', cta: 'See the Retreat →', open: true },
      { tag: 'Phase 02', t: 'Intermediate', sub: 'Mastermind', body: 'Sharpen the offer. Land the rooms. A small cohort, on a rolling cycle.', cta: 'Learn more →' },
      { tag: 'Phase 03', t: 'Advanced', sub: 'Private Training', body: '1:1 work for women already speaking. Press, keynotes, deals.', cta: 'Apply →' },
    ].map((row, i) => (
      <div key={i} style={{
        margin: '0 22px 12px', padding: '14px 16px',
        border: '1.5px solid var(--ink)', borderRadius: 8,
        background: row.open ? 'var(--accent-soft)' : 'var(--paper)',
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '.15em' }}>{row.tag}</div>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, lineHeight: 1 }}>
            {row.t} <span style={{ color: 'var(--ink-soft)', fontSize: 18 }}>· {row.sub}</span>
          </div>
          <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 13, color: 'var(--ink)', marginTop: 4, lineHeight: 1.35 }}>
            {row.body}
          </div>
        </div>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: 'var(--accent)', whiteSpace: 'nowrap', fontWeight: 700 }}>
          {row.cta}
        </div>
      </div>
    ))}

    <LogoBar />

    <div style={{ padding: '20px 22px' }}>
      <SectLabel>Quiet receipts</SectLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Testimonial quote="The clearest yes I've ever given myself." name="Sara" role="Founder" compact />
        <Testimonial quote="It paid for itself in one introduction." name="Devi" role="Producer" compact />
      </div>
    </div>

    {/* FAQ teaser */}
    <div style={{ padding: '12px 22px 24px' }}>
      <SectLabel>FAQ</SectLabel>
      {['Is this for me?', 'How does payment work?', 'What if I miss a retreat?'].map((q,i)=>(
        <div key={i} style={{
          display:'flex',justifyContent:'space-between',alignItems:'center',
          padding:'10px 0',borderBottom:'1px dashed var(--ink-soft)',
          fontFamily:'Patrick Hand, cursive', fontSize:14,
        }}>
          <span>{q}</span><span style={{color:'var(--ink-soft)'}}>+</span>
        </div>
      ))}
    </div>

    <Footer />
  </div>
);

// =====================================================================
// HOMEPAGE V4 — Vertical Narrative / Manifesto
// =====================================================================
const HomeV4 = () => (
  <div style={{ width: 480, minHeight: 1500, background: 'var(--paper)' }}>
    <Nav />

    {/* manifesto hero */}
    <div style={{ padding: '50px 30px 30px' }}>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 36, lineHeight: 1.05, fontWeight: 700, color: 'var(--ink)' }}>
        <span style={{ color: 'var(--ink-soft)' }}>You already have</span><br/>
        the story.<br/>
        <span style={{ color: 'var(--accent)' }}>Let's give it a room.</span>
      </div>
      <div style={{ marginTop: 18 }}>
        <Btn primary>Get Started →</Btn>
      </div>
    </div>

    {/* what / who / how — three short rows */}
    {[
      { k: 'WHAT', v: 'Coaching, retreats & training for women finding their public voice.' },
      { k: 'WHO',  v: 'Founders, leaders, coaches — anywhere from first talk to fifth keynote.' },
      { k: 'HOW',  v: 'A three-phase path. You only ever need to pick the first step.' },
    ].map((r,i)=>(
      <div key={i} style={{
        display:'flex', gap: 16, padding: '14px 28px',
        borderTop: '1px dashed var(--ink-soft)',
      }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '.2em', width: 34, paddingTop: 4 }}>{r.k}</div>
        <div style={{ flex:1, fontFamily: 'Patrick Hand, cursive', fontSize: 15, lineHeight: 1.4 }}>{r.v}</div>
      </div>
    ))}

    {/* the path */}
    <div style={{ padding: '22px 22px 12px', borderTop: '1px dashed var(--ink-soft)' }}>
      <SectLabel>The path</SectLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { t: 'Beginner · The Retreat', open: true },
          { t: 'Intermediate · Mastermind' },
          { t: 'Advanced · Private Training' },
        ].map((s,i)=>(
          <div key={i} style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding: '12px 14px',
            border: '1.5px solid var(--ink)', borderRadius: 6,
            background: s.open ? 'var(--accent-soft)' : 'var(--paper)',
          }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700 }}>
              {`0${i+1}. ${s.t}`}
            </div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: 'var(--accent)', fontWeight: 700 }}>
              {s.open ? 'Start →' : 'View →'}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* outcomes */}
    <div style={{ padding: '20px 28px', borderTop: '1px dashed var(--ink-soft)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
      {[
        { n: '300+', l: 'women guided' },
        { n: '12', l: 'retreats held' },
        { n: '94%', l: 'finish & return' },
      ].map(s=>(
        <div key={s.n}>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 32, fontWeight: 700, lineHeight: 1, color: 'var(--accent)' }}>{s.n}</div>
          <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 11, color: 'var(--ink-soft)' }}>{s.l}</div>
        </div>
      ))}
    </div>

    <LogoBar />

    <div style={{ padding: '20px 22px' }}>
      <Testimonial
        quote="I finally stopped explaining myself away. The retreat reset my whole next decade."
        name="Aiyana"
        role="Founder · Wellness"
      />
    </div>

    {/* sticky cta hint */}
    <div style={{
      margin: '0 22px 28px',
      padding: '16px',
      border: '1.5px dashed var(--ink)', borderRadius: 8,
      textAlign:'center', background: 'var(--accent-soft)',
    }}>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 24, fontWeight: 700 }}>One door. Walk in.</div>
      <div style={{ marginTop: 8 }}><Btn primary>Get Started →</Btn></div>
    </div>

    <Footer />
  </div>
);

// =====================================================================
// JOURNEY: Tier Picker (after Get Started)
// =====================================================================
const TierPicker = () => (
  <div style={{ width: 520, minHeight: 760, background: 'var(--paper)' }}>
    <Nav condensed />
    <div style={{ padding: '32px 28px 20px' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '.2em' }}>
        STEP 1 OF 2 · WHERE ARE YOU NOW?
      </div>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 38, lineHeight: 1, fontWeight: 700, marginTop: 6 }}>
        Pick your starting line.
      </div>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 14, color: 'var(--ink-soft)', marginTop: 6 }}>
        Not sure? Most women start with the Retreat.
      </div>
    </div>

    <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {[
        {
          tier: 'Beginner', sub: 'The Retreat', price: '$2,400',
          body: 'You have a story. You need the room, the structure, and the first audience.',
          best: 'best for first-time speakers',
          recommended: true,
        },
        {
          tier: 'Intermediate', sub: 'Mastermind', price: '$4,800',
          body: "You've spoken before. You want a tribe and a sharper offer.",
          best: 'best for working coaches & founders',
        },
        {
          tier: 'Advanced', sub: 'Private Training', price: 'from $9,000',
          body: 'You speak already. You want stages, press, and a paid keynote machine.',
          best: 'application only',
        },
      ].map((c, i)=>(
        <div key={i} style={{
          border: `1.5px solid ${c.recommended ? 'var(--accent)' : 'var(--ink)'}`,
          background: c.recommended ? 'var(--accent-soft)' : 'var(--paper)',
          borderRadius: 10, padding: '16px 18px',
          position: 'relative',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          {c.recommended && (
            <div style={{
              position: 'absolute', top: -10, left: 16,
              background: 'var(--accent)', color: 'var(--paper)',
              fontFamily: 'Caveat, cursive', fontSize: 14, fontWeight: 700,
              padding: '2px 10px', borderRadius: 999,
            }}>start here ↓</div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{c.tier}</div>
              <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 14, color: 'var(--ink-soft)' }}>· {c.sub}</div>
            </div>
            <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 13, lineHeight: 1.4, marginTop: 4 }}>
              {c.body}
            </div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '.15em', marginTop: 6 }}>
              {c.best.toUpperCase()}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700 }}>{c.price}</div>
            <div style={{ marginTop: 8 }}>
              <Btn primary={c.recommended} style={{ padding: '8px 14px', fontSize: 16 }}>
                {c.recommended ? 'Choose →' : 'Details →'}
              </Btn>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div style={{ padding: '14px 28px 28px', borderTop: '1px dashed var(--ink-soft)' }}>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 12, color: 'var(--ink-soft)' }}>
        Looking for private sessions, The Vault, or licensing? <u>See all offerings →</u>
      </div>
    </div>
  </div>
);

// =====================================================================
// JOURNEY: Retreat Detail Page
// =====================================================================
const RetreatPage = () => (
  <div style={{ width: 520, minHeight: 1500, background: 'var(--paper)' }}>
    <Nav condensed />

    {/* breadcrumb */}
    <div style={{ padding: '14px 28px 0', fontFamily: 'Patrick Hand, cursive', fontSize: 12, color: 'var(--ink-soft)' }}>
      Get Started → <b style={{ color: 'var(--ink)' }}>Beginner · The Retreat</b>
    </div>

    {/* hero */}
    <div style={{ padding: '12px 28px 20px' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '.18em' }}>PHASE 01 · BEGINNER</div>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 44, lineHeight: 0.95, fontWeight: 700, marginTop: 4 }}>
        The Retreat
      </div>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 15, lineHeight: 1.4, color: 'var(--ink-soft)', marginTop: 8, maxWidth: 380 }}>
        Four days in one room. You leave with your story, your structure, and your first stage.
      </div>
    </div>

    {/* photo strip */}
    <div style={{ padding: '0 28px 18px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
      <Ph label="retreat room — wide" h={180} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Ph label="moment" h={86} />
        <Ph label="moment" h={86} />
      </div>
    </div>

    {/* dates + price card */}
    <div style={{ padding: '4px 28px 20px' }}>
      <div style={{
        display:'flex', gap: 14, alignItems:'center',
        padding: '14px 16px',
        border: '1.5px solid var(--ink)', borderRadius: 10,
        background: 'var(--accent-soft)',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '.15em' }}>NEXT DATES</div>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>
            June 12–15 · Ojai
          </div>
          <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 12, color: 'var(--ink-soft)' }}>
            7 spots left · also Aug 21–24 · Lisbon
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 24, fontWeight: 700 }}>$2,400</div>
          <div style={{ marginTop: 6 }}><Btn primary>Pay & Enroll →</Btn></div>
        </div>
      </div>
    </div>

    {/* deliverables */}
    <div style={{ padding: '0 28px 22px' }}>
      <SectLabel>What you get</SectLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          '4 days, in-person',
          'Story-build framework',
          '1 private session',
          'Stage night + recording',
          'Wardrobe + voice clinic',
          'Year of community',
        ].map((d,i)=>(
          <div key={i} style={{
            display: 'flex', gap: 8, alignItems: 'center',
            padding: '10px 12px',
            border: '1.5px dashed var(--ink-soft)', borderRadius: 6,
            fontFamily: 'Patrick Hand, cursive', fontSize: 13,
          }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'Caveat, cursive', fontSize: 18, fontWeight: 700 }}>✓</span>
            {d}
          </div>
        ))}
      </div>
    </div>

    {/* day-by-day */}
    <div style={{ padding: '0 28px 22px' }}>
      <SectLabel>How it flows</SectLabel>
      {[
        { d: 'Day 1', t: 'Arrive · the room introduces itself' },
        { d: 'Day 2', t: 'Story-mining + first draft on your feet' },
        { d: 'Day 3', t: 'Voice, wardrobe, and the room test' },
        { d: 'Day 4', t: 'Stage night + send-off' },
      ].map((row,i)=>(
        <div key={i} style={{
          display: 'flex', gap: 14, padding: '10px 0',
          borderTop: i===0 ? '1px dashed var(--ink-soft)' : 'none',
          borderBottom: '1px dashed var(--ink-soft)',
          fontFamily: 'Patrick Hand, cursive', fontSize: 14,
        }}>
          <div style={{ width: 50, color: 'var(--ink-soft)' }}>{row.d}</div>
          <div style={{ flex: 1 }}>{row.t}</div>
        </div>
      ))}
    </div>

    {/* FAQ accordion */}
    <div style={{ padding: '0 28px 24px' }}>
      <SectLabel>Questions you've probably got</SectLabel>
      {[
        { q: 'What do I actually get?', a: 'Four days in-person + a private session + community for a year + the recording of your stage night.' , open: true},
        { q: 'How does it work?' },
        { q: 'When is it?' },
        { q: 'Refunds?' },
        { q: 'Payment plans?' },
      ].map((f,i)=>(
        <div key={i} style={{
          borderBottom: '1px dashed var(--ink-soft)',
          padding: '12px 0',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'Patrick Hand, cursive', fontSize: 14,
          }}>
            <span>{f.q}</span>
            <span style={{ color: 'var(--ink-soft)' }}>{f.open ? '–' : '+'}</span>
          </div>
          {f.open && (
            <div style={{ marginTop: 6, fontFamily: 'Patrick Hand, cursive', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.4 }}>
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* sticky-feel CTA */}
    <div style={{
      margin: '0 28px 28px',
      padding: '14px 18px',
      border: '1.5px solid var(--ink)', borderRadius: 8,
      background: 'var(--paper)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Ojai · June 12</div>
        <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 11, color: 'var(--ink-soft)' }}>7 spots left</div>
      </div>
      <Btn primary>Pay & Enroll →</Btn>
    </div>

    <Footer />
  </div>
);

// =====================================================================
// JOURNEY: Checkout Page
// =====================================================================
const CheckoutPage = () => (
  <div style={{ width: 520, minHeight: 800, background: 'var(--paper)' }}>
    <Nav condensed />

    <div style={{ padding: '22px 28px 8px' }}>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 12, color: 'var(--ink-soft)' }}>
        Get Started → Beginner → <b style={{ color: 'var(--ink)' }}>Checkout</b>
      </div>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 36, fontWeight: 700, lineHeight: 1, marginTop: 6 }}>
        Welcome in. Let's make it real.
      </div>
    </div>

    <div style={{ padding: '14px 28px 24px', display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 18 }}>
      {/* form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectLabel>Your details</SectLabel>
        {[
          { l: 'Name', v: '' },
          { l: 'Email', v: '' },
          { l: 'Phone', v: '' },
        ].map(f=>(
          <div key={f.l}>
            <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 12, color: 'var(--ink-soft)', marginBottom: 4 }}>{f.l}</div>
            <div style={{ border: '1.5px solid var(--ink)', borderRadius: 6, padding: '10px 12px', minHeight: 18, background: 'var(--paper)' }}/>
          </div>
        ))}

        <SectLabel>Payment</SectLabel>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Card', 'Apple Pay', 'Plan ×3'].map((p,i)=>(
            <div key={p} style={{
              flex: 1, textAlign: 'center', padding: '10px 6px',
              border: '1.5px solid var(--ink)', borderRadius: 6,
              background: i===0?'var(--accent-soft)':'var(--paper)',
              fontFamily: 'Patrick Hand, cursive', fontSize: 13,
            }}>{p}</div>
          ))}
        </div>
        <div style={{ border: '1.5px solid var(--ink)', borderRadius: 6, padding: '10px 12px', minHeight: 36,
          fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--ink-soft)' }}>
          •••• •••• •••• ••••
        </div>
        <div style={{ display:'flex', gap: 8 }}>
          <div style={{ flex:1, border: '1.5px solid var(--ink)', borderRadius: 6, padding: '10px 12px', minHeight: 18, fontFamily:'ui-monospace, monospace', fontSize: 11, color: 'var(--ink-soft)' }}>MM/YY</div>
          <div style={{ flex:1, border: '1.5px solid var(--ink)', borderRadius: 6, padding: '10px 12px', minHeight: 18, fontFamily:'ui-monospace, monospace', fontSize: 11, color: 'var(--ink-soft)' }}>CVC</div>
        </div>
      </div>

      {/* summary */}
      <div style={{
        border: '1.5px solid var(--ink)', borderRadius: 10,
        padding: '16px', background: 'var(--accent-soft)',
        height: 'fit-content',
      }}>
        <SectLabel>Order</SectLabel>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 24, fontWeight: 700, lineHeight: 1 }}>The Retreat</div>
        <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>
          Ojai · June 12–15
        </div>
        <div style={{ height: 1, background: 'var(--ink-soft)', margin: '14px 0', opacity: 0.4 }}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Patrick Hand, cursive', fontSize: 13 }}>
          <span>Tuition</span><span>$2,400</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Patrick Hand, cursive', fontSize: 13, color: 'var(--ink-soft)' }}>
          <span>Fees</span><span>$0</span>
        </div>
        <div style={{ height: 1, background: 'var(--ink-soft)', margin: '10px 0', opacity: 0.4 }}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Caveat, cursive', fontSize: 22, fontWeight: 700 }}>
          <span>Total</span><span>$2,400</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <Btn primary full style={{ fontSize: 20 }}>Pay & Enroll →</Btn>
        </div>
        <div style={{ marginTop: 8, textAlign: 'center', fontFamily: 'Patrick Hand, cursive', fontSize: 11, color: 'var(--ink-soft)' }}>
          🔒 secure · refundable 14 days
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

// =====================================================================
// SUPPORTING: About Joanna
// =====================================================================
const AboutPage = () => (
  <div style={{ width: 520, minHeight: 1100, background: 'var(--paper)' }}>
    <Nav condensed />

    <div style={{ padding: '32px 28px 8px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 18, alignItems: 'center' }}>
      <Ph label="portrait of Joanna" h={240} />
      <div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '.2em' }}>ABOUT</div>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 40, lineHeight: 1, fontWeight: 700, marginTop: 4 }}>
          Hi, I'm <span style={{ color: 'var(--accent)' }}>Joanna</span>.
        </div>
        <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 14, lineHeight: 1.5, marginTop: 10 }}>
          I help women find the words for the work they already do. Speaker. Coach. Builder of rooms.
        </div>
      </div>
    </div>

    <div style={{ padding: '20px 28px' }}>
      <SectLabel>The journey · a short version</SectLabel>
      {[
        { y: '2008', t: 'first stage, terrified' },
        { y: '2013', t: 'started coaching one woman in a café' },
        { y: '2018', t: 'first retreat — 8 women, one room' },
        { y: '2026', t: 'this, you, the next chapter' },
      ].map((s,i)=>(
        <div key={i} style={{
          display: 'flex', gap: 16, padding: '10px 0',
          borderBottom: '1px dashed var(--ink-soft)',
          fontFamily: 'Patrick Hand, cursive', fontSize: 14,
        }}>
          <div style={{ width: 50, color: 'var(--accent)', fontFamily: 'Caveat, cursive', fontSize: 18, fontWeight: 700 }}>{s.y}</div>
          <div style={{ flex: 1 }}>{s.t}</div>
        </div>
      ))}
    </div>

    <div style={{ padding: '16px 28px', borderTop: '1px dashed var(--ink-soft)' }}>
      <SectLabel>What I believe</SectLabel>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 26, lineHeight: 1.1, fontWeight: 700 }}>
        “Influence is not a volume problem.<br/>
        <span style={{ color: 'var(--accent)' }}>It's a clarity problem.</span>”
      </div>
    </div>

    <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'center' }}>
      <Btn primary>Work with me →</Btn>
    </div>

    <Footer />
  </div>
);

// =====================================================================
// SUPPORTING: Success Stories
// =====================================================================
const StoriesPage = () => (
  <div style={{ width: 520, minHeight: 1000, background: 'var(--paper)' }}>
    <Nav condensed />
    <div style={{ padding: '28px 28px 12px' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '.2em' }}>SUCCESS STORIES</div>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 38, fontWeight: 700, lineHeight: 1, marginTop: 4 }}>
        The receipts.
      </div>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>
        Filter ↓ <u>Founder</u> · <u>Coach</u> · <u>Exec</u> · <u>Speaker</u>
      </div>
    </div>

    <div style={{ padding: '12px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {[
        { n: 'Maya · Founder', q: 'Booked 3 keynotes 6 weeks after.' },
        { n: 'Renée · VP', q: 'Got the board to listen, finally.' },
        { n: 'Jules · Coach', q: 'First paid talk happened here.' },
        { n: 'Devi · Producer', q: 'Paid for itself in one intro.' },
        { n: 'Aiyana · Founder', q: 'Reset my whole next decade.' },
        { n: 'Sara · Exec', q: 'Clearest yes I have ever given myself.' },
      ].map((s,i)=>(
        <div key={i} style={{
          border: '1.5px solid var(--ink)', borderRadius: 8, padding: 12, background: 'var(--paper)',
        }}>
          <Ph label="story" h={70} style={{ marginBottom: 8 }} />
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>“{s.q}”</div>
          <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 11, color: 'var(--ink-soft)', marginTop: 6 }}>{s.n}</div>
          <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 11, color: 'var(--accent)', marginTop: 4 }}>read more →</div>
        </div>
      ))}
    </div>

    <Footer />
  </div>
);

// =====================================================================
// SUPPORTING: FAQ page
// =====================================================================
const FAQPage = () => (
  <div style={{ width: 520, minHeight: 900, background: 'var(--paper)' }}>
    <Nav condensed />
    <div style={{ padding: '32px 28px 8px' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '.2em' }}>FAQ</div>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 40, fontWeight: 700, lineHeight: 1, marginTop: 4 }}>
        Real questions.
      </div>
    </div>

    <div style={{ padding: '10px 28px 24px' }}>
      {[
        { c: 'Getting started', qs: ['Where do I begin?', 'Do I need to apply?', 'I keep missing dates — what then?'] },
        { c: 'The Retreat',     qs: ['What\'s included?', 'Travel & lodging?', 'Refunds?'] },
        { c: 'Payments',        qs: ['Payment plans?', 'Currencies?', 'Can my company pay?'] },
      ].map((g,i)=>(
        <div key={i} style={{ marginTop: 14 }}>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700, lineHeight: 1, color: 'var(--accent)' }}>{g.c}</div>
          {g.qs.map((q,j)=>(
            <div key={j} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderBottom: '1px dashed var(--ink-soft)',
              fontFamily: 'Patrick Hand, cursive', fontSize: 14,
            }}>
              <span>{q}</span><span style={{ color: 'var(--ink-soft)' }}>+</span>
            </div>
          ))}
        </div>
      ))}

      <div style={{
        marginTop: 22, padding: 14, border: '1.5px dashed var(--ink)', borderRadius: 8,
        textAlign: 'center', background: 'var(--accent-soft)',
      }}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Still wondering?</div>
        <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 12, marginTop: 4 }}>Email <u>hello@joanna.co</u> — I read every one.</div>
      </div>
    </div>
    <Footer />
  </div>
);

// =====================================================================
// NAV DETAIL (showing dropdown sketch)
// =====================================================================
const NavDetail = () => (
  <div style={{ width: 520, minHeight: 260, background: 'var(--paper)', padding: 0 }}>
    <NavWithDropOpen />
    <div style={{ padding: 18 }}>
      <SectLabel>Nav rules (per Joanna's notes)</SectLabel>
      <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 13, lineHeight: 1.5 }}>
        ✶ ONE primary CTA: <b>Get Started</b><br/>
        ✶ All secondary offerings (Private, The Vault, License, Corporate, Speaking) live in dropdowns only — never in the hero<br/>
        ✶ No “Step 1 / 2 / 3” language on cards<br/>
        ✶ No “90 Days” language anywhere
      </div>
    </div>
  </div>
);

// =====================================================================
// EXPORT
// =====================================================================
Object.assign(window, {
  HomeV1, HomeV2, HomeV3, HomeV4,
  TierPicker, RetreatPage, CheckoutPage,
  AboutPage, StoriesPage, FAQPage,
  NavDetail,
});
