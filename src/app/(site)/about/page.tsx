import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "About",
  description:
    "Our mission, theological framework, and commitment to intellectual honesty in Torah apologetics.",
};

export default function AboutPage() {
  return (
    <article className="px-10 py-[70px] max-md:px-6 max-md:py-10">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <header className="mb-12">
          <h1 className="font-heading font-light text-[clamp(36px,5vw,58px)] leading-[1.05] tracking-tight text-ink mb-4">
            About Defending Torah
          </h1>
        </header>

        <div className="ornamental-rule my-8" aria-hidden="true">
          <span className="ornament">✦</span>
        </div>

        {/* Mission Statement */}
        <section className="prose prose-lg mb-12">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Our Mission
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            In much of modern Christianity, Torah is dismissed as "fulfilled," relegated to "Israel only," or considered obsolete after the cross. Objections to Torah observance are often based on surface readings, mistranslations, or traditions that have never been carefully examined against Scripture itself.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            This site exists to provide biblical answers for honest seekers—careful exegesis, primary sources, and engagement with hard questions. We don't shy away from difficult passages. We don't pretend easy answers exist where they don't. We present the strongest objections in their best form, then respond from Scripture.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink">
            Whether you're wrestling with what the New Testament really teaches about Torah, or you're a seasoned student looking for deeper study, you'll find resources here that treat Scripture seriously and honestly.
          </p>
        </section>

        {/* Why This Matters */}
        <section className="prose prose-lg mb-12">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Why This Matters
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            Living like Yeshua is not a suggestion—it's the essence of discipleship. If Yeshua lived Torah perfectly, walked it out faithfully, and taught it truthfully, then following Him means walking the same path. Torah is not a burden to escape but the way of righteousness He modeled and calls us to.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            We exist to equip believers in Christ with the tools to honestly and peaceably pursue righteousness and live it out. <strong>This is Torah.</strong> This is why we teach that Torah is for us today. Anyone claiming Christ should be pursuing the righteousness He embodied—the righteousness defined in the Law and the Prophets, which He came not to abolish but to fulfill.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink">
            We are here to help, encourage, exhort, and instruct in righteousness. Not through guilt or legalism, but through the truth of Scripture, the grace of the gospel, and the joy of walking in Yeshua's footsteps.
          </p>
        </section>

        {/* Theological Position */}
        <section className="prose prose-lg mb-12">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Our Theological Framework
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            We are believers in the God of Abraham, Isaac, and Jacob—and in Yeshua (Jesus), His Son. We hold both testaments to be true and worthy of study and meditation. Scripture is not divided into an obsolete "Old Testament" and a liberating "New Testament," but rather one unified revelation of God's character, His covenant, and His will for His people.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            While many believers understand the Old Testament law to have been for a certain people in a certain time, we understand God's word to be enduring—even the laws and morals given in the Old Testament. Yeshua Himself declared, <em>"Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them"</em> (Matthew 5:17). To fulfill does not mean to end, but to complete, to bring to fullness, to demonstrate how Torah is rightly lived.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            Yeshua taught that the entire law rests on two commandments: <em>"Love the Lord your God with all your heart and with all your soul and with all your mind"</em> and <em>"Love your neighbor as yourself"</em> (Matthew 22:37-39). These are not replacements for Torah—they are summaries of it. Love is not opposed to commandments; love is expressed <em>through</em> keeping them. As the apostle John wrote, <em>"This is the love of God, that we keep His commandments. And His commandments are not burdensome"</em> (1 John 5:3).
          </p>

          <p className="text-[17px] leading-[1.7] text-ink">
            We believe that grace and Torah are not in opposition. Grace empowers us to walk in obedience, and obedience flows from love. The New Testament is not a replacement for the Hebrew Scriptures but their fulfillment and commentary. The "new covenant" promised in Jeremiah 31 writes Torah on our hearts—it does not erase it. Following Yeshua means following His example: a life of perfect Torah observance, motivated by love for the Father and love for others.
          </p>
        </section>

        {/* Intellectual Honesty Commitments */}
        <section className="prose prose-lg mb-12">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Our Commitment to Intellectual Honesty
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink mb-6">
            We hold ourselves to the following standards:
          </p>

          <ul className="space-y-3 text-[17px] leading-[1.7] text-ink">
            <li>
              <strong>Steelman the strongest objections.</strong> We present opposing arguments in their best scholarly form, not as straw men. If we can't answer the real objection, we don't pretend we can.
            </li>
            <li>
              <strong>Acknowledge hard questions honestly.</strong> Where Scripture is unclear or disputed, we say so. We never claim certainty we don't have.
            </li>
            <li>
              <strong>Cite scholars we disagree with.</strong> Critique requires engagement. We reference mainstream scholarship even when it cuts against our thesis.
            </li>
            <li>
              <strong>Correct errors publicly.</strong> When we get something wrong, we update the content with visible revision notes. Credibility requires accountability.
            </li>
            <li>
              <strong>Disclose confidence levels.</strong> We distinguish between what is established, probable, a working hypothesis, or genuinely uncertain.
            </li>
          </ul>
        </section>

        {/* Who We Are */}
        <section className="prose prose-lg">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Who We Are
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink">
            This site is maintained by believers committed to Scripture's authority and Torah's ongoing validity. We let our arguments stand on their own merit. If the case for Torah is biblical, it doesn't need tribal labels or personal stories to validate it—it needs only Scripture, sound reasoning, and intellectual honesty.
          </p>
        </section>
      </div>
    </article>
  );
}
