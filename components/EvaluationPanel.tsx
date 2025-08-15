import React, { useEffect, useState } from 'react';
import { GenerationResult, PerformanceStats, ViewMode } from '../types';
import { JudgeIcon } from "./icons";
import { FormattedText } from "./FormattedText";

interface MetricBarProps {
  label: string;
  score: number;
  isLoading: boolean;
}

const MetricBar: React.FC<MetricBarProps> = ({ label, score, isLoading }) => {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        if (!isLoading) {
            setDisplayScore(score);
        }
    }, [score, isLoading]);
    
    const getBarColor = (value: number) => {
        if (value < 40) return 'bg-red-500';
        if (value < 75) return 'bg-yellow-500';
        return 'bg-green-500';
    }

    return (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                <span className="text-sm font-semibold text-white">
                    {isLoading ? '--' : `${displayScore}%`}
                </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                    className={`h-2 rounded-full transition-all duration-700 ease-out ${getBarColor(displayScore)}`}
                    style={{ width: `${isLoading ? 0 : displayScore}%`}}
                ></div>
            </div>
        </div>
    );
};

const OverallQualityCard: React.FC<{ evaluation: GenerationResult | null, isLoading: boolean, title: string }> = ({ evaluation, isLoading, title }) => {
    const overallColor = (value: number) => {
        if (value < 40) return 'bg-red-600/20 text-red-400 border-red-500/50';
        if (value < 75) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
        return 'bg-green-500/20 text-green-400 border-green-500/50';
    }
    const quality = evaluation?.overallQuality ?? 0;
    const reason = evaluation?.reason ?? 'Awaiting analysis...';
    const isIdle = !evaluation && !isLoading;

    return (
      <div
        className={`p-4 rounded-lg border ${
          isIdle
            ? "bg-gray-700/30 text-gray-400 border-gray-600"
            : overallColor(quality)
        }`}
      >
        <h3 className="font-bold">{title}</h3>
        <p className="text-3xl font-bold mt-1">
          {isIdle ? "--" : `${quality}%`}
        </p>
        <div className="text-xs mt-2 opacity-80 h-8 overflow-y-auto custom-scrollbar">
          <FormattedText text={isIdle ? "Awaiting analysis..." : reason} />
        </div>
      </div>
    );
};

const StatCard: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
    <div className="bg-gray-900/50 p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400">{label}</div>
        <div className="text-lg font-bold text-white">{value}</div>
    </div>
);

interface EvaluationPanelProps {
  viewMode: ViewMode;
  isLoading: boolean;
  chatEvaluation: GenerationResult | null;
  lastComparisonEval: GenerationResult | null;
  performanceStats: PerformanceStats;
}

export const EvaluationPanel: React.FC<EvaluationPanelProps> = (props) => {
    const { viewMode, isLoading, chatEvaluation, lastComparisonEval, performanceStats } = props;

    const avgQuality = performanceStats.messageCount > 0 ? Math.round(performanceStats.totalQualityScore / performanceStats.messageCount) : '--';
    const avgResponseTime = performanceStats.messageCount > 0 ? `${Math.round(performanceStats.totalResponseTime / performanceStats.messageCount)} ms` : '--';
    
    const lastResponseTime = viewMode === ViewMode.Chat 
        ? chatEvaluation?.responseTime 
        : lastComparisonEval?.responseTime;

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
        <JudgeIcon className="w-10 h-10" />
        <h2 className="text-lg font-bold text-white">AI Judge Evaluation</h2>
      </div>

      <div className="flex-1 py-4 custom-scrollbar overflow-y-auto space-y-6">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isLoading ? "bg-yellow-500 animate-pulse" : "bg-green-500"
            }`}
          ></div>
          <span className="text-sm font-medium text-gray-300">
            {isLoading ? "Analyzing..." : "Real-time Analysis"}
          </span>
        </div>

        {viewMode === ViewMode.Chat && (
          <>
            <OverallQualityCard
              evaluation={chatEvaluation}
              isLoading={isLoading}
              title="Last Message Quality"
            />
            <div>
              <h3 className="text-md font-semibold text-gray-200 mb-4">
                Quality Metrics
              </h3>
              <div className="space-y-4">
                <MetricBar
                  label="Persona Authenticity"
                  score={chatEvaluation?.personaAuthenticity ?? 0}
                  isLoading={isLoading || !chatEvaluation}
                />
                <MetricBar
                  label="Tone Accuracy"
                  score={chatEvaluation?.toneAccuracy ?? 0}
                  isLoading={isLoading || !chatEvaluation}
                />
                <MetricBar
                  label="Content Relevance"
                  score={chatEvaluation?.contentRelevance ?? 0}
                  isLoading={isLoading || !chatEvaluation}
                />
              </div>
            </div>
          </>
        )}

        {viewMode === ViewMode.Comparison && (
          <>
            <OverallQualityCard
              evaluation={lastComparisonEval}
              isLoading={isLoading}
              title="Last Comparison Quality"
            />
            <div>
              <h3 className="text-md font-semibold text-gray-200 mb-3">
                Judge Feedback
              </h3>
              <div className="bg-gray-900/50 p-3 rounded-lg text-sm text-gray-300 h-24 overflow-y-auto custom-scrollbar">
                <FormattedText
                  text={
                    lastComparisonEval?.reason ||
                    "Run a comparison to see AI judge evaluation..."
                  }
                />
              </div>
            </div>
          </>
        )}

        <div>
          <h3 className="text-md font-semibold text-gray-200 mb-3">
            Performance Analytics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Last Response"
              value={lastResponseTime ? `${lastResponseTime} ms` : "--"}
            />
            <StatCard label="Avg Response" value={avgResponseTime} />
            <StatCard label="Messages" value={performanceStats.messageCount} />
            <StatCard
              label="Avg Quality"
              value={avgQuality === "--" ? avgQuality : `${avgQuality}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
