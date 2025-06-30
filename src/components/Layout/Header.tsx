import React from 'react';

// Header opcional para la app, ahora sticky
const Header: React.FC = () => (
  <header className="w-full top-0 left-0 z-30 sticky bg-white py-4 px-6 border-b border-gray-200 flex items-center justify-between shadow-sm">
    <span className="font-bold text-lg text-orange">Avatar Chat 3D</span>
    {/* Aquí se pueden agregar iconos o acciones en el futuro */}
  </header>
);

export default Header;
