import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Configuración de Gemini
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

console.log('🔍 Debug - NODE_ENV:', process.env.NODE_ENV);
console.log('🔍 Debug - API_KEY length:', API_KEY.length);
console.log('🔍 Debug - API_KEY starts with:', API_KEY.substring(0, 10));
console.log('🔍 Debug - All env vars:', Object.keys(process.env).filter(key => key.includes('GEMINI')));

if (!API_KEY) {
  console.warn('⚠️ NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY no está configurada. Usando mock API.');
  console.warn('🔍 Debug - Available env vars with NEXT_PUBLIC:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')));
}

// Inicializar Gemini
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface GeminiResponse {
  response: string;
  timestamp: number;
  animation?: 'idle' | 'talking' | 'thinking';
}

// Configuración de seguridad para el contenido
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function sendGeminiMessage(message: string): Promise<GeminiResponse> {
  // Si no hay API key, usar mock
  if (!genAI || !API_KEY) {
    throw new Error('API key no configurada');
  }

  console.log('🔑 API Key configurada:', API_KEY.substring(0, 10) + '...');
  console.log('📝 Mensaje a enviar:', message);

  try {
    // Obtener el modelo - usar gemini-1.5-flash que sabemos que funciona
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('✅ Usando modelo: gemini-1.5-flash');

    // Prompt del sistema para el avatar 3D
    const systemPrompt = `Eres un asistente IA amigable y útil que conversa con usuarios. 
    Responde de manera natural, conversacional y útil. 
    Mantén las respuestas concisas pero informativas.
    Responde en español.
    
    IMPORTANTE: Cuando sea apropiado, usa Markdown para mejorar la presentación:
    - Usa **negrita** para énfasis
    - Usa *cursiva* para términos técnicos
    - Usa \`código\` para comandos o código inline
    - Usa bloques de código para ejemplos de código
    - Usa listas con - o 1. para enumerar
    - Usa > para citas o notas importantes
    - Usa enlaces [texto](url) cuando sea relevante`;

    // Iniciar chat con configuración de seguridad
    const chat = model.startChat({
      safetySettings: safetySettings,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Enviar el prompt del sistema primero
    await chat.sendMessage(systemPrompt);

    // Enviar mensaje y obtener respuesta
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      response: text,
      timestamp: Date.now(),
      animation: 'talking',
    };
  } catch (error: unknown) {
    console.error('Error con Gemini API:', error);
    
    // Manejo específico de errores
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    if (errorMessage.includes('404') || errorMessage.includes('not found')) {
      throw new Error('Modelo no disponible. Verifica tu API key y región.');
    } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
      throw new Error('Límite de API alcanzado. Intenta más tarde.');
    } else if (errorMessage.includes('invalid') || errorMessage.includes('authentication')) {
      throw new Error('API key inválida. Verifica tu configuración.');
    } else if (errorMessage.includes('safety')) {
      throw new Error('El contenido fue bloqueado por filtros de seguridad.');
    } else {
      throw new Error('Error de conexión con Gemini. Intenta más tarde.');
    }
  }
}

// Función para verificar si la API está configurada
export function isGeminiConfigured(): boolean {
  return !!(genAI && API_KEY);
} 