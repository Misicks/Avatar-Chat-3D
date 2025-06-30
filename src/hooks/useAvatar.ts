import { useCallback } from 'react';
import { useAvatarStore } from '@/stores/avatarStore';
import type { AvatarAnimation } from '@/types';

// Hook para acceder y manipular el estado del avatar 3D
export function useAvatar() {
  const { animation, setAnimation } = useAvatarStore();

  // Cambiar animación del avatar
  const handleSetAnimation = useCallback((anim: AvatarAnimation) => {
    setAnimation(anim);
  }, [setAnimation]);

  return {
    animation,
    setAnimation: handleSetAnimation,
  };
}
