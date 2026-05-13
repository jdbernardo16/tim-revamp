// icp.jsx — the three ICP detail pages. Content loaded from CMS.
const html = (s) => ({ __html: s || '' });
const icp = () => window.ICP || {};

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

const ICPHero = ({ data }) => (
  <Section tone="paper">
    <Container>
      <div className="bread">
        <a onClick={() => goTo('home')}>Home</a> <span>→</span> <a onClick={() => goTo('start')}>Choose your path</a> <span>→</span> <strong>{data.breadcrumb}</strong>
      </div>
      <Eyebrow>{data.tag}</Eyebrow>
      <h1 className="display" dangerouslySetInnerHTML={html(data.heading)} />
      <div className="icp-headline-meta">
        <div><span className="meta-k">WHO</span>{data.who}</div>
        <div><span className="meta-k">REVENUE</span>{data.revenue}</div>
      </div>
      <p className="lead">{data.body}</p>
    </Container>
  </Section>
);

const ICPDiagnostic = ({ data }) => (
  <>
    <Section tone="cream">
      <Container>
        <div className="two-col">
          <div>
            <Eyebrow>What's happening</Eyebrow>
            <h2 className="display sm" dangerouslySetInnerHTML={html(data.diagnosticTitle)} />
            <p className="lead">{data.diagnosticLead}</p>
          </div>
          <ul className="dot-list">
            {(data.diagnosticObservations || []).map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>
      </Container>
    </Section>

    <Section tone="paper">
      <Container>
        <div className="three-col">
          <div className="diag-col">
            <Eyebrow>You don't lack…</Eyebrow>
            <h3 className="display xs">{data.lackTitle}</h3>
            <ul className="x-list">
              {(data.lackItems || []).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="diag-col">
            <Eyebrow>What you need</Eyebrow>
            <h3 className="display xs">The next move</h3>
            <ul className="check-list compact">
              {(data.needItems || []).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="diag-col diag-col-out">
            <Eyebrow>What you get</Eyebrow>
            <h3 className="display xs">What changes</h3>
            <ul className="check-list compact">
              {(data.getItems || []).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
            <div className="say-quote">
              You can say: <em>"{data.sentence}"</em>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  </>
);

const SpeakerPage = () => {
  const d = icp().speaker || {};
  return (
    <>
      <ICPHero data={d} />
      <ICPDiagnostic data={d} />

      <Section tone="cream">
        <Container>
          <div className="center-head">
            <Eyebrow>{d.pathEyebrow}</Eyebrow>
            <h2 className="display">{d.pathHeading}</h2>
            <p className="lead">{d.pathBody}</p>
          </div>

          <div className="prod-shelf">
            <ProductCard id={d.recommendedProduct} recommended />
          </div>

          <div className="add-on-wrap">
            <Eyebrow>{d.addOnEyebrow}</Eyebrow>
            <div className="add-on-grid">
              {(d.addOns || []).map((ao, i) => (
                <div key={i} className="add-on">
                  <h4>{ao.heading}</h4>
                  <p>{ao.body}</p>
                  {ao.price && <div className="add-on-foot">
                    <span>{ao.price}</span>
                    <Button secondary size="sm" onClick={() => goTo(ao.buttonRoute, ao.buttonParams)}>{ao.buttonLabel}</Button>
                  </div>}
                  {!ao.price && <Button ghost size="sm" onClick={() => goTo(ao.buttonRoute, ao.buttonParams)}>{ao.buttonLabel}</Button>}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

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
};

const AuthorityPage = () => {
  const d = icp().authority || {};
  const recs = d.recommendedProducts || [];
  return (
    <>
      <ICPHero data={d} />
      <ICPDiagnostic data={d} />

      <Section tone="cream">
        <Container>
          <div className="center-head">
            <Eyebrow>{d.pathEyebrow}</Eyebrow>
            <h2 className="display">{d.pathHeading}</h2>
            <p className="lead">{d.pathBody}</p>
          </div>

          <div className="prod-shelf two">
            {recs.map((id, i) => <ProductCard key={id} id={id} recommended={i === 0} />)}
          </div>

          <Hairline style={{ margin: '48px 0 24px' }} />

          <div className="center-head">
            <Eyebrow>{d.privateEyebrow}</Eyebrow>
            <h3 className="display sm">{d.privateHeading}</h3>
          </div>
          <div className="prod-shelf two">
            {(d.privateProducts || []).map(id => <ProductCard key={id} id={id} />)}
          </div>
        </Container>
      </Section>

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
};

const LegacyPage = () => {
  const d = icp().legacy || {};
  const recs = d.recommendedProducts || [];
  return (
    <>
      <ICPHero data={d} />
      <ICPDiagnostic data={d} />

      <Section tone="cream">
        <Container>
          <div className="center-head">
            <Eyebrow>{d.pathEyebrow}</Eyebrow>
            <h2 className="display">{d.pathHeading}</h2>
            <p className="lead">{d.pathBody}</p>
          </div>

          <div className="prod-shelf two">
            {recs.map((id, i) => <ProductCard key={id} id={id} recommended={i === 0} />)}
          </div>

          <div className="invite-band">
            <div>
              <Eyebrow>{d.inviteEyebrow}</Eyebrow>
              <h3 className="display xs">{d.inviteHeading}</h3>
              <p>{d.inviteBody}</p>
            </div>
            <Button primary size="lg" onClick={() => goTo(d.inviteRoute, d.inviteParams)}>{d.inviteCta}</Button>
          </div>
        </Container>
      </Section>

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
};

Object.assign(window, { SpeakerPage, AuthorityPage, LegacyPage, ProductCard });
