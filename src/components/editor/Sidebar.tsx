
import React from 'react';
import { 
  Layout, 
  Type, 
  Shapes, 
  Image, 
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateLibrary } from './panels/TemplateLibrary';
import { AssetLibrary } from './panels/AssetLibrary';
import { TextTools } from './panels/TextTools';
import { ShapeTools } from './panels/ShapeTools';

interface SidebarProps {
  activePanel: 'templates' | 'assets' | 'text' | 'shapes';
  onPanelChange: (panel: 'templates' | 'assets' | 'text' | 'shapes') => void;
}

export const Sidebar = ({ activePanel, onPanelChange }: SidebarProps) => {
  const menuItems = [
    { id: 'templates', icon: Layout, label: 'Templates' },
    { id: 'assets', icon: Image, label: 'Assets' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'shapes', icon: Shapes, label: 'Shapes' },
  ] as const;

  const renderPanel = () => {
    switch (activePanel) {
      case 'templates':
        return <TemplateLibrary />;
      case 'assets':
        return <AssetLibrary />;
      case 'text':
        return <TextTools />;
      case 'shapes':
        return <ShapeTools />;
    }
  };

  return (
    <div className="w-80 bg-background border-r border-border flex">
      {/* Menu Bar */}
      <div className="w-16 bg-muted flex flex-col items-center py-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activePanel === item.id ? "default" : "ghost"}
            size="sm"
            className={`w-10 h-10 p-0 ${
              activePanel === item.id 
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            onClick={() => onPanelChange(item.id)}
          >
            <item.icon className="w-5 h-5" />
          </Button>
        ))}
        
        <div className="flex-1" />
        
        {/* Upgrade Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-amber-foreground"
        >
          <Crown className="w-4 h-4" />
        </Button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto">
        {renderPanel()}
      </div>
    </div>
  );
};
