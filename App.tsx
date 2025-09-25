import React, { useState, useCallback } from "react";
import { Persona, Role, ChatMessage, ViewMode } from "./types";
import {
  generateResponse,
  generateStreamingResponseHandler,
} from "./services/geminiService";
import { ChatPanel } from "./components/ChatPanel";
import { AppHeader } from "./components/Header";
import { LeftPanel } from "./components/LeftPanel";
import { PERSONA_CONFIG } from "./constants";

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Chat);

  const [isChatLoading, setIsChatLoading] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<Persona>(
    Persona.Yashwanth
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [chatInput, setChatInput] = useState("");

  const getInitialMessage = () => ({
    id: "initial-welcome",
    role: Role.Model,
    text: "Hey there! Welcome ☕\n\nAsk a question to get started.",
  });

  useState(() => {
    // Set initial message only once
    setMessages([getInitialMessage()]);
  });

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: Role.User,
        text,
      };
      const currentMessages =
        messages[0]?.id === "initial-welcome" ? [] : messages;

      // Create initial streaming message
      const modelMessageId = `model-${Date.now()}`;
      const initialModelMessage: ChatMessage = {
        id: modelMessageId,
        role: Role.Model,
        text: "",
        isStreaming: true,
      };

      setMessages([...currentMessages, userMessage, initialModelMessage]);
      setChatInput("");
      setIsChatLoading(true);

      try {
        let fullResponseText = "";
        let displayedText = "";
        let typingQueue: string[] = [];
        let isTyping = false;

        // Function to simulate typing with controlled speed
        const typeCharacters = () => {
          if (isTyping || typingQueue.length === 0) return;

          isTyping = true;

          const typeNextChar = () => {
            if (typingQueue.length > 0) {
              const char = typingQueue.shift()!;
              displayedText += char;

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === modelMessageId
                    ? { ...msg, text: displayedText, isStreaming: true }
                    : msg
                )
              );

              // Variable typing speed for natural feel (faster)
              let delay = 20; // Base delay (reduced from 30)

              // Add pauses for punctuation (reduced delays)
              if (char === "." || char === "!" || char === "?") {
                delay = 100; // Longer pause after sentences (reduced from 150)
              } else if (char === "," || char === ";" || char === ":") {
                delay = 50; // Medium pause after clauses (reduced from 80)
              } else if (char === " ") {
                delay = 25; // Short pause between words (reduced from 40)
              } else {
                delay = Math.random() * 15 + 15; // 15-30ms per character (reduced from 25-45)
              }

              setTimeout(() => {
                typeNextChar();
              }, delay);
            } else {
              isTyping = false;
              // Check if streaming is complete
              if (fullResponseText && displayedText === fullResponseText) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === modelMessageId
                      ? { ...msg, isStreaming: false }
                      : msg
                  )
                );
              }
            }
          };

          typeNextChar();
        };

        // Collect chunks and add to typing queue
        await generateStreamingResponseHandler(
          text,
          currentPersona,
          (chunk: string) => {
            fullResponseText += chunk;
            // Add each character to the typing queue
            for (let i = 0; i < chunk.length; i++) {
              typingQueue.push(chunk[i]);
            }
            // Start typing if not already typing
            if (!isTyping) {
              typeCharacters();
            }
          }
        );
      } catch (error) {
        console.error("Error in streaming response:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === modelMessageId
              ? {
                  ...msg,
                  text: "Sorry, I encountered an error while generating a response.",
                  isStreaming: false,
                }
              : msg
          )
        );
      }

      setIsChatLoading(false);
    },
    [currentPersona, messages]
  );

  const handleSelectQuestion = (question: string) => {
    if (viewMode === ViewMode.Chat) {
      setChatInput(question);
    } else {
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans antialiased p-2 sm:p-4 gap-4">
      <AppHeader />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 overflow-y-auto">
        <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-auto min-h-[50vh] sm:min-h-[60vh] lg:min-h-0">
          <LeftPanel
            viewMode={viewMode}
            currentPersona={currentPersona}
            isLoading={isChatLoading}
            onSelectQuestion={handleSelectQuestion}
          />
        </div>
        <div className="col-span-1 md:col-span-3 lg:col-span-8 bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden flex flex-col min-h-[60vh] sm:min-h-[70vh] lg:min-h-0 ">
          <ChatPanel
            messages={messages}
            currentPersona={currentPersona}
            isLoading={isChatLoading}
            onSendMessage={handleSendMessage}
            chatInput={chatInput}
            setChatInput={setChatInput}
          />
        </div>
      </main>
      {/* <AppFooter
        onReset={handleReset}
        onExport={handleExport}
        viewMode={viewMode}
      /> */}
    </div>
  );
};

export default App;
