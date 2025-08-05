import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Settings, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const GenerateLetterForm = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    console.log("Sending user message:", userMessage);
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Sending request to webhook: https://adarskr03.app.n8n.cloud/webhook/letter-chat");
      console.log("Request payload:", { message: userMessage.text });

      const response = await fetch("https://adarskr03.app.n8n.cloud/webhook/letter-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          timestamp: userMessage.timestamp.toISOString(),
          sessionId: "hrms-letter-generation"
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: data.response || data.message || "Letter generation request received successfully!",
          isUser: false,
          timestamp: new Date()
        };

        console.log("Adding bot message:", botMessage);
        setMessages(prev => [...prev, botMessage]);
      } else {
        console.error("HTTP Error:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `Error: Unable to process your request. Status: ${response.status}`,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Network/Request error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Error: Could not connect to the letter generation service. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      console.log("Request completed");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col bg-slate-900/50 backdrop-blur-xl rounded-lg border border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-semibold text-white text-center">
          What are you working on?
        </h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 py-12">
            <p>Start a conversation about letter generation.</p>
            <p className="text-sm mt-2">Ask for help with creating employee letters, documents, or any HR-related correspondence.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-slate-700 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">●</div>
                <div className="animate-pulse delay-100">●</div>
                <div className="animate-pulse delay-200">●</div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-slate-700">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <Mic className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything"
              className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 pr-12"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateLetterForm;