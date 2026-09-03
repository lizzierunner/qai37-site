"use client";

import { useState } from "react";

export default function ContactButton({
  label = "Contact via qAI37",
  className = "contact-email",
  email = "contact@qai37.com",
}: {
  label?: string;
  className?: string;
  email?: string;
}) {
  const [toast, setToast] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText(email);
    setToast(true);
    setTimeout(() => setToast(false), 2800);
  };

  return (
    <>
      <button type="button" onClick={handleClick} className={className} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
        {label}
      </button>

      {toast && (
        <div className="toast-notice" role="status">
          <span className="toast-icon">✓</span>
          <span>Contact endpoint copied to clipboard (<code className="mono">{email}</code>)</span>
        </div>
      )}
    </>
  );
}
