'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import { useChat } from '@/hooks/useChat';

// Formatea el timestamp a hora legible
function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}



// Lista de mensajes con scroll automático y timestamp
const MessageList: React.FC = () => {
  const { messages } = useChat();
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);

  // Detectar si el usuario está al fondo
  const checkIfAtBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return true;
    const threshold = 50; // Reducir tolerancia para ser más preciso
    return (
      container.scrollHeight - container.scrollTop - container.clientHeight < threshold
    );
  }, []);

  // Actualizar el ref cuando el usuario hace scroll
  const handleScroll = () => {
    const wasAtBottom = isAtBottomRef.current;
    isAtBottomRef.current = checkIfAtBottom();
    
    // Si el usuario scrolleó hacia arriba, detener cualquier scroll automático
    if (wasAtBottom && !isAtBottomRef.current) {
      console.log('Usuario scrolleó hacia arriba - deteniendo scroll automático');
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [checkIfAtBottom, handleScroll]);

  // Efecto para manejar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      // Recalcular si está al fondo después de cambios de tamaño
      setTimeout(() => {
        isAtBottomRef.current = checkIfAtBottom();
        if (isAtBottomRef.current) {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIfAtBottom]);

  // Scroll automático optimizado
  useEffect(() => {
    // Siempre hacer scroll en el primer mensaje
    if (messages.length === 1) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    // Para mensajes adicionales, solo si está al fondo
    if (isAtBottomRef.current) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200); // Delay más largo para evitar scroll excesivo
    }
  }, [messages.length]);

  // Efecto para forzar scroll al fondo cuando aparece el chat (transición de pantalla)
  useEffect(() => {
    if (messages.length > 0) {
      // Forzar scroll al fondo después de un delay para permitir que el DOM se actualice
      const timer = setTimeout(() => {
        const container = containerRef.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [messages.length]);

  // Scroll simple al final cuando llega un nuevo mensaje
  useEffect(() => {
    if (messages.length > 0 && isAtBottomRef.current) {
      // Scroll suave al final cuando llega un nuevo mensaje
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-white min-h-[200px]"
    >
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col items-start">
          <MessageBubble message={msg} />
          <span className="text-xs text-gray-400 ml-2 mt-1">{formatTime(msg.timestamp)}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
