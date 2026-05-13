// products.jsx — Product detail + Checkout pages. Content from CMS.
const html = (s) => ({ __html: s || '' });

const ProductDetail = ({ id }) => {
  const p = PRODUCTS[id];
  if (!p) return <NotFound />;

  const longCopy = window.PRODUCT_DETAILS || {};
  const detail = longCopy[id] || {};
  const sidebarImg = longCopy.sidebarImage || 'assets/retreat-moment.jpg';

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
              <Plate label="retreat moment" h={220} src={sidebarImg} />
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

const CheckoutPage = ({ id }) => {
  const p = PRODUCTS[id];
  const [form, setForm] = React.useState({});
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [plan, setPlan] = React.useState('full');
  const [confirmed, setConfirmed] = React.useState(false);

  const C = window.CHECKOUT || {};

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
          <Eyebrow>{C.confirmedEyebrow}</Eyebrow>
          <h1 className="display">{C.confirmedTitle}</h1>
          <p className="lead" dangerouslySetInnerHTML={html(C.confirmedBody ? C.confirmedBody.replace('{{email}}', form.email || 'your inbox') : '')} />
          <Plate label="welcome moment" h={260} src={C.confirmedImage || 'assets/story-placeholder.jpg'} style={{ margin: '24px 0' }} />
          <div className="cta-row centered">
            <Button primary size="lg" onClick={() => goTo('home')}>{C.confirmedCtaPrimary || 'Back to home'}</Button>
            <Button ghost size="lg" onClick={() => goTo('product', { id: 'vault' })}>{C.confirmedCtaSecondary || 'Add the free Vault session'}</Button>
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
          <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); setConfirmed(true); }}>
            <h1 className="display sm">{C.formTitle || "Welcome in. Let's make it real."}</h1>

            <fieldset>
              <legend>Your details</legend>
              <Field label={C.fieldName || 'Full name'} placeholder={C.fieldNamePlaceholder || 'Joanna Surname'}
                value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label={C.fieldEmail || 'Email'} type="email" placeholder={C.fieldEmailPlaceholder || 'you@email.com'}
                value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label={C.fieldPhone || 'Phone (optional)'} placeholder={C.fieldPhonePlaceholder || '+1 555 0100'}
                value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            </fieldset>

            {planOptions && (
              <fieldset>
                <legend>{C.paymentPlansLabel || 'Payment plan'}</legend>
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
              <legend>{C.paymentMethodLabel || 'Payment method'}</legend>
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
                  <Field label={C.fieldCard || 'Card number'} placeholder={C.fieldCardPlaceholder || '1234 1234 1234 1234'}
                    value={form.card} onChange={(v) => setForm({ ...form, card: v })} />
                  <div className="row-2">
                    <Field label={C.fieldExpiry || 'Expiry'} placeholder={C.fieldExpiryPlaceholder || 'MM / YY'}
                      value={form.exp} onChange={(v) => setForm({ ...form, exp: v })} />
                    <Field label={C.fieldCvc || 'CVC'} placeholder={C.fieldCvcPlaceholder || '123'}
                      value={form.cvc} onChange={(v) => setForm({ ...form, cvc: v })} />
                  </div>
                </>
              )}
              {paymentMethod === 'apple' && (
                <div className="apple-pay-block">{C.applePayBlock || 'Press the Apple Pay button to continue securely.'}</div>
              )}
              {paymentMethod === 'wire' && (
                <div className="apple-pay-block">{C.wireBlock || "We'll send wire instructions to your email after submit. Common for Legacy engagements."}</div>
              )}
            </fieldset>

            <Button primary size="lg" style={{ width: '100%' }} onClick={() => setConfirmed(true)}>
              Confirm &amp; pay {priceOf(p)} →
            </Button>
            <p className="muted small" style={{ marginTop: 10 }}>
              {C.secureNote || '🔒 Secure · 14-day refund · By submitting you agree to the terms.'}
            </p>
          </form>

          <aside className="order-summary">
            <Eyebrow>{C.orderSummaryLabel || 'Order summary'}</Eyebrow>
            {p.phase && <div className="os-phase">{p.phase}</div>}
            <div className="display sm">{p.name}</div>
            <p className="os-tag">{p.tagline}</p>
            <Hairline />
            <ul className="os-includes">
              {(p.bullets || []).slice(0, 5).map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <Hairline />
            <div className="os-totals">
              <div className="os-row"><span>{C.subtotalLabel || 'Subtotal'}</span><span>{priceOf(p)}</span></div>
              {p.value && <div className="os-row muted"><span>{C.valueLabel || 'Value'}</span><span>${p.value.toLocaleString()}</span></div>}
              <div className="os-row big"><span>{C.todayLabel || 'Today'}</span>
                <span>
                  {planOptions && plan === 'three' ? '$' + Math.ceil(p.price / 3).toLocaleString() :
                   planOptions && plan === 'six' ? '$' + Math.ceil(p.price / 6).toLocaleString() :
                   priceOf(p)}
                </span>
              </div>
            </div>
            <div className="os-note">
              {p.id === 'phase-1' && <>{C.phase1Note || 'Includes the in-person retreat + lifetime community.'}</>}
              {p.id === 'vault' && <>{C.vaultNote || 'Free. Add to cart, no card required.'}</>}
              {p.id === 'dollar-message' && <>{C.dollarMessageNote || 'Instant access on confirmation.'}</>}
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
};

const VaultPage = () => {
  const H = window.HOME || {};
  const frontDoor = (H.frontDoor || [])[1] || {};
  return (
    <>
      <Section tone="paper">
        <Container>
          <div className="vault-grid">
            <div>
              <Pill tone="accent">{frontDoor.eyebrow}</Pill>
              <h1 className="display">The <span className="u">Vault.</span></h1>
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
            <Plate label="Joanna · live" h={460} src={frontDoor.image || 'assets/hero-portrait.jpg'} />
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
};

const DollarMessagePage = () => {
  const H = window.HOME || {};
  const fd = (H.frontDoor || [])[0] || {};
  return (
    <>
    <Section tone="paper">
      <Container>
        <div className="vault-grid">
          <div>
            <Pill>$29 · Self-paced</Pill>
            <h1 className="display">Your Dollar <span className="u">Message.</span></h1>
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
          <Plate label="training thumbnail" h={460} src={fd.image || 'assets/retreat-moment.jpg'} />
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
};

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
