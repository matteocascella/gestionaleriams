
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-background border-b px-4 py-3 sm:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <h1 className="text-xl font-serif font-semibold text-vintage-green hidden sm:inline-block">
          Auto Club Classico
        </h1>
        <div className="vintage-divider hidden sm:block w-32 mx-4"></div>
        <span className="text-sm text-muted-foreground">Gestione Soci</span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="hidden sm:flex">
          Assistenza
        </Button>
        <Button variant="ghost" size="sm" className="font-medium text-vintage-burgundy">
          Amministratore
        </Button>
      </div>
    </header>
  );
};

export default Header;
