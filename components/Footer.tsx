import React from "react";
import { ExportIcon, ResetIcon } from "./icons";
import { ViewMode } from "../types";

interface AppFooterProps {
  onReset: () => void;
  onExport: () => void;
  viewMode: ViewMode;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  onReset,
  onExport,
  viewMode,
}) => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-center sm:text-left text-gray-500">
        <span className="font-semibold text-white">Samrat</span> — Powered by
        Advanced LLM Technology with Real-time Judge Evaluation
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 text-white text-sm font-semibold rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
        >
          <ExportIcon className="w-4 h-4" />
          Export
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 text-white text-sm font-semibold rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
        >
          <ResetIcon className="w-4 h-4" />
          {viewMode === ViewMode.Chat ? "Reset Chat" : "Reset Comparison"}
        </button>
      </div>
    </footer>
  );
};
