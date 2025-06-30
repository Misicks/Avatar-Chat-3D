'use client';
import React from 'react';

const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-2 mt-2 animate-fadein  m-4">
    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0s]"></span>
    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
    <span className="text-xs text-gray-400 ml-2">IA escribiendo...</span>
  </div>
);

export default TypingIndicator; 