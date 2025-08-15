import React from "react";
import { ChaiCodeIcon, ComparisonIcon, ChatIcon } from "./icons";
import { ViewMode } from "../types";

interface AppHeaderProps {
  viewMode: ViewMode;
  onToggleViewMode: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  viewMode,
  onToggleViewMode,
}) => {
  const isChatMode = viewMode === ViewMode.Chat;

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <ChaiCodeIcon className="w-11 h-11 rounded-full " />
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            Chai Code Persona AI
          </h1>
          <p className="text-sm text-gray-400 hidden md:block">
            AI Teaching Assistants with Real-time Judge Evaluation
          </p>
        </div>
      </div>
      <button
        onClick={onToggleViewMode}
        className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 text-white font-semibold rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors flex-shrink-0"
      >
        {isChatMode ? (
          <ComparisonIcon className="w-5 h-5" />
        ) : (
          <ChatIcon className="w-5 h-5" />
        )}
        <span className="hidden sm:inline">
          {isChatMode ? "Comparison Mode" : "Chat Mode"}
        </span>
      </button>
    </header>
  );
};
