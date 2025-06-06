
import React from 'react';
import { Eye, EyeOff, Lock, Unlock, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCanvasStore } from '@/stores/canvasStore';

export const LayerPanel = () => {
  const { layers, selectedObject, canvas, removeLayer } = useCanvasStore();

  const handleToggleVisibility = (layer: any) => {
    layer.set('visible', !layer.visible);
    canvas?.renderAll();
  };

  const handleToggleLock = (layer: any) => {
    layer.set('selectable', !layer.selectable);
    layer.set('evented', !layer.evented);
    canvas?.renderAll();
  };

  const handleDeleteLayer = (layer: any) => {
    canvas?.remove(layer);
    removeLayer(layer);
  };

  const handleDuplicateLayer = (layer: any) => {
    layer.clone((cloned: any) => {
      cloned.set({
        left: layer.left + 10,
        top: layer.top + 10,
      });
      canvas?.add(cloned);
    });
  };

  const getLayerName = (layer: any) => {
    if (layer.type === 'textbox') return 'Text';
    if (layer.type === 'rect') return 'Rectangle';
    if (layer.type === 'circle') return 'Circle';
    if (layer.type === 'image') return 'Image';
    return 'Object';
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-3">Layers</h3>
      
      <div className="space-y-1">
        {layers.map((layer, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded group hover:bg-slate-800 cursor-pointer ${
              selectedObject === layer ? 'bg-blue-600/20 border border-blue-600/30' : ''
            }`}
            onClick={() => canvas?.setActiveObject(layer)}
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm text-white truncate">
                {getLayerName(layer)}
              </span>
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleVisibility(layer);
                }}
              >
                {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleLock(layer);
                }}
              >
                {layer.selectable ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDuplicateLayer(layer);
                }}
              >
                <Copy className="w-3 h-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 text-slate-400 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteLayer(layer);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
        
        {layers.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <p className="text-sm">No layers yet</p>
            <p className="text-xs mt-1">Add elements to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
