import type { Metadata } from "next";
import ContactButton from "@/components/ContactButton";
import { TEAM } from "@/lib/team-data";

const CONTACTS = TEAM.filter((member) =>
  ["Ted Stockwell", "Michelle Holtmann"].includes(member.name),
);

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
            {CONTACTS.map((member) => (
              <div className="contact-person" key={member.name}>
                <p className="contact-name">{member.name}</p>
                <p className="contact-role">{member.role}</p>
                <ContactButton />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
