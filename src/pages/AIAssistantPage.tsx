import { useState, useRef, useEffect } from "react";
import { 
  Bot, Send, Sparkles 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { useApp } from "../context/AppContext";

const SUGGESTIONS = [
  "Give me DBMS Unit 3 & 4 Normalization notes",
  "When is the next coding contest?",
  "Are there any active internship drives?",
  "Who is looking for hackathon teammates?",
  "Give me top tips for frontend interview pairing."
];

export const AIAssistantPage = () => {
  const { profile, chatMessages, sendAIMessage } = useApp();
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    sendAIMessage(text.trim());
    setInputText("");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
          <Badge className="badge-gold">
            <Sparkles style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.25rem' }} />
            Campus Intelligence
          </Badge>
          <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Live University Knowledge Engine</span>
        </div>
        <h1>Campus AI Assistant</h1>
        <p>Ask for study notes, upcoming hackathons, placement questions, or campus teammate matching.</p>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s)}
            className="p-2 px-3 bg-white border rounded-full text-xs font-medium text-charcoal hover:bg-forest-tint hover:border-forest transition whitespace-nowrap flex items-center gap-1.5 shadow-sm"
            style={{ padding: '0.4rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem' }}
          >
            <Sparkles style={{ width: '0.75rem', height: '0.75rem', color: 'var(--gold-dark)' }} />
            <span>{s}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div className="chat-container" style={{ height: '560px' }}>
          {/* Messages History */}
          <div className="chat-history">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${
                  msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
                }`}
              >
                {msg.role === "bot" ? (
                  <div
                    className="avatar shadow-sm flex-shrink-0"
                    style={{
                      width: '2.25rem',
                      height: '2.25rem',
                      background: 'linear-gradient(135deg, var(--gold), var(--forest-light))'
                    }}
                  >
                    <Bot style={{ width: '1.25rem', height: '1.25rem' }} />
                  </div>
                ) : (
                  <Avatar initials={profile.avatar} style={{ width: '2.25rem', height: '2.25rem', flexShrink: 0 }} />
                )}

                <div className={`chat-bubble ${msg.role}`}>
                  <p>{msg.text}</p>
                  <span className="block text-right mt-1 opacity-70" style={{ fontSize: '0.6875rem' }}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="chat-input-bar"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about notes, contests, teammates, or interview tips..."
              style={{
                flex: 1,
                borderRadius: '9999px',
                paddingLeft: '1.25rem',
                backgroundColor: 'var(--paper)',
                border: '1px solid var(--charcoal-border)'
              }}
            />
            <Button type="submit" variant="default" className="rounded-full px-5" style={{ borderRadius: '9999px' }}>
              <Send style={{ width: '1rem', height: '1rem' }} />
              <span>Send</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
