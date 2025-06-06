
import React from 'react';
import { Button } from '@/components/ui/button';
import { Square, Circle, Triangle } from 'lucide-react';
import { useCanvasStore } from '@/stores/canvasStore';
import { Rect, Circle as FabricCircle, Triangle as FabricTriangle } from 'fabric';

export const ShapeTools = () => {
  const { canvas } = useCanvasStore();

  const addShape = (type: 'rectangle' | 'circle' | 'triangle') => {
    if (!canvas) return;

    let shape;
    
    switch (type) {
      case 'rectangle':
        shape = new Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#3b82f6',
          stroke: '#1e40af',
          strokeWidth: 2
        });
        break;
      case 'circle':
        shape = new FabricCircle({
          left: 100,
          top: 100,
          radius: 50,
          fill: '#ef4444',
          stroke: '#dc2626',
          strokeWidth: 2
        });
        break;
      case 'triangle':
        shape = new FabricTriangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#10b981',
          stroke: '#059669',
          strokeWidth: 2
        });
        break;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
  };

  const shapes = [
    { id: 'rectangle', label: 'Rectangle', icon: Square, color: '#3b82f6' },
    { id: 'circle', label: 'Circle', icon: Circle, color: '#ef4444' },
    { id: 'triangle', label: 'Triangle', icon: Triangle, color: '#10b981' },
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Shapes</h3>

      <div className="grid grid-cols-2 gap-2">
        {shapes.map((shape) => (
          <Button
            key={shape.id}
            variant="outline"
            className="aspect-square flex flex-col items-center justify-center bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-slate-500"
            onClick={() => addShape(shape.id as 'rectangle' | 'circle' | 'triangle')}
          >
            <shape.icon 
              className="w-8 h-8 mb-2" 
              style={{ color: shape.color }}
            />
            <span className="text-xs text-slate-300">{shape.label}</span>
          </Button>
        ))}
      </div>

      {/* Quick Color Palette */}
      <div className="mt-6">
        <h4 className="text-xs font-medium text-slate-400 mb-2">COLORS</h4>
        <div className="grid grid-cols-6 gap-1">
          {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'].map((color) => (
            <button
              key={color}
              className="aspect-square rounded border border-slate-600 hover:border-white transition-colors"
              style={{ backgroundColor: color }}
              onClick={() => {
                // Apply color to selected object
                const activeObject = canvas?.getActiveObject();
                if (activeObject) {
                  activeObject.set('fill', color);
                  canvas?.renderAll();
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
