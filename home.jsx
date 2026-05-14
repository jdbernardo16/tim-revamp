// home.jsx — the homepage. Content loaded from CMS.
const H = () => window.HOME || {};
const html = (s) => ({ __html: s || "" });

const HomePage = () => {
    const HOME = window.HOME || {};
    return (
        <>
            {!HOME.hideOriginalHero && (
                <Section tone="paper" id="hero">
                    <Container>
                        <div className="hero-grid">
                            <div className="hero-copy">
                                <Eyebrow>{HOME.heroEyebrow}</Eyebrow>
                                <h1
                                    className="display"
                                    dangerouslySetInnerHTML={html(
                                        HOME.heroTitle,
                                    )}
                                />
                                <p
                                    className="lead"
                                    dangerouslySetInnerHTML={html(
                                        HOME.heroBody,
                                    )}
                                />
                                <div className="cta-row">
                                    <Button
                                        primary
                                        size="lg"
                                        onClick={() => goTo("start")}
                                    >
                                        {HOME.heroCtaPrimary}
                                    </Button>
                                    <Button
                                        ghost
                                        size="lg"
                                        onClick={() =>
                                            goTo("product", { id: "vault" })
                                        }
                                    >
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
                                <Plate
                                    label="portrait of Joanna"
                                    h={460}
                                    src={HOME.heroImage}
                                />
                                <div className="hero-quote-tag">
                                    <em>{HOME.heroQuote}</em>
                                    <span>{HOME.heroQuoteAuthor}</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>
            )}

            <Section
                tone="ink"
                id="brand-hero"
                style={{
                    minHeight: "calc(100vh - 81px)",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                    paddingTop: 0,
                    paddingBottom: 0,
                }}
            >
                {HOME.brandHeroVideo && (
                    <video
                        className="brand-hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={HOME.brandHeroVideo} type="video/mp4" />
                    </video>
                )}
                <div className="brand-hero-overlay" />
                <div className="brand-hero-content">
                    <div className="brand-hero-title-wrap">
                        <span className="brand-hero-line" />
                        <h1 className="brand-hero-title">
                            {HOME.brandHeroHeading}
                        </h1>
                        <span className="brand-hero-line" />
                    </div>
                    <p
                        className="lead"
                        style={{ margin: "28px auto", maxWidth: "640px" }}
                    >
                        {HOME.brandHeroBody}
                    </p>
                    <div className="cta-row centered">
                        <Button primary size="lg" onClick={() => goTo("start")}>
                            {HOME.heroCtaPrimary}
                        </Button>
                        <Button
                            ghost
                            size="lg"
                            onClick={() => goTo("product", { id: "vault" })}
                        >
                            {HOME.heroCtaSecondary}
                        </Button>
                    </div>
                </div>
                <div className="scroll-indicator">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </div>
            </Section>

            {/* ── Partners / Trusted By Marquee ── */}
            <section className="partners-section">
                <div className="partners-container" style={{ paddingTop: 0 }}>
                    {/* Gold divider */}
                    <div className="partners-gold-divider" style={{ marginBottom: 48 }}></div>

                    {/* Heading */}
                    <div className="partners-heading">
                        <span className="partners-pill">
                            <span className="partners-pill-dot"></span>
                            Trusted By
                        </span>
                    </div>
                </div>

                {/* Marquee Logo Strip */}
                <div className="partners-marquee-wrapper">
                    <div className="partners-marquee-track" aria-label="As Seen On">
                        {[
                            ["30 Rock", "30-rock.webp"],
                            ["48 Hours", "48-hours.webp"],
                            ["ABC", "abc.png"],
                            ["AOCC", "aocc.png"],
                            ["AT&T", "att.webp"],
                            ["BBBS", "bbbs.png"],
                            ["BGCA", "bgca.png"],
                            ["Bioneers", "bioneers.png"],
                            ["Bloomberg", "bloomberg.png"],
                            ["Chandler Chamber", "chandler-chamber.jpeg"],
                            ["CNN", "cnn.webp"],
                            ["Deseret News", "deseret-news.webp"],
                            ["Disney", "disney.webp"],
                            ["Flagler College", "flagler-college.png"],
                            ["Forbes", "forbes.jpeg"],
                            ["Golden Apple Awards", "golden-apple.webp"],
                            ["Harvard", "harvard.svg"],
                            ["iHeart Radio", "iheart-radio.webp"],
                            ["MTV", "mtv.png"],
                            ["Mentoring Monday", "mentoring-monday.png"],
                            ["NAWBO", "nawbo.jpg"],
                            ["PBJ", "pbj.png"],
                            ["RSC", "rsc.webp"],
                            ["ScaleUp", "scaleup.jpeg"],
                            ["Shambhala", "shambhala.png"],
                            ["Union College", "union-college.png"],
                            ["USM", "usm.png"],
                            ["USA Today", "usa-today.svg"],
                            ["Vassar College", "vassar-college.png"],
                            ["WJCT", "wjct.webp"],
                            ["Wild Global", "wildglobal.webp"],
                            ["Yahoo News", "yahoo-news.png"],
                        ].flatMap(([label, file]) => [0, 1].map(() => [label, file])).map(([label, file], i) => (
                            <div key={i} className="partner-logo" aria-label={label}>
                                <img
                                    src={"assets/partners/" + file}
                                    alt={label}
                                    draggable="false"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="partners-container" style={{ paddingBottom: 0 }}>
                    {/* Gold divider */}
                    <div className="partners-gold-divider" style={{ marginTop: 48 }}></div>
                </div>
            </section>

            <Section tone="ink">
                <Container narrow>
                    <Eyebrow style={{ color: "rgba(255,255,255,0.6)" }}>
                        {HOME.falseProblemEyebrow}
                    </Eyebrow>
                    <div className="false-problems">
                        {(HOME.falseProblems || []).map((fp, i) => (
                            <div key={i} className="fp">
                                {fp}
                            </div>
                        ))}
                    </div>
                    <p className="overline">{HOME.falseProblemOverline}</p>
                </Container>
            </Section>

            <Section tone="paper">
                <Container>
                    <div className="two-col">
                        <div>
                            <Eyebrow>{HOME.whatsHappeningEyebrow}</Eyebrow>
                            <h2
                                className="display sm"
                                dangerouslySetInnerHTML={html(
                                    HOME.whatsHappeningTitle,
                                )}
                            />
                            <p className="lead">{HOME.whatsHappeningBody}</p>
                        </div>
                        <ul className="check-list">
                            {(HOME.whatsHappeningList || []).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </Section>

            <Section tone="cream">
                <Container narrow>
                    <Eyebrow>{HOME.missingPieceEyebrow}</Eyebrow>
                    <p
                        className="lead"
                        dangerouslySetInnerHTML={html(HOME.missingPieceBody)}
                    />
                    <Quote by={HOME.missingPieceQuoteBy}>
                        {HOME.missingPieceQuote}
                    </Quote>
                    <p
                        className="muted"
                        dangerouslySetInnerHTML={html(HOME.missingPieceMuted)}
                    />
                </Container>
            </Section>

            <Section tone="paper">
                <Container>
                    <div className="two-col">
                        <div>
                            <Eyebrow>{HOME.whyMattersEyebrow}</Eyebrow>
                            <h3 className="display xs">
                                {HOME.whyMattersTitle}
                            </h3>
                            <p
                                dangerouslySetInnerHTML={html(
                                    HOME.whyMattersBody,
                                )}
                            />
                        </div>
                        <div>
                            <Eyebrow>{HOME.whatShiftsEyebrow}</Eyebrow>
                            <ul className="check-list compact">
                                {(HOME.whatShiftsList || []).map((item, i) => (
                                    <li
                                        key={i}
                                        dangerouslySetInnerHTML={html(item)}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section tone="cream" id="start">
                <Container>
                    <div className="center-head">
                        <Eyebrow>{HOME.chooseEyebrow}</Eyebrow>
                        <h2
                            className="display"
                            dangerouslySetInnerHTML={html(HOME.chooseTitle)}
                        />
                        <p className="lead">{HOME.chooseBody}</p>
                        <p
                            className="muted"
                            dangerouslySetInnerHTML={html(HOME.chooseMuted)}
                        />
                    </div>

                    <div className="icp-grid">
                        {(HOME.icpCards || []).map((card, i) => (
                            <button
                                key={i}
                                type="button"
                                className={
                                    "icp-card" +
                                    (card.featured ? " featured" : "")
                                }
                                onClick={() => goTo(card.route)}
                            >
                                <div className="icp-phase">{card.phase}</div>
                                <h3
                                    className="display sm"
                                    dangerouslySetInnerHTML={html(card.heading)}
                                />
                                <div className="icp-meta">
                                    <span>{card.meta1}</span>
                                    <span>{card.meta2}</span>
                                </div>
                                <p dangerouslySetInnerHTML={html(card.body)} />
                                <div className="icp-foot">
                                    <div className="icp-card-quote">
                                        {card.quote}
                                    </div>
                                    <span className="icp-arrow">
                                        {card.arrow}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="not-sure">
                        <span>{HOME.notSureText}</span>
                        <Button secondary onClick={() => goTo("assessment")}>
                            {HOME.notSureCta}
                        </Button>
                    </div>
                </Container>
            </Section>

            <Section tone="paper">
                <Container>
                    <div className="front-door-grid">
                        {(HOME.frontDoor || []).map((fd, i) => (
                            <article
                                key={i}
                                className={
                                    "fd-card" +
                                    (fd.paid ? " fd-paid" : " fd-free")
                                }
                            >
                                <Eyebrow>{fd.eyebrow}</Eyebrow>
                                <h3 className="display sm">{fd.title}</h3>
                                <p>{fd.body}</p>
                                <div className="fd-foot">
                                    <span
                                        className={
                                            "big-price" +
                                            (fd.paid ? "" : " free")
                                        }
                                    >
                                        {fd.price}
                                    </span>
                                    <Button
                                        primary
                                        onClick={() =>
                                            goTo("product", {
                                                id: fd.productId,
                                            })
                                        }
                                    >
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
                    <Eyebrow style={{ textAlign: "center" }}>
                        {HOME.testimonialsEyebrow}
                    </Eyebrow>
                    <div className="testi-grid">
                        {(HOME.testimonials || []).map((t, i) => (
                            <figure key={i} className="testi">
                                <span className="testi-mark">"</span>
                                <blockquote>{t.quote}</blockquote>
                                <figcaption>
                                    <strong>{t.name}</strong> · {t.role}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section tone="ink">
                <Container narrow style={{ textAlign: "center" }}>
                    <h2
                        className="display"
                        style={{ color: "inherit" }}
                        dangerouslySetInnerHTML={html(HOME.closerTitle)}
                    />
                    <div className="cta-row centered">
                        <Button primary size="lg" onClick={() => goTo("start")}>
                            {HOME.closerCtaPrimary}
                        </Button>
                        <Button
                            ghost
                            size="lg"
                            onClick={() =>
                                goTo("product", { id: "dollar-message" })
                            }
                        >
                            {HOME.closerCtaSecondary}
                        </Button>
                    </div>
                </Container>
            </Section>
        </>
    );
};

window.HomePage = HomePage;
