import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Bot,
  RotateCcw,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
  action?: {
    label: string;
    targetHref: string;
  };
}

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I'm Neeraj AI, an interactive portfolio assistant. I can answer questions about Neeraj's academic record, C++/Python skills, software projects, or internship availability. How can I help you?",
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const quickQuestions = [
    'What does Neeraj do?',
    'What are his skills?',
    'What projects has he built?',
    'What is his education & CGPA?',
    'Is he looking for internships?',
    'How can I contact him?',
  ];

  const findAnswer = (query: string): { text: string; action?: { label: string; targetHref: string } } => {
    const q = query.toLowerCase().trim();

    // Check FAQ knowledge keywords
    for (const faq of portfolioData.faqKnowledge) {
      if (faq.keywords.some((kw) => q.includes(kw))) {
        let action: { label: string; targetHref: string } | undefined;
        if (faq.keywords.includes('projects') || faq.keywords.includes('kavach')) {
          action = { label: 'Explore Projects Section', targetHref: '#projects' };
        } else if (faq.keywords.includes('education') || faq.keywords.includes('cgpa')) {
          action = { label: 'View Academic Record', targetHref: '#about' };
        } else if (faq.keywords.includes('skills')) {
          action = { label: 'View Categorized Skills', targetHref: '#skills' };
        } else if (faq.keywords.includes('contact') || faq.keywords.includes('email') || faq.keywords.includes('internship')) {
          action = { label: 'Go to Contact / Email', targetHref: '#contact' };
        } else if (faq.keywords.includes('achievements')) {
          action = { label: 'View Verified Achievements', targetHref: '#achievements' };
        }
        return { text: faq.answer, action };
      }
    }

    // Explicit social & contact lookups
    if (q.includes('instagram') || q.includes('insta')) {
      return {
        text: "Neeraj's Instagram ID is @narendraydvv (https://instagram.com/narendraydvv). You can follow him or send a direct message for inquiries and collaboration!",
        action: { label: 'Open Instagram Profile', targetHref: 'https://instagram.com/narendraydvv' }
      };
    }

    if (q.includes('phone') || q.includes('mobile') || q.includes('call') || q.includes('number')) {
      return {
        text: "Neeraj's direct mobile number is +91 8103537584. You can call or reach out to him regarding software engineering and AI internship opportunities.",
        action: { label: 'Call +91 8103537584', targetHref: 'tel:+918103537584' }
      };
    }

    // Specific individual checks
    if (q.includes('c++') || q.includes('python') || q.includes('oop')) {
      return {
        text: "Neeraj is proficient in C++ and Python with strong focus on Object-Oriented Programming (OOP) and algorithmic problem solving. He topped his department in 1st year and is actively developing his software engineering fundamentals.",
        action: { label: 'See Skills', targetHref: '#skills' }
      };
    }

    if (q.includes('college') || q.includes('institute') || q.includes('ips') || q.includes('indore')) {
      return {
        text: `Neeraj is pursuing his B.Tech in Electrical & Electronics Engineering at IPS Academy, Institute of Engineering & Science, Indore. He is currently in his 2nd Year (3rd Semester) with an outstanding 1-Year CGPA of 8.95 (1st Rank Topper).`,
        action: { label: 'View About Section', targetHref: '#about' }
      };
    }

    // Strict truthful fallback
    return {
      text: "I only have access to verified facts contained in Neeraj's official portfolio (education, C++/Python skills, 5 flagship software projects, verified achievements, phone: +91 8103537584, and Instagram: @narendraydvv). Feel free to ask about his projects, academics, or reach out to him directly.",
      action: { label: 'Contact Neeraj Directly', targetHref: '#contact' }
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMessage: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const match = findAnswer(text);
      const assistantMessage: Message = {
        id: 'reply-' + Date.now(),
        sender: 'assistant',
        text: match.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: match.action,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Chat history cleared. I'm ready to answer any questions about Neeraj's skills, projects, or background.",
        time: 'Just now',
      },
    ]);
  };

  return (
    <aside aria-label="AI Portfolio Assistant" className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[#c73a63] hover:bg-[#a8284f] text-white shadow-[0_4px_20px_rgba(199,58,99,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10"
          aria-label="Open Neeraj AI chat assistant"
        >
          <span className="text-base">💬</span>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            Chat with me
          </span>
          <span className="hidden sm:inline-block text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[390px] h-[530px] max-h-[85vh] rounded-2xl bg-[#090d16] border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#0e1322] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">Neeraj AI</h4>
                  <span className="text-[9px] font-sans font-semibold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Verified Portfolio Knowledge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#06080e]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-br-none shadow-md shadow-indigo-950/40'
                      : 'bg-[#101524] text-slate-200 border border-white/8 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {msg.action && (
                    <a
                      href={msg.action.targetHref}
                      onClick={() => setIsOpen(false)}
                      className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-400 hover:text-sky-300 bg-sky-950/50 hover:bg-sky-950 px-2.5 py-1 rounded-lg border border-sky-500/30 transition-colors"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <span className="text-[9px] font-sans font-medium text-slate-500 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 p-2 font-sans font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                />
                <span className="text-[10px] ml-1">Analyzing verified facts...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="px-3 py-2 bg-[#0a0e19] border-t border-white/5 overflow-x-auto whitespace-nowrap no-scrollbar flex gap-1.5">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-sky-300 border border-white/5 hover:border-indigo-500/30 transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-[#0c101d] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, CGPA, or skills..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-colors"
                title="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[9px] text-slate-500 px-1 mt-1 font-sans font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                Truthful & local only
              </span>
              <span>No hallucinated claims</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
