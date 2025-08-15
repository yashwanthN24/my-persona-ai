import React from 'react';
import { SendIcon } from './icons';

interface ChatInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onValueChange, onSendMessage, isLoading }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSendMessage(value.trim());
    }
  };

  return (
    <div className="p-4 bg-gray-800/50 border-t border-gray-700/50">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Ask a coding question..."
          disabled={isLoading}
          className="flex-1 bg-gray-900 text-white placeholder-gray-500 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 disabled:bg-orange-900 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500"
          aria-label="Send message"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};
