// icp.jsx — the three ICP detail pages (1A/2A/3A).
// Each lays out the diagnosis from Joanna's doc and ends with the
// product cards that belong to that path. Cards link to checkout.

const ProductCard = ({ id, recommended }) => {
  const p = PRODUCTS[id];
  if (!p) return null;
  return (
    <article className={"prod-card" + (recommended ? ' recommended' : '')}>
      {recommended && <div className="prod-tag">★ Most start here</div>}
      {p.phase && <div className="prod-phase">{p.phase}</div>}
      <h3 className="display sm">{p.name}</h3>
      <p className="prod-tag-line">{p.tagline}</p>
      <ul className="prod-bullets">
        {p.bullets.slice(0, 4).map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="prod-foot">
        <div className="prod-price">
          <span className="big">{priceOf(p)}</span>
          {p.value && <span className="value">${p.value.toLocaleString()} value</span>}
        </div>
        <Button primary onClick={() => goTo('checkout', { id })}>{p.cta} →</Button>
      </div>
      <button type="button" className="prod-detail-link" onClick={() => goTo('product', { id })}>
        See full details →
      </button>
    </article>
  );
};

// ── Shared ICP page header ────────────────────────────────────────────────
const ICPHero = ({ tag, h1, who, revenue, body, breadcrumb }) => (
  <Section tone="paper">
    <Container>
      <div className="bread">
        <a onClick={() => goTo('home')}>Home</a> <span>→</span> <a onClick={() => goTo('start')}>Choose your path</a> <span>→</span> <strong>{breadcrumb}</strong>
      </div>
      <Eyebrow>{tag}</Eyebrow>
      <h1 className="display">{h1}</h1>
      <div className="icp-headline-meta">
        <div><span className="meta-k">WHO</span>{who}</div>
        <div><span className="meta-k">REVENUE</span>{revenue}</div>
      </div>
      <p className="lead">{body}</p>
    </Container>
  </Section>
);

const ICPDiagnostic = ({ title, lead, observations, lackTitle, lackItems, needItems, getItems, sentence }) => (
  <>
    <Section tone="cream">
      <Container>
        <div className="two-col">
          <div>
            <Eyebrow>What's happening</Eyebrow>
            <h2 className="display sm">{title}</h2>
            <p className="lead">{lead}</p>
          </div>
          <ul className="dot-list">
            {observations.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>
      </Container>
    </Section>

    <Section tone="paper">
      <Container>
        <div className="three-col">
          <div className="diag-col">
            <Eyebrow>You don't lack…</Eyebrow>
            <h3 className="display xs">{lackTitle}</h3>
            <ul className="x-list">
              {lackItems.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="diag-col">
            <Eyebrow>What you need</Eyebrow>
            <h3 className="display xs">The next move</h3>
            <ul className="check-list compact">
              {needItems.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="diag-col diag-col-out">
            <Eyebrow>What you get</Eyebrow>
            <h3 className="display xs">What changes</h3>
            <ul className="check-list compact">
              {getItems.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
            <div className="say-quote">
              You can say: <em>"{sentence}"</em>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  </>
);

// ─────────────────────────────────────────────────────────────────────────
// 1A · THE SPEAKER
// ─────────────────────────────────────────────────────────────────────────
const SpeakerPage = () => (
  <>
    <ICPHero
      breadcrumb="The Speaker (1A)"
      tag="1 · The Speaker"
      h1={<>Find your <Underline>message.</Underline></>}
      who="Early-stage leader · 3–8 years building or leading"
      revenue="$100K – $500K"
      body="You know you have something to say — but you can't clearly say what defines you yet."
    />

    <ICPDiagnostic
      title={<>When someone asks what you do, you notice…</>}
      lead="You don't lack confidence. You lack clarity on what actually defines you."
      observations={[
        'You start explaining instead of answering.',
        'You change how you say it depending on the person.',
        "You're not sure what part of your story actually matters.",
        "You've lived through things that shaped you — but you haven't identified the moment that explains your leadership.",
      ]}
      lackTitle="…confidence"
      lackItems={[
        'No defining moment yet',
        'No clear "why"',
        'No message you can say in one sentence',
      ]}
      needItems={[
        'Know what shaped you and why it matters',
        'Stop guessing how to explain yourself',
        'Have a message you can say clearly',
      ]}
      getItems={[
        'A safe space to say your story for the first time',
        'A live 3–5 minute story share',
        'Clarity of identity and your "why"',
      ]}
      sentence="I know what defines me and why it matters."
    />

    {/* PRODUCT SHELF — Speaker ----------------------------------- */}
    <Section tone="cream">
      <Container>
        <div className="center-head">
          <Eyebrow>Your path</Eyebrow>
          <h2 className="display">Start here.</h2>
          <p className="lead">The Mastermind that gives you your message. Add private support if you want it faster.</p>
        </div>

        <div className="prod-shelf">
          <ProductCard id="phase-1" recommended />
        </div>

        <div className="add-on-wrap">
          <Eyebrow>Want to go further?</Eyebrow>
          <div className="add-on-grid">
            <div className="add-on">
              <h4>Featured Speaker Spot</h4>
              <p>Take the retreat stage with a live talk and a real audience. Included with Phase 2, available as add-on here.</p>
              <Button ghost size="sm" onClick={() => goTo('product', { id: 'phase-2' })}>See Phase 2 →</Button>
            </div>
            <div className="add-on">
              <h4>Breakthrough Session</h4>
              <p>One private session with Joanna to go below the surface — to what is actually true.</p>
              <div className="add-on-foot">
                <span>$2,000</span>
                <Button secondary size="sm" onClick={() => goTo('checkout', { id: 'breakthrough' })}>Add →</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>

    {/* WRONG TIER? */}
    <Section tone="paper">
      <Container>
        <div className="other-tiers">
          <span>Not quite you?</span>
          <a onClick={() => goTo('authority')}>I'm an Authority →</a>
          <a onClick={() => goTo('legacy')}>I'm building a Legacy →</a>
          <a onClick={() => goTo('assessment')}>Take the quiz →</a>
        </div>
      </Container>
    </Section>
  </>
);

// ─────────────────────────────────────────────────────────────────────────
// 2A · THE AUTHORITY
// ─────────────────────────────────────────────────────────────────────────
const AuthorityPage = () => (
  <>
    <ICPHero
      breadcrumb="The Authority (2A)"
      tag="2 · The Authority"
      h1={<>Build your <Underline>talk.</Underline></>}
      who="Established leader · 10–20 years leading or operating at scale"
      revenue="$500K – $5M+"
      body="You know your work — but you over-explain it when it matters."
    />

    <ICPDiagnostic
      title={<>You walk away thinking, <em>"That's not what I meant to say."</em></>}
      lead="You don't lack experience. You haven't structured your message to move people."
      observations={[
        'You ramble instead of landing your point.',
        'You give too much context before saying anything clear.',
        'Your message loses energy as you explain it.',
      ]}
      lackTitle="…experience"
      lackItems={[
        'No structured message',
        'Emotional connection missing',
        'Audience nods but doesn\'t move',
      ]}
      needItems={[
        'Say it once and have it land',
        'Connect emotionally — not just intellectually',
        'Move people to action',
      ]}
      getItems={[
        'A structured message that lands',
        'Peer feedback + refinement',
        'A signature talk aligned to your work',
      ]}
      sentence="I can clearly communicate a message that lands."
    />

    {/* PRODUCT SHELF — Authority --------------------------------- */}
    <Section tone="cream">
      <Container>
        <div className="center-head">
          <Eyebrow>Your path</Eyebrow>
          <h2 className="display">Two ways forward.</h2>
          <p className="lead">Build the structured talk that lands, or go all the way to keynote / TEDx.</p>
        </div>

        <div className="prod-shelf two">
          <ProductCard id="phase-2" recommended />
          <ProductCard id="phase-3" />
        </div>

        <Hairline style={{ margin: '48px 0 24px' }} />

        <div className="center-head">
          <Eyebrow>Want to work privately?</Eyebrow>
          <h3 className="display sm">Work 1:1 with Joanna.</h3>
        </div>
        <div className="prod-shelf two">
          <ProductCard id="breakthrough" />
          <ProductCard id="four-session" />
        </div>
      </Container>
    </Section>

    {/* WRONG TIER? */}
    <Section tone="paper">
      <Container>
        <div className="other-tiers">
          <span>Not quite you?</span>
          <a onClick={() => goTo('speaker')}>I'm a Speaker →</a>
          <a onClick={() => goTo('legacy')}>I'm building a Legacy →</a>
          <a onClick={() => goTo('assessment')}>Take the quiz →</a>
        </div>
      </Container>
    </Section>
  </>
);

// ─────────────────────────────────────────────────────────────────────────
// 3A · THE LEGACY
// ─────────────────────────────────────────────────────────────────────────
const LegacyPage = () => (
  <>
    <ICPHero
      breadcrumb="The Legacy (3A)"
      tag="3 · The Legacy"
      h1={<>Define your <Underline>legacy.</Underline></>}
      who="Advanced leader · 20+ years of leadership, ownership, or senior-level work"
      revenue="$5M – $25M+ (or equivalent scale of impact)"
      body="You've built something significant — but you are not clearly known for what you do differently."
    />

    <ICPDiagnostic
      title={<>You are respected. You are not <em>distinct.</em></>}
      lead="You don't lack success. You haven't fully claimed your differentiator."
      observations={[
        'Your message sounds similar to others in your space.',
        "People don't repeat what you say about you.",
        'Your work is strong — but your positioning is not sharp.',
      ]}
      lackTitle="…success"
      lackItems={[
        'Unclear key differentiator',
        'No repeatable message',
        'No defined point of view people can attach to',
      ]}
      needItems={[
        'Be known for your contribution',
        'Clearly communicate what you do differently',
        "Have a blueprint people can build on after you're gone",
      ]}
      getItems={[
        'A leadership framework that scales beyond you',
        'A "special sauce" the market repeats',
        'A legacy designed — not left to chance',
      ]}
      sentence="My life's work carries beyond me."
    />

    {/* PRODUCT SHELF — Legacy ------------------------------------ */}
    <Section tone="cream">
      <Container>
        <div className="center-head">
          <Eyebrow>Your path · private</Eyebrow>
          <h2 className="display">By invitation.</h2>
          <p className="lead">Two phases for leaders building systems that outlive them.</p>
        </div>

        <div className="prod-shelf two">
          <ProductCard id="phase-4" recommended />
          <ProductCard id="phase-5" />
        </div>

        <div className="invite-band">
          <div>
            <Eyebrow>How this works</Eyebrow>
            <h3 className="display xs">Private training begins with a conversation.</h3>
            <p>Submit a request and Joanna will reach out within 48 hours. All Legacy engagements are bespoke.</p>
          </div>
          <Button primary size="lg" onClick={() => goTo('checkout', { id: 'phase-4' })}>Request a conversation →</Button>
        </div>
      </Container>
    </Section>

    {/* WRONG TIER? */}
    <Section tone="paper">
      <Container>
        <div className="other-tiers">
          <span>Not quite you?</span>
          <a onClick={() => goTo('speaker')}>I'm a Speaker →</a>
          <a onClick={() => goTo('authority')}>I'm an Authority →</a>
          <a onClick={() => goTo('assessment')}>Take the quiz →</a>
        </div>
      </Container>
    </Section>
  </>
);

Object.assign(window, { SpeakerPage, AuthorityPage, LegacyPage, ProductCard });
