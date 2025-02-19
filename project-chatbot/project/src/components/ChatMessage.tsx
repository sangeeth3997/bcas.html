import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`py-5 ${isBot ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto flex gap-4 px-4">
        <div className="w-8 h-8 flex items-center justify-center rounded bg-gradient-to-r from-blue-600 to-blue-700">
          {isBot ? (
            <Bot className="w-5 h-5 text-white" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-medium text-sm text-gray-900">
            {isBot ? 'A-X-L' : 'You'}
          </p>
          <div className="prose prose-sm max-w-none">
            <p>{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}