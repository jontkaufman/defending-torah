import type { Course, Week, Session } from "@/types/course";

export const foundationsCourse: Course = {
  id: "foundations-of-defending-torah",
  title: "Foundations of Defending Torah",
  subtitle: "A beginner course in biblical continuity, obedience, and answering objections",
  weeks: 5,
  total_sessions: 10,
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

export function getWeek(weekNum: number): Week | undefined {
  return foundationsCourse.weeks_data.find((w) => w.num === weekNum);
}

export function getSession(sessionId: number): { session: Session; week: Week } | undefined {
  for (const week of foundationsCourse.weeks_data) {
    const session = week.sessions.find((s) => s.id === sessionId);
    if (session) return { session, week };
  }
  return undefined;
}
