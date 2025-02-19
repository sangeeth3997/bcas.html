export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatMessage {
  messages: Message[];
  loading?: boolean;
}