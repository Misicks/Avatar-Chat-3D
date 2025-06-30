'use client';
import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

// Input de chat base, diseño tipo Claude
interface ChatInputProps {
  autoFocus?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ autoFocus }) => {
  const { sendMessage, isLoading } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize del textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  // Manejar envío de mensaje
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = textareaRef.current?.value.trim();
    if (value) {
      await sendMessage(value);
      if (textareaRef.current) {
        textareaRef.current.value = '';
        // Forzar el reset de altura inmediatamente
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = '40px';
      }
    }
  };

  // Auto-resize al escribir
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <form className="w-full flex items-end p-3 border-t border-gray-200 bg-white gap-2" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-400 text-gray-700 transition-all duration-200 hover:border-orange-300 focus:shadow-lg focus:bg-orange-50 will-change-transform resize-none overflow-hidden min-h-[40px]"
        placeholder="Escribe tu mensaje aquí..."
        disabled={isLoading}
        autoFocus={autoFocus}
        onInput={handleInput}
        rows={1}
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-200 disabled:opacity-60 will-change-transform"
        disabled={isLoading}
      >
        <Send size={18} className="text-white" />
      </button>
    </form>
  );
};

export default ChatInput;
