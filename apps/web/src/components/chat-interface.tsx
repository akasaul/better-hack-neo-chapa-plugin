"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseUserQuery } from "../lib/ai-parser";
import type { SearchParams } from "@/lib/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  onSearch: (params: SearchParams) => void;
  currentParams: SearchParams;
}

export function ChatInterface({ onSearch, currentParams }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI flight booking assistant. Tell me where you'd like to go, when, and I'll help you find the perfect flight. For example, try: 'Find me a flight from New York to London next week for 2 adults'",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const result = parseUserQuery(userMessage, currentParams);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.response,
        },
      ]);
      setIsTyping(false);

      if (result.searchParams) {
        setTimeout(() => {
          onSearch(result.searchParams!);
        }, 1000);
      }
    }, 800);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl border bg-white shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                AI Flight Assistant
              </h2>
              <p className="text-sm text-blue-100">
                Powered by intelligent search
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                  <Plane className="h-4 w-4 text-blue-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 flex-shrink-0">
                  <span className="text-sm font-medium">You</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                <Plane className="h-4 w-4 text-blue-600" />
              </div>
              <div className="rounded-2xl bg-gray-100 px-4 py-3">
                <div className="flex gap-1">
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-gray-50 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about flights..."
              className="flex-1 rounded-full border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Quick suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() =>
            setInput("Find me a cheap flight from Hanoi to Ho Chi Minh City")
          }
          className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-gray-50"
        >
          Cheap flights to HCMC
        </button>
        <button
          onClick={() =>
            setInput("Show me flights with WiFi and meals included")
          }
          className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-gray-50"
        >
          Flights with WiFi
        </button>
        <button
          onClick={() => setInput("I need a morning flight for 2 adults")}
          className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-gray-50"
        >
          Morning flights
        </button>
      </div>
    </div>
  );
}
