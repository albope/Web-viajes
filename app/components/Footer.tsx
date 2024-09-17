// components/Footer.tsx
import React from 'react';
import { Button } from './button';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          &copy; 2024 Alberto &amp; Carmen. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;