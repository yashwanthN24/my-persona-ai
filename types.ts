export enum Persona {
  Hitesh = 'Hitesh',
  Piyush = 'Piyush',
}

export enum Role {
  User = 'user',
  Model = 'model',
}

export enum ViewMode {
  Chat = 'Chat',
  Comparison = 'Comparison',
}

export interface EvaluationResult {
  personaAuthenticity: number;
  toneAccuracy: number;
  contentRelevance: number;
  overallQuality: number;
  pass: boolean;
  reason: string;
}

export interface GenerationResult extends EvaluationResult {
  responseTime: number;
  tokenUsage: number; 
}

export interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  evaluation?: GenerationResult;
}

export interface JudgeResponse {
  pass: boolean;
  reason: string;
  personaAuthenticity: number;
  toneAccuracy: number;
  contentRelevance: number;
  overallQuality: number;
}

export type ComparisonState = {
  [key in Persona]?: {
    text: string;
    isLoading: boolean;
    evaluation?: GenerationResult;
  }
};

export interface PerformanceStats {
  messageCount: number;
  totalResponseTime: number;
  totalQualityScore: number;
  totalTokenUsage: number;
}
