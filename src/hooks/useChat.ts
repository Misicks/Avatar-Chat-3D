import { useCallback } from 'react';
import { useChatStore } from '@/stores/chatStore';

// Hook para acceder y manipular el estado del chat
export function useChat() {
  const { messages, isLoading, error, addMessage, sendMessage, setLoading, setError } = useChatStore();
  
  // Log removido para mejor rendimiento

  // Enviar mensaje con manejo de errores
  const handleSendMessage = useCallback(async (content: string) => {
    try {
      setLoading(true);
      await sendMessage(content);
      setLoading(false);
    } catch {
      setError('Error al enviar mensaje');
      setLoading(false);
    }
  }, [sendMessage, setLoading, setError]);

  return {
    messages,
    isLoading,
    error,
    addMessage,
    sendMessage: handleSendMessage,
    setLoading,
    setError,
  };
}
