// home.jsx — the homepage. Content loaded from CMS.
const H = () => window.HOME || {};
const html = (s) => ({ __html: s || '' });

const HomePage = () => {
  const HOME = window.HOME || {};
  return (
    <>
      <Section tone="paper" id="hero">
        <Container>
          <div className="hero-grid">
            <div className="hero-copy">
              <Eyebrow>{HOME.heroEyebrow}</Eyebrow>
              <h1 className="display" dangerouslySetInnerHTML={html(HOME.heroTitle)} />
              <p className="lead" dangerouslySetInnerHTML={html(HOME.heroBody)} />
              <div className="cta-row">
                <Button primary size="lg" onClick={() => goTo('start')}>{HOME.heroCtaPrimary}</Button>
                <Button ghost size="lg" onClick={() => goTo('product', { id: 'vault' })}>
                  {HOME.heroCtaSecondary}
                </Button>
              </div>
              <div className="hero-meta">
                <span>{HOME.heroStars}</span>
                <span>{HOME.heroMeta1}</span>
                <span>·</span>
                <span>{HOME.heroMeta2}</span>
              </div>
            </div>
            <div className="hero-art">
              <Plate label="portrait of Joanna" h={460} src={HOME.heroImage} />
              <div className="hero-quote-tag">
                <em>{HOME.heroQuote}</em>
                <span>{HOME.heroQuoteAuthor}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" style={{ paddingTop: 0 }}>
        <Container>
          <div className="logo-row">
            <span className="logo-row-label">{HOME.logoRowLabel}</span>
            {(HOME.logos || []).map((logo, i) => (
              <div key={i} className="logo-slot">{logo.src ? <img src={logo.src} alt={logo.alt} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}} /> : 'logo'}</div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container narrow>
          <Eyebrow style={{ color: 'rgba(255,255,255,0.6)' }}>{HOME.falseProblemEyebrow}</Eyebrow>
          <div className="false-problems">
            {(HOME.falseProblems || []).map((fp, i) => <div key={i} className="fp">{fp}</div>)}
          </div>
          <p className="overline">{HOME.falseProblemOverline}</p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="two-col">
            <div>
              <Eyebrow>{HOME.whatsHappeningEyebrow}</Eyebrow>
              <h2 className="display sm" dangerouslySetInnerHTML={html(HOME.whatsHappeningTitle)} />
              <p className="lead">{HOME.whatsHappeningBody}</p>
            </div>
            <ul className="check-list">
              {(HOME.whatsHappeningList || []).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container narrow>
          <Eyebrow>{HOME.missingPieceEyebrow}</Eyebrow>
          <p className="lead" dangerouslySetInnerHTML={html(HOME.missingPieceBody)} />
          <Quote by={HOME.missingPieceQuoteBy}>{HOME.missingPieceQuote}</Quote>
          <p className="muted" dangerouslySetInnerHTML={html(HOME.missingPieceMuted)} />
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="two-col">
            <div>
              <Eyebrow>{HOME.whyMattersEyebrow}</Eyebrow>
              <h3 className="display xs">{HOME.whyMattersTitle}</h3>
              <p dangerouslySetInnerHTML={html(HOME.whyMattersBody)} />
            </div>
            <div>
              <Eyebrow>{HOME.whatShiftsEyebrow}</Eyebrow>
              <ul className="check-list compact">
                {(HOME.whatShiftsList || []).map((item, i) => <li key={i} dangerouslySetInnerHTML={html(item)} />)}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream" id="start">
        <Container>
          <div className="center-head">
            <Eyebrow>{HOME.chooseEyebrow}</Eyebrow>
            <h2 className="display" dangerouslySetInnerHTML={html(HOME.chooseTitle)} />
            <p className="lead">{HOME.chooseBody}</p>
            <p className="muted" dangerouslySetInnerHTML={html(HOME.chooseMuted)} />
          </div>

          <div className="icp-grid">
            {(HOME.icpCards || []).map((card, i) => (
              <button key={i} type="button" className={"icp-card" + (card.featured ? ' featured' : '')} onClick={() => goTo(card.route)}>
                <div className="icp-phase">{card.phase}</div>
                <h3 className="display sm" dangerouslySetInnerHTML={html(card.heading)} />
                <div className="icp-meta">
                  <span>{card.meta1}</span>
                  <span>{card.meta2}</span>
                </div>
                <p dangerouslySetInnerHTML={html(card.body)} />
                <div className="icp-foot">
                  <div className="icp-card-quote">{card.quote}</div>
                  <span className="icp-arrow">{card.arrow}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="not-sure">
            <span>{HOME.notSureText}</span>
            <Button secondary onClick={() => goTo('assessment')}>
              {HOME.notSureCta}
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="front-door-grid">
            {(HOME.frontDoor || []).map((fd, i) => (
              <article key={i} className={"fd-card" + (fd.paid ? ' fd-paid' : ' fd-free')}>
                <Eyebrow>{fd.eyebrow}</Eyebrow>
                <h3 className="display sm">{fd.title}</h3>
                <p>{fd.body}</p>
                <div className="fd-foot">
                  <span className={"big-price" + (fd.paid ? '' : ' free')}>{fd.price}</span>
                  <Button primary onClick={() => goTo('product', { id: fd.productId })}>
                    {fd.cta}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <Eyebrow style={{ textAlign: 'center' }}>{HOME.testimonialsEyebrow}</Eyebrow>
          <div className="testi-grid">
            {(HOME.testimonials || []).map((t, i) => (
              <figure key={i} className="testi">
                <span className="testi-mark">"</span>
                <blockquote>{t.quote}</blockquote>
                <figcaption><strong>{t.name}</strong> · {t.role}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container narrow style={{ textAlign: 'center' }}>
          <h2 className="display" style={{ color: 'inherit' }} dangerouslySetInnerHTML={html(HOME.closerTitle)} />
          <div className="cta-row centered">
            <Button primary size="lg" onClick={() => goTo('start')}>{HOME.closerCtaPrimary}</Button>
            <Button ghost size="lg" onClick={() => goTo('product', { id: 'dollar-message' })}>
              {HOME.closerCtaSecondary}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

window.HomePage = HomePage;
