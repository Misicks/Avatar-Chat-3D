import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useChat } from '@/hooks/useChat';
import TypingIndicator from './TypingIndicator';

// Componente principal de la interfaz de chat
const ChatInterface: React.FC = () => {
  const { isLoading, error } = useChat();

  return (
    <div className="flex flex-col min-h-[400px] bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
      {/* Lista de mensajes */}
      <div className="flex-1 p-4">
        <MessageList />
      </div>
      {/* Input de chat */}
      {isLoading && <TypingIndicator />}
      <ChatInput />
      {/* Error de red */}
      {error && (
        <div className="flex items-center justify-center py-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
