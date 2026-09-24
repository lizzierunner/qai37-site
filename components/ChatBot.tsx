"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { findChatAnswer, getChatSuggestions, type ChatAnswer } from "@/lib/chatbot-data";
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
  const [context, setContext] = useState<ChatAnswer>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestions = getChatSuggestions(context);

  useEffect(() => () => {
    if (replyTimer.current !== null) clearTimeout(replyTimer.current);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || replyTimer.current !== null) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    replyTimer.current = setTimeout(() => {
      const match = findChatAnswer(trimmed, context);
      const reply: Message = match
        ? { role: "bot", text: match.answer, linkLabel: match.linkLabel, linkUrl: match.linkUrl }
        : FALLBACK;
      setMessages((prev) => [...prev, reply]);
      setContext(match);
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
              <div className="chat-msg chat-msg-bot chat-typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          <div className="chat-suggestions" role="group" aria-label="Suggested questions">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" disabled={typing} onClick={() => ask(suggestion)}>{suggestion}</button>
            ))}
          </div>

          <form className="chat-input-wrap" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chat-send" aria-label="Send" disabled={typing || !input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
