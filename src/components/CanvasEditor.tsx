
import React, { useState, useEffect } from 'react';
import { Sidebar } from './editor/Sidebar';
import { Canvas } from './editor/Canvas';
import { TopToolbar } from './editor/TopToolbar';
import { LayerPanel } from './editor/LayerPanel';
import { PropertiesPanel } from './editor/PropertiesPanel';
import { useCanvasStore } from '@/stores/canvasStore';

export const CanvasEditor = () => {
  const [activePanel, setActivePanel] = useState<'templates' | 'assets' | 'text' | 'shapes'>('templates');
  const { selectedObject, sidebarOpen, theme } = useCanvasStore();

  useEffect(() => {
    // Initialize theme on component mount
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Sidebar - Conditionally rendered */}
      {sidebarOpen && (
        <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <TopToolbar />
        
        {/* Editor Area */}
        <div className="flex-1 flex">
          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center bg-muted p-8">
            <Canvas />
          </div>
          
          {/* Right Panels */}
          <div className="w-80 bg-background border-l border-border flex flex-col">
            {/* Layer Panel */}
            <div className="flex-1 border-b border-border">
              <LayerPanel />
            </div>
            
            {/* Properties Panel */}
            <div className="flex-1">
              <PropertiesPanel selectedObject={selectedObject} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
