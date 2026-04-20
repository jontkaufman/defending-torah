// Auth + Dashboard Components — Defending Torah

// ── SHARED STYLES ─────────────────────────────────────
const mono = { fontFamily: "'JetBrains Mono', monospace" };
const heading = { fontFamily: "'Frank Ruhl Libre', serif" };
const body = { fontFamily: "'Cormorant Garamond', serif" };

function MonoLabel({ children, color = 'var(--crimson)', style = {} }) {
  return <div style={{ ...mono, fontSize: 10.5, letterSpacing: '0.28em', textTransform: 'uppercase', color, ...style }}>{children}</div>;
}
function Btn({ children, onClick, variant = 'primary', style = {} }) {
  const base = { ...mono, fontSize: 11.5, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '14px 28px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all 0.2s', width: '100%', justifyContent: 'center', ...style };
  const styles = {
    primary: { background: 'var(--ink)', color: 'var(--parchment)', border: '1px solid var(--ink)' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)' },
    ochre: { background: 'var(--ochre)', color: 'white', border: '1px solid var(--ochre)' },
    danger: { background: 'var(--crimson)', color: 'white', border: '1px solid var(--crimson)' },
  };
  return <button onClick={onClick} style={{ ...base, ...styles[variant] }}>{children}</button>;
}
function Input({ label, type = 'text', placeholder }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 7 }}>{label}</label>
      <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1.5px solid var(--ink)', ...body, fontSize: 19, color: 'var(--ink)', outline: 'none', fontStyle: 'italic' }} />
    </div>
  );
}

// ── AUTH LAYOUT (split panel) ─────────────────────────
function AuthLayout({ children, title, subtitle, scripture, scriptureRef }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      {/* Left: form */}
      <div style={{ background: 'var(--parchment)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 64px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <svg style={{ width: 22, height: 22 }} viewBox="0 0 32 32" fill="none">
              <path d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z" fill="#1e3a5f" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="16" y1="8" x2="16" y2="24" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="10" y1="15" x2="22" y2="15" stroke="#c9a84c" strokeWidth="1.5"/>
            </svg>
            <span style={{ ...heading, fontWeight: 900, fontSize: 22, letterSpacing: '-0.02em' }}>Defending Torah</span>
          </div>
          <span style={{ ...mono, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>Member Access</span>
        </div>
        <div style={{ maxWidth: 380 }}>
          <MonoLabel color="var(--crimson)" style={{ marginBottom: 14 }}>{subtitle}</MonoLabel>
          <h1 style={{ ...heading, fontWeight: 300, fontSize: 38, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 36 }}>{title}</h1>
          {children}
        </div>
      </div>
      {/* Right: branding */}
      <div style={{ background: 'var(--ink)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, ...heading, fontWeight: 900, fontSize: 320, opacity: 0.04, color: 'var(--ochre)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>ת</div>
        <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40 }}>
          <div style={{ height: 1, background: 'rgba(244,236,220,0.1)', marginBottom: 28 }} />
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 16 }}>Course Platform</MonoLabel>
          <div style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,236,220,0.35)', lineHeight: 1.8 }}>
            {['Foundations of Defending Torah', '5 Weeks · 10 Sessions', 'Beginner Level'].map(t => <div key={t}>{t}</div>)}
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ height: 3, background: 'var(--ochre)', width: 48, marginBottom: 28 }} />
          <p style={{ ...body, fontStyle: 'italic', fontSize: 26, lineHeight: 1.55, color: 'rgba(244,236,220,0.85)', marginBottom: 16 }}>"{scripture}"</p>
          <MonoLabel color="var(--ochre)">— {scriptureRef}</MonoLabel>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────
function LoginScreen({ onNav }) {
  return (
    <AuthLayout title="Welcome back." subtitle="Sign in to your account" scripture="Oh how I love your Torah! It is my meditation all the day." scriptureRef="Psalm 119:97">
      <Input label="Email address" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="············" />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 28, marginTop: -8 }}>
        <button onClick={() => onNav('forgot')} style={{ background: 'none', border: 'none', ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre-deep)', cursor: 'pointer', textDecoration: 'underline' }}>Forgot password?</button>
      </div>
      <Btn onClick={() => onNav('dashboard')} style={{ marginBottom: 16 }}>Sign In →</Btn>
      <div style={{ textAlign: 'center', ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 20 }}>
        No account?{' '}
        <button onClick={() => onNav('signup')} style={{ background: 'none', border: 'none', ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre-deep)', cursor: 'pointer', textDecoration: 'underline' }}>Create one</button>
      </div>
    </AuthLayout>
  );
}

// ── SIGN UP ───────────────────────────────────────────
function SignUpScreen({ onNav }) {
  return (
    <AuthLayout title="Join the course." subtitle="Create your account" scripture="Study to show yourself approved unto God, a workman who has no need to be ashamed." scriptureRef="2 Timothy 2:15">
      <Input label="Full name" placeholder="Your name" />
      <Input label="Email address" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="············" />
      <Input label="Confirm password" type="password" placeholder="············" />
      <Btn onClick={() => onNav('dashboard')} style={{ marginBottom: 16 }}>Create Account →</Btn>
      <div style={{ textAlign: 'center', ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 10 }}>
        Already have an account?{' '}
        <button onClick={() => onNav('login')} style={{ background: 'none', border: 'none', ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre-deep)', cursor: 'pointer', textDecoration: 'underline' }}>Sign in</button>
      </div>
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--parchment-shadow)', ...body, fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, fontStyle: 'italic' }}>
        By creating an account you agree to receive course materials and occasional updates from Defending Torah. No spam. Unsubscribe any time.
      </div>
    </AuthLayout>
  );
}

// ── FORGOT PASSWORD ───────────────────────────────────
function ForgotScreen({ onNav }) {
  const [sent, setSent] = React.useState(false);
  return (
    <AuthLayout title={sent ? "Check your inbox." : "Reset your password."} subtitle="Password recovery" scripture="Your word is a lamp to my feet and a light to my path." scriptureRef="Psalm 119:105">
      {!sent ? <>
        <p style={{ ...body, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 28 }}>Enter your email address and we'll send you a link to reset your password.</p>
        <Input label="Email address" type="email" placeholder="you@example.com" />
        <Btn onClick={() => setSent(true)} style={{ marginBottom: 16 }}>Send Reset Link →</Btn>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => onNav('login')} style={{ background: 'none', border: 'none', ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', cursor: 'pointer' }}>← Back to sign in</button>
        </div>
      </> : <>
        <div style={{ border: '1px solid var(--parchment-shadow)', padding: '24px 28px', background: 'var(--parchment-deep)', marginBottom: 28 }}>
          <div style={{ height: 2, background: 'var(--olive)', marginBottom: 16 }} />
          <p style={{ ...body, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.6 }}>A password reset link has been sent to your email address. Check your inbox and follow the link to create a new password.</p>
        </div>
        <Btn onClick={() => onNav('login')} variant="ghost">← Return to Sign In</Btn>
      </>}
    </AuthLayout>
  );
}

// ── ACCOUNT LAYOUT ────────────────────────────────────
function AccountLayout({ tab, onTab, onNav, children }) {
  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'courses', label: 'Courses' },
    { key: 'resources', label: 'Resources' },
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
  ];
  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)', display: 'flex', flexDirection: 'column' }}>
      {/* Account nav */}
      <div style={{ background: 'var(--ink)', borderBottom: '1px solid rgba(244,236,220,0.12)', position: 'sticky', top: 0, zIndex: 50 }}>
        {/* Top bar */}
        <div style={{ padding: '10px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(244,236,220,0.08)' }}>
          <button onClick={() => onNav('login')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <svg style={{ width: 20, height: 20 }} viewBox="0 0 32 32" fill="none">
              <path d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z" fill="#1e3a5f" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="16" y1="8" x2="16" y2="24" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="10" y1="15" x2="22" y2="15" stroke="#c9a84c" strokeWidth="1.5"/>
            </svg>
            <span style={{ ...heading, fontWeight: 900, fontSize: 18, color: 'var(--parchment)', letterSpacing: '-0.02em' }}>Defending Torah</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(244,236,220,0.5)' }}>Student Portal</span>
            <button onClick={() => onNav('login')} style={{ background: 'none', border: '1px solid rgba(244,236,220,0.2)', ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(244,236,220,0.6)', padding: '5px 12px', cursor: 'pointer' }}>Sign Out</button>
          </div>
        </div>
        {/* Tab bar */}
        <div style={{ padding: '0 48px', display: 'flex', gap: 0 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => onTab(t.key)} style={{
              ...mono, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '16px 24px', background: 'none', border: 'none',
              borderBottom: `2px solid ${tab === t.key ? 'var(--ochre)' : 'transparent'}`,
              color: tab === t.key ? 'var(--ochre)' : 'rgba(244,236,220,0.5)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '52px 48px 100px' }}>
        {children}
      </div>
    </div>
  );
}

// ── DASHBOARD HOME ────────────────────────────────────
function DashboardHome({ onTab }) {
  const progress = 30; // % complete
  const sessionsComplete = 3;
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
        <MonoLabel color="var(--muted)" style={{ marginBottom: 12 }}>Welcome back</MonoLabel>
        <h1 style={{ ...heading, fontWeight: 300, fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 10 }}>
          Shalom, <em style={{ ...body, fontStyle: 'italic', color: 'var(--ochre-deep)' }}>Student.</em>
        </h1>
        <p style={{ ...body, fontSize: 18, color: 'var(--ink-soft)', maxWidth: 500 }}>Continue where you left off or explore your course materials below.</p>
      </div>

      {/* Summary grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 48 }}>
        {/* Progress card */}
        <div style={{ border: '1px solid var(--ink)', padding: '28px 28px', background: 'var(--parchment-deep)', gridColumn: 'span 1' }}>
          <div style={{ height: 3, background: 'var(--olive)', marginBottom: 20 }} />
          <MonoLabel color="var(--muted)" style={{ marginBottom: 12 }}>Course Progress</MonoLabel>
          <div style={{ ...heading, fontWeight: 900, fontSize: 52, lineHeight: 1, color: 'var(--ochre)', marginBottom: 8 }}>{progress}%</div>
          <div style={{ height: 4, background: 'var(--parchment-shadow)', borderRadius: 2, overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--olive)', borderRadius: 2 }} />
          </div>
          <div style={{ ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>{sessionsComplete} of 10 sessions complete</div>
        </div>
        {/* Last session */}
        <div style={{ border: '1px solid var(--ink)', padding: '28px 28px', background: 'var(--parchment-deep)' }}>
          <div style={{ height: 3, background: 'var(--ochre)', marginBottom: 20 }} />
          <MonoLabel color="var(--muted)" style={{ marginBottom: 12 }}>Last Session</MonoLabel>
          <div style={{ ...heading, fontWeight: 300, fontSize: 22, lineHeight: 1.15, marginBottom: 8 }}>What Did Yeshua Actually Teach?</div>
          <div style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>Session 3 · Week 2</div>
          <div style={{ ...mono, fontSize: 9.5, letterSpacing: '0.1em', color: 'var(--muted)' }}>Visited 2 days ago</div>
        </div>
        {/* Memory verse */}
        <div style={{ border: '1px solid var(--ink)', padding: '28px 28px', background: 'var(--parchment-deep)' }}>
          <div style={{ height: 3, background: 'var(--crimson)', marginBottom: 20 }} />
          <MonoLabel color="var(--muted)" style={{ marginBottom: 12 }}>Current Memory Verse</MonoLabel>
          <p style={{ ...body, fontStyle: 'italic', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', borderLeft: '2px solid var(--ochre)', paddingLeft: 12, marginBottom: 8 }}>
            "Do not think that I have come to abolish the Law or the Prophets…"
          </p>
          <div style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--crimson)' }}>— Matthew 5:17</div>
        </div>
      </div>

      {/* Quick continue */}
      <div style={{ border: '1px solid var(--ink)', padding: '32px 36px', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 8 }}>Continue Where You Left Off</MonoLabel>
          <div style={{ ...heading, fontWeight: 300, fontSize: 26, color: 'var(--parchment)', lineHeight: 1.1, marginBottom: 6 }}>Session 4 — Did Yeshua Start a New Religion?</div>
          <div style={{ ...mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(244,236,220,0.4)' }}>Week 2 · Yeshua & Torah · 45 min</div>
        </div>
        <button onClick={() => onTab('courses')} style={{ ...mono, fontSize: 11.5, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'var(--ochre)', color: 'white', border: 'none', padding: '16px 28px', cursor: 'pointer', flexShrink: 0 }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

// ── COURSE CARD (3 states) ────────────────────────────
function CourseCard({ state, onAction }) {
  // state: 'not-started' | 'in-progress' | 'finished'
  const progress = state === 'in-progress' ? 30 : state === 'finished' ? 100 : 0;
  const sessionsComplete = state === 'in-progress' ? 3 : state === 'finished' ? 10 : 0;

  return (
    <div style={{ border: '1px solid var(--ink)', background: 'var(--parchment-deep)', overflow: 'hidden', maxWidth: 640 }}>
      {/* Status bar */}
      <div style={{ height: 3, background: state === 'finished' ? 'var(--olive)' : state === 'in-progress' ? 'var(--ochre)' : 'var(--parchment-shadow)' }} />
      <div style={{ padding: '28px 32px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <MonoLabel color="var(--crimson)" style={{ marginBottom: 10 }}>Course No. 001</MonoLabel>
            <h2 style={{ ...heading, fontWeight: 300, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Foundations of Defending Torah</h2>
          </div>
          {/* Status badge */}
          <div style={{
            ...mono, fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '5px 12px', flexShrink: 0, marginLeft: 16,
            background: state === 'finished' ? 'rgba(92,107,63,0.12)' : state === 'in-progress' ? 'rgba(184,115,42,0.1)' : 'var(--parchment-shadow)',
            border: `1px solid ${state === 'finished' ? 'var(--olive)' : state === 'in-progress' ? 'var(--ochre)' : '#bbb'}`,
            color: state === 'finished' ? 'var(--olive)' : state === 'in-progress' ? 'var(--ochre-deep)' : 'var(--muted)',
          }}>
            {state === 'finished' ? 'Completed' : state === 'in-progress' ? 'In Progress' : 'Not Started'}
          </div>
        </div>

        <p style={{ ...body, fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: 20 }}>
          A beginner course in biblical continuity, obedience, and answering objections. 5 weeks · 10 sessions.
        </p>

        {/* Progress bar (visible if started) */}
        {state !== 'not-started' && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>{sessionsComplete} of 10 sessions</div>
              <div style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', color: state === 'finished' ? 'var(--olive)' : 'var(--ochre)' }}>{progress}%</div>
            </div>
            <div style={{ height: 4, background: 'var(--parchment-shadow)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: state === 'finished' ? 'var(--olive)' : 'var(--ochre)', borderRadius: 2, transition: 'width 0.5s' }} />
            </div>
          </div>
        )}

        {/* Meta tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {['5 Weeks', '10 Sessions', '12 Objections', 'Beginner'].map(t => (
            <span key={t} style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--parchment-shadow)', padding: '3px 10px', color: 'var(--muted)' }}>{t}</span>
          ))}
        </div>

        {/* Action button */}
        <div style={{ borderTop: '1px solid var(--parchment-shadow)', paddingTop: 20, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {state === 'not-started' && (
            <button onClick={() => onAction('start')} style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--parchment)', border: 'none', padding: '13px 24px', cursor: 'pointer' }}>Begin Course →</button>
          )}
          {state === 'in-progress' && (
            <button onClick={() => onAction('continue')} style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--parchment)', border: 'none', padding: '13px 24px', cursor: 'pointer' }}>Continue — Session 4 →</button>
          )}
          {state === 'finished' && <>
            <button onClick={() => onAction('certificate')} style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'var(--olive)', color: 'white', border: 'none', padding: '13px 24px', cursor: 'pointer' }}>Download Certificate →</button>
            <button onClick={() => onAction('restart')} style={{ ...mono, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '13px 20px', cursor: 'pointer' }}>Start Over</button>
          </>}
        </div>
      </div>
    </div>
  );
}

// ── CONFIRM START MODAL ───────────────────────────────
function ConfirmStartModal({ onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,31,46,0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'var(--parchment)', border: '1px solid var(--ink)', maxWidth: 480, width: '90%', boxShadow: '12px 12px 0 var(--ink)' }}>
        <div style={{ height: 3, background: 'var(--ochre)' }} />
        <div style={{ padding: '36px 40px' }}>
          <MonoLabel color="var(--crimson)" style={{ marginBottom: 16 }}>Before You Begin</MonoLabel>
          <h2 style={{ ...heading, fontWeight: 300, fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>Start Foundations of Defending Torah?</h2>
          <p style={{ ...body, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 12 }}>
            This course takes approximately <strong>5 weeks</strong> to complete, with two sessions per week. Each session includes teaching, discussion questions, and homework.
          </p>
          <p style={{ ...body, fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 28, fontStyle: 'italic' }}>
            Your progress will be saved automatically. You can return any time and continue where you left off.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={onConfirm} style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--parchment)', border: 'none', padding: '14px 24px', cursor: 'pointer', flex: 1 }}>Yes, Begin Course →</button>
            <button onClick={onCancel} style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '14px 20px', cursor: 'pointer' }}>Not Yet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── RESTART MODAL ──────────────────────────────────────
function RestartModal({ onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,31,46,0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'var(--parchment)', border: '1px solid var(--ink)', maxWidth: 440, width: '90%', boxShadow: '12px 12px 0 var(--ink)' }}>
        <div style={{ height: 3, background: 'var(--crimson)' }} />
        <div style={{ padding: '36px 40px' }}>
          <MonoLabel color="var(--crimson)" style={{ marginBottom: 16 }}>Confirm Reset</MonoLabel>
          <h2 style={{ ...heading, fontWeight: 300, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>Start the course again?</h2>
          <p style={{ ...body, fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 28 }}>
            Your completion certificate will remain available. Your session progress will reset to Session 1. This cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onConfirm} style={{ ...mono, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--crimson)', color: 'white', border: 'none', padding: '13px 20px', cursor: 'pointer', flex: 1 }}>Yes, Restart</button>
            <button onClick={onCancel} style={{ ...mono, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '13px 20px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD COURSES ─────────────────────────────────
function DashboardCourses({ onNav }) {
  const [courseState, setCourseState] = React.useState('in-progress');
  const [modal, setModal] = React.useState(null);

  function handleAction(action) {
    if (action === 'start') setModal('start');
    else if (action === 'continue') onNav('course');
    else if (action === 'certificate') onNav('certificate');
    else if (action === 'restart') setModal('restart');
  }

  return (
    <>
      {modal === 'start' && <ConfirmStartModal onConfirm={() => { setCourseState('in-progress'); setModal(null); }} onCancel={() => setModal(null)} />}
      {modal === 'restart' && <RestartModal onConfirm={() => { setCourseState('in-progress'); setModal(null); }} onCancel={() => setModal(null)} />}
      <div>
        <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--crimson)" style={{ marginBottom: 14 }}>My Courses</MonoLabel>
          <h1 style={{ ...heading, fontWeight: 300, fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.025em' }}>Your learning path.</h1>
        </div>

        {/* State switcher for demo */}
        <div style={{ marginBottom: 28, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginRight: 6 }}>Preview state:</span>
          {['not-started', 'in-progress', 'finished'].map(s => (
            <button key={s} onClick={() => setCourseState(s)} style={{ ...mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px', cursor: 'pointer', background: courseState === s ? 'var(--ink)' : 'transparent', color: courseState === s ? 'var(--parchment)' : 'var(--muted)', border: `1px solid ${courseState === s ? 'var(--ink)' : 'var(--parchment-shadow)'}` }}>{s}</button>
          ))}
        </div>

        <CourseCard state={courseState} onAction={handleAction} />

        {/* Course 2 card */}
        <div style={{ marginTop: 24, border: '1px solid var(--ink)', background: 'var(--parchment-deep)', overflow: 'hidden' }}>
          <div style={{ height: 3, background: 'var(--parchment-shadow)' }} />
          <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <MonoLabel color="var(--crimson)" style={{ fontSize: 9.5 }}>Course No. 002</MonoLabel>
                <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--olive)', color: 'var(--olive)', padding: '2px 10px' }}>Prerequisite: Course 001</span>
              </div>
              <div style={{ ...heading, fontWeight: 300, fontSize: 24, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 8 }}>How to Study Scripture Without Contradiction</div>
              <p style={{ ...body, fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55 }}>A beginner course in reading the Bible consistently, contextually, and faithfully. 5 weeks · 10 sessions.</p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--parchment-shadow)', padding: '4px 12px', color: 'var(--muted)', display: 'inline-block', marginBottom: 12 }}>Not Started</span>
              <div style={{ marginTop: 8 }}>
                {courseState === 'finished'
                  ? <button style={{ ...mono, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--parchment)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Begin Course 002 →</button>
                  : <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block' }}>Complete Course 001 first</span>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Course 3 card */}
        <div style={{ marginTop: 24, border: '1px solid var(--ink)', background: 'var(--parchment-deep)', overflow: 'hidden' }}>
          <div style={{ height: 3, background: 'var(--parchment-shadow)' }} />
          <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <MonoLabel color="var(--crimson)" style={{ fontSize: 9.5 }}>Course No. 003</MonoLabel>
                <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--olive)', color: 'var(--olive)', padding: '2px 10px' }}>Prerequisite: Courses 001 & 002</span>
              </div>
              <div style={{ ...heading, fontWeight: 300, fontSize: 24, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 8 }}>Yeshua, Paul, and the Torah Question</div>
              <p style={{ ...body, fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55 }}>A beginner course on the New Testament passages most often used against Torah. 5 weeks · 10 sessions.</p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--parchment-shadow)', padding: '4px 12px', color: 'var(--muted)', display: 'inline-block', marginBottom: 12 }}>Not Started</span>
              <div style={{ marginTop: 8 }}>
                <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block' }}>Complete Courses 001 & 002 first</span>
              </div>
            </div>
          </div>
        </div>

        {/* Per-session checklist */}
        {courseState !== 'not-started' && (
          <div style={{ marginTop: 32, border: '1px solid var(--ink)' }}>
            <div style={{ background: 'var(--ink)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <MonoLabel color="var(--ochre)">Session Progress</MonoLabel>
              <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(244,236,220,0.4)' }}>
                {courseState === 'finished' ? '10' : '3'} of 10 complete
              </span>
            </div>
            {[
              { id:1, title:'What Is Torah?', week:1 },
              { id:2, title:'Does God Change?', week:1 },
              { id:3, title:'What Did Yeshua Actually Teach?', week:2 },
              { id:4, title:'Did Yeshua Start a New Religion?', week:2 },
              { id:5, title:'"Not Under Law"', week:3 },
              { id:6, title:'Did Paul Reject Torah?', week:3 },
              { id:7, title:'"Nailed to the Cross"', week:4 },
              { id:8, title:'Sabbath, Food & Labels', week:4 },
              { id:9, title:'Respond Without Pride', week:5 },
              { id:10, title:'How to Keep Growing', week:5 },
            ].map((s, i) => {
              const done = courseState === 'finished' || i < 3;
              const current = courseState === 'in-progress' && i === 3;
              return (
                <div key={s.id} style={{
                  display: 'flex', gap: 16, alignItems: 'center', padding: '13px 24px',
                  borderBottom: i < 9 ? '1px solid var(--parchment-shadow)' : 'none',
                  background: current ? 'rgba(184,115,42,0.05)' : 'var(--parchment-deep)',
                }}>
                  <div style={{
                    width: 22, height: 22, border: `1.5px solid ${done ? 'var(--olive)' : current ? 'var(--ochre)' : 'var(--parchment-shadow)'}`,
                    background: done ? 'var(--olive)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {done && <span style={{ color: 'white', fontSize: 11 }}>✓</span>}
                    {current && <span style={{ color: 'var(--ochre)', fontSize: 10 }}>▶</span>}
                  </div>
                  <span style={{ ...mono, fontSize: 9.5, letterSpacing: '0.12em', color: 'var(--muted)', width: 60, flexShrink: 0 }}>
                    Wk {s.week} · S{s.id}
                  </span>
                  <span style={{ ...body, fontSize: 17, color: done ? 'var(--muted)' : current ? 'var(--ink)' : 'var(--ink-soft)', flex: 1, textDecoration: done ? 'none' : 'none' }}>
                    {s.title}
                  </span>
                  {current && (
                    <span style={{ ...mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre)', border: '1px solid var(--ochre)', padding: '2px 8px', flexShrink: 0 }}>
                      Current
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Coming soon */}
        <div style={{ marginTop: 32, border: '1px dashed var(--parchment-shadow)', padding: '28px 32px', opacity: 0.5 }}>
          <MonoLabel color="var(--muted)" style={{ marginBottom: 10 }}>Coming Soon</MonoLabel>
          <div style={{ ...heading, fontWeight: 300, fontSize: 22, color: 'var(--ink-soft)' }}>More courses will be added.</div>
        </div>
      </div>
    </>
  );
}

// ── PROFILE ───────────────────────────────────────────
function DashboardProfile() {
  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--parchment-shadow)' }}>
        <MonoLabel color="var(--crimson)" style={{ marginBottom: 14 }}>Account</MonoLabel>
        <h1 style={{ ...heading, fontWeight: 300, fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.025em' }}>Your profile.</h1>
      </div>
      {['Full Name', 'Email Address'].map((label, i) => (
        <div key={label} style={{ marginBottom: 28 }}>
          <MonoLabel color="var(--muted)" style={{ marginBottom: 8 }}>{label}</MonoLabel>
          <div style={{ ...body, fontSize: 20, color: 'var(--ink-soft)', borderBottom: '1px solid var(--parchment-shadow)', paddingBottom: 12, fontStyle: 'italic' }}>
            {i === 0 ? 'Student Name' : 'student@example.com'}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 36 }}>
        <Btn variant="ghost" style={{ maxWidth: 260, justifyContent: 'flex-start' }}>Update Profile</Btn>
      </div>
    </div>
  );
}

// ── SETTINGS ─────────────────────────────────────────
function DashboardSettings() {
  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--parchment-shadow)' }}>
        <MonoLabel color="var(--crimson)" style={{ marginBottom: 14 }}>Preferences</MonoLabel>
        <h1 style={{ ...heading, fontWeight: 300, fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.025em' }}>Settings.</h1>
      </div>
      {[['Email Notifications', 'Receive reminders about new sessions and updates.'], ['Weekly Progress Email', 'A short summary of your progress sent each week.']].map(([title, desc]) => (
        <div key={title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid var(--parchment-shadow)', gap: 20 }}>
          <div>
            <div style={{ ...body, fontSize: 19, marginBottom: 4 }}>{title}</div>
            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)' }}>{desc}</div>
          </div>
          <div style={{ width: 42, height: 24, background: 'var(--olive)', borderRadius: 12, position: 'relative', flexShrink: 0, cursor: 'pointer' }}>
            <div style={{ position: 'absolute', right: 3, top: 3, width: 18, height: 18, background: 'white', borderRadius: '50%' }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--parchment-shadow)' }}>
        <Btn variant="danger" style={{ maxWidth: 260, justifyContent: 'flex-start', background: 'transparent', color: 'var(--crimson)', border: '1px solid var(--crimson)' }}>Delete Account</Btn>
      </div>
    </div>
  );
}

// ── DASHBOARD RESOURCES ───────────────────────────────
function DashboardResources() {
  const resources = [
    { key: 'worksheet',  label: 'Session Worksheets',      icon: '✍', desc: 'Printable fill-in worksheets for each session — homework prompts, scripture notes, key terms.', anchor: 'worksheet' },
    { key: 'verses',     label: 'Memory Verse Cards',      icon: '◈', desc: 'Five printable cards, one per week. Cut out and carry.', anchor: 'verses' },
    { key: 'glossary',   label: 'Key Terms Glossary',      icon: '▦', desc: '14 foundational terms defined in plain language with Hebrew/Greek roots.', anchor: 'glossary' },
    { key: 'objections', label: 'Objections Cheat Sheet',  icon: '◉', desc: 'All 12 common objections with one-sentence biblical responses and key references.', anchor: 'objections' },
    { key: 'capstone',   label: 'Capstone Submission',     icon: '★', desc: 'Complete your final project to unlock your completion certificate.', anchor: 'capstone' },
  ];
  return (
    <div>
      <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--parchment-shadow)' }}>
        <MonoLabel color="var(--crimson)" style={{ marginBottom: 14 }}>Course Materials</MonoLabel>
        <h1 style={{ ...heading, fontWeight: 300, fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 10 }}>Resources.</h1>
        <p style={{ ...body, fontSize: 17, color: 'var(--ink-soft)', maxWidth: 520 }}>Printable materials, reference tools, and your final submission — all in one place.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {resources.map((r, i) => (
          <a key={r.key} href={`Defending Torah Resources.html`} style={{ textDecoration: 'none', display: 'flex', gap: 20, alignItems: 'flex-start', border: '1px solid var(--parchment-shadow)', padding: '24px 28px', background: 'var(--parchment-deep)', transition: 'border-color 0.2s', color: 'inherit' }}>
            <div style={{ width: 44, height: 44, border: '1.5px solid var(--ochre)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20, color: 'var(--ochre)' }}>{r.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ ...heading, fontWeight: 500, fontSize: 22, marginBottom: 6 }}>{r.label}</div>
              <div style={{ ...body, fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{r.desc}</div>
            </div>
            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ochre)', alignSelf: 'center', flexShrink: 0 }}>Open →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── DASHBOARD SHELL ───────────────────────────────────
function Dashboard({ onNav }) {
  const [tab, setTab] = React.useState('courses');
  return (
    <AccountLayout tab={tab} onTab={setTab} onNav={onNav}>
      {tab === 'home' && <DashboardHome onTab={setTab} />}
      {tab === 'courses' && <DashboardCourses onNav={onNav} />}
      {tab === 'resources' && <DashboardResources />}
      {tab === 'profile' && <DashboardProfile />}
      {tab === 'settings' && <DashboardSettings />}
    </AccountLayout>
  );
}

// ── COMPLETION CERTIFICATE ────────────────────────────
function CompletionCertificate({ onNav }) {
  return (
    <div style={{ background: '#1a1a24', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
        <button onClick={() => onNav('dashboard')} style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.08)', color: 'rgba(244,236,220,0.6)', border: '1px solid rgba(255,255,255,0.12)', padding: '8px 16px', cursor: 'pointer' }}>← Back to Dashboard</button>
        <button style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--ochre)', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>Print / Save PDF ↓</button>
      </div>

      {/* Certificate */}
      <div id="certificate" style={{ width: '100%', maxWidth: 760, background: 'var(--parchment)', border: '1px solid var(--parchment-shadow)', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        {/* Decorative border */}
        <div style={{ position: 'absolute', inset: 12, border: '1px solid var(--parchment-shadow)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 16, border: '1px solid rgba(184,115,42,0.2)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Hebrew watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', ...heading, fontWeight: 900, fontSize: 400, opacity: 0.025, color: 'var(--ochre)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>ת</div>

        <div style={{ position: 'relative', zIndex: 1, padding: '56px 64px 52px', textAlign: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
            <svg style={{ width: 28, height: 28 }} viewBox="0 0 32 32" fill="none">
              <path d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z" fill="#1e3a5f" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="16" y1="8" x2="16" y2="24" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="10" y1="15" x2="22" y2="15" stroke="#c9a84c" strokeWidth="1.5"/>
            </svg>
            <span style={{ ...heading, fontWeight: 900, fontSize: 22, letterSpacing: '-0.02em' }}>Defending Torah</span>
          </div>

          {/* Ornamental rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--ink)', opacity: 0.2 }} />
            <span style={{ ...heading, fontSize: 18, color: 'var(--ochre)', fontWeight: 300 }}>✦</span>
            <div style={{ flex: 1, height: 1, background: 'var(--ink)', opacity: 0.2 }} />
          </div>

          <MonoLabel color="var(--crimson)" style={{ textAlign: 'center', marginBottom: 20 }}>Certificate of Completion</MonoLabel>
          <p style={{ ...body, fontSize: 19, color: 'var(--ink-soft)', marginBottom: 16 }}>This is to certify that</p>
          <div style={{ ...heading, fontWeight: 300, fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 10, color: 'var(--ink)' }}>
            <em style={{ ...body, fontStyle: 'italic', color: 'var(--ochre-deep)' }}>Student Name</em>
          </div>
          <p style={{ ...body, fontSize: 19, color: 'var(--ink-soft)', marginBottom: 28 }}>has successfully completed</p>

          <div style={{ border: '1px solid var(--ink)', padding: '20px 32px', display: 'inline-block', marginBottom: 28 }}>
            <div style={{ ...heading, fontWeight: 300, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 6 }}>Foundations of Defending Torah</div>
            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>5 Weeks · 10 Sessions · Beginner Level</div>
          </div>

          <div style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 32 }}>
            Completed: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>

          {/* Ornamental rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--ink)', opacity: 0.2 }} />
            <span style={{ ...heading, fontSize: 18, color: 'var(--ochre)', fontWeight: 300 }}>✦</span>
            <div style={{ flex: 1, height: 1, background: 'var(--ink)', opacity: 0.2 }} />
          </div>

          <p style={{ ...body, fontStyle: 'italic', fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 460, margin: '0 auto 10px' }}>
            "Oh how I love your Torah! It is my meditation all the day."
          </p>
          <MonoLabel color="var(--crimson)" style={{ textAlign: 'center' }}>— Psalm 119:97</MonoLabel>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, SignUpScreen, ForgotScreen, Dashboard, CompletionCertificate, DashboardResources });
