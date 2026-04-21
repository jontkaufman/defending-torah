import type { Metadata } from "next";

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

        {/* Theological Position */}
        <section className="prose prose-lg mb-12">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Our Theological Framework
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            We read the New Testament as commentary on the Hebrew Scriptures, not replacement. Yeshua (Jesus) lived Torah perfectly and calls us to follow Him. Grace and Torah are not opposed—grace empowers obedience, and obedience flows from grace.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink">
            We emphasize covenantal continuity and understand the New Testament within its Second Temple Jewish context. The "new covenant" promised in Jeremiah 31 writes Torah on hearts; it doesn't erase it. Yeshua didn't come to abolish the Law or the Prophets, but to fulfill them—to fill them full, to show us how to live them rightly.
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
