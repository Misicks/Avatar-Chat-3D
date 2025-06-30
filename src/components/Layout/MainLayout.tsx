'use client';
import React from 'react';
import Header from '@/components/Layout/Header';

// Layout principal solo con navbar fija
const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-gray-900">
      {children}
    </div>
  );
};

export default MainLayout;
