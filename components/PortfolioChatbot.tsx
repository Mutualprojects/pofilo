"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, X, Send, Sparkles, User, Bot, 
  Copy, Check, Briefcase, ShieldAlert, Code2, 
  Mail, MessageCircle, ChevronRight, HelpCircle, ArrowDown, Loader2
} from "lucide-react";

const BALAJI_KB = {
  intro: "Hello! I am Balaji's AI Assistant. I'm here to provide detailed insights into his professional background, technical expertise, and core projects. How can I assist you today?",
  
  transition: "CAREER TRANSITION PROFILE\n\n" +
              "Balaji completed his B.Tech in Mechanical Engineering from Swarnandhra College of Engineering with a CGPA of 7.69. " +
              "Driven by a strong curiosity for technology, he chose to transition into software development. He dedicated himself " +
              "to mastering the MERN stack and Python. This engineering problem-solving mindset now enables him to architect " +
              "highly reliable full-stack applications and sophisticated AI-integrated tools.",
  
  elections: "GOVERNMENT & ELECTION AI SURVEILLANCE\n\n" +
             "Balaji served as the District Coordinator for the AP State Elections (7 Constituencies in West Godavari) and " +
             "Head District Coordinator for MLC Elections (Visakhapatnam).\n\n" +
             "Key Contributions:\n" +
             "• Led the Central Monitoring Hall managing live analytics.\n" +
             "• Deployed AI-based security surveillance systems with ANPR (Automatic Number Plate Recognition) tracking.\n" +
             "• Received formal appreciation from the District Collector for outstanding operational execution.",
  
  projects: "KEY ENGINEERING PROJECTS\n\n" +
            "1. AI VISITOR MANAGEMENT SYSTEM\n" +
            "A facial recognition access system built with Django, FastAPI, and FaceNet. Features live video stream processing for 500+ daily entries.\n\n" +
            "2. AI SECURE FILE MANAGEMENT\n" +
            "An enterprise document system utilizing OCR and Vector Databases (ChromaDB/Pinecone) for intelligent search across 1,000+ files.\n\n" +
            "3. GENAI CHATBOT (brihaspathi.com)\n" +
            "A contextual AI assistant leveraging LLAMA 3.2, Strapi CMS, and vector embeddings deployed on 50+ pages.\n\n" +
            "4. AI TASK MANAGEMENT (tms.brihaspathi.com)\n" +
            "Workflow automation with custom effort-estimation APIs that boosted team tracking efficiency by 35%.\n\n" +
            "5. SHEETPILOT (Sheets-to-API)\n" +
            "A Node.js and Express platform that dynamically transforms Google Sheets into live RESTful APIs, reducing data handling time by 60%.",
  
  skills: "TECHNICAL STACK & TOOLKIT\n\n" +
          "• LANGUAGES: JavaScript, TypeScript, Python, HTML, CSS\n" +
          "• FRONTEND: Next.js, React.js, Vite, Tailwind CSS, Bootstrap\n" +
          "• BACKEND & APIS: Node.js, Express.js, Django, FastAPI, RESTful Services, WebSockets\n" +
          "• DATABASES & VECTOR STORES: MongoDB, PostgreSQL, Supabase, ChromaDB, Pinecone\n" +
          "• AI & AUTOMATION: OpenAI API, FaceNet, OCR, Automation Systems\n" +
          "• CLOUD & TOOLS: Linux Ubuntu, Git, Postman, AWS, Google Cloud",
  
  contact: "GET IN TOUCH WITH BALAJI\n\n" +
           "• EMAIL: sirigineedibalaji4@gmail.com\n" +
           "• PHONE: +91 95533 39219\n" +
           "• LOCATION: Hyderabad, Telangana"
};

// Clean any stray asterisks dynamically
const cleanStars = (str: string) => {
  return str.replace(/\*/g, "");
};

function getContextualReply(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes("transition") || q.includes("mechanical") || q.includes("swap") || q.includes("change") || q.includes("background") || q.includes("engineer")) {
    return BALAJI_KB.transition;
  }
  if (q.includes("election") || q.includes("government") || q.includes("collector") || q.includes("surveillance") || q.includes("anpr") || q.includes("mlc") || q.includes("constituenc")) {
    return BALAJI_KB.elections;
  }
  if (q.includes("project") || q.includes("visitor") || q.includes("file") || q.includes("task") || q.includes("sheetpilot") || q.includes("build") || q.includes("trinai")) {
    return BALAJI_KB.projects;
  }
  if (q.includes("skill") || q.includes("language") || q.includes("stack") || q.includes("technolog") || q.includes("database") || q.includes("framework")) {
    return BALAJI_KB.skills;
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire") || q.includes("social") || q.includes("linkedin")) {
    return BALAJI_KB.contact;
  }
  
  return "I appreciate your query! Balaji has deep expertise in custom software development and AI engineering. I can tell you all about his:\n\n" +
         "• AI Visitor Management & OCR secure search platforms\n" +
         "• Live election coordination systems with vehicle tracking\n" +
         "• Advanced backend engineering using MERN and Django\n\n" +
         "Please select one of the suggested topics below or ask a custom question!";
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  isStreaming?: boolean;
  type?: "text" | "contact_form";
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setResponseMsg(data.message);
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setResponseMsg("Failed to send message.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-700 dark:text-green-400 text-xs text-center flex flex-col items-center gap-2 mt-3 mb-1">
        <Check className="w-6 h-6" />
        <p className="font-medium">{responseMsg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-3 mb-1 w-[240px] sm:w-[260px]">
      <input 
        type="text" 
        placeholder="Your Name" 
        required 
        value={formData.name}
        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
        className="px-3.5 py-2.5 bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 text-zinc-900 dark:text-zinc-100 transition-all placeholder:text-zinc-400" 
      />
      <input 
        type="email" 
        placeholder="Your Email" 
        required 
        value={formData.email}
        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
        className="px-3.5 py-2.5 bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 text-zinc-900 dark:text-zinc-100 transition-all placeholder:text-zinc-400" 
      />
      <input 
        type="tel" 
        placeholder="Your Mobile Number (Optional)" 
        value={formData.mobile}
        onChange={(e) => setFormData(prev => ({...prev, mobile: e.target.value}))}
        className="px-3.5 py-2.5 bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 text-zinc-900 dark:text-zinc-100 transition-all placeholder:text-zinc-400" 
      />
      <textarea 
        placeholder="Your Message" 
        required 
        rows={3}
        value={formData.message}
        onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
        className="px-3.5 py-2.5 bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 text-zinc-900 dark:text-zinc-100 transition-all placeholder:text-zinc-400 resize-none" 
      />
      <button 
        type="submit" 
        disabled={status === "loading"}
        className="mt-1.5 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-orange-600 dark:hover:bg-orange-500 text-white dark:text-zinc-900 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
        {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
      </button>
      {status === "error" && <p className="text-red-500 text-[10px] text-center mt-1 font-medium">{responseMsg}</p>}
    </form>
  );
}

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Lazy load welcome message on first open
      setMessages([{ id: "welcome", sender: "bot", text: BALAJI_KB.intro }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!showScrollButton) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 150;
    setShowScrollButton(isScrolledUp);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: cleanStars(text) };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      const q = text.toLowerCase();
      if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("message")) {
        const botMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          sender: "bot", 
          text: BALAJI_KB.contact + "\n\nAlternatively, you can send me a direct message right here:", 
          type: "contact_form",
          isStreaming: false
        };
        setMessages((prev) => [...prev, botMsg]);
        return;
      }

      const replyText = cleanStars(getContextReplyWithBackup(text));
      const botMsgId = (Date.now() + 1).toString();
      
      const botMsg: Message = { id: botMsgId, sender: "bot", text: "", isStreaming: true };
      setMessages((prev) => [...prev, botMsg]);

      const words = replyText.split(" ");
      let currentWordIndex = 0;
      let streamedText = "";

      const interval = setInterval(() => {
        if (currentWordIndex < words.length) {
          streamedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, text: streamedText } : m))
          );
          currentWordIndex++;
        } else {
          clearInterval(interval);
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, isStreaming: false } : m))
          );
        }
      }, 20);
    }, 600);
  };

  const getContextReplyWithBackup = (text: string) => {
    return getContextualReply(text);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    setMessages([{ id: "welcome", sender: "bot", text: BALAJI_KB.intro }]);
  };

  // Structured menu items for visual homepage card grid
  const quickActions = [
    { 
      title: "Career Transition", 
      desc: "From Mechanical Engineering to Code", 
      value: "Tell me about your transition from Mechanical Engineering", 
      icon: Briefcase,
      color: "border-orange-500/10 hover:border-orange-500/30 dark:hover:bg-orange-500/5"
    },
    { 
      title: "AP Election AI System", 
      desc: "Surveillance and ANPR vehicle tracking", 
      value: "What did you build for the AP State Elections?", 
      icon: ShieldAlert,
      color: "border-amber-500/10 hover:border-amber-500/30 dark:hover:bg-amber-500/5"
    },
    { 
      title: "Core AI Projects", 
      desc: "Facial recognition VMS and OCR file systems", 
      value: "Tell me about your AI Visitor Management & File search systems", 
      icon: Bot,
      color: "border-purple-500/10 hover:border-purple-500/30 dark:hover:bg-purple-500/5"
    },
    { 
      title: "Contact Balaji", 
      desc: "Send a direct message", 
      value: "I'd like to send a message", 
      icon: Mail,
      color: "border-blue-500/10 hover:border-blue-500/30 dark:hover:bg-blue-500/5"
    }
  ];

  return (
    <div className="font-sans antialiased">
      {/* Floating Trigger Button - Fixed to the Left */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.08)] border border-zinc-200 dark:border-zinc-800 transition-transform group z-[999]"
            aria-label="Open Chatbot"
          >
            <MessageCircle className="w-6 h-6 transition-transform group-hover:rotate-6" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-orange-600 rounded-full border-2 border-[#f5f1e8] dark:border-[#0c0c0c] animate-pulse" />
            
            {/* Desktop Tooltip pointing to the left of the bubble */}
            <span className="hidden sm:inline-block absolute right-16 scale-0 group-hover:scale-100 transition-all origin-right bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg pointer-events-none whitespace-nowrap shadow-lg">
              Ask Balaji's AI! ✨
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modern Glassmorphic Chat Drawer - Fixed to the Right & Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 right-0 sm:bottom-24 sm:right-6 w-full h-[90dvh] sm:h-[500px] sm:max-h-[calc(100vh-120px)] sm:w-[390px] bg-white/95 dark:bg-zinc-950/95 sm:bg-white/90 sm:dark:bg-zinc-950/90 backdrop-blur-xl rounded-t-[2rem] sm:rounded-[2rem] sm:border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden z-[999]"
          >
            {/* Swipe handle (visual & clickable) */}
            <div 
              className="w-full flex justify-center pt-3 pb-1 bg-zinc-50/50 dark:bg-zinc-900/30 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors shrink-0 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full group-hover:bg-zinc-400 dark:group-hover:bg-zinc-500 transition-colors" />
            </div>

            {/* Elegant Header */}
            <div className="p-4 sm:p-5 pt-2 sm:pt-2 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white dark:text-zinc-900" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                    Balaji's AI <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-500" />
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Assistant</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 1 && (
                  <button 
                    onClick={resetChat}
                    className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-orange-600 dark:text-zinc-500 transition-colors px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Chat Body - Interactive Dashboard Home / Message Feed */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 relative"
            >
              
              {/* Home state Dashboard: Beautiful visual cards when only the welcome message is present */}
              {messages.length <= 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-2"
                >
                  {/* Custom Welcomer Card */}
                  <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/40 text-center">
                    <Sparkles className="w-8 h-8 text-orange-600 dark:text-orange-500 mx-auto mb-3" />
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1.5">Balaji's AI Assistant</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-xs mx-auto">
                      Ask me anything about Balaji's transition to software engineering, his AI innovations, or his robust technical stack.
                    </p>
                  </div>

                  {/* Visual Quick Actions Grid */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 block mb-1">
                      Suggested Topics
                    </span>
                    {quickActions.map((act) => {
                      const Icon = act.icon;
                      return (
                        <button
                          key={act.title}
                          onClick={() => handleSendMessage(act.value)}
                          className={`w-full text-left p-3.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 flex items-center justify-between gap-4 transition-all hover:-translate-y-0.5 hover:shadow-sm ${act.color} group`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200/30 dark:border-zinc-800/30 text-zinc-800 dark:text-zinc-200">
                              <Icon className="w-4.5 h-4.5 text-orange-600 dark:text-orange-500" />
                            </div>
                            <div>
                              <h5 className="font-bold text-[13px] text-zinc-950 dark:text-zinc-100 group-hover:text-orange-600 transition-colors">
                                {act.title}
                              </h5>
                              <p className="text-zinc-400 dark:text-zinc-500 text-[11px]">
                                {act.desc}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Chat Message List */}
              {messages.length > 1 && (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200/30 dark:border-zinc-800/30">
                          <Bot className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        </div>
                      )}

                      <div className="relative group max-w-[82%]">
                        <div
                          className={`p-3.5 sm:p-4 rounded-2xl text-[12px] sm:text-[13px] leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-tr-none font-medium shadow-sm"
                              : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-zinc-200/40 dark:border-zinc-800/40 shadow-sm"
                          }`}
                        >
                          {/* Rich Custom Parser for Starless Content */}
                          {msg.text.split("\n").map((line, idx) => {
                            const trimmed = line.trim();
                            if (!trimmed) return <div key={idx} className="h-2" />;
                            
                            // Headers
                            const isHeader = trimmed === trimmed.toUpperCase() && trimmed.length > 5 && !trimmed.startsWith("•");
                            if (isHeader) {
                              return (
                                <h4 key={idx} className="font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-orange-600 dark:text-orange-500 mt-4 mb-2 first:mt-0">
                                  {trimmed}
                                </h4>
                              );
                            }

                            // Bullets
                            if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
                              return (
                                <div key={idx} className="flex items-start gap-2.5 pl-1 mb-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600/80 dark:bg-orange-500/80 mt-1.5 shrink-0" />
                                  <span className="flex-1 text-zinc-700 dark:text-zinc-300">{trimmed.replace(/^[•-]\s*/, "")}</span>
                                </div>
                              );
                            }

                            // Numbered Lists
                            const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
                            if (numMatch) {
                              return (
                                <div key={idx} className="flex items-start gap-2 pl-1 mb-2.5">
                                  <span className="font-bold text-orange-600 dark:text-orange-500 shrink-0 text-xs">{numMatch[1]}.</span>
                                  <span className="flex-1 text-zinc-700 dark:text-zinc-300">{numMatch[2]}</span>
                                </div>
                              );
                            }

                            return <p key={idx} className="mb-2 last:mb-0 text-zinc-700 dark:text-zinc-300">{trimmed}</p>;
                          })}
                          
                          {/* Render Contact Form if msg type is contact_form */}
                          {msg.type === "contact_form" && <ContactForm />}
                        </div>

                        {/* Hover Actions */}
                        {msg.sender === "bot" && !msg.isStreaming && (
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="absolute right-2 -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-md text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1 shadow-sm"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-green-500" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" /> Copy
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {msg.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-zinc-900/5 dark:bg-zinc-100/10 flex items-center justify-center shrink-0 border border-zinc-200/20 dark:border-zinc-800/20">
                          <User className="w-4 h-4 text-zinc-750 dark:text-zinc-250" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Typing Dot indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200/30 dark:border-zinc-800/30">
                    <Bot className="w-4 h-4 text-zinc-500 animate-bounce" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800/40 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-450 dark:bg-zinc-550 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-450 dark:bg-zinc-550 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-450 dark:bg-zinc-550 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Scroll Down Floating Indicator Button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[80px] sm:bottom-[90px] left-1/2 -translate-x-1/2 px-3.5 py-2 bg-zinc-900/95 dark:bg-zinc-100/95 text-white dark:text-zinc-900 rounded-full border border-zinc-200/50 dark:border-zinc-700/50 shadow-xl flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-[10px] font-bold uppercase tracking-wider z-50 cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  <span>Scroll Down</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input Bar Section */}
            <div className="p-4 sm:p-5 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2.5"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about transition, election surveillance, skills..."
                  className="flex-1 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/65 text-xs sm:text-[13px] border border-zinc-200/30 dark:border-zinc-800/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-600/50 text-zinc-850 dark:text-zinc-150"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:hover:bg-orange-600 text-white flex items-center justify-center shrink-0 transition-colors shadow-lg shadow-orange-600/10"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
