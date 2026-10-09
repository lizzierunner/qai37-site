"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { RotateCcw, Send, X } from "lucide-react";
import { CHAT_SUGGESTIONS, findChatAnswer } from "@/lib/chatbot-data";

type Message = {
  role: "user" | "bot";
  text: string;
  linkLabel?: string;
  linkUrl?: string;
};

function RB37Mark({ compact = false }: { compact?: boolean }) {
  const clipId = useId();

  return (
    <svg viewBox="0 0 300 300" className={`rb37-chat-mark ${compact ? "compact" : ""}`} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="150" cy="150" r="150" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx="150" cy="150" r="150" className="rb37-chat-face" />

        <g fill="none" className="rb37-chat-atom-rings" stroke="#333333" strokeWidth="1.2">
          <ellipse cx="150" cy="150" rx="105" ry="31" transform="rotate(-20 150 150)" />
          <ellipse cx="150" cy="150" rx="105" ry="31" transform="rotate(25 150 150)" />
          <circle cx="150" cy="150" r="82" strokeDasharray="3 6" />
        </g>

        <circle cx="220" cy="66" r="11" fill="rgba(8,184,230,.25)" />
        <circle cx="220" cy="66" r="6" fill="#08B8E6" />

        <circle cx="98" cy="205" r="3" fill="#555555" />
        <circle cx="117" cy="44" r="3" fill="#555555" />
        <circle cx="200" cy="211" r="3" fill="#555555" />

        <line x1="150" y1="102" x2="150" y2="84" stroke="#08B8E6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="150" cy="80" r="5" fill="#08B8E6" />

        <circle cx="150" cy="150" r="72" fill="#1A1A1A" stroke="#08B8E6" strokeWidth="1.5" />

        <rect x="113" y="124" width="74" height="45" rx="22" fill="#0A0A0A" />

        <circle cx="130" cy="146" r="7" fill="#08B8E6" />
        <circle cx="170" cy="146" r="7" fill="#08B8E6" />
        <path d="M136 158 Q150 165 164 158" fill="none" stroke="#08B8E6" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

const GREETING: Message = {
  role: "bot",
  text: "Hi — I'm RB37. How can I help?",
};

const FALLBACK: Message = {
  role: "bot",
  text: "I don't have an answer for that here. Please contact the team directly.",
  linkLabel: "Contact us",
  linkUrl: "/contact",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (replyTimer.current !== null) clearTimeout(replyTimer.current);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reducedMotion ? "instant" : "smooth" });
  }, [messages, typing]);

  const closeChat = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const clearConversation = () => {
    if (replyTimer.current !== null) clearTimeout(replyTimer.current);
    replyTimer.current = null;
    setMessages([GREETING]);
    setInput("");
    setTyping(false);
    inputRef.current?.focus();
  };

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || replyTimer.current !== null) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    replyTimer.current = setTimeout(() => {
      const match = findChatAnswer(trimmed);
      const reply: Message = match
        ? { role: "bot", text: match.answer, linkLabel: match.linkLabel, linkUrl: match.linkUrl }
        : FALLBACK;
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
      replyTimer.current = null;
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
        ref={triggerRef}
        className="chat-trigger"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (open && event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            closeChat();
          }
        }}
        aria-expanded={open}
        aria-controls={open ? "qai37-chat" : undefined}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        {open ? (
          <X aria-hidden="true" />
        ) : (
          <RB37Mark compact />
        )}
      </button>

      {open && (
        <div className="chat-panel" id="qai37-chat" role="dialog" aria-label="qAI37 chat assistant" onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            closeChat();
          }
        }}>
          <div className="chat-head">
            <div className="chat-head-copy">
              <span className="chat-head-mark" aria-hidden="true"><RB37Mark /></span>
              <span className="chat-head-title">Ask RB37</span>
              <span className="chat-head-sub">Answers from our site content</span>
            </div>
            <button type="button" className="chat-reset" onClick={clearConversation} disabled={messages.length === 1 && !input && !typing} aria-label="Clear conversation" title="Clear conversation">
              <RotateCcw size={17} aria-hidden="true" />
            </button>
          </div>

          <div className="chat-body" ref={scrollRef} role="log" aria-label="Conversation" aria-live="polite">
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
              <div className="chat-msg chat-msg-bot chat-typing" role="status" aria-label="Preparing an answer">
                <span /><span /><span />
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="chat-suggestions" role="group" aria-label="Suggested questions">
              {CHAT_SUGGESTIONS.map((suggestion) => (
                <button key={suggestion} type="button" disabled={typing} onClick={() => ask(suggestion)}>{suggestion}</button>
              ))}
            </div>
          )}

          <form className="chat-input-wrap" onSubmit={handleSubmit}>
            <input
              type="text"
              ref={inputRef}
              aria-label="Your question"
              className="chat-input"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chat-send" aria-label="Send" disabled={typing || !input.trim()}>
              <Send aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
