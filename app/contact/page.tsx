import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the qAI37 founding team.",
};

export default function Contact() {
  return (
    <div className="p-contact">
      <section className="intro">
        <div className="wrap">
          <span className="eyebrow reveal">Get in touch</span>
          <h1 className="reveal s1">Contact</h1>
          <p className="lede reveal s2">Questions, partnerships, or press — reach us directly.</p>
          <div className="contact-grid reveal s3">
            <div className="contact-person">
              <p className="contact-name">Ted Stockwell</p>
              <p className="contact-role">Founder & CEO</p>
              <span className="contact-email">Contact via qAI37</span>
            </div>
            <div className="contact-person">
              <p className="contact-name">Michelle Holtmann</p>
              <p className="contact-role">President & Chief Strategy Officer</p>
              <span className="contact-email">Contact via qAI37</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
