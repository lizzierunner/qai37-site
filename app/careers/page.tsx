import type { Metadata } from "next";
import ContactButton from "@/components/ContactButton";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join qAI37 — build the translation layer between conventional inference and post-silicon AI.",
};

export default function Careers() {
  return (
    <div className="p-careers">
      <section className="intro">
        <div className="wrap">
          <span className="eyebrow reveal">Careers</span>
          <h1 className="reveal s1">Join us.</h1>
          <p className="lede reveal s2">
            We&apos;re a small team solving a hard infrastructure problem. If that sounds like your kind of work,
            reach out — we&apos;re always open to hearing from people who want to help build it.
          </p>
          <div className="careers-contact reveal s3">
            <p className="contact-role">Open roles &amp; general inquiries</p>
            <ContactButton label="careers@qAI37.com" className="contact-email" email="careers@qAI37.com" />
          </div>
        </div>
      </section>
    </div>
  );
}
