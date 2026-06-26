import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minus,
  CalendarDays,
  Search,
  Clock,
  Monitor,
  ChevronRight,
  Smile,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  { label: "Book a repair", icon: CalendarDays, response: "book a repair" },
  { label: "Track my repair", icon: Search, response: "track my repair" },
  { label: "Store hours", icon: Clock, response: "store hours" },
  { label: "Contact us", icon: Monitor, response: "contact support" },
];

const AUTO_RESPONSES: Record<string, string> = {
  "book a repair":
    "You can book a repair by visiting our Book page or calling us at 07415 278767. We offer same-day service for most repairs!",
  "track my repair":
    "To track your repair, please visit our Profile page and enter your tracking ID. You can also call us for an update.",
  "store hours":
    "We're open Monday-Saturday 10 AM - 6 PM. Sunday we're closed. Same-day payments available!",
  "contact support":
    "You can reach us at 07415 278767, email us, or visit our shop at 6 Harefield Road, Nuneaton, CV11 4HD.",
  pricing:
    "Our pricing varies by device and repair type. Get a free quote by calling us or visiting our Contact page.",
  default:
    "Thanks for your message! How can I help you today? You can ask about repairs, tracking, store hours, or pricing.",
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! 👋 I'm here to help.\nHow can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowQuickActions(false);

    setTimeout(() => {
      const lowerContent = content.toLowerCase();
      let response = AUTO_RESPONSES.default;

      for (const key of Object.keys(AUTO_RESPONSES)) {
        if (key !== "default" && lowerContent.includes(key)) {
          response = AUTO_RESPONSES[key];
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setShowQuickActions(true);
    }, 1000 + Math.random() * 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="fixed bottom-6 right-6 z-50 h-[60px] w-[60px] rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] shadow-[0_8px_30px_rgba(37,99,235,0.45)] flex items-center justify-center transition-colors duration-200 cursor-pointer border-0 outline-none"
            aria-label="Open chat"
          >
            <MessageCircle className="h-7 w-7 text-white fill-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
            />

            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] sm:w-[380px]"
              style={{ maxHeight: "calc(100vh - 3rem)" }}
            >
              <div className="flex flex-col rounded-[20px] bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] overflow-hidden" style={{ height: "min(600px, calc(100vh - 3rem))" }}>
                
                {/* ── Header ── */}
                <div className="relative flex items-center gap-3 px-5 py-4 bg-gradient-to-br from-[#0f1b3d] via-[#162456] to-[#1a2d6b]">
                  {/* Bot avatar */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] ring-2 ring-white/20 shrink-0">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[15px] text-white leading-tight">
                      Fixora Support
                    </h3>
                    <p className="text-[12px] text-blue-200/80 flex items-center gap-1.5 mt-0.5">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                      Online • Usually replies instantly
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleMinimize}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Minimize chat"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleClose}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* ── Messages Area ── */}
                <div className="flex-1 overflow-y-auto px-5 py-4 bg-[#f8f9fb]" style={{ minHeight: 0 }}>
                  {/* Today separator */}
                  <div className="flex justify-center mb-5">
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide">
                      Today
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {message.isUser ? (
                          /* ── User message ── */
                          <div className="flex flex-col items-end">
                            <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#2563eb] text-white px-4 py-3 text-[13.5px] leading-relaxed">
                              {message.content}
                            </div>
                            <span className="text-[10.5px] text-gray-400 mt-1.5 mr-1">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        ) : (
                          /* ── Bot message ── */
                          <div className="flex items-start gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] shrink-0 mt-0.5">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                              <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 py-3 text-[13.5px] text-gray-800 leading-relaxed">
                                {message.content.split("\n").map((line, i) => (
                                  <span key={i}>
                                    {line}
                                    {i < message.content.split("\n").length - 1 && <br />}
                                  </span>
                                ))}
                              </div>
                              <span className="text-[10.5px] text-gray-400 mt-1.5 ml-1">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2.5"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="rounded-2xl rounded-tl-md bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 py-3.5">
                          <div className="flex items-center gap-1">
                            <span className="h-[6px] w-[6px] rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="h-[6px] w-[6px] rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="h-[6px] w-[6px] rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* ── Quick Actions (2×2 grid) ── */}
                {showQuickActions && (
                  <div className="px-5 pt-3 pb-2 bg-white border-t border-gray-100">
                    <p className="text-[12px] font-semibold text-gray-700 mb-3 tracking-wide">
                      Quick actions
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => handleSendMessage(action.response)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 transition-all duration-150 group text-left cursor-pointer"
                        >
                          <action.icon className="h-4 w-4 text-[#2563eb] shrink-0" />
                          <span className="text-[12.5px] text-gray-700 font-medium flex-1 leading-tight">
                            {action.label}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-500 shrink-0 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Footer ── */}
                <div className="flex justify-center py-2.5 bg-white border-t border-gray-100">
                  <span className="text-[11.5px] text-gray-400">
                    We're here to help 💙
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
