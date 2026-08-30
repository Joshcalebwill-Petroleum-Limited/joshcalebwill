"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { getBotReply } from "@/lib/chatbotEngine";
import { chatbotWelcome } from "@/data/chatbotKnowledge";
import { cn } from "@/lib/utils";

type Msg = {
  id: string;
  role: "user" | "bot";
  text: string;
};

const quickPrompts = [
  "What services do you offer?",
  "Where is your office?",
  "Business hours",
  "How can I contact you?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "bot",
      text: chatbotWelcome,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;

    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: "user",
      text: value,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Small delay so it feels conversational (still free / offline)
    const delay = 400 + Math.min(value.length * 12, 800);
    window.setTimeout(() => {
      const reply = getBotReply(value);
      setMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, role: "bot", text: reply },
      ]);
      setTyping(false);
    }, delay);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-colors",
          open
            ? "bg-foreground text-white"
            : "bg-orange text-white hover:bg-red"
        )}
        aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-4 z-[80] flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-2xl sm:right-6"
            style={{ maxHeight: "min(560px, calc(100vh - 7rem))" }}
            role="dialog"
            aria-label="Joshcalebwill chat assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-orange via-red to-yellow px-4 py-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">Joshcalebwill Assistant</p>
                <p className="text-xs text-white/85">Usually replies instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-white/90 hover:bg-white/15"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={bodyRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-background-soft px-3 py-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                      m.role === "user"
                        ? "rounded-br-md bg-orange text-white"
                        : "rounded-bl-md border border-border bg-white text-foreground shadow-sm"
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-border bg-white px-4 py-3 shadow-sm">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-muted [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-muted [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground-muted [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}

              {/* Quick prompts — only at start */}
              {messages.length <= 1 && !typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:border-orange/40 hover:text-orange"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services, hours…"
                className="min-w-0 flex-1 rounded-full border border-border bg-background-soft px-4 py-2.5 text-sm text-foreground outline-none ring-orange/30 placeholder:text-foreground-muted focus:ring-2"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-white transition-colors hover:bg-red disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
