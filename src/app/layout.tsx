import './globals.css';
import type { Metadata } from 'next';
import MainLayout from '@/components/Layout/MainLayout';
import Header from '@/components/Layout/Header';

export const metadata: Metadata = {
  title: 'Avatar Chat 3D',
  description: 'Chat con IA y avatar 3D estilo Claude',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <MainLayout>
          <Header />
          {/* Aquí irá el contenido principal de la app */}
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
