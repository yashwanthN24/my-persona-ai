import React, { useState, useCallback } from "react";
import {
  Persona,
  Role,
  ChatMessage,
  GenerationResult,
  ViewMode,
  ComparisonState,
  PerformanceStats,
} from "./types";
import { generateResponse } from "./services/geminiService";
import { ChatPanel } from "./components/ChatPanel";
import { EvaluationPanel } from "./components/EvaluationPanel";
import { AppHeader } from "./components/Header";
import { AppFooter } from "./components/Footer";
import { ComparisonView } from "./components/ComparisonView";
import { LeftPanel } from "./components/LeftPanel";
import { PERSONA_CONFIG } from "./constants";

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Chat);

  // --- Shared State ---
  const [isComparing, setIsComparing] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({
    messageCount: 0,
    totalQualityScore: 0,
    totalResponseTime: 0,
    totalTokenUsage: 0,
  });

  // --- Chat Mode State ---
  const [currentPersona, setCurrentPersona] = useState<Persona>(Persona.Hitesh);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatEvaluation, setChatEvaluation] = useState<GenerationResult | null>(
    null
  );
  const [chatInput, setChatInput] = useState("");

  // --- Comparison Mode State ---
  const [comparisonState, setComparisonState] = useState<ComparisonState>({});
  const [lastComparisonEval, setLastComparisonEval] =
    useState<GenerationResult | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");

  const getInitialMessage = () => ({
    id: "initial-welcome",
    role: Role.Model,
    text: "Hey there! Welcome to another exciting coding session! ☕\n\nSelect a persona and ask a question to get started.",
  });

  const resetChat = useCallback(() => {
    setMessages([]);
    setChatEvaluation(null);
    setChatInput("");
  }, []);

  useState(() => {
    // Set initial message only once
    setMessages([getInitialMessage()]);
  });

  const updatePerformanceStats = useCallback(
    (...evaluations: GenerationResult[]) => {
      setPerformanceStats((prev) => {
        const newMessages = evaluations.length;
        const newQuality = evaluations.reduce(
          (sum, e) => sum + e.overallQuality,
          0
        );
        const newTime = evaluations.reduce((sum, e) => sum + e.responseTime, 0);
        const newTokens = evaluations.reduce((sum, e) => sum + e.tokenUsage, 0);
        return {
          messageCount: prev.messageCount + newMessages,
          totalQualityScore: prev.totalQualityScore + newQuality,
          totalResponseTime: prev.totalResponseTime + newTime,
          totalTokenUsage: prev.totalTokenUsage + newTokens,
        };
      });
    },
    []
  );

  const handlePersonaChange = (persona: Persona) => {
    if (isChatLoading) return;
    setCurrentPersona(persona);
    // Keep initial message if chat is empty
    if (
      messages.length > 1 ||
      (messages.length === 1 && messages[0].id !== "initial-welcome")
    ) {
      resetChat();
      setMessages([getInitialMessage()]);
    }
  };

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: Role.User,
        text,
      };
      const currentMessages =
        messages[0]?.id === "initial-welcome" ? [] : messages;

      setMessages([...currentMessages, userMessage]);
      setChatInput("");
      setIsChatLoading(true);
      setChatEvaluation(null);

      const { responseText, evaluation } = await generateResponse(
        text,
        currentPersona
      );

      updatePerformanceStats(evaluation);
      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: Role.Model,
        text: responseText,
        evaluation,
      };

      setMessages((prev) => [...prev, modelMessage]);
      setChatEvaluation(evaluation);
      setIsChatLoading(false);
    },
    [currentPersona, messages, updatePerformanceStats]
  );

  const handleToggleViewMode = () => {
    setViewMode((prev) =>
      prev === ViewMode.Chat ? ViewMode.Comparison : ViewMode.Chat
    );
  };

  const handleRunComparison = async (question: string) => {
    setIsComparing(true);
    setCurrentQuestion(question);
    setLastComparisonEval(null);
    setComparisonState({
      [Persona.Hitesh]: { text: "", isLoading: true },
      [Persona.Piyush]: { text: "", isLoading: true },
    });

    const [hiteshResult, piyushResult] = await Promise.all([
      generateResponse(question, Persona.Hitesh),
      generateResponse(question, Persona.Piyush),
    ]);

    updatePerformanceStats(hiteshResult.evaluation, piyushResult.evaluation);

    setComparisonState({
      [Persona.Hitesh]: {
        text: hiteshResult.responseText,
        isLoading: false,
        evaluation: hiteshResult.evaluation,
      },
      [Persona.Piyush]: {
        text: piyushResult.responseText,
        isLoading: false,
        evaluation: piyushResult.evaluation,
      },
    });

    setLastComparisonEval(piyushResult.evaluation); // Show eval of the last one to finish
    setIsComparing(false);
  };

  const handleSelectQuestion = (question: string) => {
    if (viewMode === ViewMode.Chat) {
      setChatInput(question);
    } else {
      handleRunComparison(question);
    }
  };

  const handleExport = () => {
    let content = "";
    let filename = "";
    const timestamp = new Date().toLocaleString();

    if (viewMode === ViewMode.Chat) {
      const personaName = PERSONA_CONFIG[currentPersona].name;
      filename = `chat_with_${personaName.replace(" ", "_")}_${Date.now()}.txt`;
      content = `LLM Persona Project - Chat Export\n`;
      content += `Persona: ${personaName}\n`;
      content += `Date: ${timestamp}\n`;
      content += `--------------------------------------\n\n`;

      messages.forEach((msg) => {
        if (msg.id === "initial-welcome") return;

        const prefix = msg.role === Role.User ? "You" : personaName;
        content += `[${prefix}]: ${msg.text}\n`;

        if (msg.role === Role.Model && msg.evaluation) {
          content += `  (Judge Score: ${msg.evaluation.overallQuality}%, Authenticity: ${msg.evaluation.personaAuthenticity}%, Tone: ${msg.evaluation.toneAccuracy}%)\n`;
          content += `  (Judge Feedback: ${msg.evaluation.reason})\n`;
        }
        content += "\n";
      });
    } else {
      // Comparison Mode
      filename = `comparison_on_${currentQuestion
        .substring(0, 15)
        .replace(" ", "_")}_${Date.now()}.txt`;
      content = `LLM Persona Project - Comparison Export\n`;
      content += `Question: "${currentQuestion}"\n`;
      content += `Date: ${timestamp}\n`;
      content += `------------------------------------------\n\n`;

      (Object.keys(comparisonState) as Persona[]).forEach((p) => {
        const personaName = PERSONA_CONFIG[p].name;
        const data = comparisonState[p];
        content += `--- ${personaName} ---\n`;
        content += `Response: ${data?.text || "N/A"}\n`;
        if (data?.evaluation) {
          content += `  Judge Score: ${data.evaluation.overallQuality}%\n`;
          content += `  Feedback: ${data.evaluation.reason}\n`;
        }
        content += "\n";
      });
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (viewMode === ViewMode.Chat) {
      setMessages([getInitialMessage()]);
      setChatEvaluation(null);
      setChatInput("");
    } else {
      setComparisonState({});
      setCurrentQuestion("");
    }
    // Reset stats for both
    setPerformanceStats({
      messageCount: 0,
      totalQualityScore: 0,
      totalResponseTime: 0,
      totalTokenUsage: 0,
    });
    setLastComparisonEval(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans antialiased p-2 sm:p-4 gap-4">
      <AppHeader viewMode={viewMode} onToggleViewMode={handleToggleViewMode} />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 overflow-y-auto">
        <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-auto min-h-[50vh] sm:min-h-[60vh] lg:min-h-0">
          <LeftPanel
            viewMode={viewMode}
            currentPersona={currentPersona}
            onPersonaChange={handlePersonaChange}
            isLoading={isChatLoading || isComparing}
            onSelectQuestion={handleSelectQuestion}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-5 bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden flex flex-col min-h-[60vh] sm:min-h-[70vh] lg:min-h-0">
          {viewMode === ViewMode.Chat ? (
            <ChatPanel
              messages={messages}
              currentPersona={currentPersona}
              isLoading={isChatLoading}
              onSendMessage={handleSendMessage}
              chatInput={chatInput}
              setChatInput={setChatInput}
            />
          ) : (
            <ComparisonView
              comparisonState={comparisonState}
              currentQuestion={currentQuestion}
              onSendMessage={handleRunComparison}
              isLoading={isComparing}
            />
          )}
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-3 bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-auto">
          <EvaluationPanel
            viewMode={viewMode}
            isLoading={viewMode === ViewMode.Chat ? isChatLoading : isComparing}
            chatEvaluation={chatEvaluation}
            lastComparisonEval={lastComparisonEval}
            performanceStats={performanceStats}
          />
        </div>
      </main>
      <AppFooter
        onReset={handleReset}
        onExport={handleExport}
        viewMode={viewMode}
      />
    </div>
  );
};

export default App;
