"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Send, Bot, Loader2 } from "lucide-react";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

export default function ContactForm() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Data collection
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([{ id: "1", sender: "bot", text: t.chat.step1 }]);
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messages.length, t.chat.step1]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (quickReplyText?: string | React.MouseEvent) => {
    const isQuickReply = typeof quickReplyText === 'string';
    const textToSend = isQuickReply ? quickReplyText as string : inputValue;
    
    if (!textToSend.trim()) return;

    const userText = textToSend.trim();
    if (!isQuickReply) setInputValue("");
    
    // Add user message
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text: userText }]);
    setIsTyping(true);

    if (step === 0) {
      setName(userText);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev, 
          { id: Date.now().toString(), sender: "bot", text: t.chat.step2.replace("{name}", userText) }
        ]);
        setStep(1);
        setIsTyping(false);
      }, 1000);
    } 
    else if (step === 1) {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userText)) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev, 
            { id: Date.now().toString(), sender: "bot", text: t.chat.invalidEmail }
          ]);
          setIsTyping(false);
        }, 800);
        return;
      }
      
      setEmail(userText);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev, 
          { id: Date.now().toString(), sender: "bot", text: t.chat.step3 }
        ]);
        setStep(2);
        setIsTyping(false);
      }, 1000);
    }
    else if (step === 2) {
      setStep(3);
      
      setTimeout(async () => {
        setMessages((prev) => [
          ...prev, 
          { id: Date.now().toString(), sender: "bot", text: t.chat.step4 }
        ]);
        
        try {
          // Optional: Still save to database just in case
          fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message: userText }),
          }).catch(() => {}); // Ignore API errors to ensure WA always opens

          const waNumber = "6282323572250";
          const waMessage = `Halo Stefan,\n\nNama saya: ${name}\nEmail: ${email}\n\nPesan:\n${userText}`;
          const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

          setTimeout(() => {
            setMessages((prev) => [
              ...prev, 
              { id: Date.now().toString(), sender: "bot", text: t.chat.success }
            ]);
            setStep(4);
            setIsTyping(false);
            
            // Open WhatsApp in new tab
            window.open(waUrl, '_blank', 'noopener,noreferrer');
          }, 1500);
        } catch (error) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev, 
              { id: Date.now().toString(), sender: "bot", text: t.chat.error }
            ]);
            setStep(2);
            setIsTyping(false);
          }, 1000);
        }
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  let placeholder = t.chat.inputPlaceholderName;
  if (step === 1) placeholder = t.chat.inputPlaceholderEmail;
  if (step === 2) placeholder = t.chat.inputPlaceholderMessage;

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-colors max-w-2xl mx-auto flex flex-col h-[550px]">
      {/* Chat Header */}
      <div className="bg-gray-50 dark:bg-black/50 border-b border-gray-200 dark:border-white/10 p-4 flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">{t.chat.botName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Online • Responds instantly</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth">
        <div className="text-center pb-4">
          <span className="text-xs text-gray-400 font-medium px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full">
            Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-tl-sm'
            }`}>
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5 w-16 shadow-sm">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30">
        {step >= 4 ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <p className="text-sm text-green-600 dark:text-green-400 font-medium text-center">
              Pesan siap dikirim via WhatsApp!
            </p>
            <button
              onClick={() => {
                const waNumber = "6282323572250";
                const waMessage = `Halo Stefan,\n\nNama saya: ${name}\nEmail: ${email}\n\nPesan:\n${messages[messages.length - 2]?.text || ""}`;
                window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, '_blank', 'noopener,noreferrer');
              }}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-md flex items-center gap-2 text-sm"
            >
              Buka WhatsApp Sekarang
            </button>
          </div>
        ) : (
          <>
            {step === 2 && !isTyping && (
              <div className="flex flex-wrap gap-2 mb-3 px-1">
                <button
                  onClick={() => handleSend(t.chat.optionJob)}
                  className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors"
                >
                  {t.chat.optionJob}
                </button>
                <button
                  onClick={() => handleSend(t.chat.optionFreelance)}
                  className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors"
                >
                  {t.chat.optionFreelance}
                </button>
              </div>
            )}
            <div className="relative flex items-end gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={step >= 4 || isTyping}
                placeholder={placeholder}
                className="w-full max-h-32 min-h-[52px] bg-white dark:bg-[#111] border border-gray-300 dark:border-white/10 rounded-2xl px-5 py-3.5 text-[15px] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none disabled:opacity-50 shadow-sm"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || step >= 4 || isTyping}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3.5 rounded-2xl transition-all flex-shrink-0 shadow-md flex items-center justify-center h-[52px] w-[52px]"
                aria-label={t.chat.sendButton}
              >
                {step === 3 && isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
            <p className="text-center text-[11px] text-gray-400 mt-3 font-medium">
              Powered by Interactive Chat UI • Press <kbd className="font-mono bg-gray-200 dark:bg-white/10 px-1 rounded">Enter</kbd> to send
            </p>
          </>
        )}
      </div>
    </div>
  );
}
