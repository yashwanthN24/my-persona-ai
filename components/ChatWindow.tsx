import React, { useEffect, useRef } from 'react';
import { ChatMessage, Persona } from '../types';
import { Message } from './Message';
import { PERSONA_CONFIG } from '../constants';

interface ChatHeaderProps {
  currentPersona: Persona;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ currentPersona }) => {
  const persona = PERSONA_CONFIG[currentPersona];
  return (
    <div className="absolute top-0 left-0 right-0 p-2 sm:p-4 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 z-10">
        <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500 text-xl">
                {persona.avatar}
            </div>
            <div>
                <h2 className="font-bold text-white">{persona.name}</h2>
                <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Active</span>
            </div>
        </div>
    </div>
  );
};

interface ChatWindowProps {
  messages: ChatMessage[];
  currentPersona: Persona;
  isLoading: boolean;
}

const TypingIndicator: React.FC<{ currentPersona: Persona }> = ({ currentPersona }) => {
  const persona = PERSONA_CONFIG[currentPersona];
  return (
    <div className="flex items-end gap-3 my-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500 text-xl flex-shrink-0">
            {persona.avatar}
        </div>
        <div className="bg-gray-700 text-white px-4 py-3 rounded-2xl rounded-bl-none shadow-md flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
    </div>
  );
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentPersona, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="relative flex-1 min-h-0">
        <ChatHeader currentPersona={currentPersona} />
        <div className="pt-24 pb-4 px-4 lg:px-6 h-full overflow-y-auto custom-scrollbar">
            {messages.length === 0 && !isLoading && (
                 <div className="text-center text-gray-400 mt-8">
                    <p className="text-lg">Welcome!</p>
                    <p>Select a persona and ask a question to get started.</p>
                </div>
            )}
            {messages.map((msg) => (
                <Message key={msg.id} message={msg} currentPersona={currentPersona} />
            ))}
            {isLoading && <TypingIndicator currentPersona={currentPersona} />}
            <div ref={messagesEndRef} />
        </div>
    </div>
  );
};