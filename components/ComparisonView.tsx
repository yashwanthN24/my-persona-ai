import React, { useState } from "react";
import { Persona, ComparisonState } from "../types";
import { PERSONA_CONFIG } from "../constants";
import { SendIcon } from "./icons";
import { FormattedText } from "./FormattedText";

const LoadingDots: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex items-center space-x-2">
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  </div>
);

interface ComparisonColumnProps {
  persona: Persona;
  data?: ComparisonState[Persona];
}

const ComparisonColumn: React.FC<ComparisonColumnProps> = ({
  persona,
  data,
}) => {
  const config = PERSONA_CONFIG[persona];
  return (
    <div className="flex-1 flex flex-col bg-gray-900/50 rounded-lg p-4 min-w-0">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-500/20 text-xl flex-shrink-0">
          {config.avatar}
        </div>
        <h3 className="font-bold text-white">{config.name}</h3>
      </div>
      <div className="flex-1 bg-gray-900 rounded-md p-3 text-sm text-gray-300 leading-relaxed custom-scrollbar overflow-y-auto min-h-[150px]">
        {data?.isLoading ? (
          <LoadingDots />
        ) : data?.text ? (
          <p className="whitespace-pre-wrap">
            <FormattedText text={data.text} />
          </p>
        ) : (
          <span className="text-gray-500">
            Click a sample question or type a prompt below to see {config.name}
            's response...
          </span>
        )}
      </div>
    </div>
  );
};

interface ComparisonInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ComparisonInput: React.FC<ComparisonInputProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };
  return (
    <div className="p-4 bg-gray-800/50 border-t border-gray-700/50">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a prompt to compare personas..."
          disabled={isLoading}
          className="flex-1 bg-gray-900 text-white placeholder-gray-500 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          aria-label="Comparison input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 disabled:bg-orange-900 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500"
          aria-label="Send comparison message"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

interface ComparisonViewProps {
  comparisonState: ComparisonState;
  currentQuestion: string;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  comparisonState,
  currentQuestion,
  onSendMessage,
  isLoading,
}) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4">
        <div className="pb-4 border-b border-gray-700/50">
          <h2 className="text-lg font-bold text-white">Persona Comparison</h2>
          {currentQuestion && (
            <p className="text-sm text-gray-400 mt-1 truncate">
              Showing results for: "{currentQuestion}"
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full  h-full md:flex-row gap-4 overflow-hidden px-4">
        <ComparisonColumn
          persona={Persona.Hitesh}
          data={comparisonState[Persona.Hitesh]}
        />
        <ComparisonColumn
          persona={Persona.Piyush}
          data={comparisonState[Persona.Piyush]}
        />
      </div>
      <ComparisonInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};
