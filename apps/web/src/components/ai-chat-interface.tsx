"use client";

import type React from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles, Plane, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FlightCard } from "./flight-card";
import type { Flight } from "@/lib/types";

export function AiChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsRecording(false);
      };

      recognitionInstance.onerror = () => {
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage({ text: inputValue });
      setInputValue("");
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => {
      sendMessage({ text: prompt });
      setInputValue("");
    }, 100);
  };

  const toggleRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <Card className="flex h-[700px] w-full flex-col border shadow-lg">
      <div className="flex items-center gap-3 border-b bg-primary p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-foreground/10">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-primary-foreground">
            AI Flight Assistant
          </h2>
          <p className="text-sm text-primary-foreground/80">
            Speak or type your travel plans
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
          <span className="text-xs font-medium text-primary-foreground">
            Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-6 bg-muted/30">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Plane className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">
                Ready to explore the world?
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tell me where you'd like to go, or try one of these:
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-sm bg-transparent"
                onClick={() =>
                  handleQuickPrompt(
                    "Find me a flight from Hanoi to Ho Chi Minh City this weekend"
                  )
                }
              >
                Hanoi → Ho Chi Minh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-sm bg-transparent"
                onClick={() =>
                  handleQuickPrompt(
                    "I need a cheap flight for 2 adults next week"
                  )
                }
              >
                Cheap flight for 2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-sm bg-transparent"
                onClick={() =>
                  handleQuickPrompt("Show me business class flights with wifi")
                }
              >
                Business with WiFi
              </Button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            {message.parts.map((part, index) => {
              if (part.type === "text") {
                return (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border bg-card text-card-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{part.text}</p>
                    </div>
                  </div>
                );
              }

              // Handle tool calls
              if (
                part.type === "tool-searchFlights" ||
                part.type === "tool-filterFlights"
              ) {
                if (part.state === "output-available") {
                  const { flights, count } = part.output as {
                    flights: Flight[];
                    count: number;
                  };
                  return (
                    <div key={index} className="space-y-3">
                      <div className="rounded-lg border bg-primary/10 p-4">
                        <p className="text-sm font-semibold text-foreground">
                          ✨ Found {count} {count === 1 ? "flight" : "flights"}.
                          Here are the top results:
                        </p>
                      </div>
                      {flights.map((flight: Flight) => (
                        <FlightCard key={flight.id} flight={flight} />
                      ))}
                    </div>
                  );
                }
              }

              return null;
            })}
          </div>
        ))}

        {status === "in_progress" && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg border bg-card px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t bg-card p-5">
        <div className="flex gap-3">
          <Button
            type="button"
            size="icon"
            variant={isRecording ? "destructive" : "outline"}
            onClick={toggleRecording}
            className={`shrink-0 ${isRecording ? "animate-pulse" : ""}`}
            disabled={status === "in_progress"}
          >
            {isRecording ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              isRecording ? "Listening..." : "Ask me anything about flights..."
            }
            className="flex-1"
            disabled={status === "in_progress" || isRecording}
          />
          <Button
            type="submit"
            size="icon"
            className="shrink-0"
            disabled={status === "in_progress" || !inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        {isRecording && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            🎤 Listening... Speak now
          </p>
        )}
      </form>
    </Card>
  );
}
