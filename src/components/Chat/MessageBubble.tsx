'use client';
import React, { useState, useEffect } from 'react';
import { Message } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');

  // Mostrar texto completo sin typing effect
  useEffect(() => {
    if (message) {
      setDisplayedText(message.content);
    }
  }, [message?.content]);

  // Verificación de seguridad para evitar errores si message es undefined
  if (!message) {
    return null;
  }

  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[380px] px-4 py-3 rounded-2xl break-words ${
          isUser
            ? 'bg-orange-500 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-800 rounded-bl-md'
        }`}
      >
        <div className="text-sm leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Personalizar estilos para diferentes elementos
              h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
              h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
              h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
              p: ({children}) => <p className="mb-2">{children}</p>,
              ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
              li: ({children}) => <li className="ml-2">{children}</li>,
              code: ({children, className}) => {
                const isInline = !className;
                if (isInline) {
                  return <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">{children}</code>;
                }
                return (
                  <pre className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                    <code>{children}</code>
                  </pre>
                );
              },
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2">
                  {children}
                </blockquote>
              ),
              a: ({children, href}) => (
                <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              strong: ({children}) => <strong className="font-bold">{children}</strong>,
              em: ({children}) => <em className="italic">{children}</em>,
            }}
          >
            {displayedText}
          </ReactMarkdown>
          {/* Cursor de typing removido - el efecto de palabras es suficiente */}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
