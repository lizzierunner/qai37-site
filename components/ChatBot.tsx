"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CHAT_SUGGESTIONS, findChatAnswer } from "@/lib/chatbot-data";
import AtomIcon from "@/components/AtomIcon";

type Message = {
  role: "user" | "bot";
  text: string;
  linkLabel?: string;
  linkUrl?: string;
};

const GREETING: Message = {
  role: "bot",
  text: "Hi — I'm the qAI37 assistant. Ask me about our mission, team, or how the neutral-atom access layer works.",
};

const FALLBACK: Message = {
  role: "bot",
  text: "I don't have a canned answer for that yet. For anything deeper, reach the founding team directly.",
  linkLabel: "Contact us",
  linkUrl: "/contact",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const match = findChatAnswer(trimmed);
      const reply: Message = match
        ? { role: "bot", text: match.answer, linkLabel: match.linkLabel, linkUrl: match.linkUrl }
        : FALLBACK;
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      <button
        type="button"
        className="chat-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <AtomIcon />
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="qAI37 chat assistant">
          <div className="chat-head">
            <span className="chat-head-title">Ask qAI37</span>
            <span className="chat-head-sub">Answers from our site content</span>
          </div>

          <div className="chat-body" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                <p>{m.text}</p>
                {m.linkUrl && (
                  <Link href={m.linkUrl} className="chat-msg-link" onClick={() => setOpen(false)}>
                    {m.linkLabel} →
                  </Link>
                )}
              </div>
            ))}
            {typing && (
              <div className="chat-msg chat-msg-bot chat-typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="chat-suggestions">
              {CHAT_SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => ask(s)}>{s}</button>
              ))}
            </div>
          )}

          <form className="chat-input-wrap" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chat-send" aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
