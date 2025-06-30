'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import LoadingAvatar from './LoadingAvatar';

// Componente para cargar y mostrar el modelo GLB
function LeoModel({ file }: { file: string }) {
  const { scene } = useGLTF(file);
  // Centrar y escalar el modelo para visibilidad
  scene.position.set(0, -0.5, 0);
  scene.scale.set(15, 15, 15);
  return <primitive object={scene} />;
}

const Avatar3D: React.FC<{ file?: string }> = ({ file = '/models/leoTest.glb' }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="w-full h-[300px] md:h-[400px]">
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enablePan={false} enableZoom={false} />
      <Suspense fallback={<LoadingAvatar />}>
        <LeoModel file={file} />
      </Suspense>
    </Canvas>
  );
};

export default Avatar3D;
