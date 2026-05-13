// products.jsx — Product detail + Checkout pages, plus the lead-magnet
// pages (Vault free June 5, Your Dollar Message $29) and a tiny
// Influence Path Assessment.

const ProductDetail = ({ id }) => {
  const p = PRODUCTS[id];
  if (!p) return <NotFound />;

  const longCopyById = {
    'phase-1': {
      youBuild: [
        'Your defining moment (written + spoken)',
        'Your deeper why (clear, concise statement)',
        'Your first leadership message (1–2 sentences)',
        'Your unique differentiator',
      ],
      youExperience: [
        'A safe space to say your story for the first time',
        'Peer feedback and refinement',
        'A live 3–5 minute story share',
      ],
      youLeaveWith: [
        'Clarity of identity and voice',
        'A message ready for public use',
        '"I know what defines me and why it matters."',
      ],
    },
    'phase-2': {
      youBuild: [
        'A 7-minute signature talk',
        'A clear problem → solution message',
        'Emotional connection points',
        'A defined call to action',
      ],
      youExperience: [
        'Live coaching with Joanna',
        'Retreat speaking opportunity (featured)',
        'Real-time feedback and refinement',
      ],
      youLeaveWith: [
        'A talk that lands',
        'A message that moves people to action',
        '"I can clearly communicate a message that lands."',
      ],
    },
    'phase-3': {
      youBuild: [
        'A refined, repeatable signature message',
        'Your thought-leader perspective',
        'Your "special sauce" — what you do differently',
        'A one-liner people can repeat',
      ],
      youExperience: [
        'Speaker cohort training + private sessions',
        'Full speaking reel + 1-minute social clip',
        'Professional video + photos',
      ],
      youLeaveWith: [
        'A keynote-level talk',
        'A message people remember and repeat',
        '"I am known for something specific and valuable."',
      ],
    },
    'phase-4': {
      youBuild: [
        'Your leadership framework',
        'A team communication system',
        'A mentorship structure based on your message',
      ],
      youExperience: [
        'Psychological safety and trust inside your team',
        'A repeatable system others can lead through',
        'A business strategy to scale',
      ],
      youLeaveWith: [
        'A healed leadership model that drives performance',
        'A team that operates from your vision',
        '"I build leaders, not just results."',
      ],
    },
    'phase-5': {
      youBuild: [
        'Your legacy blueprint',
        'Your impact thesis',
        'Your succession plan',
      ],
      youExperience: [
        'Voice + wealth + long-term contribution, aligned',
        'A message with generational impact',
        'A structure that continues beyond your lifetime',
      ],
      youLeaveWith: [
        'A clear plan for your long-term influence',
        'A legacy that is designed, not left to chance',
        '"My life\'s work carries beyond me."',
      ],
    },
    'breakthrough': {
      youBuild: [
        'Clear direction on your message',
        'A sharper articulation of what you do',
        'Immediate clarity on your next step',
      ],
      youExperience: [
        'The shift from explaining → knowing',
        "What your voice sounds like when it's aligned",
      ],
      youLeaveWith: [
        'A clear next step you actually trust',
      ],
    },
    'four-session': {
      youBuild: [
        'Your defining moment (the moment that shaped your work)',
        'Your deeper why',
        'Your first leadership message',
        'Your unique differentiator',
      ],
      youExperience: [
        'Four private sessions with Joanna',
        'Direct feedback as your message is built',
      ],
      youLeaveWith: [
        'A message you can actually say out loud',
        'Clarity on what defines you and why it matters',
      ],
    },
  };

  const detail = longCopyById[id] || {};

  return (
    <>
      <Section tone="paper">
        <Container>
          <div className="bread">
            <a onClick={() => goTo('home')}>Home</a> <span>→</span>
            {p.icp && <><a onClick={() => goTo(p.icp)}>The {p.icp[0].toUpperCase() + p.icp.slice(1)}</a> <span>→</span></>}
            <strong>{p.name}</strong>
          </div>
          <div className="prod-detail-grid">
            <div>
              {p.phase && <Eyebrow>{p.phase}</Eyebrow>}
              <h1 className="display">{p.name}</h1>
              <p className="lead">{p.tagline}</p>

              {detail.youBuild && (
                <div className="block-list">
                  <h4>You build</h4>
                  <ul>{detail.youBuild.map((b,i)=><li key={i}>{b}</li>)}</ul>
                </div>
              )}
              {detail.youExperience && (
                <div className="block-list">
                  <h4>You experience</h4>
                  <ul>{detail.youExperience.map((b,i)=><li key={i}>{b}</li>)}</ul>
                </div>
              )}
              {detail.youLeaveWith && (
                <div className="block-list">
                  <h4>You leave with</h4>
                  <ul>{detail.youLeaveWith.map((b,i)=><li key={i}>{b}</li>)}</ul>
                </div>
              )}
            </div>

            <aside className="prod-buy">
              <Plate label="retreat moment" h={220} src="assets/retreat-moment.jpg" />
              <div className="prod-buy-inner">
                <div className="prod-buy-price">
                  <span className="big">{priceOf(p)}</span>
                  {p.value && <span className="value">${p.value.toLocaleString()} value</span>}
                </div>
                <Button primary size="lg" style={{ width: '100%' }} onClick={() => goTo('checkout', { id })}>
                  {p.cta} →
                </Button>
                <div className="prod-buy-fineprint">
                  🔒 Secure checkout · payment plans available · 14-day refund
                </div>
                {id === 'phase-1' && (
                  <div className="prod-included">
                    <strong>Includes the retreat.</strong> 4 days in-person, peer cohort, live story share, lifetime community.
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {p.leaveWith && (
        <Section tone="ink">
          <Container narrow style={{ textAlign: 'center' }}>
            <Quote>{p.leaveWith}</Quote>
          </Container>
        </Section>
      )}

      {/* RELATED */}
      <Section tone="cream">
        <Container>
          <Eyebrow style={{ textAlign: 'center' }}>You may also need</Eyebrow>
          <div className="related-row">
            {Object.values(PRODUCTS)
              .filter(o => o.id !== id && o.kind === 'program')
              .slice(0, 3)
              .map(o => (
                <button key={o.id} type="button" className="related-card" onClick={() => goTo('product', { id: o.id })}>
                  {o.phase && <span className="prod-phase">{o.phase}</span>}
                  <strong>{o.name}</strong>
                  <span className="related-price">{priceOf(o)}</span>
                </button>
              ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

// ── CHECKOUT ──────────────────────────────────────────────────────────────
const CheckoutPage = ({ id }) => {
  const p = PRODUCTS[id];
  const [form, setForm] = React.useState({});
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [plan, setPlan] = React.useState('full');
  const [confirmed, setConfirmed] = React.useState(false);

  if (!p) return <NotFound />;

  const planOptions = p.price > 1000 && p.price < 100000 ? [
    { id: 'full', label: 'Pay in full', sub: priceOf(p) },
    { id: 'three', label: '3 monthly payments', sub: '$' + Math.ceil(p.price / 3).toLocaleString() + '/mo' },
    { id: 'six', label: '6 monthly payments', sub: '$' + Math.ceil(p.price / 6).toLocaleString() + '/mo' },
  ] : null;

  if (confirmed) {
    return (
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>You're in</Eyebrow>
          <h1 className="display">Welcome — your seat is held.</h1>
          <p className="lead">
            A confirmation is on its way to <strong>{form.email || 'your inbox'}</strong>.
            Joanna will follow up personally within 24 hours with onboarding details.
          </p>
          <Plate label="welcome moment" h={260} src="assets/story-placeholder.jpg" style={{ margin: '24px 0' }} />
          <div className="cta-row centered">
            <Button primary size="lg" onClick={() => goTo('home')}>Back to home</Button>
            <Button ghost size="lg" onClick={() => goTo('product', { id: 'vault' })}>Add the free Vault session</Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="paper">
      <Container>
        <div className="bread">
          <a onClick={() => goTo('home')}>Home</a> <span>→</span>
          <a onClick={() => goTo('product', { id })}>{p.name}</a> <span>→</span>
          <strong>Checkout</strong>
        </div>

        <div className="checkout-grid">
          {/* LEFT — form */}
          <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); setConfirmed(true); }}>
            <h1 className="display sm">Welcome in. Let's make it real.</h1>

            <fieldset>
              <legend>Your details</legend>
              <Field label="Full name" placeholder="Joanna Surname"
                value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email" type="email" placeholder="you@email.com"
                value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Phone (optional)" placeholder="+1 555 0100"
                value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            </fieldset>

            {planOptions && (
              <fieldset>
                <legend>Payment plan</legend>
                <div className="plan-row">
                  {planOptions.map(o => (
                    <label key={o.id} className={"plan-opt" + (plan === o.id ? ' selected' : '')}>
                      <input type="radio" name="plan" value={o.id} checked={plan === o.id}
                        onChange={() => setPlan(o.id)} />
                      <span className="plan-label">{o.label}</span>
                      <span className="plan-sub">{o.sub}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset>
              <legend>Payment method</legend>
              <div className="paymeth-row">
                {[
                  { id: 'card', label: 'Card' },
                  { id: 'apple', label: 'Apple Pay' },
                  { id: 'wire', label: 'Wire / Invoice' },
                ].map(o => (
                  <label key={o.id} className={"paymeth-opt" + (paymentMethod === o.id ? ' selected' : '')}>
                    <input type="radio" name="pm" value={o.id} checked={paymentMethod === o.id}
                      onChange={() => setPaymentMethod(o.id)} />
                    {o.label}
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <>
                  <Field label="Card number" placeholder="1234 1234 1234 1234"
                    value={form.card} onChange={(v) => setForm({ ...form, card: v })} />
                  <div className="row-2">
                    <Field label="Expiry" placeholder="MM / YY"
                      value={form.exp} onChange={(v) => setForm({ ...form, exp: v })} />
                    <Field label="CVC" placeholder="123"
                      value={form.cvc} onChange={(v) => setForm({ ...form, cvc: v })} />
                  </div>
                </>
              )}
              {paymentMethod === 'apple' && (
                <div className="apple-pay-block">Press the Apple Pay button to continue securely.</div>
              )}
              {paymentMethod === 'wire' && (
                <div className="apple-pay-block">We'll send wire instructions to your email after submit. Common for Legacy engagements.</div>
              )}
            </fieldset>

            <Button primary size="lg" style={{ width: '100%' }} onClick={() => setConfirmed(true)}>
              Confirm &amp; pay {priceOf(p)} →
            </Button>
            <p className="muted small" style={{ marginTop: 10 }}>
              🔒 Secure · 14-day refund · By submitting you agree to the terms.
            </p>
          </form>

          {/* RIGHT — summary */}
          <aside className="order-summary">
            <Eyebrow>Order summary</Eyebrow>
            {p.phase && <div className="os-phase">{p.phase}</div>}
            <div className="display sm">{p.name}</div>
            <p className="os-tag">{p.tagline}</p>
            <Hairline />
            <ul className="os-includes">
              {(p.bullets || []).slice(0, 5).map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <Hairline />
            <div className="os-totals">
              <div className="os-row"><span>Subtotal</span><span>{priceOf(p)}</span></div>
              {p.value && <div className="os-row muted"><span>Value</span><span>${p.value.toLocaleString()}</span></div>}
              <div className="os-row big"><span>Today</span>
                <span>
                  {planOptions && plan === 'three' ? '$' + Math.ceil(p.price / 3).toLocaleString() :
                   planOptions && plan === 'six' ? '$' + Math.ceil(p.price / 6).toLocaleString() :
                   priceOf(p)}
                </span>
              </div>
            </div>
            <div className="os-note">
              {p.id === 'phase-1' && <>Includes the in-person retreat + lifetime community.</>}
              {p.id === 'vault' && <>Free. Add to cart, no card required.</>}
              {p.id === 'dollar-message' && <>Instant access on confirmation.</>}
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
};

// ── THE VAULT — free June 5 ───────────────────────────────────────────────
const VaultPage = () => (
  <>
    <Section tone="paper">
      <Container>
        <div className="vault-grid">
          <div>
            <Pill tone="accent">FREE · live with Joanna</Pill>
            <h1 className="display">The <Underline>Vault.</Underline></h1>
            <div className="vault-when">
              <div><span className="meta-k">DATE</span>Thursday, June 5</div>
              <div><span className="meta-k">TIME</span>12:00pm PT · 60 minutes</div>
              <div><span className="meta-k">WHERE</span>Live on Zoom · replay included</div>
            </div>
            <p className="lead">
              An open hour with Joanna to feel the work before you commit.
              Get a window into the course, ask anything, and watch a live
              story-share. No upsell during the room — just the work.
            </p>
            <ul className="check-list">
              <li>See exactly what happens inside <strong>Tell Your Story</strong></li>
              <li>Hear a live 3–5 minute story share — see how it lands</li>
              <li>Live Q&amp;A with Joanna</li>
              <li>Replay sent to everyone who registers</li>
            </ul>
            <div className="cta-row">
              <Button primary size="lg" onClick={() => goTo('checkout', { id: 'vault' })}>
                Save my seat — free →
              </Button>
              <Button ghost size="lg" onClick={() => goTo('product', { id: 'phase-1' })}>
                Or skip — go to Phase 1
              </Button>
            </div>
          </div>
          <Plate label="Joanna · live" h={460} src="assets/hero-portrait.jpg" />
        </div>
      </Container>
    </Section>

    <Section tone="cream">
      <Container narrow style={{ textAlign: 'center' }}>
        <Eyebrow>What women say after the Vault</Eyebrow>
        <Quote by="Maya · Founder">
          I came expecting a sales pitch. I left with a sentence I still use about my company.
        </Quote>
      </Container>
    </Section>
  </>
);

// ── YOUR DOLLAR MESSAGE — $29 ────────────────────────────────────────────
const DollarMessagePage = () => (
  <>
    <Section tone="paper">
      <Container>
        <div className="vault-grid">
          <div>
            <Pill>$29 · Self-paced</Pill>
            <h1 className="display">Your Dollar <Underline>Message.</Underline></h1>
            <p className="lead">
              The fastest way to find the one sentence that actually sells you —
              the message you can repeat in 30 seconds and have people
              <em> remember</em> when you leave the room.
            </p>
            <div className="block-list">
              <h4>You get</h4>
              <ul>
                <li>A 60-minute self-paced training with Joanna</li>
                <li>The Dollar Message worksheet (PDF + Notion)</li>
                <li>Joanna's 3-question clarity prompt</li>
                <li>Lifetime access — revisit any time</li>
              </ul>
            </div>
            <div className="block-list">
              <h4>You leave with</h4>
              <ul>
                <li>One sentence that defines you in plain English</li>
                <li>A repeatable answer to "so what do you do?"</li>
                <li>The first piece of the Tell Your Story program — keep going if you want</li>
              </ul>
            </div>
            <div className="cta-row">
              <Button primary size="lg" onClick={() => goTo('checkout', { id: 'dollar-message' })}>
                Get it for $29 →
              </Button>
              <Button ghost size="lg" onClick={() => goTo('product', { id: 'vault' })}>
                Or try the free Vault first
              </Button>
            </div>
          </div>
          <Plate label="training thumbnail" h={460} src="assets/retreat-moment.jpg" />
        </div>
      </Container>
    </Section>

    <Section tone="cream">
      <Container narrow style={{ textAlign: 'center' }}>
        <Eyebrow>Already inside the room</Eyebrow>
        <p className="lead">
          Your $29 credits toward Phase 1 (<strong>Tell Your Story</strong>) if you decide to keep going.
        </p>
        <Button secondary onClick={() => goTo('product', { id: 'phase-1' })}>See Phase 1 →</Button>
      </Container>
    </Section>
  </>
);

// ── INFLUENCE PATH ASSESSMENT — small quiz ──────────────────────────────
const AssessmentPage = () => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);

  const questions = [
    {
      q: 'When someone asks what you do, you usually…',
      a: ['…start explaining and tweak it depending on who I\'m talking to.', '…can say it — but it loses energy as I keep going.', '…have a sentence I repeat. The market just doesn\'t.'],
    },
    {
      q: 'Roughly, how long have you been leading or building?',
      a: ['3–8 years', '10–20 years', '20+ years'],
    },
    {
      q: 'Revenue or scale of impact:',
      a: ['$100K – $500K', '$500K – $5M+', '$5M – $25M+'],
    },
    {
      q: 'The next 12 months are about…',
      a: ['Finding the message — saying what defines me.', 'Sharpening the message I have — making it land on stage.', 'Building something that outlives me.'],
    },
  ];

  if (step >= questions.length) {
    const counts = [0, 0, 0];
    answers.forEach((i) => counts[i]++);
    const winner = counts.indexOf(Math.max(...counts));
    const result = [
      { tag: 'The Speaker', route: 'speaker', body: 'Start by finding your message. Phase 1 is built for you.' },
      { tag: 'The Authority', route: 'authority', body: 'Sharpen what you already have. Phase 2 is calling.' },
      { tag: 'The Legacy', route: 'legacy', body: 'Define the system that outlives you.' },
    ][winner];
    return (
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>Your phase</Eyebrow>
          <h1 className="display"><em>You are</em><br/>{result.tag}.</h1>
          <p className="lead">{result.body}</p>
          <div className="cta-row centered">
            <Button primary size="lg" onClick={() => goTo(result.route)}>See my path →</Button>
            <Button ghost onClick={() => { setStep(0); setAnswers([]); }}>Retake the quiz</Button>
          </div>
        </Container>
      </Section>
    );
  }

  const q = questions[step];
  return (
    <Section tone="paper">
      <Container narrow>
        <div className="quiz-progress">
          Step {step + 1} of {questions.length}
        </div>
        <h1 className="display sm">{q.q}</h1>
        <div className="quiz-options">
          {q.a.map((opt, i) => (
            <button key={i} type="button" className="quiz-opt"
              onClick={() => { setAnswers([...answers, i]); setStep(step + 1); }}>
              <span className="quiz-letter">{['A','B','C'][i]}</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
        {step > 0 && (
          <button type="button" className="quiz-back"
            onClick={() => { setAnswers(answers.slice(0, -1)); setStep(step - 1); }}>
            ← Back
          </button>
        )}
      </Container>
    </Section>
  );
};

// ── 404 / Not Found ─────────────────────────────────────────────────────
const NotFound = () => (
  <Section tone="paper">
    <Container narrow style={{ textAlign: 'center' }}>
      <Eyebrow>404</Eyebrow>
      <h1 className="display">Not here.</h1>
      <Button primary onClick={() => goTo('home')}>Back home →</Button>
    </Container>
  </Section>
);

Object.assign(window, {
  ProductDetail, CheckoutPage, VaultPage, DollarMessagePage,
  AssessmentPage, NotFound,
});
