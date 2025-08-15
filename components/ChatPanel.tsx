import React from 'react';
import { ChatMessage, Persona } from '../types';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  messages: ChatMessage[];
  currentPersona: Persona;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  chatInput: string;
  setChatInput: (value: string) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = (props) => {
  return (
    <div className="flex flex-col w-full  h-full bg-gray-800 rounded-2xl">
      <ChatWindow
        messages={props.messages}
        currentPersona={props.currentPersona}
        isLoading={props.isLoading}
      />
      <ChatInput
        value={props.chatInput}
        onValueChange={props.setChatInput}
        onSendMessage={props.onSendMessage}
        isLoading={props.isLoading}
      />
    </div>
  );
};
