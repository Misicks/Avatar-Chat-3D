'use client';
import React from 'react';

// Skeleton de carga para el avatar 3D (mesh compatible con R3F)
const LoadingAvatar: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="#FB923C" opacity={0.7} transparent />
  </mesh>
);

export default LoadingAvatar;
