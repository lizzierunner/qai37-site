"use client";

import { useState } from "react";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function SignupForm({ centered = false }: { centered?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) return;
    setBusy(true);
    try {
      // TODO: point this at your real list provider (Mailchimp, Resend, a route handler, etc.)
      // await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      await new Promise((r) => setTimeout(r, 350));
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="confirm show" role="status" style={centered ? { justifyContent: "center", marginTop: 16 } : undefined}>
        <span aria-hidden="true">✓</span> You&apos;re on the list. We&apos;ll be in touch before we go public.
      </div>
    );
  }

  return (
    <form className="capture" onSubmit={submit} noValidate style={centered ? { margin: "0 auto", justifyContent: "center" } : undefined}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" aria-label="Email address" required />
      <button className="btn" type="submit" disabled={busy}>{busy ? "Adding…" : "Get launch updates"}</button>
    </form>
  );
}
