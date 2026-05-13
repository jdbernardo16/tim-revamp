// home.jsx — the homepage. Uses copy verbatim from Joanna's doc.

const HomePage = () => {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <Section tone="paper" id="hero">
        <Container>
          <div className="hero-grid">
            <div className="hero-copy">
              <Eyebrow>The True Influence Method</Eyebrow>
              <h1 className="display">
                You're not missing<br/>
                a <Underline>message.</Underline><br/>
                You're missing <em>trust.</em>
              </h1>
              <p className="lead">
                To gain influence, income, and impact — speaking doesn't cut it.
                It's time to <strong>lead</strong> with your message: turn your lived
                experience into a message people trust and follow.
              </p>
              <div className="cta-row">
                <Button primary size="lg" onClick={() => goTo('start')}>Start with your story →</Button>
                <Button ghost size="lg" onClick={() => goTo('product', { id: 'vault' })}>
                  Free with Joanna · June 5
                </Button>
              </div>
              <div className="hero-meta">
                <span>★★★★★</span>
                <span>300+ leaders guided</span>
                <span>·</span>
                <span>Trusted by Fortune 500 execs &amp; founders</span>
              </div>
            </div>
            <div className="hero-art">
              <Plate label="portrait of Joanna" h={460} src="assets/hero-portrait.jpg" />
              <div className="hero-quote-tag">
                <em>"We need the moment of your personal breakthrough that led to your special sauce."</em>
                <span>— Joanna</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── LOGOS ────────────────────────────────────────────────── */}
      <Section tone="paper" style={{ paddingTop: 0 }}>
        <Container>
          <div className="logo-row">
            <span className="logo-row-label">Trusted by leaders at</span>
            {[1,2,3,4,5,6].map(i => <div key={i} className="logo-slot">logo</div>)}
          </div>
        </Container>
      </Section>

      {/* ── THE FALSE PROBLEM ─────────────────────────────────────── */}
      <Section tone="ink">
        <Container narrow>
          <Eyebrow style={{ color: 'rgba(255,255,255,0.6)' }}>What you've been telling yourself</Eyebrow>
          <div className="false-problems">
            <div className="fp">"I don't know what to say."</div>
            <div className="fp">"I need a better message."</div>
            <div className="fp">"I need more confidence."</div>
          </div>
          <p className="overline">That feels true. It's not the real problem.</p>
        </Container>
      </Section>

      {/* ── WHAT'S ACTUALLY HAPPENING ───────────────────────────── */}
      <Section tone="paper">
        <Container>
          <div className="two-col">
            <div>
              <Eyebrow>What's actually happening</Eyebrow>
              <h2 className="display sm">
                You're speaking <em>without</em><br/>
                connection to your <Underline>lived truth.</Underline>
              </h2>
              <p className="lead">
                Even when everything sounds right, something is missing.
              </p>
            </div>
            <ul className="check-list">
              <li>You have a strong idea, but it doesn't move people.</li>
              <li>You lean on strategy, structure, or performance to carry it.</li>
              <li>You show up — but you don't stand out.</li>
              <li>You're leading, but you're not fully seen for what you do differently.</li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── THE MISSING PIECE / PULL QUOTE ─────────────────────────── */}
      <Section tone="cream">
        <Container narrow>
          <Eyebrow>The missing piece</Eyebrow>
          <p className="lead">
            Most leaders skip the one thing that makes their message undeniable:
            <strong> the moments that changed them.</strong>
          </p>
          <Quote by="Joanna">
            We need the moment of your personal breakthrough that led to your special sauce.
          </Quote>
          <p className="muted">
            This is not about telling a better story. It's about uncovering the
            moments that <em>created</em> your perspective.
          </p>
        </Container>
      </Section>

      {/* ── WHY IT MATTERS + WHAT SHIFTS ─────────────────────────── */}
      <Section tone="paper">
        <Container>
          <div className="two-col">
            <div>
              <Eyebrow>Why this matters</Eyebrow>
              <h3 className="display xs">Your message has no weight without inner authority.</h3>
              <p>
                Telling the story behind your solution creates emotional weight,
                credibility, authority, differentiation — and most importantly,
                <strong> trust.</strong> People don't follow information.
                They follow a leader whose real transformation they can feel.
              </p>
            </div>
            <div>
              <Eyebrow>What shifts when you find it</Eyebrow>
              <ul className="check-list compact">
                <li>Your message becomes clear without forcing it.</li>
                <li>Your confidence comes from <em>knowing</em>, not performing.</li>
                <li>Your audience understands you immediately.</li>
                <li>Your voice carries meaning, not just words.</li>
                <li>You stop being convincing — and become trusted.</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── CHOOSE WHERE YOU ARE ─────────────────────────────────── */}
      <Section tone="cream" id="start">
        <Container>
          <div className="center-head">
            <Eyebrow>This is the work</Eyebrow>
            <h2 className="display">
              Choose <Underline>where you are.</Underline>
            </h2>
            <p className="lead">
              You don't need more strategy. You need to close the gap between what you
              know and what you can actually say in the moments that matter.
            </p>
            <p className="muted">
              Are you a <strong>Speaker</strong>, an <strong>Authority</strong>, or a
              <strong> Legacy</strong>? Find your phase to get what you need.
            </p>
          </div>

          <div className="icp-grid">
            <button type="button" className="icp-card" onClick={() => goTo('speaker')}>
              <div className="icp-phase">ICP 1 · The Speaker</div>
              <h3 className="display sm">Find my<br/>message</h3>
              <div className="icp-meta">
                <span>Early stage · 3–8 yrs</span>
                <span>Revenue $100K – $500K</span>
              </div>
              <p>You know you have something to say — but you can't clearly say what defines you yet.</p>
              <div className="icp-foot">
                <div className="icp-card-quote">"I know what defines me."</div>
                <span className="icp-arrow">→ Find my message</span>
              </div>
            </button>

            <button type="button" className="icp-card featured" onClick={() => goTo('authority')}>
              <div className="icp-phase">ICP 2 · The Authority</div>
              <h3 className="display sm">Build my<br/>talk</h3>
              <div className="icp-meta">
                <span>Established · 10–20 yrs</span>
                <span>Revenue $500K – $5M+</span>
              </div>
              <p>You know your work — but you over-explain it when it matters most. Your message loses energy as you explain it.</p>
              <div className="icp-foot">
                <div className="icp-card-quote">"My message lands."</div>
                <span className="icp-arrow">→ Build my talk</span>
              </div>
            </button>

            <button type="button" className="icp-card" onClick={() => goTo('legacy')}>
              <div className="icp-phase">ICP 3 · The Legacy</div>
              <h3 className="display sm">Define my<br/>legacy</h3>
              <div className="icp-meta">
                <span>Advanced · 20+ yrs</span>
                <span>Revenue $5M – $25M+</span>
              </div>
              <p>You've built something significant — but you are not clearly known for what you do <em>differently.</em></p>
              <div className="icp-foot">
                <div className="icp-card-quote">"I'm known for something specific."</div>
                <span className="icp-arrow">→ Define my legacy</span>
              </div>
            </button>
          </div>

          <div className="not-sure">
            <span>Not sure where you are?</span>
            <Button secondary onClick={() => goTo('assessment')}>
              Take the 5-minute Influence Path Assessment →
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── LEAD MAGNET + VAULT (the two front-door offers) ───────── */}
      <Section tone="paper">
        <Container>
          <div className="front-door-grid">
            <article className="fd-card fd-paid">
              <Eyebrow>$29 · Self-paced</Eyebrow>
              <h3 className="display sm">Your Dollar Message</h3>
              <p>
                The fastest way to find the one sentence that sells you.
                A 60-minute training + worksheet + Joanna's 3-question clarity prompt.
              </p>
              <div className="fd-foot">
                <span className="big-price">$29</span>
                <Button primary onClick={() => goTo('product', { id: 'dollar-message' })}>
                  Get it now →
                </Button>
              </div>
            </article>
            <article className="fd-card fd-free">
              <Eyebrow>Free · Live with Joanna</Eyebrow>
              <h3 className="display sm">The Vault</h3>
              <p>
                A free live session — June 5 — to feel the work and meet Joanna before you commit.
                Bring the message you've been trying to land. Q&amp;A and replay included.
              </p>
              <div className="fd-foot">
                <span className="big-price free">FREE</span>
                <Button primary onClick={() => goTo('product', { id: 'vault' })}>
                  Save my seat →
                </Button>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* ── PROOF: testimonials ─────────────────────────────────── */}
      <Section tone="cream">
        <Container>
          <Eyebrow style={{ textAlign: 'center' }}>What women say after the work</Eyebrow>
          <div className="testi-grid">
            {[
              { q: 'I finally stopped explaining myself. My message went from "good idea" to "she means it." Booked three keynotes in six weeks.', n: 'Maya', r: 'Founder · Tech' },
              { q: 'I came in thinking I needed better delivery. I left with a totally different sentence about what I do — and a board that finally listened.', n: 'Renée', r: 'VP · Media' },
              { q: 'I had been telling the same story for ten years. Joanna found the one underneath. Different career on the other side.', n: 'Aiyana', r: 'Founder · Wellness' },
            ].map((t, i) => (
              <figure key={i} className="testi">
                <span className="testi-mark">"</span>
                <blockquote>{t.q}</blockquote>
                <figcaption><strong>{t.n}</strong> · {t.r}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CLOSER ──────────────────────────────────────────────── */}
      <Section tone="ink">
        <Container narrow style={{ textAlign: 'center' }}>
          <h2 className="display" style={{ color: 'inherit' }}>
            Stop circling your message.<br/>
            <em>Start saying what actually matters.</em>
          </h2>
          <div className="cta-row centered">
            <Button primary size="lg" onClick={() => goTo('start')}>Choose where you are →</Button>
            <Button ghost size="lg" onClick={() => goTo('product', { id: 'dollar-message' })}>
              Try $29 first
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

window.HomePage = HomePage;
