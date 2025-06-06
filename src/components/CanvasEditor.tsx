
import React, { useState } from 'react';
import { Sidebar } from './editor/Sidebar';
import { Canvas } from './editor/Canvas';
import { TopToolbar } from './editor/TopToolbar';
import { LayerPanel } from './editor/LayerPanel';
import { PropertiesPanel } from './editor/PropertiesPanel';
import { useCanvasStore } from '@/stores/canvasStore';

export const CanvasEditor = () => {
  const [activePanel, setActivePanel] = useState<'templates' | 'assets' | 'text' | 'shapes'>('templates');
  const { selectedObject } = useCanvasStore();

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Left Sidebar */}
      <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <TopToolbar />
        
        {/* Editor Area */}
        <div className="flex-1 flex">
          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center bg-slate-800 p-8">
            <Canvas />
          </div>
          
          {/* Right Panels */}
          <div className="w-80 bg-slate-900 border-l border-slate-700 flex flex-col">
            {/* Layer Panel */}
            <div className="flex-1 border-b border-slate-700">
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
