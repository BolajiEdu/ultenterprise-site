import { useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════════
// UltEnterprise — landing page
// Deliberately light and editorial. Nearly every penetration
// testing consultancy uses a dark "hacker" aesthetic; a precise,
// well-typeset light site reads as established rather than
// startup, which is what a bank security lead responds to.
// ══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

.ue {
  --paper:#F7F8FA; --paper-2:#EDEFF3; --card:#FFFFFF;
  --ink:#14181F; --ink-2:#3D4654; --ink-3:#6B7686;
  --rule:#DDE1E8; --rule-2:#C6CCD6;
  --accent:#B23A0E;      /* burnt sienna — warm, serious, not alarmist */
  --accent-2:#8C2D0A;
  --deep:#1B2432;        /* slate for dark bands */
  --ok:#1F7A5C;

  background:var(--paper); color:var(--ink);
  font-family:'Inter',system-ui,sans-serif; font-size:16px; line-height:1.6;
  -webkit-font-smoothing:antialiased; min-height:100vh;
}
.ue *,.ue *::before,.ue *::after{box-sizing:border-box}
.ue h1,.ue h2,.ue h3{font-family:'Fraunces',Georgia,serif;margin:0;line-height:1.12;letter-spacing:-.015em;font-weight:600}
.ue p{margin:0}
.ue a{color:inherit;text-decoration:none}
.ue button{font-family:inherit;font-size:inherit}
.ue .mono{font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums}

.ue :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:2px}
@media (prefers-reduced-motion:reduce){.ue *{animation:none!important;transition:none!important}}

/* layout */
.ue .wrap{max-width:1140px;margin:0 auto;padding:0 32px}
.ue .sect{padding:88px 0}
.ue .sect-tight{padding:56px 0}
.ue .rule{height:1px;background:var(--rule);border:0;margin:0}

/* type */
.ue .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);margin-bottom:18px}
.ue .lede{font-size:19px;color:var(--ink-2);max-width:60ch}
.ue .small{font-size:14px;color:var(--ink-3)}
.ue .tiny{font-size:13px;color:var(--ink-3)}

/* nav */
.ue .nav{position:sticky;top:0;z-index:50;background:#F7F8FAF2;backdrop-filter:blur(12px);
  border-bottom:1px solid var(--rule)}
.ue .nav-in{display:flex;align-items:center;gap:28px;height:70px}
.ue .brand{display:flex;align-items:center;gap:10px;font-family:'Fraunces',serif;
  font-size:20px;font-weight:600;letter-spacing:-.02em}
.ue .navlinks{display:flex;gap:26px;margin-left:auto;align-items:center}
.ue .navlink{font-size:14.5px;color:var(--ink-2);font-weight:500}
.ue .navlink:hover{color:var(--accent)}

/* buttons */
.ue .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;
  padding:14px 26px;border-radius:2px;font-size:15px;font-weight:600;cursor:pointer;
  border:1px solid transparent;transition:background .16s,color .16s,border-color .16s;line-height:1}
.ue .btn-solid{background:var(--accent);color:#fff}
.ue .btn-solid:hover{background:var(--accent-2)}
.ue .btn-line{background:transparent;border-color:var(--rule-2);color:var(--ink)}
.ue .btn-line:hover{border-color:var(--ink);background:#fff}
.ue .btn-onDark{background:#fff;color:var(--deep)}
.ue .btn-onDark:hover{background:var(--paper-2)}
.ue .btn-sm{padding:10px 18px;font-size:14px}

/* hero */
.ue .hero{padding:96px 0 78px;position:relative;overflow:hidden}
.ue .hero h1{font-size:clamp(38px,5.6vw,70px);max-width:19ch;margin-bottom:26px}
.ue .hero-rule{width:64px;height:3px;background:var(--accent);margin-bottom:30px}
.ue .hero-cta{display:flex;gap:12px;margin:38px 0 0;flex-wrap:wrap}
.ue .trust{display:flex;gap:0;margin-top:52px;border-top:1px solid var(--rule);flex-wrap:wrap}
.ue .trust-i{flex:1;min-width:170px;padding:20px 22px 0 0}
.ue .trust-i:not(:last-child){border-right:1px solid var(--rule);padding-right:22px}
.ue .trust-k{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3);margin-bottom:6px}
.ue .trust-v{font-size:15px;font-weight:600}

/* segmentation — numbered editorial rows, not cards */
.ue .seg{display:grid;grid-template-columns:auto 1fr auto;gap:0;align-items:center;
  padding:30px 0;border-top:1px solid var(--rule);cursor:pointer;
  transition:background .16s;text-align:left;width:100%;background:transparent;border-left:0;border-right:0;border-bottom:0}
.ue .seg:last-of-type{border-bottom:1px solid var(--rule)}
.ue .seg:hover{background:#fff}
.ue .seg:hover .seg-arrow{color:var(--accent);transform:translateX(5px)}
.ue .seg-n{font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--accent);
  width:56px;flex-shrink:0}
.ue .seg-h{font-family:'Fraunces',serif;font-size:24px;font-weight:600;margin-bottom:6px}
.ue .seg-arrow{color:var(--rule-2);font-size:22px;padding-left:24px;transition:transform .16s,color .16s}

/* service grid */
.ue .svc{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--rule);
  border:1px solid var(--rule)}
.ue .svc-i{background:var(--paper);padding:34px 32px}
.ue .svc-i h3{font-size:21px;margin-bottom:12px}

/* capability grid — denser, distinct from service cards */
.ue .caps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:34px}
.ue .cap{padding-top:16px;border-top:2px solid var(--ink)}
.ue .cap-k{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.1em;
  color:var(--accent);margin-bottom:8px}
.ue .cap h4{font-family:'Fraunces',serif;font-size:17px;font-weight:600;margin:0 0 6px;
  letter-spacing:-.01em;line-height:1.25}
.ue .cap p{font-size:13.5px;color:var(--ink-3);line-height:1.5}

/* process — vertical spine */
.ue .step{display:grid;grid-template-columns:88px 1fr;gap:0;padding-bottom:38px;position:relative}
.ue .step:not(:last-child)::before{content:"";position:absolute;left:19px;top:42px;bottom:0;
  width:1px;background:var(--rule-2)}
.ue .step-n{width:38px;height:38px;border-radius:50%;border:1px solid var(--rule-2);
  background:var(--paper);display:flex;align-items:center;justify-content:center;
  font-family:'IBM Plex Mono',monospace;font-size:14px;color:var(--accent);flex-shrink:0}
.ue .step h3{font-size:20px;margin-bottom:8px}

/* dark band */
.ue .band{background:var(--deep);color:#E8EBF0}
.ue .band h2{color:#fff}
.ue .band .lede{color:#A9B3C2}
.ue .band .rule{background:#313D50}

/* credential list */
.ue .cred{display:grid;grid-template-columns:200px 1fr;gap:0;padding:20px 0;
  border-top:1px solid var(--rule)}
.ue .cred:last-child{border-bottom:1px solid var(--rule)}
.ue .cred-k{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:.08em;
  text-transform:uppercase;color:var(--ink-3);padding-top:2px}

/* stat row */
.ue .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.ue .stat-n{font-family:'Fraunces',serif;font-size:40px;font-weight:600;color:var(--accent);line-height:1}
.ue .band .stat-n{color:#E9A178}

/* footer */
.ue .foot{background:var(--deep);color:#94A0B0;padding:64px 0 28px;font-size:14px}
.ue .foot-g{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;margin-bottom:44px}
.ue .foot h4{font-family:'Inter',sans-serif;font-size:12px;letter-spacing:.11em;
  text-transform:uppercase;color:#5F6C7E;margin:0 0 14px;font-weight:600}
.ue .foot a:hover{color:#fff}
.ue .foot-li{display:block;margin-bottom:9px;color:#94A0B0}
.ue .foot-btm{border-top:1px solid #2A3444;padding-top:22px;font-size:12.5px;color:#5F6C7E;
  display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}

/* responsive */
@media (max-width:900px){
  .ue .wrap{padding:0 22px}
  .ue .sect{padding:64px 0}
  .ue .svc{grid-template-columns:1fr}
  .ue .caps{grid-template-columns:repeat(2,1fr);gap:18px}
  .ue .foot-g{grid-template-columns:1fr 1fr;gap:28px}
  .ue .stats{grid-template-columns:1fr;gap:22px}
  .ue .cred{grid-template-columns:1fr;gap:6px}
  .ue .navlinks{display:none}
  .ue .hero{padding:64px 0 52px}
}
@media (max-width:560px){
  .ue .seg{grid-template-columns:auto 1fr;gap:14px}
  .ue .seg-arrow{display:none}
  .ue .trust-i{border-right:0!important;min-width:100%;padding-right:0}
  .ue .step{grid-template-columns:56px 1fr}
  .ue .step:not(:last-child)::before{left:19px}
  .ue .foot-g{grid-template-columns:1fr}
  .ue .btn{width:100%}
  .ue .hero-cta{flex-direction:column}
}
`;

// ─── icons ───────────────────────────────────────────────────
const Ic = ({ d, s = 18, w = 1.6, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>{d}</svg>
);
const Shield = p => <Ic {...p} d={<path d="M12 2 4 5v7c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V5l-8-3Z" />} />;
const Arrow = p => <Ic {...p} d={<path d="M5 12h14m0 0-6-6m6 6-6 6" />} />;

// ─── content ─────────────────────────────────────────────────
const AUDIENCES = [
  { n: "01", h: "I run a small business",
    b: "You've got a website, customer data and no security team. You want to know whether you're exposed — without being sold something you don't understand." },
  { n: "02", h: "I'm building a fintech",
    b: "Your enterprise customers are asking for a penetration test report. Your investors will ask next. You need it done properly, and done soon." },
  { n: "03", h: "I own security at a financial institution",
    b: "You need an independent tester who understands financial services, works to a recognised methodology, and won't create problems for you." },
];

const SERVICES = [
  { h: "Penetration testing",
    b: "We attempt to compromise your systems under controlled conditions — external infrastructure, internal networks, web applications and APIs. Every finding is ranked by real business impact rather than raw severity score, with exact reproduction steps and a specific fix." },
  { h: "Red team engagements",
    b: "A penetration test asks whether a vulnerability exists. A red team asks whether your people, processes and detection would actually stop a determined attacker. We work to a defined objective, stay quiet, and report on what your defenders saw and missed." },
  { h: "Credential exposure assessment",
    b: "Most breaches begin with a login that already works. We check what of yours is circulating in breach dumps, stealer logs and Telegram channels, then show you which accounts to close first. Powered by CredShield, our own platform." },
  { h: "Security review and advisory",
    b: "Not every engagement needs a full test. Sometimes you need someone independent to look at an architecture, a supplier questionnaire or a control gap, and tell you plainly what matters and what doesn't." },
];

const CAPABILITIES = [
  { k: "01", h: "Web application", b: "Authentication, authorisation, session handling, injection, and the business logic flaws scanners never find." },
  { k: "02", h: "Mobile application", b: "iOS and Android. Static and dynamic analysis, insecure storage, certificate pinning, and the backend the app talks to." },
  { k: "03", h: "API", b: "REST and GraphQL. Broken object-level authorisation, mass assignment, rate limiting, and undocumented endpoints." },
  { k: "04", h: "Cloud configuration", b: "AWS, Azure and GCP. IAM over-permissioning, exposed storage, network boundaries, and misconfigured managed services." },
  { k: "05", h: "Active Directory", b: "Internal network and domain assessment. Privilege escalation paths, Kerberos attacks, delegation abuse, and lateral movement." },
  { k: "06", h: "Application security", b: "Threat modelling, secure design review, and building security into the development process rather than testing it in afterwards." },
  { k: "07", h: "Secure code review", b: "Manual review of source code for vulnerabilities that only appear in the implementation, not the running application." },
  { k: "08", h: "IoT and firmware", b: "Embedded devices and their firmware. Extraction and analysis, hardcoded secrets, insecure update mechanisms, and physical interfaces." },
];

const PROCESS = [
  { h: "Scope", b: "A conversation, not a sales call. We establish what you're worried about, what's in scope, and what a good outcome looks like. You get a fixed written proposal with a fixed price." },
  { h: "Test", b: "We work to the agreed scope and timeline with a named point of contact throughout. Anything critical is reported the moment we find it — you never wait for the report to learn your building is on fire." },
  { h: "Report", b: "Two documents. An executive summary your board or your customers can read, and a technical report your engineers can act on. Every finding carries reproduction steps, business impact and a specific remediation." },
  { h: "Retest", b: "Once you've fixed things, we verify the fixes at no additional cost. You finish with a clean report you can show to whoever asked for one." },
];

const CREDS = [
  ["Certification", "PNPT — Practical Network Penetration Tester, TCM Security. A fully practical five-day examination against live networks, assessed on the written report as well as the compromise."],
  ["Education", "BSc (Hons) Cybersecurity, 2:1 — University of Kent."],
  ["Methodology", "Engagements follow the OWASP Testing Guide and the Penetration Testing Execution Standard."],
  ["Confidentiality", "NDA before scoping, not after. Findings remain confidential indefinitely, in writing. Client names are never published without written permission."],
  ["Evidence handling", "Findings stored encrypted, retained for an agreed period, destroyed on schedule. Credentials discovered during testing are never stored in plaintext or reproduced in reports."],
];

// ─── page ────────────────────────────────────────────────────
export default function App() {
  const [year] = useState(() => new Date().getFullYear());

  const go = id => e => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="ue">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── nav ── */}
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="brand" onClick={go("top")}>
            <Shield s={21} c="var(--accent)" w={1.8} />
            UltEnterprise
          </a>
          <nav className="navlinks" aria-label="Main">
            <a className="navlink" href="#services" onClick={go("services")}>Services</a>
            <a className="navlink" href="#process" onClick={go("process")}>How we work</a>
            <a className="navlink" href="#credshield" onClick={go("credshield")}>CredShield</a>
            <a className="navlink" href="#about" onClick={go("about")}>About</a>
            <a className="btn btn-solid btn-sm" href="#contact" onClick={go("contact")}>Book a scoping call</a>
          </nav>
        </div>
      </header>

      {/* ── hero ── */}
      <section id="top" className="hero">
        <div className="wrap">
          <div className="eyebrow">Penetration testing · Red team · Kent, UK</div>
          <h1>Find out how someone would break in — before they do.</h1>
          <div className="hero-rule" />
          <p className="lede">
            UltEnterprise is an independent penetration testing and red team consultancy working with
            SMEs, fintechs and financial institutions across the UK. We test your systems the way a real
            attacker would, then hand you a plan you can actually action.
          </p>
          <div className="hero-cta">
            <a className="btn btn-solid" href="#contact" onClick={go("contact")}>
              Book a scoping call <Arrow s={17} />
            </a>
            <a className="btn btn-line" href="#process" onClick={go("process")}>See how we work</a>
          </div>

          <div className="trust">
            {[["Certified", "PNPT — TCM Security"],
              ["Educated", "BSc Cybersecurity, Kent"],
              ["Based", "Kent, United Kingdom"],
              ["Engagements", "SME · Fintech · Financial services"]].map(([k, v]) => (
              <div className="trust-i" key={k}>
                <div className="trust-k">{k}</div>
                <div className="trust-v">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── segmentation ── */}
      <section className="sect-tight" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <div className="eyebrow">Start where you are</div>
          <h2 style={{ fontSize: 30, marginBottom: 8 }}>Three very different problems</h2>
          <p className="lede" style={{ marginBottom: 34, fontSize: 17 }}>
            What you need depends entirely on who is asking you for it. Find yourself below.
          </p>
          {AUDIENCES.map(a => (
            <button className="seg" key={a.n} onClick={go("contact")}>
              <span className="seg-n">{a.n}</span>
              <span>
                <span className="seg-h" style={{ display: "block" }}>{a.h}</span>
                <span className="small" style={{ maxWidth: "68ch", display: "block" }}>{a.b}</span>
              </span>
              <span className="seg-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── services ── */}
      <section id="services" className="sect">
        <div className="wrap">
          <div className="eyebrow">Services</div>
          <h2 style={{ fontSize: 34, marginBottom: 34, maxWidth: "22ch" }}>What we do</h2>
          <div className="svc">
            {SERVICES.map(s => (
              <div className="svc-i" key={s.h}>
                <h3>{s.h}</h3>
                <p className="small" style={{ fontSize: 15 }}>{s.b}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 68 }}>
            <div className="eyebrow">Specialisms</div>
            <h2 style={{ fontSize: 30, marginBottom: 10, maxWidth: "24ch" }}>What we test</h2>
            <p className="lede" style={{ fontSize: 17 }}>
              Engagements are scoped to your environment. These are the areas we assess.
            </p>
            <div className="caps">
              {CAPABILITIES.map(c => (
                <div className="cap" key={c.h}>
                  <div className="cap-k">{c.k}</div>
                  <h4>{c.h}</h4>
                  <p>{c.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── process ── */}
      <section id="process" className="sect" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <div className="eyebrow">How we work</div>
          <h2 style={{ fontSize: 34, marginBottom: 42, maxWidth: "20ch" }}>Four steps, no surprises</h2>
          {PROCESS.map((p, i) => (
            <div className="step" key={p.h}>
              <div className="step-n">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3>{p.h}</h3>
                <p className="small" style={{ fontSize: 15.5, maxWidth: "66ch" }}>{p.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── credshield ── */}
      <section id="credshield" className="band sect">
        <div className="wrap">
          <div className="eyebrow" style={{ color: "#E9A178" }}>Our own tooling</div>
          <h2 style={{ fontSize: 34, marginBottom: 20, maxWidth: "24ch" }}>
            We don't just resell somebody else's scanner
          </h2>
          <p className="lede" style={{ marginBottom: 30 }}>
            CredShield is our credential exposure intelligence platform. Enter a company domain and it
            shows every record circulating for it — what leaked, where it's being traded, how the
            passwords were stored, and crucially how long it has been available to buy. It then generates
            a prioritised remediation plan and maps each finding to the regulatory obligations it triggers.
          </p>

          <div className="stats" style={{ margin: "40px 0" }}>
            {[["292", "days is the average lifespan of a breach involving stolen credentials"],
              ["3", "capabilities — exposure lookup, remediation planning, regulatory mapping"],
              ["Free", "domain scan, no account needed"]].map(([n, l]) => (
              <div key={l}>
                <div className="stat-n">{n}</div>
                <p className="small" style={{ color: "#A9B3C2", marginTop: 8, fontSize: 14.5 }}>{l}</p>
              </div>
            ))}
          </div>

          <a className="btn btn-onDark" href="https://credshield.ultenterprise.com"
            target="_blank" rel="noopener noreferrer">
            Run a free scan on your domain <Arrow s={17} />
          </a>
          <p className="tiny" style={{ color: "#6F7C8D", marginTop: 16 }}>
            Source for 292 days: IBM Cost of a Data Breach Report, 2024.
          </p>
        </div>
      </section>

      {/* ── about + credentials ── */}
      <section id="about" className="sect">
        <div className="wrap">
          <div className="eyebrow">About</div>
          <h2 style={{ fontSize: 34, marginBottom: 22, maxWidth: "22ch" }}>
            One practitioner, accountable for the work
          </h2>
          <p className="lede" style={{ marginBottom: 18 }}>
            UltEnterprise was founded by <strong>Bolaji Uthman Edu</strong>, a penetration tester and
            security consultant based in Kent.
          </p>
          <p className="lede" style={{ marginBottom: 18 }}>
            Large consultancies staff engagements with whoever is free that week. You get a methodology
            and a brand, but rarely the same tester twice, and rarely someone who remembers your
            environment. Here, one person does the testing, writes the report, and takes your call
            afterwards. When something needs explaining to your board or your regulator, the person who
            found it is the person who explains it.
          </p>
          <p className="lede" style={{ marginBottom: 44 }}>
            The interest isn't academic. Growing up, Bolaji watched people around him lose money to
            stolen bank credentials traded openly on Telegram and dark web forums, in an environment
            where the institutions involved often had no way of knowing it was happening. That problem is
            the reason this company exists, and the reason it builds its own tooling.
          </p>

          <div className="eyebrow">Credentials and standards</div>
          {CREDS.map(([k, v]) => (
            <div className="cred" key={k}>
              <div className="cred-k">{k}</div>
              <p className="small" style={{ fontSize: 15, maxWidth: "62ch" }}>{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── contact ── */}
      <section id="contact" className="sect" style={{ background: "var(--paper-2)" }}>
        <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
          <div className="eyebrow" style={{ textAlign: "center" }}>Get in touch</div>
          <h2 style={{ fontSize: 36, marginBottom: 18 }}>Not sure what you need?</h2>
          <p className="lede" style={{ margin: "0 auto 32px", textAlign: "center" }}>
            Most people aren't, at first. A scoping call takes thirty minutes, costs nothing, and you'll
            leave it knowing what testing would actually be useful for your situation — even if that
            turns out to be nothing right now.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-solid" href="mailto:info@ultenterprise.com?subject=Scoping%20call">
              Email us <Arrow s={17} />
            </a>
            <a className="btn btn-line" href="https://credshield.ultenterprise.com"
              target="_blank" rel="noopener noreferrer">
              Try CredShield first
            </a>
          </div>
          <p className="tiny" style={{ marginTop: 22 }}>
            We reply to every enquiry within one working day.
          </p>
        </div>
      </section>

      {/* ── footer ── */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-g">
            <div>
              <div className="brand" style={{ color: "#fff", marginBottom: 12 }}>
                <Shield s={19} c="#E9A178" w={1.8} />
                UltEnterprise
              </div>
              <p style={{ fontSize: 13.5, color: "#7D8A9B", maxWidth: "34ch" }}>
                Independent penetration testing and red team consultancy. Kent, United Kingdom.
              </p>
            </div>
            <div>
              <h4>Services</h4>
              <a className="foot-li" href="#services" onClick={go("services")}>Penetration testing</a>
              <a className="foot-li" href="#services" onClick={go("services")}>Red team</a>
              <a className="foot-li" href="#services" onClick={go("services")}>Credential exposure</a>
              <a className="foot-li" href="#services" onClick={go("services")}>Advisory</a>
            </div>
            <div>
              <h4>Company</h4>
              <a className="foot-li" href="#about" onClick={go("about")}>About</a>
              <a className="foot-li" href="https://credshield.ultenterprise.com" target="_blank" rel="noopener noreferrer">CredShield</a>
              <a className="foot-li" href="#contact" onClick={go("contact")}>Contact</a>
              <a className="foot-li" href="/.well-known/security.txt">Responsible disclosure</a>
            </div>
            <div>
              <h4>Contact</h4>
              <a className="foot-li" href="mailto:info@ultenterprise.com">info@ultenterprise.com</a>
              <span className="foot-li">Kent, United Kingdom</span>
            </div>
          </div>
          <div className="foot-btm">
            <span>© {year} UltEnterprise. All rights reserved.</span>
            <span className="mono">Registered in England and Wales</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
