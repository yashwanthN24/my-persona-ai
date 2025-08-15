import React from 'react';
import { Persona, ViewMode } from '../types';
import { PERSONA_CONFIG, SAMPLE_QUESTIONS } from '../constants';

interface PersonaCardProps {
  persona: Persona;
  isActive: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, isActive, onClick, isDisabled }) => {
  const config = PERSONA_CONFIG[persona];

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full text-left p-4 rounded-xl transition-all duration-300 border-2 ${
        isActive
          ? 'bg-gray-700/50 border-orange-500 shadow-lg shadow-orange-500/10'
          : 'bg-gray-800 border-gray-700 hover:bg-gray-700/70 hover:border-gray-600'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-pressed={isActive}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-500/20 text-2xl flex-shrink-0">
          {config.avatar}
        </div>
        <div>
          <h3 className="font-bold text-white">{config.name}</h3>
          <p className="text-sm text-gray-400">{config.tagline}</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 mt-3">{config.description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {config.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs font-medium bg-gray-600/50 text-gray-300 rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
};

interface SampleQuestionsProps {
    onSelectQuestion: (question: string) => void;
    isLoading: boolean;
}

const SampleQuestions: React.FC<SampleQuestionsProps> = ({ onSelectQuestion, isLoading }) => {
    return (
        <div className="p-4">
            <h3 className="text-md font-semibold text-gray-200 mb-3">Sample Questions</h3>
            <div className="space-y-2">
                {SAMPLE_QUESTIONS.map((question, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectQuestion(question)}
                        disabled={isLoading}
                        className="w-full text-left p-3 rounded-lg bg-gray-900/50 border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <p className="text-sm text-gray-300">{question}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

interface LeftPanelProps {
  viewMode: ViewMode;
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
  isLoading: boolean;
  onSelectQuestion: (question: string) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ viewMode, currentPersona, onPersonaChange, isLoading, onSelectQuestion }) => {
  const isPersonaSelectionDisabled = isLoading || viewMode === ViewMode.Comparison;

  return (
    <div className="h-full flex flex-col custom-scrollbar overflow-y-auto">
      <div className="p-4 border-b border-gray-700/50">
        <h2 className="text-lg font-bold text-white">Controls</h2>
      </div>
      <div className="p-4 space-y-4">
         <h3 className="text-md font-semibold text-gray-200">Select AI Persona</h3>
        {(Object.keys(PERSONA_CONFIG) as Persona[]).map((persona) => (
          <PersonaCard
            key={persona}
            persona={persona}
            isActive={currentPersona === persona}
            onClick={() => onPersonaChange(persona)}
            isDisabled={isPersonaSelectionDisabled}
          />
        ))}
        {isPersonaSelectionDisabled && viewMode === ViewMode.Comparison && (
            <p className="text-xs text-center text-gray-400">Persona selection is disabled in Comparison Mode.</p>
        )}
      </div>
       <div className="border-t border-gray-700/50">
        <SampleQuestions onSelectQuestion={onSelectQuestion} isLoading={isLoading} />
      </div>
    </div>
  );
};
