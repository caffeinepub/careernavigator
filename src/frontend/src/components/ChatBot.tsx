import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getNextSuggestions, getSmartResponse } from "../lib/chatResponses";

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
}

let msgId = 0;

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++msgId,
      from: "bot",
      text: "Hi! I'm your CareerNavigator assistant 🚀\n\nAsk me about careers, study tips, subject help, or motivation. I'm here for you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestionSet, setSuggestionSet] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = getNextSuggestions(suggestionSet);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: ++msgId, from: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Rotate suggestion set for context-aware next suggestions
    setSuggestionSet((s) => s + 1);

    // Simulate typing delay (1–1.5 seconds)
    const delay = 900 + Math.random() * 600;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const response = getSmartResponse(text.trim());
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: ++msgId, from: "bot", text: response },
    ]);
  };

  // Format message text with basic markdown-like rendering
  const renderMessage = (text: string) => {
    // Split by lines — use line content slice as stable key
    return text.split("\n").map((line) => {
      const stableKey = `${line.slice(0, 30)}-${line.length}`;
      // Render bold inline segments — use part content as key
      const renderedParts = line.split(/(\*\*[^*]+\*\*)/g).map((part) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={`bold-${part}`} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      );
      return (
        <span key={stableKey}>
          {renderedParts}
          <br />
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setOpen(true)}
              size="icon"
              className="w-14 h-14 rounded-full shadow-glow bg-primary hover:bg-primary/90 text-primary-foreground"
              aria-label="Open career chat"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96"
          >
            <div className="glass rounded-2xl shadow-glow overflow-hidden flex flex-col h-[520px]">
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm">
                      Career Assistant
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                      {isTyping ? "Typing..." : "Online"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      {msg.from === "bot" ? (
                        <Bot className="w-4 h-4 text-primary" />
                      ) : (
                        <User className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.from === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}
                    >
                      {renderMessage(msg.text)}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <Bot className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div className="bg-muted px-3 py-2 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1 items-center h-5">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Suggestions */}
              <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
                {suggestions.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => sendMessage(s)}
                    disabled={isTyping}
                    className="text-xs px-2.5 py-1 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors font-ui disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !isTyping &&
                    sendMessage(input)
                  }
                  placeholder="Ask about careers, studies..."
                  className="flex-1 text-sm h-9"
                  disabled={isTyping}
                />
                <Button
                  size="icon"
                  className="h-9 w-9 flex-shrink-0"
                  onClick={() => sendMessage(input)}
                  disabled={isTyping || !input.trim()}
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
