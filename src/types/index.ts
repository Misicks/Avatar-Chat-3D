// Tipos para el sistema de chat y avatar 3D

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  sendMessage: (content: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type AvatarAnimation = 'idle' | 'talking' | 'thinking';

export interface AvatarState {
  animation: AvatarAnimation;
  setAnimation: (animation: AvatarAnimation) => void;
}
