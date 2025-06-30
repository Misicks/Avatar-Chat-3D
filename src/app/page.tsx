'use client';
import React, { useRef, useEffect, useState } from 'react';
import ChatInterface from '@/components/Chat/ChatInterface';
import Avatar3D from '@/components/Avatar/Avatar3D';
import { useChat } from '@/hooks/useChat';
import { Send } from 'lucide-react';


export default function HomePage() {
  const { messages, sendMessage, isLoading } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSplit, setShowSplit] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Verificar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detectar transición a conversación activa
  useEffect(() => {
    if (isClient && messages.some((m) => m.role === 'assistant')) {
      setTimeout(() => setShowSplit(true), 100); // delay para animación
    }
  }, [messages, isClient]);

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
        textareaRef.current.style.height = 'auto';
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

  // No renderizar nada hasta que estemos en el cliente
  if (!isClient) {
    return (
      <main className="flex flex-1 items-center justify-center min-h-[60vh] w-full pt-8">
        <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-8 p-4 mt-4">
          <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center min-h-[60vh] w-full pt-8">
      {/* Estado inicial: solo input centrado */}
      {!showSplit ? (
        <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-8 p-4 mt-4">
          <form className="w-full flex items-end gap-2" onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-400 text-gray-700 transition-all duration-200 hover:border-orange-300 focus:shadow-lg focus:bg-orange-50 will-change-transform resize-none overflow-hidden min-h-[40px] max-h-[800px]"
              placeholder="Escribe tu mensaje aquí..."
              disabled={isLoading}
              autoFocus
              onInput={handleInput}
              rows={1}
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-200 disabled:opacity-60 will-change-transform"
              disabled={isLoading}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        // Pantalla dividida: chat y avatar
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl p-2 md:p-6 transition-all duration-700 ease-in-out">
          {/* Área de chat */}
          <div className="w-full md:w-1/2 flex flex-col">
            <ChatInterface />
          </div>
          {/* Área de avatar 3D */}
          <div className="w-full h-96 fixed top-10 right-0 hidden md:block md:w-1/2 flex items-center justify-center">
            <Avatar3D />
          </div>
        </div>
      )}
    </main>
  );
}

// Animación fadein
// Agrega en globals.css:
// @keyframes fadein { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
// .animate-fadein { animation: fadein 0.7s cubic-bezier(.4,0,.2,1) both; }
