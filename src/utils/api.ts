// API unificada que usa Gemini cuando está disponible, mock cuando no
import type { AvatarAnimation } from '@/types';
import { sendGeminiMessage, isGeminiConfigured } from './gemini';

export interface ChatApiResponse {
  response: string;
  timestamp: number;
  animation?: AvatarAnimation;
}

// Mock API para cuando Gemini no está configurado
async function sendMockMessage(message: string): Promise<ChatApiResponse> {
  // Simula latencia de red
  await new Promise((res) => setTimeout(res, 1200));

  // Lógica de respuesta mock
  let response = '';
  let animation: AvatarAnimation = 'talking';
  const lower = message.toLowerCase();

  if (lower.includes('hola')) {
    response = '¡Hola! ¿En qué puedo ayudarte hoy?';
  } else if (lower.includes('quién eres')) {
    response = 'Soy tu asistente IA 3D, listo para conversar contigo.';
  } else if (lower.includes('hora')) {
    response = `La hora actual es ${new Date().toLocaleTimeString()}`;
  } else if (lower.includes('adiós')) {
    response = '¡Hasta luego! Si necesitas algo más, aquí estaré.';
    animation = 'idle';
  } else {
    response = 'Esta es una respuesta simulada. ¡Pronto seré más inteligente!';
  }

  // Simula error aleatorio (5%)
  if (Math.random() < 0.05) {
    throw new Error('Error de red simulado');
  }

  return {
    response,
    timestamp: Date.now(),
    animation,
  };
}

// Función principal que decide entre Gemini y Mock
export async function sendChatMessage(message: string): Promise<ChatApiResponse> {
  try {
    // Intentar usar Gemini si está configurado
    if (isGeminiConfigured()) {
      return await sendGeminiMessage(message);
    } else {
      // Usar mock si Gemini no está configurado
      return await sendMockMessage(message);
    }
  } catch (error) {
    console.error('Error en sendChatMessage:', error);
    // Fallback a mock si Gemini falla
    return await sendMockMessage(message);
  }
}
