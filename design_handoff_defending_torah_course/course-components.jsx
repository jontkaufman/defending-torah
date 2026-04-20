// Defending Torah — Course UI Components
// Shared data + all three page views

const COURSE_DATA = {
  title: "Foundations of Defending Torah",
  subtitle: "A beginner course in biblical continuity, obedience, and answering objections",
  weeks: 5,
  sessions: 10,
  level: "Beginner",
  pillars: [
    { num: "01", title: "God is consistent.", body: "His character, holiness, and standards do not shift between testaments. One God, one story." },
    { num: "02", title: "Torah is good.", body: "God's instruction reflects His wisdom and love. It is not bondage — it is the path of the righteous." },
    { num: "03", title: "Yeshua did not abolish the Father's commandments.", body: "He upheld, deepened, and lived every word of Torah. His life is the pattern." },
    { num: "04", title: "Paul must be read in context.", body: "Paul opposes misuse of Torah, not Torah itself. Difficult passages must harmonise with the whole." },
    { num: "05", title: "Grace and obedience are not enemies.", body: "Grace frees us from sin's dominion, not from holiness. Love and obedience walk together." },
    { num: "06", title: "Truth should be defended with humility.", body: "We defend doctrine as a patient older brother — never as an internet debater." },
  ],
  weeks_data: [
    {
      num: 1,
      title: "Foundations",
      subtitle: "One God, One Word, One Story",
      memory_verse: { ref: "Psalm 119:97", text: "Oh how I love your Torah! It is my meditation all the day." },
      sessions: [
        {
          id: 1, title: "What Is Torah?",
          big_idea: "Torah is God's instruction, not a man-made burden.",
          opening_q: "When you hear the word 'law,' what comes to mind? Do you think of rules, restrictions, or something else?",
          scriptures: ["Psalm 119:97–104", "Deuteronomy 4:1–2", "Romans 7:12"],
          teaching: "Torah comes from the Hebrew root meaning to guide, to direct, to instruct. God did not give commandments because He wanted to burden His people — He gave them because He loves them and wants to show them how to live in a way that reflects His holiness and wisdom. Torah is not the enemy of grace. It is the expression of the heart of God.",
          misunderstanding: '"Torah just means legalism — trying to earn your way to God."',
          response: "Legalism is not about which commandments you keep — it is about why and how. A person can obey Torah by faith, from love, as a child of the covenant. That is not legalism. That is discipleship. Yeshua himself said: \"If you love me, keep my commandments\" (John 14:15).",
          application: "This week, read Psalm 119 slowly. Every time the psalmist describes how he feels about God's instruction, write it down. How many of those feelings do you share?",
          discussion: ["What is one thing people in your life believe about 'the law' that you think is a misunderstanding?", "If Torah is instruction rather than a legal code, how does that change how you read it?"],
          homework: ["Read Psalm 119:1–48 and write down three phrases that describe Torah positively.", "In one paragraph, define Torah in your own words as if explaining it to a friend.", "List three common misconceptions about Torah and why you think they exist."],
        },
        {
          id: 2, title: "Does God Change?",
          big_idea: "The God of Scripture is consistent, and His holiness does not change.",
          opening_q: "Have you ever heard someone say 'that was the God of the Old Testament' — as if He behaved differently back then? What do you think they mean?",
          scriptures: ["Malachi 3:6", "Numbers 23:19", "Hebrews 13:8"],
          teaching: "One of the most common objections to Torah observance is the idea that God changed between the Old and New Testaments — that He was stern and demanding before Yeshua, and gracious and easygoing after. But Scripture tells a different story. God declares that He does not change. His character is constant. His standards flow from His nature, and His nature does not shift.",
          misunderstanding: '"Jesus brought a completely new religion with new rules."',
          response: "Yeshua said He did not come to abolish the Law or the Prophets (Matthew 5:17). The new covenant does not replace Torah — it writes Torah on the heart. The same God, the same instruction, now internalised through His Spirit.",
          application: "Think of one area of life where you have been treating the Old and New Testaments as two separate books with two different Gods. How would your reading change if you assumed one consistent God throughout?",
          discussion: ["Why do you think people feel the need to separate the 'Old Testament God' from the 'New Testament God'?", "If God's character is unchanging, what does that mean for His standards of holiness?"],
          homework: ["Compare Malachi 3:6, James 1:17, and Hebrews 13:8. Write a short paragraph on what they have in common.", "Journal response: Why would a loving, unchanging God give instruction to His people?", "Complete a simple comparison worksheet: What stays the same across both testaments?"],
        },
      ]
    },
    {
      num: 2,
      title: "Yeshua & Torah",
      subtitle: "What the Master Actually Taught",
      memory_verse: { ref: "Matthew 5:17", text: "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfil them." },
      sessions: [
        {
          id: 3, title: "What Did Yeshua Actually Teach?",
          big_idea: "Yeshua did not oppose God's commandments — He exposed false interpretations and hypocrisy.",
          opening_q: "If someone showed you a verse where Yeshua seemed to break the Sabbath, how would you respond?",
          scriptures: ["Matthew 5:17–19", "Matthew 23:1–3", "Mark 7:1–13"],
          teaching: "Yeshua's conflicts with the Pharisees are often read as conflicts with Torah itself. But look more carefully. His debates were never about whether to obey God — they were about how. He confronted traditions that replaced or overruled God's actual commands. He deepened the law, never weakened it.",
          misunderstanding: '"If Jesus criticised the Pharisees, He must have rejected Torah."',
          response: "Yeshua told His disciples to do what the Pharisees taught from the seat of Moses — but not to follow their hypocrisy (Matthew 23:2–3). He did not abolish Torah. He restored it from the distortions that had grown around it.",
          application: "Read Mark 7:1–13 this week. Identify: What is Yeshua criticising — God's command, or the tradition that overrode it?",
          discussion: ["What is the difference between 'fulfil' and 'abolish' in Matthew 5:17?", "How does understanding who Yeshua was debating change how you read those passages?"],
          homework: ["Write five sentences on what 'fulfil' does not mean.", "Find one example where Yeshua corrects tradition rather than Torah.", "Memory verse: Matthew 5:17."],
        },
        {
          id: 4, title: "Did Yeshua Start a New Religion?",
          big_idea: "The new covenant is renewed covenant faithfulness, not a Torah-free religion.",
          opening_q: "What do you think is 'new' about the new covenant? What did you used to think before studying this?",
          scriptures: ["Jeremiah 31:31–33", "Hebrews 8:10", "Ezekiel 36:26–27"],
          teaching: "The new covenant was prophesied long before Yeshua came. And what does it say will be new? Not that the Torah disappears — but that it will be written on the heart, not just on stone. The promise of the new covenant is deeper obedience, not lawlessness.",
          misunderstanding: '"New covenant means the old commandments are gone."',
          response: "Jeremiah 31:33 says: \"I will put my Torah within them, and I will write it on their hearts.\" The Torah is not removed in the new covenant. It is internalised. The goal is not less obedience but obedience from the inside out.",
          application: "Create a simple two-column chart: What changes in the new covenant vs. what stays the same. Use Jeremiah 31, Hebrews 8, and Ezekiel 36 as your source texts.",
          discussion: ["Why do you think so many people assume 'new covenant' means 'no Torah'?", "If the Spirit writes Torah on your heart, what does living by the Spirit look like practically?"],
          homework: ["Answer in writing: What is actually new in the new covenant?", "Draw a simple timeline from Torah → Prophets → Messiah showing continuity.", "Compare wrong assumptions about the new covenant with the biblical text."],
        },
      ]
    },
    {
      num: 3,
      title: "Paul: The Most Misused Passages",
      subtitle: "Reading Paul Without Panic",
      memory_verse: { ref: "2 Peter 3:16", text: "There are some things in them that are hard to understand, which the ignorant and unstable twist to their own destruction." },
      sessions: [
        { id: 5, title: "What Does \"Not Under Law\" Mean?", big_idea: "Being 'not under law' is not the same as being free from God's instruction.", opening_q: "What do you think Paul means when he writes 'you are not under law, but under grace'? What does 'under law' mean?", scriptures: ["Romans 6:14–15", "Romans 3:31", "Galatians 3:10–13"], teaching: "Paul uses the word 'law' in several different ways. Sometimes he means the Mosaic covenant as a system of condemnation. Sometimes he means legalistic rule-keeping. Sometimes he means the Torah itself. Context is everything. Being 'not under law' means we are no longer under its condemnation — not that we are free to ignore it.", misunderstanding: '"Under grace means no commandments."', response: "Romans 3:31 — Paul's own words: 'Do we then overthrow the law by this faith? By no means! On the contrary, we uphold the law.' Grace is not the enemy of Torah. Grace enables obedience that law alone could never produce.", application: "Take Romans 6:14–15 and paraphrase it in plain language. What is Paul actually saying? What is he not saying?", discussion: ["Can you think of a passage where 'law' means something different than Torah itself?", "What is the difference between being under condemnation and being under instruction?"], homework: ["Paraphrase 'not under law' in three sentences of plain language.", "Write one paragraph answering: Is obedience anti-grace?", "Compare two verses often misunderstood about law and grace."] },
        { id: 6, title: "Did Paul Reject Torah?", big_idea: "Paul opposes misuse of Torah, not God's Torah itself.", opening_q: "If you had to explain Paul to someone who had never read him, how would you describe what he was writing about?", scriptures: ["Acts 21:20–24", "Romans 7:12", "Galatians 2:11–14"], teaching: "Paul was writing to specific communities with specific problems. In Galatia, some were teaching that Gentiles had to be circumcised to be saved. Paul's response is not 'Torah is irrelevant' — it is 'you cannot earn justification through Torah-keeping.' These are very different arguments.", misunderstanding: '"Paul abolished the law."', response: "In Acts 21, Paul himself takes a Nazirite vow and participates in Temple purification rituals — to demonstrate to Torah-observant believers that he has not taught Jews to forsake Moses. If Paul had abandoned Torah, he was a hypocrite. He was not.", application: "Take one difficult Pauline passage this week and write out: Who is Paul writing to? What problem is he addressing? What is he arguing against?", discussion: ["Why do you think Paul became the most-cited author for anti-Torah arguments?", "How should we handle difficult passages — with the clearest passages or the most complex?"], homework: ["Define three terms simply: legalism, justification, obedience.", "Take Galatians 2 and summarise Paul's actual argument in context.", "Journal: Why is context important when reading Paul?"] },
      ]
    },
    {
      num: 4,
      title: "Common Objections",
      subtitle: "How to Answer the Hard Ones",
      memory_verse: { ref: "1 Peter 3:15", text: "Always be prepared to give a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect." },
      sessions: [
        { id: 7, title: '"The Law Was Nailed to the Cross"', big_idea: "Messiah's death removes guilt and condemnation, not the definition of holiness.", opening_q: "When you hear 'the law was nailed to the cross,' what do you picture? What do you think that phrase is trying to say?", scriptures: ["Colossians 2:13–14", "Romans 8:3–4", "Ephesians 2:15"], teaching: "Colossians 2:14 speaks of the 'record of debt' being cancelled — the certificate of debt that stood against us through our transgressions. This is not the Torah itself that is nailed away. It is the debt our sin created. The cross removes the penalty, not the standard.", misunderstanding: '"The cross ended the commandments."', response: "If the cross abolished the definition of sin, then sin no longer exists — and none of us needed saving. But we did need saving precisely because the standard stands. What was nailed to the cross was our condemnation, not our calling.", application: "Create a four-column chart: sin / law / grace / forgiveness. Write a brief definition of each and explain how they relate to each other.", discussion: ["What is the difference between cancelling a debt and cancelling the standard that defined the debt?", "Why does forgiveness actually make obedience more meaningful, not less?"], homework: ["Answer three common objection statements in simple plain language.", "Chart: sin / law / grace / forgiveness / obedience and how they relate.", "Reflection: Why does forgiveness make obedience more meaningful?"] },
        { id: 8, title: "Sabbath, Food, and the 'Old Testament Law' Label", big_idea: "Many objections come from inherited categories rather than careful biblical reading.", opening_q: "Have you ever been told 'that command was only ceremonial' or 'that was only for Israel'? Where do you think those categories come from?", scriptures: ["Exodus 20:8–11", "Isaiah 56:6–7", "Acts 10:9–16 (in context)"], teaching: "The popular division of Torah into moral, civil, and ceremonial categories is not found in Scripture itself. It was developed by later theologians to explain why some commands still applied. But it is an imported grid, not a biblical one. Each command deserves to be examined in its actual biblical context.", misunderstanding: '"Sabbath was only for Jews. Food laws are obviously abolished."', response: "Isaiah 56 speaks of foreigners who hold fast to the Sabbath being brought to God's holy mountain. The Sabbath was established at creation before there was an Israel. And Acts 10 — read carefully in context — is about people, not about pork.", application: "Choose one commandment that people commonly dismiss and write a short biblical defence of its continuing importance. Use only the biblical text, not tradition.", discussion: ["Where do the moral/civil/ceremonial categories come from? Are they in Scripture?", "How should we decide which commands still apply — and what method should we use?"], homework: ["Prepare a short response to a Sabbath objection.", "Complete a worksheet: assumptions vs. actual biblical text.", "Choose one dismissed commandment and write a one-paragraph biblical defence."] },
      ]
    },
    {
      num: 5,
      title: "Defending with Maturity",
      subtitle: "Truth Held with Humility",
      memory_verse: { ref: "Micah 6:8", text: "He has told you, O man, what is good; and what does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?" },
      sessions: [
        { id: 9, title: "How to Respond Without Pride", big_idea: "A biblical defence should sound like someone who loves truth and people.", opening_q: "Think of a time you saw someone defend a biblical position well. What made it effective? Now think of a time someone did it poorly. What went wrong?", scriptures: ["2 Timothy 2:24–25", "Proverbs 15:1", "James 1:19–20"], teaching: "The goal of defending Torah is not to win arguments. It is to bear witness to God's faithfulness and to serve the person in front of you. A response given in arrogance plants no seeds. A response given with patience and gentleness can open a heart that years of debating could not.", misunderstanding: '"Being bold means being aggressive."', response: "Paul writes that the Lord's servant must not be quarrelsome but kind to everyone, patiently enduring evil, correcting opponents with gentleness (2 Timothy 2:24–25). The fruit of righteousness cannot grow from seeds of contempt.", application: "Practise this week: the next time someone raises a Torah objection — in person, online, or in your own head — slow down before responding. Ask yourself: Am I about to argue for truth, or argue for myself?", discussion: ["What is the difference between defending a position and winning an argument?", "Where are you most tempted toward pride in doctrinal discussions?"], homework: ["Roleplay three common objections and write gracious responses.", "Write a gracious answer to a sceptical friend who says 'You're just trying to earn your way to God.'", "Self-reflection: Where am I tempted toward pride? Write honestly."] },
        { id: 10, title: "How to Keep Growing After the Course", big_idea: "This course gives foundations, not final mastery.", opening_q: "After these five weeks, what is the one question you still want answered most? What will you do to find the answer?", scriptures: ["2 Timothy 2:15", "Acts 17:11", "Joshua 1:8"], teaching: "The students who grow strongest are not the ones who memorised the most answers. They are the ones who learned to read Scripture carefully, humbly, and consistently. Study in community. Compare Scripture with Scripture. Let your obedience run ahead of your argumentation.", misunderstanding: '"Now I already know enough."', response: "The moment we think we have arrived is the moment we stop growing. Biblical maturity is not a destination — it is a direction. Keep walking.", application: "Write a personal study plan for the next three months. What will you read? What questions will you pursue? Who will you study with?", discussion: ["What habits have been most helpful to you during this course?", "How will you keep both doctrine and character growing together?"], homework: ["Write a final personal statement of belief — in your own words.", "Reflection: What changed in my thinking during this course?", "Write a five-point simple defence of Torah observance for a complete beginner."] },
      ]
    },
  ]
};

// ── NAV ──────────────────────────────────────────────
function SiteNav({ onNav }) {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <div style={{
        borderBottom: '1px solid rgba(26,31,46,0.4)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 40px', fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--ink-soft)',
      }}>
        <span>Vol. I <span style={{ color: 'var(--ochre)' }}>·</span> Essays in Torah &amp; Evidence</span>
        <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 15, letterSpacing: 'normal', textTransform: 'none' }}>defendingtorah.com</span>
        <span>Est. 5786 <span style={{ color: 'var(--ochre)' }}>·</span> Updated Weekly</span>
      </div>
      <nav style={{
        padding: '24px 40px 20px', display: 'grid',
        gridTemplateColumns: '1fr auto 1fr', alignItems: 'baseline',
        borderBottom: '2px solid var(--ink)',
      }}>
        <button onClick={() => onNav('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
          <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 32, lineHeight: 1, letterSpacing: '-0.02em' }}>
            <svg style={{ display: 'inline-block', width: 26, height: 26, marginRight: 6, verticalAlign: 'middle', marginBottom: 3 }} viewBox="0 0 32 32" fill="none">
              <path d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z" fill="#1e3a5f" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="16" y1="8" x2="16" y2="24" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="10" y1="15" x2="22" y2="15" stroke="#c9a84c" strokeWidth="1.5"/>
            </svg>
            Defending Torah
          </div>
          <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.25em', color: 'var(--muted)', marginTop: 5, textTransform: 'uppercase' }}>
            Biblical Answers for the Honest Skeptic
          </span>
        </button>
        <ul style={{ listStyle: 'none', display: 'flex', gap: 36, justifyContent: 'center' }}>
          {['Topics','Objections','Torah Laws','Blog'].map(l => (
            <li key={l}><a href="#" style={{ color: 'var(--ink)', textDecoration: 'none', fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: 'italic', fontWeight: 500 }}>{l}</a></li>
          ))}
        </ul>
        <div style={{ justifySelf: 'end' }}>
          <button onClick={() => onNav('landing')} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--parchment)', padding: '10px 20px', border: '1px solid var(--ink)', cursor: 'pointer' }}>
            Course Home →
          </button>
        </div>
      </nav>
    </div>
  );
}

// ── MONO LABEL ───────────────────────────────────────
function MonoLabel({ children, color = 'var(--crimson)', style = {} }) {
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.28em', textTransform: 'uppercase', color, ...style }}>
      {children}
    </div>
  );
}

// ── COURSE LANDING ────────────────────────────────────
function CourseLanding({ onNav }) {
  const [activeWeek, setActiveWeek] = React.useState(1);
  const week = COURSE_DATA.weeks_data[activeWeek - 1];

  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 1, padding: '70px 64px 90px', borderBottom: '1px solid var(--ink)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, overflow: 'hidden' }}>
        {/* Watermark */}
        <div style={{ position: 'absolute', top: 20, right: 60, fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 280, opacity: 0.03, color: 'var(--ink)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>תורה</div>
        <div style={{ position: 'absolute', top: 90, right: 40, writingMode: 'vertical-rl', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)' }}>No. 001 — Course Edition</div>

        <div style={{ position: 'relative' }}>
          <MonoLabel color="var(--crimson)" style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ display: 'inline-block', width: 40, height: 1, background: 'var(--crimson)' }} />
            Foundations Course — Beginner Level
          </MonoLabel>
          <h1 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 'clamp(44px, 6vw, 82px)', lineHeight: 0.98, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 28 }}>
            Learn to<br />
            <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--ochre-deep)' }}>defend</em> Torah.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.55, maxWidth: 520, color: 'var(--ink-soft)', marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
            A 5-week, 10-session beginner course for young believers who want to understand Torah as part of God's unchanging instruction — and answer common objections with <em>clarity, humility, and confidence.</em>
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
            {[['5 Weeks',''], ['10 Sessions',''], ['12 Objections Addressed','crimson'], ['Beginner Level','']].map(([label, col]) => (
              <span key={label} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', border: `1px solid ${col === 'crimson' ? 'var(--crimson)' : 'var(--ink)'}`, padding: '4px 12px', color: col === 'crimson' ? 'var(--crimson)' : 'var(--ink)' }}>{label}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNav('week', { weekNum: 1 })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '16px 28px', background: 'var(--ink)', color: 'var(--parchment)', border: '1px solid var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
              Begin Week 1 <span>→</span>
            </button>
            <button onClick={() => document.getElementById('course-weeks').scrollIntoView({ behavior: 'smooth' })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '16px 28px', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', cursor: 'pointer' }}>
              See Full Syllabus
            </button>
          </div>
        </div>

        {/* Scroll plate */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 20 }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 420, aspectRatio: '3/4', background: 'var(--parchment-deep)', border: '1px solid var(--ink)', padding: '36px 34px', boxShadow: '18px 18px 0 -1px var(--parchment-deep), 18px 18px 0 0 var(--ink)' }}>
            <div style={{ position: 'absolute', inset: 8, border: '1px solid var(--ink)', pointerEvents: 'none', opacity: 0.3 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
              <span>Course Overview</span><span>5786</span>
            </div>
            <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 'clamp(60px, 9vw, 100px)', lineHeight: 0.92, color: 'var(--ink)', textAlign: 'right', marginBottom: 14, letterSpacing: '-0.02em' }} dir="rtl">יֵשׁוּעַ</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, color: 'var(--ochre-deep)', textAlign: 'right', marginBottom: 6 }}>kept Torah.</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: 'var(--ink-soft)', textAlign: 'right', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--ink)' }}>so should we.</div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink)', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
              "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfil them."
            </p>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--crimson)', textAlign: 'right', marginTop: 12 }}>— Matthew 5:17</div>
          </div>
        </div>
      </section>

      {/* WEEK TIMELINE + SESSION LIST */}
      <section id="course-weeks" style={{ position: 'relative', zIndex: 1, padding: '80px 64px 100px', borderBottom: '1px solid var(--ink)' }}>
        <div style={{ marginBottom: 56 }}>
          <MonoLabel color="var(--crimson)" style={{ marginBottom: 14 }}>Course Syllabus</MonoLabel>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: 1.02, letterSpacing: '-0.025em', marginBottom: 0 }}>
            Five weeks. Ten sessions.<br /><em style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--ochre-deep)', fontStyle: 'italic', fontWeight: 400 }}>One consistent story.</em>
          </h2>
        </div>

        {/* Week tabs */}
        <div style={{ display: 'flex', borderTop: '1px solid var(--ink)', borderLeft: '1px solid var(--ink)', marginBottom: 0 }}>
          {COURSE_DATA.weeks_data.map(w => (
            <button key={w.num} onClick={() => setActiveWeek(w.num)} style={{
              flex: 1, padding: '20px 16px 18px', background: activeWeek === w.num ? 'var(--ink)' : 'var(--parchment-deep)',
              color: activeWeek === w.num ? 'var(--parchment)' : 'var(--ink)',
              border: 'none', borderRight: '1px solid var(--ink)', borderBottom: activeWeek === w.num ? 'none' : '1px solid var(--ink)',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            }}>
              <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 40, lineHeight: 1, color: activeWeek === w.num ? 'var(--ochre)' : 'rgba(184,115,42,0.4)', marginBottom: 4 }}>0{w.num}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4, opacity: 0.7 }}>{w.title}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', opacity: 0.7 }}>{w.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Session list for active week */}
        <div style={{ border: '1px solid var(--ink)', borderTop: 'none', padding: '32px 40px', background: 'var(--parchment-deep)', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {week.sessions.map((s, i) => (
              <div key={s.id} style={{ borderTop: `3px solid ${i === 0 ? 'var(--ochre)' : 'var(--crimson)'}`, paddingTop: 20 }}>
                <MonoLabel color={i === 0 ? 'var(--ochre)' : 'var(--crimson)'} style={{ marginBottom: 10 }}>Session {s.id}</MonoLabel>
                <h3 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 26, lineHeight: 1.1, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 16 }}>
                  <em>Big idea:</em> {s.big_idea}
                </p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--ink)', padding: '3px 10px' }}>45 min</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--ink)', padding: '3px 10px' }}>10 Steps</span>
                  <button onClick={() => onNav('session', { sessionId: s.id, weekNum: week.num })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--parchment)', border: 'none', padding: '4px 14px', cursor: 'pointer', marginLeft: 'auto' }}>
                    Open →
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Memory verse */}
          <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid var(--parchment-shadow)', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <MonoLabel color="var(--muted)" style={{ whiteSpace: 'nowrap', paddingTop: 2 }}>Memory Verse</MonoLabel>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 19, lineHeight: 1.6, color: 'var(--ink-soft)', borderLeft: '2px solid var(--ochre)', paddingLeft: 16, marginBottom: 6 }}>
                "{week.memory_verse.text}"
              </p>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--crimson)', paddingLeft: 18 }}>— {week.memory_verse.ref}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => onNav('week', { weekNum: activeWeek })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '16px 32px', background: 'var(--ink)', color: 'var(--parchment)', border: '1px solid var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
            Go to Week {activeWeek} <span>→</span>
          </button>
        </div>
      </section>

      {/* PILLARS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 64px 100px', borderBottom: '1px solid var(--ink)', background: 'var(--ink)' }}>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 200, opacity: 0.04, color: 'var(--ochre)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>ש</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 14 }}>Course Pillars</MonoLabel>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--parchment)', lineHeight: 1.02, letterSpacing: '-0.025em', marginBottom: 60 }}>
            Six ideas repeated <em style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--ochre)', fontStyle: 'italic' }}>throughout</em> the course.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid rgba(244,236,220,0.15)' }}>
            {COURSE_DATA.pillars.map((p, i) => (
              <div key={p.num} style={{ padding: '32px 28px', borderRight: i % 3 < 2 ? '1px solid rgba(244,236,220,0.15)' : 'none', borderBottom: i < 3 ? '1px solid rgba(244,236,220,0.15)' : 'none', transition: 'background 0.2s' }}>
                <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 52, lineHeight: 1, color: 'var(--ochre)', opacity: 0.4, marginBottom: 12 }}>{p.num}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: 'var(--parchment)', marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: 'rgba(244,236,220,0.65)', lineHeight: 1.6 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── WEEK VIEW ─────────────────────────────────────────
function WeekView({ weekNum, onNav }) {
  const week = COURSE_DATA.weeks_data[weekNum - 1];
  if (!week) return null;
  // Demo: first session of each week shows as complete
  const completedIds = new Set([1, 3, 5, 7, 9].slice(0, weekNum - 1).concat(weekNum > 1 ? [week.sessions[0].id - 2] : []));
  const isComplete = (id) => completedIds.has(id);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '16px 64px', borderBottom: '1px solid var(--parchment-shadow)', background: 'var(--parchment-deep)', display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        <button onClick={() => onNav('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', color: 'var(--ochre)' }}>Course</button>
        <span>→</span>
        <span style={{ color: 'var(--ink)' }}>Week {week.num}</span>
      </div>

      {/* Week header */}
      <section style={{ padding: '60px 64px 70px', borderBottom: '1px solid var(--ink)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end', marginBottom: 48 }}>
          <div>
            <MonoLabel color="var(--crimson)" style={{ marginBottom: 16 }}>Week {week.num} of {COURSE_DATA.weeks}</MonoLabel>
            <h1 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 10 }}>{week.title}</h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, color: 'var(--ochre-deep)' }}>{week.subtitle}</p>
          </div>
          {/* Progress */}
          <div style={{ textAlign: 'right', minWidth: 200 }}>
            <MonoLabel color="var(--muted)" style={{ marginBottom: 8 }}>Week Progress</MonoLabel>
            <div style={{ height: 4, background: 'var(--parchment-shadow)', borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ height: '100%', width: '0%', background: 'var(--olive)', borderRadius: 2 }} />
            </div>
            <MonoLabel color="var(--muted)">0 of 2 sessions complete</MonoLabel>
          </div>
        </div>

        {/* Two session cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
          {week.sessions.map((s, i) => (
            <div key={s.id} style={{ border: '1px solid var(--ink)', background: 'var(--parchment-deep)' }}>
              <div style={{ height: 3, background: i === 0 ? 'var(--ochre)' : 'var(--crimson)' }} />
              <div style={{ padding: '28px 28px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <MonoLabel color={i === 0 ? 'var(--ochre)' : 'var(--crimson)'}>Session {s.id} of 10</MonoLabel>
                  {isComplete(s.id)
                    ? <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'rgba(92,107,63,0.12)', border: '1px solid var(--olive)', color: 'var(--olive)', padding: '3px 10px' }}>Complete ✓</span>
                    : <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--parchment-shadow)', color: 'var(--muted)', padding: '3px 10px' }}>Not started</span>
                  }
                </div>
                <h2 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 28, lineHeight: 1.1, marginBottom: 12 }}>{s.title}</h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: 20 }}>
                  <em>Big idea:</em> {s.big_idea}
                </p>
                <div style={{ borderTop: '1px solid var(--parchment-shadow)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  {['45 min', '10 Steps', '1 hr homework'].map(tag => (
                    <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--parchment-shadow)', padding: '3px 10px', color: 'var(--muted)' }}>{tag}</span>
                  ))}
                  <button onClick={() => onNav('session', { sessionId: s.id, weekNum: week.num })} style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', background: isComplete(s.id) ? 'var(--olive)' : 'var(--ink)', color: 'var(--parchment)', border: 'none', padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isComplete(s.id) ? 'Review' : 'Begin'} <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Memory verse */}
        <div style={{ borderLeft: '3px solid var(--ochre)', padding: '20px 28px', background: 'rgba(184,115,42,0.06)', border: '1px solid var(--parchment-shadow)', borderLeft: '3px solid var(--ochre)' }}>
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 12 }}>Week {week.num} Memory Verse</MonoLabel>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 8 }}>"{week.memory_verse.text}"</p>
          <MonoLabel color="var(--crimson)">— {week.memory_verse.ref}</MonoLabel>
        </div>
      </section>

      {/* Week nav */}
      <div style={{ padding: '24px 64px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--parchment-shadow)' }}>
        {weekNum > 1
          ? <button onClick={() => onNav('week', { weekNum: weekNum - 1 })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '10px 20px', cursor: 'pointer' }}>← Week {weekNum - 1}</button>
          : <button onClick={() => onNav('landing')} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '10px 20px', cursor: 'pointer' }}>← Course Overview</button>
        }
        {weekNum < COURSE_DATA.weeks
          ? <button onClick={() => onNav('week', { weekNum: weekNum + 1 })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--parchment)', border: '1px solid var(--ink)', padding: '10px 20px', cursor: 'pointer' }}>Week {weekNum + 1} →</button>
          : <span />
        }
      </div>
    </div>
  );
}

// ── SESSION VIEW ──────────────────────────────────────
// ── SESSION COMPLETION MODAL ──────────────────────────
function SessionCompletionModal({ session, week, onContinue, onStay }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,31,46,0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'var(--parchment)', border: '1px solid var(--ink)', maxWidth: 500, width: '90%', boxShadow: '12px 12px 0 var(--ink)' }}>
        <div style={{ height: 3, background: 'var(--olive)' }} />
        <div style={{ padding: '36px 40px' }}>
          <MonoLabel color="var(--olive)" style={{ marginBottom: 16 }}>Session Complete</MonoLabel>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 14 }}>
            Well done — Session {session.id} finished.
          </h2>
          <div style={{ borderLeft: '2px solid var(--ochre)', padding: '14px 18px', background: 'rgba(184,115,42,0.06)', marginBottom: 20 }}>
            <MonoLabel color="var(--ochre)" style={{ marginBottom: 8, fontSize: 9.5 }}>Week {week.num} Memory Verse — Do you know it?</MonoLabel>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 6 }}>"{week.memory_verse.text}"</p>
            <MonoLabel color="var(--crimson)" style={{ fontSize: 9.5 }}>— {week.memory_verse.ref}</MonoLabel>
          </div>
          <div style={{ border: '1px solid var(--parchment-shadow)', padding: '14px 18px', background: 'var(--parchment-deep)', marginBottom: 24 }}>
            <MonoLabel color="var(--muted)" style={{ marginBottom: 10, fontSize: 9.5 }}>Before the next session — complete your homework:</MonoLabel>
            {session.homework.map((hw, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--ochre)', flexShrink: 0, marginTop: 2 }}>0{i+1}</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, lineHeight: 1.5, color: 'var(--ink-soft)' }}>{hw}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {session.id < 10 && (
              <button onClick={onContinue} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--parchment)', border: 'none', padding: '14px 24px', cursor: 'pointer', flex: 1 }}>Next Session →</button>
            )}
            {session.id === 10 && (
              <button onClick={onContinue} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'var(--olive)', color: 'white', border: 'none', padding: '14px 24px', cursor: 'pointer', flex: 1 }}>Go to Capstone →</button>
            )}
            <button onClick={onStay} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '14px 18px', cursor: 'pointer' }}>Stay Here</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { key: 'opening', label: 'Opening Question' },
  { key: 'big_idea', label: 'Big Idea' },
  { key: 'scriptures', label: 'Key Scriptures' },
  { key: 'teaching', label: 'Teaching' },
  { key: 'misunderstanding', label: 'Common Misunderstanding' },
  { key: 'response', label: 'Scriptural Response' },
  { key: 'application', label: 'Application' },
  { key: 'discussion', label: 'Discussion Questions' },
  { key: 'memory', label: 'Memory Verse' },
  { key: 'homework', label: 'Homework' },
];

function SessionView({ sessionId, weekNum, onNav }) {
  const week = COURSE_DATA.weeks_data[weekNum - 1];
  const session = week?.sessions.find(s => s.id === sessionId);
  if (!session) return null;
  const [activeStep, setActiveStep] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const stepRefs = React.useRef([]);

  function scrollToStep(i) {
    setActiveStep(i);
    const el = stepRefs.current[i];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '14px 64px', borderBottom: '1px solid var(--parchment-shadow)', background: 'var(--parchment-deep)', display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        <button onClick={() => onNav('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', color: 'var(--ochre)' }}>Course</button>
        <span>→</span>
        <button onClick={() => onNav('week', { weekNum })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', color: 'var(--ochre)' }}>Week {weekNum}</button>
        <span>→</span>
        <span style={{ color: 'var(--ink)' }}>Session {sessionId}</span>
      </div>

      {/* Session header */}
      <section style={{ padding: '50px 64px 40px', borderBottom: '2px solid var(--ink)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start' }}>
          <div>
            <MonoLabel color="var(--crimson)" style={{ marginBottom: 14 }}>Session {session.id} of 10 · Week {weekNum} · {week.title}</MonoLabel>
            <h1 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 62px)', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 16 }}>{session.title}</h1>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['45 min teaching', '10–15 min discussion', '~1 hr homework'].map(t => (
                <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--parchment-shadow)', padding: '4px 12px', color: 'var(--muted)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Step pill strip */}
        <div style={{ marginTop: 28, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STEPS.map((step, i) => (
            <button key={step.key} onClick={() => scrollToStep(i)} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '5px 12px', cursor: 'pointer', transition: 'all 0.2s',
              background: activeStep === i ? 'var(--ink)' : 'transparent',
              color: activeStep === i ? 'var(--parchment)' : 'var(--muted)',
              border: `1px solid ${activeStep === i ? 'var(--ink)' : 'var(--parchment-shadow)'}`,
            }}>
              <span style={{ color: activeStep === i ? 'var(--ochre)' : 'var(--parchment-shadow)', marginRight: 4 }}>{String(i + 1).padStart(2, '0')}</span>
              {step.label}
            </button>
          ))}
        </div>
      </section>

      {/* Session body */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 64px 100px' }}>

        {/* Step 1: Opening question */}
        <div ref={el => stepRefs.current[0] = el} style={{ paddingTop: 56, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>01</span>
            Opening Question
          </MonoLabel>
          <div style={{ borderLeft: '2px solid var(--ochre)', padding: '20px 24px', background: 'rgba(184,115,42,0.05)' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{session.opening_q}</p>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: 'var(--muted)', marginTop: 14, fontStyle: 'italic' }}>Take a moment to sit with this before reading on. There are no wrong answers yet.</p>
        </div>

        {/* Step 2: Big idea */}
        <div ref={el => stepRefs.current[1] = el} style={{ paddingTop: 50, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>02</span>
            Session Big Idea
          </MonoLabel>
          <div style={{ border: '1px solid var(--ink)', padding: '28px 32px', background: 'var(--parchment-deep)' }}>
            <p style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 300, fontSize: 'clamp(24px, 3vw, 34px)', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{session.big_idea}</p>
          </div>
        </div>

        {/* Step 3: Key Scriptures */}
        <div ref={el => stepRefs.current[2] = el} style={{ paddingTop: 50, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--crimson)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>03</span>
            Key Scripture Readings
          </MonoLabel>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: 'var(--ink-soft)', marginBottom: 20, lineHeight: 1.55 }}>Read these passages carefully before continuing. Look for what they say directly — without commentary first.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {session.scriptures.map(ref => (
              <div key={ref} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', border: '1px solid var(--parchment-shadow)', background: 'var(--parchment-deep)' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 19, color: 'var(--ink-soft)', flex: 1 }}>{ref}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ochre)', border: '1px solid var(--ochre)', padding: '3px 10px' }}>Read →</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Teaching */}
        <div ref={el => stepRefs.current[3] = el} style={{ paddingTop: 50, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>04</span>
            Main Teaching
          </MonoLabel>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, lineHeight: 1.7, color: 'var(--ink)' }}>{session.teaching}</p>
        </div>

        {/* Step 5: Misunderstanding */}
        <div ref={el => stepRefs.current[4] = el} style={{ paddingTop: 50, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--crimson)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>05</span>
            Common Misunderstanding
          </MonoLabel>
          <div style={{ borderLeft: '3px solid var(--crimson)', padding: '16px 20px', background: 'rgba(122,46,36,0.05)', marginBottom: 0 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, color: 'var(--crimson)', lineHeight: 1.5 }}>{session.misunderstanding}</p>
          </div>
        </div>

        {/* Step 6: Response */}
        <div ref={el => stepRefs.current[5] = el} style={{ paddingTop: 50, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>06</span>
            Scriptural Response
          </MonoLabel>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, lineHeight: 1.7, color: 'var(--ink)' }}>{session.response}</p>
        </div>

        {/* Step 7: Application */}
        <div ref={el => stepRefs.current[6] = el} style={{ paddingTop: 50, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--olive)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>07</span>
            Real-Life Application
          </MonoLabel>
          <div style={{ borderLeft: '2px solid var(--olive)', padding: '16px 24px', background: 'rgba(92,107,63,0.06)' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, lineHeight: 1.65, color: 'var(--ink-soft)' }}>{session.application}</p>
          </div>
        </div>

        {/* Step 8: Discussion */}
        <div ref={el => stepRefs.current[7] = el} style={{ paddingTop: 50, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--ink)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>08</span>
            Discussion & Reflection Questions
          </MonoLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {session.discussion.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 28, color: 'var(--ochre)', lineHeight: 1, flexShrink: 0, marginTop: -2 }}>{i + 1}.</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 9: Memory verse */}
        <div ref={el => stepRefs.current[8] = el} style={{ paddingTop: 50, paddingBottom: 40, borderBottom: '1px solid var(--parchment-shadow)' }}>
          <MonoLabel color="var(--olive)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>09</span>
            Memory Verse
          </MonoLabel>
          <div style={{ border: '1px solid var(--parchment-shadow)', padding: '28px 32px', background: 'var(--parchment-deep)', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 12 }}>"{week.memory_verse.text}"</p>
            <MonoLabel color="var(--crimson)" style={{ textAlign: 'center' }}>— {week.memory_verse.ref}</MonoLabel>
          </div>
        </div>

        {/* Step 10: Homework */}
        <div ref={el => stepRefs.current[9] = el} style={{ paddingTop: 50, paddingBottom: 40 }}>
          <MonoLabel color="var(--ochre)" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900, fontSize: 20, color: 'var(--ochre)', letterSpacing: 0 }}>10</span>
            Homework Assignment
          </MonoLabel>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: 'var(--muted)', marginBottom: 20, fontStyle: 'italic' }}>Approximately 1 hour. Keep it simple — the goal is to think, not to impress.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {session.homework.map((hw, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px', border: '1px solid var(--parchment-shadow)', background: 'var(--parchment-deep)' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.15em', color: 'var(--ochre)', fontWeight: 500, flexShrink: 0, marginTop: 2 }}>0{i + 1}</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{hw}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Complete CTA */}
        <div style={{ background: 'var(--ink)', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: 6 }}>Finished reading?</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: 'var(--parchment)', fontStyle: 'italic' }}>Mark this session complete to continue.</div>
          </div>
          <button onClick={() => setShowModal(true)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'var(--ochre)', color: 'white', border: 'none', padding: '16px 28px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            Mark Complete ✓
          </button>
        </div>

        {/* Resources quick-links */}
        <div style={{ padding: '24px 64px', borderTop: '1px solid var(--parchment-shadow)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginRight: 8 }}>Resources:</span>
          {[['Worksheet', 'worksheet'], ['Glossary', 'glossary'], ['Objections', 'objections']].map(([label, key]) => (
            <a key={key} href="Defending Torah Resources.html" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid var(--parchment-shadow)', padding: '5px 12px', color: 'var(--ochre-deep)', textDecoration: 'none' }}>{label} →</a>
          ))}
        </div>
      </div>

      {showModal && (
        <SessionCompletionModal
          session={session}
          week={week}
          onStay={() => setShowModal(false)}
          onContinue={() => {
            setShowModal(false);
            if (session.id < 10) {
              const nextSession = COURSE_DATA.weeks_data.flatMap(w => w.sessions).find(s => s.id === session.id + 1);
              const nextWeek = COURSE_DATA.weeks_data.find(w => w.sessions.some(s => s.id === session.id + 1));
              if (nextSession && nextWeek) onNav('session', { sessionId: nextSession.id, weekNum: nextWeek.num });
            } else {
              onNav('landing');
            }
          }}
        />
      )}
    </div>
  );
}

// ── FOOTER ───────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: 'var(--parchment-deep)', borderTop: '1px solid var(--parchment-shadow)', padding: '32px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
      <span>Defending Torah · Course Module</span>
      <span>© 5786</span>
    </footer>
  );
}

// Expose to window
Object.assign(window, { CourseLanding, WeekView, SessionView, SiteNav, Footer, COURSE_DATA });
