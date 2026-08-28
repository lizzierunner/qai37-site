"use client";

import { useState } from "react";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function SignupForm({ centered = false }: { centered?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "preview" | "success">("idle");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    if (!EMAIL.test(normalizedEmail)) {
      setStatus("error");
      return;
    }

    setBusy(true);
    setStatus("idle");
    try {
      const endpoint = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT;
      if (!endpoint) {
        setStatus("preview");
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      if (!response.ok) throw new Error("Subscription request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={centered ? "capture-wrap centered" : "capture-wrap"}>
      <form className="capture" onSubmit={submit} noValidate>
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }} placeholder="you@company.com" aria-label="Email address" aria-invalid={status === "error"} required />
        <button className="btn" type="submit" disabled={busy}>{busy ? "Adding..." : "Get launch updates"}</button>
      </form>
      {status === "success" && <p className="capture-feedback success" role="status">You&apos;re on the list. We&apos;ll be in touch before we go public.</p>}
      {status === "preview" && <p className="capture-feedback" role="status">Preview mode: connect a list provider to receive submissions.</p>}
      {status === "error" && <p className="capture-feedback error" role="alert">Enter a valid email or try again shortly.</p>}
    </div>
  );
}
