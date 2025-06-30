import { create } from 'zustand';
import type { AvatarState, AvatarAnimation } from '@/types';

const AVATAR_KEY = 'avatar-animation';

function loadAnimation(): AvatarAnimation {
  if (typeof window === 'undefined') return 'idle';
  try {
    const data = sessionStorage.getItem(AVATAR_KEY);
    return (data as AvatarAnimation) || 'idle';
  } catch {
    return 'idle';
  }
}

function saveAnimation(animation: AvatarAnimation) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(AVATAR_KEY, animation);
  } catch {}
}

export const useAvatarStore = create<AvatarState>((set) => ({
  animation: typeof window !== 'undefined' ? loadAnimation() : 'idle',
  setAnimation: (animation: AvatarAnimation) => {
    saveAnimation(animation);
    set({ animation });
  },
}));
