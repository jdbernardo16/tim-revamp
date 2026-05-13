// supporting.jsx — About, Journey, Stories, FAQ, Community, Corporate. Content from CMS.
const html = (s) => ({ __html: s || '' });
const pg = () => window.PAGES || {};

const AboutPage = () => {
  const d = pg().about || {};
  return (
    <>
      <Section tone="paper">
        <Container>
          <div className="vault-grid">
            <Plate label="portrait of Joanna" h={520} src={d.image} />
            <div>
              <Eyebrow>{d.eyebrow}</Eyebrow>
              <h1 className="display" dangerouslySetInnerHTML={html(d.title)} />
              <p className="lead" dangerouslySetInnerHTML={html(d.lead)} />
              <p dangerouslySetInnerHTML={html(d.body)} />
              <Quote by={d.quoteBy}>{d.quote}</Quote>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <Eyebrow>{d.journeyEyebrow}</Eyebrow>
          <div className="timeline">
            {(d.timeline || []).map((s, i) => (
              <div key={i} className="tl-row">
                <div className="tl-year">{s.year}</div>
                <div className="tl-body">{s.text}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container narrow style={{ textAlign: 'center' }}>
          <h2 className="display" style={{ color: 'inherit' }}>{d.closerTitle}</h2>
          <div className="cta-row centered">
            <Button primary size="lg" onClick={() => goTo('start')}>{d.closerCtaPrimary}</Button>
            <Button ghost size="lg" onClick={() => goTo(d.closerCtaSecondaryRoute, d.closerCtaSecondaryParams)}>{d.closerCtaSecondary}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

const StoriesPage = () => {
  const d = pg().stories || {};
  return (
    <>
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h1 className="display" dangerouslySetInnerHTML={html(d.title)} />
          <p className="lead">{d.lead}</p>
        </Container>
      </Section>
      <Section tone="cream">
        <Container>
          <div className="stories-grid">
            {(d.items || []).map((s, i) => (
              <article key={i} className="story-card">
                <Plate label={s.name || 'story'} h={140} src={s.image || ''} />
                <div className="story-tag">{s.phase}</div>
                <Quote>{s.quote}</Quote>
                <p>{s.body}</p>
                <div className="story-by"><strong>{s.name}</strong> · {s.role}</div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <h2 className="display sm">{d.closerTitle}</h2>
          <Button primary size="lg" onClick={() => goTo('start')}>{d.closerCta}</Button>
        </Container>
      </Section>
    </>
  );
};

const FAQItem = ({ q, a, defaultOpen }) => {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className={"faq-item" + (open ? ' open' : '')}>
      <button type="button" className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-toggle">{open ? '–' : '+'}</span>
      </button>
      {open && <div className="faq-a" dangerouslySetInnerHTML={html(a)} />}
    </div>
  );
};

const FAQPage = () => {
  const d = pg().faq || {};
  return (
    <>
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h1 className="display" dangerouslySetInnerHTML={html(d.title)} />
        </Container>
      </Section>
      <Section tone="cream">
        <Container narrow>
          {(d.sections || []).map((section, si) => (
            <React.Fragment key={si}>
              <h3 className="display xs">{section.heading}</h3>
              {(section.items || []).map((item, ji) => (
                <FAQItem key={ji} q={item.q} a={item.a} defaultOpen={item.defaultOpen} />
              ))}
            </React.Fragment>
          ))}

          <div className="faq-still">
            <h4>{d.stillHeading}</h4>
            <p dangerouslySetInnerHTML={html(d.stillBody)} />
          </div>
        </Container>
      </Section>
    </>
  );
};

const SimplePage = ({ eyebrow, title, body, ctaLabel, ctaRoute, image }) => (
  <Section tone="paper">
    <Container narrow style={{ textAlign: 'center' }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="display" dangerouslySetInnerHTML={html(title)} />
      <p className="lead">{body}</p>
      <Plate label="placeholder visual" h={280} src={image || 'assets/story-placeholder.jpg'} style={{ margin: '24px auto' }} />
      <Button primary onClick={() => goTo(ctaRoute || 'home')}>{ctaLabel || 'Back home'} →</Button>
    </Container>
  </Section>
);

const CommunityPage = () => {
  const d = pg().community || {};
  return <SimplePage eyebrow={d.eyebrow} title={d.title} body={d.body} ctaLabel={d.ctaLabel} ctaRoute={d.ctaRoute} image={d.image} />;
};

const CorporatePage = () => {
  const d = pg().corporate || {};
  return <SimplePage eyebrow={d.eyebrow} title={d.title} body={d.body} ctaLabel={d.ctaLabel} ctaRoute={d.ctaRoute} image={d.image} />;
};

const SpeakingPage = () => {
  const [form, setForm] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const S = window.SPEAKING || {};

  if (sent) {
    return (
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>{S.confirmedEyebrow}</Eyebrow>
          <h1 className="display">{S.confirmedTitle}</h1>
          <p className="lead" dangerouslySetInnerHTML={html(S.confirmedBody)} />
          <Plate label="thank you" h={240} src={S.confirmedImage || ''} style={{ margin: '24px 0' }} />
          <Button primary onClick={() => goTo('home')}>Back home →</Button>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <Section tone="paper">
        <Container>
          <div className="vault-grid">
            <div>
              <Eyebrow>{S.heroEyebrow}</Eyebrow>
              <h1 className="display" dangerouslySetInnerHTML={html(S.heroTitle)} />
              <p className="lead">{S.heroBody}</p>
              <div className="cta-row">
                <Button primary size="lg" onClick={() => {
                  document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}>
                  {S.heroCtaPrimary}
                </Button>
                <Button ghost size="lg" onClick={() => goTo(S.heroCtaSecondaryRoute, S.heroCtaSecondaryParams)}>
                  {S.heroCtaSecondary}
                </Button>
              </div>
              <div className="speaker-stats">
                {(S.stats || []).map((s, i) => (
                  <div key={i}><strong>{s.number}</strong><span>{s.label}</span></div>
                ))}
              </div>
            </div>
            <Plate label="Joanna · on stage" h={520} src={S.heroImage} />
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>{S.reelEyebrow}</Eyebrow>
          <h2 className="display" style={{ color: 'inherit' }} dangerouslySetInnerHTML={html(S.reelTitle)} />
          <div className="reel-frame">
            <Plate label="▶ play speaker reel" h={420} src={S.reelImage || ''} style={{ background: S.reelImage ? 'none' : '#222', borderColor: 'rgba(255,255,255,0.18)' }} />
          </div>
          <p className="muted" style={{ color: 'rgba(245,239,228,0.6)' }}>
            {S.reelMuted}
            <a style={{ color: 'var(--paper)', textDecoration: 'underline', cursor: 'pointer' }}> {S.reelMutedLink}</a>
          </p>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="center-head">
            <Eyebrow>{S.eventsEyebrow}</Eyebrow>
            <h2 className="display" dangerouslySetInnerHTML={html(S.eventsTitle)} />
            <p className="lead">{S.eventsLead}</p>
          </div>
          <div className="events-grid">
            {(S.events || []).map((e, i) => (
              <article key={i} className={"event-card event-" + e.type.toLowerCase()}>
                <div className="event-type">{e.type}</div>
                <div className="event-icon">{e.icon}</div>
                <div className="event-body">
                  <strong>{e.name}</strong>
                  <span>{e.where}</span>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button ghost>{S.eventsCta}</Button>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="center-head">
            <Eyebrow>{S.talksEyebrow}</Eyebrow>
            <h2 className="display" dangerouslySetInnerHTML={html(S.talksTitle)} />
            <p className="lead">{S.talksLead}</p>
          </div>
          <div className="talks-grid">
            {(S.talks || []).map((t, i) => (
              <article key={i} className="talk-card">
                <div className="talk-num">0{i + 1}</div>
                <h3 className="display sm">{t.title}</h3>
                <div className="talk-meta">
                  <span><span className="meta-k">LENGTH</span>{t.time}</span>
                  <span><span className="meta-k">IDEAL FOR</span>{t.ideal}</span>
                </div>
                <p>{t.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container narrow>
          <Quote by={S.testimonialBy}>{S.testimonialQuote}</Quote>
        </Container>
      </Section>

      <Section tone="paper" id="inquiry">
        <Container>
          <div className="inquiry-grid">
            <div>
              <Eyebrow>{S.inquiryEyebrow}</Eyebrow>
              <h2 className="display" dangerouslySetInnerHTML={html(S.inquiryTitle)} />
              <p className="lead">{S.inquiryBody}</p>
              <ul className="check-list compact">
                {(S.inquiryList || []).map((item, i) => <li key={i} dangerouslySetInnerHTML={html(item)} />)}
              </ul>
              <Hairline style={{ margin: '24px 0' }} />
              <div className="contact-direct">
                <strong>{S.inquiryEmailLabel}</strong>
                <a href={"mailto:" + S.inquiryEmail}>{S.inquiryEmail}</a>
              </div>
            </div>

            <form className="inquiry-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="row-2">
                <Field label="Your name" placeholder="Jane Smith"
                  value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Role" placeholder="Conference Director"
                  value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
              </div>
              <div className="row-2">
                <Field label="Email" type="email" placeholder="you@org.com"
                  value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Field label="Organization" placeholder="Your company / event"
                  value={form.org} onChange={(v) => setForm({ ...form, org: v })} />
              </div>

              <label className="field">
                <span className="field-label">Event type</span>
                <select className="field-select"
                  value={form.type || ''}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select…</option>
                  <option>Keynote · in-person</option>
                  <option>Keynote · virtual</option>
                  <option>Fireside chat / Panel</option>
                  <option>TV / Broadcast appearance</option>
                  <option>Podcast / Audio interview</option>
                  <option>Private executive room</option>
                  <option>Corporate offsite / leadership team</option>
                </select>
              </label>

              <div className="row-2">
                <Field label="Event date(s)" placeholder="Sept 14, 2026 (or window)"
                  value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
                <Field label="City / location" placeholder="Austin, TX"
                  value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
              </div>

              <div className="row-2">
                <Field label="Audience size" placeholder="~500 founders"
                  value={form.audience} onChange={(v) => setForm({ ...form, audience: v })} />
                <label className="field">
                  <span className="field-label">Budget range</span>
                  <select className="field-select"
                    value={form.budget || ''}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                    <option value="">Select…</option>
                    <option>Under $15,000</option>
                    <option>$15,000 – $30,000</option>
                    <option>$30,000 – $60,000</option>
                    <option>$60,000+</option>
                    <option>To be discussed</option>
                  </select>
                </label>
              </div>

              <label className="field">
                <span className="field-label">Anything else? (audience, theme, dream talk)</span>
                <textarea
                  className="field-textarea"
                  placeholder="The audience is mid-career female founders. Theme is 'Conviction.' We'd love a 30-min keynote..."
                  rows={5}
                  value={form.notes || ''}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </label>

              <Button primary size="lg" style={{ width: '100%' }} onClick={() => setSent(true)}>
                Send inquiry →
              </Button>
              <p className="muted small" style={{ marginTop: 8 }}>
                We never share your details. Replies come from {S.inquiryEmail}.
              </p>
            </form>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>{S.relatedEyebrow}</Eyebrow>
          <h3 className="display sm" dangerouslySetInnerHTML={html(S.relatedTitle)} />
          <Button primary onClick={() => goTo('product', { id: 'vault' })}>{S.relatedCta}</Button>
        </Container>
      </Section>
    </>
  );
};

const AllProgramsPage = () => (
  <>
    <Section tone="paper">
      <Container narrow style={{ textAlign: 'center' }}>
        <Eyebrow>Work with me</Eyebrow>
        <h1 className="display">All <span className="u">programs.</span></h1>
        <p className="lead">Every offer in one place — pick by phase, price, or path.</p>
      </Container>
    </Section>
    <Section tone="cream">
      <Container>
        <div className="all-prog-grid">
          {(window.GLOBAL && window.GLOBAL.allProgramIds || Object.keys(PRODUCTS)).map(id => {
            const p = PRODUCTS[id];
            if (!p) return null;
            return (
              <button key={id} type="button" className="all-prog-card" onClick={() => goTo('product', { id })}>
                {p.phase && <span className="prod-phase">{p.phase}</span>}
                {!p.phase && p.kind === 'lead-magnet' && <span className="prod-phase">$29</span>}
                {!p.phase && p.kind === 'free' && <span className="prod-phase">FREE</span>}
                {!p.phase && p.kind === 'private' && <span className="prod-phase">PRIVATE</span>}
                <h3 className="display xs">{p.name}</h3>
                <p>{p.tagline}</p>
                <div className="ap-foot">
                  <span>{priceOf(p)}</span>
                  <span className="ap-arrow">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </Container>
    </Section>
  </>
);

const JourneyPage = () => {
  const d = pg().journey || {};
  return (
    <>
      <Section tone="paper">
        <Container narrow>
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h1 className="display" dangerouslySetInnerHTML={html(d.title)} />
          <p className="lead">{d.lead}</p>
        </Container>
      </Section>

      <Section tone="cream">
        <Container narrow>
          <div className="journey">
            {(d.chapters || []).map((m, i) => (
              <article key={i} className="journey-row">
                <div className="journey-year">{m.year}</div>
                <p className="journey-body">{m.text}</p>
              </article>
            ))}
          </div>
          <Hairline style={{ margin: '36px 0 24px' }} />
          <Quote by={d.closerQuoteBy}>{d.closerQuote}</Quote>
        </Container>
      </Section>

      <Section tone="ink">
        <Container narrow style={{ textAlign: 'center' }}>
          <h2 className="display" style={{ color: 'inherit' }}>{d.closerTitle}</h2>
          <div className="cta-row centered">
            <Button primary size="lg" onClick={() => goTo('start')}>{d.closerCtaPrimary}</Button>
            <Button ghost size="lg" onClick={() => goTo(d.closerCtaSecondaryRoute, d.closerCtaSecondaryParams)}>{d.closerCtaSecondary}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

Object.assign(window, {
  AboutPage, JourneyPage, StoriesPage, FAQPage,
  CommunityPage, CorporatePage, SpeakingPage,
  AllProgramsPage,
});
