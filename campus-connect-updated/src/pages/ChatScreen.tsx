import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { chatMessages, conversations } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/data/types";

const ChatScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const conv = conversations.find((c) => c.id === id);
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages([
      ...messages,
      {
        id: `m${Date.now()}`,
        senderId: "u1",
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      },
    ]);
    setText("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground text-sm">{conv?.contactName ?? "Chat"}</h2>
          <span className="text-xs text-primary">{conv?.itemTag}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm",
                msg.isMe
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              )}
            >
              <p>{msg.text}</p>
              <p className={cn("text-[10px] mt-1", msg.isMe ? "text-primary-foreground/60" : "text-muted-foreground")}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button
          onClick={handleSend}
          className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center"
        >
          <Send className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
