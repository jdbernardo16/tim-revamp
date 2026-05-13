// supporting.jsx — About Joanna, Success Stories, FAQ, Community/Corporate stubs

const AboutPage = () => (
  <>
    <Section tone="paper">
      <Container>
        <div className="vault-grid">
          <Plate label="portrait of Joanna" h={520} src="assets/bio-photo.jpg" />
          <div>
            <Eyebrow>About</Eyebrow>
            <h1 className="display">Hi, I'm <Underline>Joanna.</Underline></h1>
            <p className="lead">
              I help leaders find the words for the work they already do —
              and build the rooms where those words land.
            </p>
            <p>
              I've spent two decades on stages and in private rooms with
              founders, executives, and women rebuilding their voice after
              the company they built outgrew the person they used to be.
              What I teach isn't speaking. It's <em>the moment</em> — the
              one that shaped what you actually know, and how to say it
              so people trust you immediately.
            </p>
            <Quote by="Joanna">Influence is not a volume problem. It's a clarity problem.</Quote>
          </div>
        </div>
      </Container>
    </Section>

    <Section tone="cream">
      <Container>
        <Eyebrow>The journey · a short version</Eyebrow>
        <div className="timeline">
          {[
            { y: '2008', t: 'First stage. Terrified. Discovered story-mining by accident.' },
            { y: '2013', t: 'Started coaching one woman in a café. Then a hundred.' },
            { y: '2018', t: 'First True Influence retreat — 8 women, one room, real results.' },
            { y: '2023', t: 'The method became the curriculum. 300+ leaders guided.' },
            { y: '2026', t: 'This. You. Your next chapter.' },
          ].map((s, i) => (
            <div key={i} className="tl-row">
              <div className="tl-year">{s.y}</div>
              <div className="tl-body">{s.t}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>

    <Section tone="ink">
      <Container narrow style={{ textAlign: 'center' }}>
        <h2 className="display" style={{ color: 'inherit' }}>Ready when you are.</h2>
        <div className="cta-row centered">
          <Button primary size="lg" onClick={() => goTo('start')}>Choose where you are →</Button>
          <Button ghost size="lg" onClick={() => goTo('product', { id: 'vault' })}>Meet me first — free June 5</Button>
        </div>
      </Container>
    </Section>
  </>
);

const StoriesPage = () => {
  const stories = [
    { n: 'Maya', r: 'Founder · Tech', q: 'Booked 3 keynotes 6 weeks after.', long: 'I came in unsure of my voice. I left with a message I could repeat — and three booked stages within six weeks.', phase: 'Phase 2' },
    { n: 'Renée', r: 'VP · Media', q: 'Got the board to listen, finally.', long: 'Twenty years of context-setting in meetings. Joanna helped me cut to the moment. The board moved on the next pitch.', phase: 'Phase 2' },
    { n: 'Jules', r: 'Coach', q: 'First paid talk happened here.', long: "I had been doing free stages for two years. After Phase 1 I priced my talk — and somebody paid it the first time I sent it out.", phase: 'Phase 1' },
    { n: 'Devi', r: 'Producer', q: 'Paid for itself in one introduction.', long: "Sat next to a network exec at the retreat. Two months later, my show was greenlit. None of that happens without the message I built that week.", phase: 'Phase 1' },
    { n: 'Aiyana', r: 'Founder · Wellness', q: 'Reset my whole next decade.', long: 'I had been telling the same origin story for ten years. Joanna found the one underneath it. I rebuilt the whole brand around what I actually do differently.', phase: 'Phase 3' },
    { n: 'Sara', r: 'Exec', q: 'The clearest yes I have ever given myself.', long: "The first time I felt my own voice in a room — instead of an executive translation of myself — was at this retreat.", phase: 'Phase 1' },
  ];
  return (
    <>
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>Success Stories</Eyebrow>
          <h1 className="display">The <Underline>receipts.</Underline></h1>
          <p className="lead">Real women, real results — across every phase of the method.</p>
        </Container>
      </Section>
      <Section tone="cream">
        <Container>
          <div className="stories-grid">
            {stories.map((s, i) => (
              <article key={i} className="story-card">
                <Plate label="story" h={140} />
                <div className="story-tag">{s.phase}</div>
                <Quote>{s.q}</Quote>
                <p>{s.long}</p>
                <div className="story-by"><strong>{s.n}</strong> · {s.r}</div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <h2 className="display sm">Your story is next.</h2>
          <Button primary size="lg" onClick={() => goTo('start')}>Choose where you are →</Button>
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
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
};

const FAQPage = () => (
  <>
    <Section tone="paper">
      <Container narrow style={{ textAlign: 'center' }}>
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="display">Real <Underline>questions.</Underline></h1>
      </Container>
    </Section>
    <Section tone="cream">
      <Container narrow>
        <h3 className="display xs">Getting started</h3>
        <FAQItem defaultOpen q="Where do I begin?"
          a={<>If you're new, start with the free Vault session (June 5) or the $29 <a onClick={() => goTo('product', { id: 'dollar-message' })}>Dollar Message</a>. If you already know your phase, go straight to the path that fits — Speaker, Authority, or Legacy.</>} />
        <FAQItem q="Do I have to apply?"
          a={<>No application for Speaker (Phase 1) or Authority (Phase 2/3). The Legacy path is a private conversation first — you submit a request and Joanna reaches out within 48 hours.</>} />
        <FAQItem q="What if I'm between phases?"
          a={<>Take the 5-minute assessment or come to the Vault — Joanna can place you in real time.</>} />

        <h3 className="display xs" style={{ marginTop: 36 }}>Tell Your Story (Phase 1)</h3>
        <FAQItem q="Is the retreat included?"
          a={<>Yes. The in-person retreat is included in the $3,200 program price. Travel and lodging are separate.</>} />
        <FAQItem q="When is the next retreat?"
          a={<>The next retreat dates are posted on the program page — limited to 12 seats per cohort.</>} />
        <FAQItem q="What if I miss a date?"
          a={<>Every cohort runs on a 90-day cycle. If you miss this one, you roll to the next at no extra cost.</>} />

        <h3 className="display xs" style={{ marginTop: 36 }}>Payments</h3>
        <FAQItem q="Are payment plans available?"
          a={<>Yes — 3 and 6-month plans are available on Phase 1 and Phase 2 at checkout. Phase 3+ is custom.</>} />
        <FAQItem q="Can my company pay?"
          a={<>Yes. Choose "Wire / Invoice" at checkout and we'll send the company an invoice you can forward.</>} />
        <FAQItem q="Refunds?"
          a={<>14-day refund on all programs except live cohorts that have already started.</>} />

        <div className="faq-still">
          <h4>Still wondering?</h4>
          <p>Email <a href="mailto:hello@trueinfluencemethod.com">hello@trueinfluencemethod.com</a> — Joanna reads every one.</p>
        </div>
      </Container>
    </Section>
  </>
);

// Community / Corporate / Speaking placeholders — kept lightweight
const SimplePage = ({ eyebrow, title, body, ctaLabel, ctaRoute }) => (
  <Section tone="paper">
    <Container narrow style={{ textAlign: 'center' }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="display">{title}</h1>
      <p className="lead">{body}</p>
      <Plate label="placeholder visual" h={280} src="assets/story-placeholder.jpg" style={{ margin: '24px auto' }} />
      <Button primary onClick={() => goTo(ctaRoute || 'home')}>{ctaLabel || 'Back home'} →</Button>
    </Container>
  </Section>
);

const CommunityPage = () => (
  <SimplePage eyebrow="Community"
    title={<>Monthly <Underline>gatherings.</Underline></>}
    body="A free monthly room — alumni, current cohorts, and a few new faces. Live with Joanna, ~90 minutes, the third Thursday of every month."
    ctaLabel="Join the Vault (free June 5)" ctaRoute="product" />
);

const CorporatePage = () => (
  <SimplePage eyebrow="Corporate"
    title={<>For your <Underline>team.</Underline></>}
    body="The True Influence Method, delivered to leadership teams of 6–24. Custom curriculum, two-day intensive plus four follow-up sessions."
    ctaLabel="Talk to Joanna" ctaRoute="legacy" />
);

const SpeakingPage = () => {
  const [form, setForm] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const events = [
    { type: 'KEYNOTE', name: 'Forbes 30/50 Summit', where: 'Abu Dhabi · 2024', icon: 'F' },
    { type: 'PANEL',   name: 'Aspen Institute', where: 'Aspen · 2024', icon: 'A' },
    { type: 'KEYNOTE', name: 'Lesbians Who Tech', where: 'San Francisco · 2023', icon: 'LWT' },
    { type: 'TV',      name: 'CBS Mornings', where: 'New York · 2023', icon: 'CBS' },
    { type: 'PODCAST', name: 'The Tim Ferriss Show', where: 'Ep. 642 · 2023', icon: 'TF' },
    { type: 'KEYNOTE', name: 'SXSW Featured Session', where: 'Austin · 2023', icon: 'SX' },
    { type: 'TV',      name: 'Good Morning America', where: 'New York · 2022', icon: 'GMA' },
    { type: 'KEYNOTE', name: 'Watermark Conference', where: 'Silicon Valley · 2022', icon: 'WM' },
    { type: 'PODCAST', name: 'How I Built This', where: 'Ep. 410 · 2022', icon: 'HIB' },
    { type: 'KEYNOTE', name: 'TEDxBoulder', where: 'Boulder · 2021', icon: 'TEDx' },
    { type: 'TV',      name: 'The Today Show', where: 'New York · 2021', icon: 'NBC' },
    { type: 'PANEL',   name: 'Cannes Lions', where: 'Cannes · 2019', icon: 'CL' },
  ];

  const talks = [
    {
      title: 'Speak Your Story. Create Influence.',
      time: '45–60 min',
      ideal: 'Founders, executives, leadership offsites',
      body: 'Joanna’s flagship keynote. Why better delivery doesn’t fix a credibility problem — and the one shift that does.',
    },
    {
      title: 'The Moment That Made You.',
      time: '30–45 min',
      ideal: 'Women’s conferences, leadership programs',
      body: 'A live story-mining demo on stage. One volunteer, fifteen minutes, an unforgettable shift.',
    },
    {
      title: 'Influence Is a Clarity Problem.',
      time: '20–30 min',
      ideal: 'TEDx, summits, opening keynotes',
      body: 'The short, punchy version. The thesis behind the True Influence Method, in a single talk.',
    },
  ];

  if (sent) {
    return (
      <Section tone="paper">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>Inquiry received</Eyebrow>
          <h1 className="display">We've got it.</h1>
          <p className="lead">
            Joanna's team reviews every booking request personally and will reply within
            <strong> 48 business hours</strong>. If your date is tight, reply to the
            confirmation email and we'll prioritize.
          </p>
          <Plate label="thank you" h={240} style={{ margin: '24px 0' }} />
          <Button primary onClick={() => goTo('home')}>Back home →</Button>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* HERO */}
      <Section tone="paper">
        <Container>
          <div className="vault-grid">
            <div>
              <Eyebrow>Book Joanna</Eyebrow>
              <h1 className="display">Invite Joanna to your <Underline>stage.</Underline></h1>
              <p className="lead">
                Keynotes, fireside chats, TV appearances, and intimate executive rooms.
                Joanna speaks to leaders ready to find the message that actually moves
                their work forward.
              </p>
              <div className="cta-row">
                <Button primary size="lg" onClick={() => {
                  document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}>
                  Send a booking inquiry →
                </Button>
                <Button ghost size="lg" onClick={() => goTo('product', { id: 'vault' })}>
                  Hear her live · June 5 free
                </Button>
              </div>
              <div className="speaker-stats">
                <div><strong>150+</strong><span>stages worldwide</span></div>
                <div><strong>4</strong><span>TEDx appearances</span></div>
                <div><strong>12</strong><span>countries</span></div>
              </div>
            </div>
            <Plate label="Joanna · on stage" h={520} src="assets/hero-portrait.jpg" />
          </div>
        </Container>
      </Section>

      {/* SPEAKER REEL */}
      <Section tone="ink">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>The reel</Eyebrow>
          <h2 className="display" style={{ color: 'inherit' }}>
            Two minutes of <em>her</em> in a room.
          </h2>
          <div className="reel-frame">
            <Plate label="▶ play speaker reel" h={420} style={{ background: '#222', borderColor: 'rgba(255,255,255,0.18)' }} />
          </div>
          <p className="muted" style={{ color: 'rgba(245,239,228,0.6)' }}>
            Want a higher-res reel + bio + headshots for your event page?
            <a style={{ color: 'var(--paper)', textDecoration: 'underline', cursor: 'pointer' }}> Download the speaker kit →</a>
          </p>
        </Container>
      </Section>

      {/* AS SEEN ON / PAST EVENTS */}
      <Section tone="cream">
        <Container>
          <div className="center-head">
            <Eyebrow>Recent stages, TV &amp; podcasts</Eyebrow>
            <h2 className="display">Where she's <Underline>been.</Underline></h2>
            <p className="lead">Selected appearances from the last few years.</p>
          </div>
          <div className="events-grid">
            {events.map((e, i) => (
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
            <Button ghost>See full press archive →</Button>
          </div>
        </Container>
      </Section>

      {/* SIGNATURE TALKS */}
      <Section tone="paper">
        <Container>
          <div className="center-head">
            <Eyebrow>Signature talks</Eyebrow>
            <h2 className="display">Pick the <Underline>talk.</Underline></h2>
            <p className="lead">Three rooms, three lengths — each adapted to your audience.</p>
          </div>
          <div className="talks-grid">
            {talks.map((t, i) => (
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

      {/* TESTIMONIAL FROM EVENT */}
      <Section tone="cream">
        <Container narrow>
          <Quote by="Marcus L. · Conference Director, Watermark">
            We've booked 60+ keynotes over five years. Joanna got the only standing ovation
            we've ever had — and she did it with a single sentence the room couldn't stop repeating.
          </Quote>
        </Container>
      </Section>

      {/* INQUIRY FORM */}
      <Section tone="paper" id="inquiry">
        <Container>
          <div className="inquiry-grid">
            <div>
              <Eyebrow>Booking inquiry</Eyebrow>
              <h2 className="display">Tell us about <Underline>your event.</Underline></h2>
              <p className="lead">
                Joanna's team reviews every request personally. The more specific you can be,
                the faster we can confirm fit and fees.
              </p>
              <ul className="check-list compact">
                <li>We respond within <strong>48 business hours</strong></li>
                <li>Virtual, in-person, hybrid — all considered</li>
                <li>Honorariums vary by audience, length, and travel</li>
                <li>Speaker kit + bio + headshots provided on confirmation</li>
              </ul>
              <Hairline style={{ margin: '24px 0' }} />
              <div className="contact-direct">
                <strong>Or email direct:</strong>
                <a href="mailto:speaking@trueinfluencemethod.com">speaking@trueinfluencemethod.com</a>
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
                We never share your details. Replies come from speaking@trueinfluencemethod.com.
              </p>
            </form>
          </div>
        </Container>
      </Section>

      {/* RELATED */}
      <Section tone="cream">
        <Container narrow style={{ textAlign: 'center' }}>
          <Eyebrow>Not booking — exploring?</Eyebrow>
          <h3 className="display sm">Hear Joanna live · <em>free</em> · June 5.</h3>
          <Button primary onClick={() => goTo('product', { id: 'vault' })}>Save my seat →</Button>
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
        <h1 className="display">All <Underline>programs.</Underline></h1>
        <p className="lead">Every offer in one place — pick by phase, price, or path.</p>
      </Container>
    </Section>
    <Section tone="cream">
      <Container>
        <div className="all-prog-grid">
          {['dollar-message','vault','phase-1','phase-2','phase-3','breakthrough','four-session','phase-4','phase-5'].map(id => {
            const p = PRODUCTS[id];
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

// ── THE JOURNEY ──────────────────────────────────────────────────────────
// Joanna's personal narrative — first-person, sparse, no marketing voice.
const JourneyPage = () => (
  <>
    <Section tone="paper">
      <Container narrow>
        <Eyebrow>The Journey</Eyebrow>
        <h1 className="display">How I found <Underline>the work.</Underline></h1>
        <p className="lead">
          The short version. The longer one I tell on stage.
        </p>
      </Container>
    </Section>

    <Section tone="cream">
      <Container narrow>
        <div className="journey">
          {[
            { y: 'Before',  t: 'I was good at speaking. I was bad at being heard. There is a difference and it cost me a decade.' },
            { y: 'The room', t: 'A woman across a café asked me one question. I told her a story I had never said out loud. She cried. So did I. That was the moment I knew what I actually do.' },
            { y: 'The retreat', t: 'Eight women, four days, one room. No slides. No framework. Just the moment each of them had been talking around for years. They left with a voice the room could feel. I have been running the method ever since.' },
            { y: 'Now', t: 'Hundreds of leaders. Stages, boardrooms, kitchens at 11pm. The work is the same. The story behind your solution is the only thing that makes you trusted.' },
            { y: 'Next', t: 'You. Whatever moment you have been talking around — let us name it.' },
          ].map((m, i) => (
            <article key={i} className="journey-row">
              <div className="journey-year">{m.y}</div>
              <p className="journey-body">{m.t}</p>
            </article>
          ))}
        </div>
        <Hairline style={{ margin: '36px 0 24px' }} />
        <Quote by="Joanna">Influence is not a volume problem. It is a clarity problem.</Quote>
      </Container>
    </Section>

    <Section tone="ink">
      <Container narrow style={{ textAlign: 'center' }}>
        <h2 className="display" style={{ color: 'inherit' }}>Ready to find yours?</h2>
        <div className="cta-row centered">
          <Button primary size="lg" onClick={() => goTo('start')}>Choose where you are →</Button>
          <Button ghost size="lg" onClick={() => goTo('product', { id: 'vault' })}>Meet me first · free June 5</Button>
        </div>
      </Container>
    </Section>
  </>
);

Object.assign(window, {
  AboutPage, JourneyPage, StoriesPage, FAQPage,
  CommunityPage, CorporatePage, SpeakingPage,
  AllProgramsPage,
});
