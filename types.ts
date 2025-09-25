export enum Persona {
  Yashwanth = "Yashwanth",
}

export enum Role {
  User = "user",
  Model = "model",
}

export enum ViewMode {
  Chat = "Chat",
}

export interface GenerationResult {
  responseTime: number;
  tokenUsage: number;
}

export interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  isStreaming?: boolean;
}
