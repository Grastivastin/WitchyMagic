import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "Why is my T-zone so oily?",
  "Best serum for pigmentation?",
  "Build me a Scorpio night ritual",
  "How do I treat hormonal acne?",
];

const INITIAL: Msg[] = [
  {
    role: "assistant",
    content:
      "🔮 **The Oracle awakens.**\n\nWelcome to the apothecary. Tell me of your skin's quiet rebellions — pigment, oil, dryness, breakouts — and I will brew an answer rooted in both the cosmos and the clinic.",
  },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    scrollToBottom();

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last !== INITIAL[0] && prev.length > next.length) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
      scrollToBottom();
    };

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({ error: "Oracle unavailable" }));
        throw new Error(data.error || "Oracle unavailable");
      }
      if (!resp.body) throw new Error("No response stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, nl);
          textBuffer = textBuffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const c = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (c) upsert(c);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Oracle unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tarot-border ornament-corners flex h-[640px] flex-col rounded-sm">
      <div className="border-b border-gold/20 p-4">
        <p className="font-display text-lg uppercase tracking-[0.3em] text-cream flex items-center gap-2">
          <Sparkles size={16} className="text-neon-pink" /> The Oracle
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim mt-1">
          Mystical · Dermatology-backed · Live
        </p>
      </div>

      <div ref={scrollRef} className="scrollbar-mystic flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] border border-gold/30 bg-deep-purple/40 px-4 py-2 text-sm text-cream rounded-sm"
                  : "max-w-[90%] tarot-border rounded-sm px-4 py-3 text-sm text-cream prose prose-sm prose-invert prose-a:text-neon-pink prose-strong:text-gold prose-strong:font-display prose-strong:tracking-wider"
              }
            >
              {m.role === "assistant" ? <ReactMarkdown>{m.content}</ReactMarkdown> : m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-cream-dim text-xs">
            <span className="anim-twinkle">✦</span>
            <span>The Oracle is brewing your answer…</span>
          </div>
        )}
        {error && (
          <div className="border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive rounded-sm">
            {error}
          </div>
        )}
      </div>

      <div className="border-t border-gold/20 p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={loading}
              className="border border-gold/30 px-2 py-1 text-[10px] uppercase tracking-wider text-cream-dim hover:border-neon-pink hover:text-neon-pink transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your guide anything…"
            disabled={loading}
            className="flex-1 rounded-sm border border-gold/40 bg-bg-black/60 px-3 py-2 text-sm text-cream placeholder:text-cream-dim/60 focus:border-neon-pink focus:outline-none focus:shadow-[0_0_16px_oklch(0.66_0.30_0_/_0.4)]"
          />
          <button
            type="submit"
            disabled={loading}
            aria-label="Send"
            className="border border-neon-pink bg-neon-pink/10 px-4 text-neon-pink hover:bg-neon-pink/20 hover:shadow-[0_0_18px_oklch(0.66_0.30_0_/_0.6)] transition-all disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
