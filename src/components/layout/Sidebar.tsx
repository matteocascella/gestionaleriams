
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Car, Users, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <Car className="mr-2 h-5 w-5" /> },
    { name: 'Soci', path: '/soci', icon: <Users className="mr-2 h-5 w-5" /> },
    { name: 'Veicoli', path: '/veicoli', icon: <Car className="mr-2 h-5 w-5" /> },
    { name: 'Eventi', path: '/eventi', icon: <Calendar className="mr-2 h-5 w-5" /> },
    { name: 'Impostazioni', path: '/impostazioni', icon: <Settings className="mr-2 h-5 w-5" /> },
  ];

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar px-3 py-4">
        <div className="mb-8 flex items-center px-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-vintage-cream p-1.5">
              <Car className="h-6 w-6 text-vintage-green" />
            </div>
            <h1 className="text-xl font-serif font-bold text-white">Auto Club</h1>
          </div>
        </div>

        <div className="space-y-1 px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center rounded-md px-2 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-white transition-colors',
                  isActive ? 'bg-sidebar-accent text-white' : 'text-sidebar-foreground'
                )
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto pt-10">
          <div className="px-2">
            <div className="vintage-divider"></div>
            <div className="flex items-center justify-between py-2 px-1">
              <span className="text-xs font-medium text-sidebar-foreground">
                Auto Club Classico
              </span>
              <span className="text-xs text-sidebar-foreground/70">v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
