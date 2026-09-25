"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RotateCcw, Send, X } from "lucide-react";
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
          <AtomIcon />
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
              <span className="chat-head-title">Ask qAI37</span>
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
