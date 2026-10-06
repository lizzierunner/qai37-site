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
        <g fill="none" className="rb37-chat-atom-rings" strokeWidth="1.4">
          <ellipse cx="150" cy="150" rx="103" ry="30" transform="rotate(-20 150 150)" />
          <ellipse cx="150" cy="150" rx="103" ry="30" transform="rotate(25 150 150)" />
          <circle cx="150" cy="150" r="82" strokeDasharray="3 6" />
        </g>
        <circle cx="150" cy="150" r="60" className="rb37-chat-core-ring" />
        <circle cx="150" cy="70" r="5" className="rb37-chat-electron" />
        <line x1="150" y1="105" x2="150" y2="80" className="rb37-chat-orbit" />
        <circle cx="48" cy="172" r="3" className="rb37-chat-node" />
        <circle cx="96" cy="75" r="3" className="rb37-chat-node" />
        <circle cx="204" cy="225" r="3" className="rb37-chat-node" />
        <circle cx="240" cy="94" r="3" className="rb37-chat-node" />
        <circle cx="150" cy="228" r="7" className="rb37-chat-body-light" />
        <path d="M98 212 C98 198 116 188 150 188 C184 188 202 198 202 212 L202 226 C202 241 180 252 150 252 C120 252 98 241 98 226 Z" className="rb37-chat-body" />
        <circle cx="72" cy="211" r="10" className="rb37-chat-arm" />
        <circle cx="228" cy="211" r="10" className="rb37-chat-arm" />
        <path d="M110 252 L123 252 L123 260 L110 260 Z" className="rb37-chat-foot" />
        <path d="M177 252 L190 252 L190 260 L177 260 Z" className="rb37-chat-foot" />
        <g transform="translate(0,-12) scale(1.06)">
          <circle cx="110" cy="140" r="18" className="rb37-chat-eye" />
          <circle cx="190" cy="140" r="18" className="rb37-chat-eye" />
          <circle cx="104" cy="136" r="4.5" className="rb37-chat-eye-glint" />
          <circle cx="184" cy="136" r="4.5" className="rb37-chat-eye-glint" />
          <path d="M130 175 Q150 184 170 175" className="rb37-chat-smile" />
          <circle cx="150" cy="152" r="4.5" className="rb37-chat-nose" />
          <circle cx="83" cy="162" r="8" className="rb37-chat-cheek" />
          <circle cx="217" cy="162" r="8" className="rb37-chat-cheek" />
        </g>
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
