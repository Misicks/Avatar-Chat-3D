import { create } from 'zustand';
import type { ChatState, Message } from '@/types';
import { sendChatMessage } from '@/utils/api';

// Utilidad para persistir en sessionStorage
const CHAT_KEY = 'chat-messages';

function loadMessages(): Message[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = sessionStorage.getItem(CHAT_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: Message[]) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  } catch {}
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  addMessage: (message: Message) => {
    set((state) => {
      const updated = [...state.messages, message];
      saveMessages(updated);
      return { messages: updated };
    });
  },
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  sendMessage: async (content: string) => {
    set({ isLoading: true, error: null });
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };
    get().addMessage(userMessage);
    try {
      const res = await sendChatMessage(content);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: res.response,
        role: 'assistant',
        timestamp: res.timestamp,
      };
      get().addMessage(aiMessage);
      set({ isLoading: false });
    } catch (e: any) {
      set({ error: 'Error al enviar mensaje', isLoading: false });
    }
  },
}));

// Hidratar mensajes desde sessionStorage al cargar en cliente
if (typeof window !== 'undefined') {
  const messages = loadMessages();
  if (messages.length) {
    useChatStore.setState({ messages });
  }
}
