import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Plus, Mic } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import DocumentEditor from "./DocumentEditor";

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
  const [hasResponse, setHasResponse] = useState(false);
  const [documentContent, setDocumentContent] = useState("");
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

    if (!hasResponse) {
      setHasResponse(true);
    }

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

        const responseText = data.response || data.message || "Letter generation request received successfully!";
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date()
        };

        console.log("Adding bot message:", botMessage);
        setMessages(prev => [...prev, botMessage]);
        
        // Update document content with the response (strip HTML tags)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = responseText;
        const textContent = tempDiv.textContent || tempDiv.innerText || responseText;
        setDocumentContent(textContent);
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

  if (!hasResponse) {
    // Simple ChatGPT-like interface before any response
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-full max-w-3xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-foreground mb-4">
              What are you working on?
            </h1>
          </div>

          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything"
              className="w-full min-h-[120px] text-base resize-none rounded-2xl border-2 border-border bg-background focus:border-primary pr-16 pt-4 pb-12"
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"  
                size="icon"
                className="h-8 w-8"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-8 w-8 bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Split view after response
  return (
    <div className="w-full h-screen">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel defaultSize={60} minSize={40}>
          <DocumentEditor 
            content={documentContent} 
            onContentChange={setDocumentContent}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full flex flex-col bg-background border-l">
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">AI Assistant</h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <div className="animate-pulse">●</div>
                      <div className="animate-pulse delay-100">●</div>
                      <div className="animate-pulse delay-200">●</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask anything..."
                  className="w-full min-h-[60px] resize-none pr-12 text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="absolute bottom-2 right-2 h-8 w-8"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default GenerateLetterForm;