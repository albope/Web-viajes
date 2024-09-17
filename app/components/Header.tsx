// components/Header.tsx
import React from 'react';
import { Button } from './button';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="py-8 bg-black text-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Nuestros viajecitos</h1>
        <Image
          src="/images/profile.jpg"
          alt="Foto de la pareja"
          className="rounded-full w-16 h-16 object-cover"
          width={64}
          height={64}
        />
      </div>
    </header>
  );
};

export default Header;