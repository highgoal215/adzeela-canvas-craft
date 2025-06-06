
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useCanvasStore } from '@/stores/canvasStore';

interface PropertiesPanelProps {
  selectedObject: any;
}

export const PropertiesPanel = ({ selectedObject }: PropertiesPanelProps) => {
  const { canvas } = useCanvasStore();
  const [properties, setProperties] = useState({
    fill: '#000000',
    opacity: 1,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    angle: 0,
  });

  useEffect(() => {
    if (selectedObject) {
      setProperties({
        fill: selectedObject.fill || '#000000',
        opacity: selectedObject.opacity || 1,
        left: Math.round(selectedObject.left || 0),
        top: Math.round(selectedObject.top || 0),
        width: Math.round(selectedObject.width * (selectedObject.scaleX || 1) || 0),
        height: Math.round(selectedObject.height * (selectedObject.scaleY || 1) || 0),
        angle: Math.round(selectedObject.angle || 0),
      });
    }
  }, [selectedObject]);

  const updateProperty = (key: string, value: any) => {
    if (!selectedObject || !canvas) return;

    if (key === 'fill') {
      selectedObject.set('fill', value);
    } else if (key === 'opacity') {
      selectedObject.set('opacity', value);
    } else if (key === 'left') {
      selectedObject.set('left', value);
    } else if (key === 'top') {
      selectedObject.set('top', value);
    } else if (key === 'angle') {
      selectedObject.set('angle', value);
    }

    canvas.renderAll();
    setProperties(prev => ({ ...prev, [key]: value }));
  };

  if (!selectedObject) {
    return (
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Properties</h3>
        <div className="text-center py-8 text-slate-500">
          <p className="text-sm">No object selected</p>
          <p className="text-xs mt-1">Select an object to edit properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-sm font-semibold text-white mb-3">Properties</h3>
      
      {/* Fill Color */}
      <div>
        <Label className="text-xs text-slate-300 mb-2 block">Fill Color</Label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={properties.fill}
            onChange={(e) => updateProperty('fill', e.target.value)}
            className="w-8 h-8 rounded border border-slate-600 cursor-pointer"
          />
          <Input
            value={properties.fill}
            onChange={(e) => updateProperty('fill', e.target.value)}
            className="flex-1 bg-slate-800 border-slate-600 text-white text-xs"
          />
        </div>
      </div>

      {/* Opacity */}
      <div>
        <Label className="text-xs text-slate-300 mb-2 block">
          Opacity ({Math.round(properties.opacity * 100)}%)
        </Label>
        <Slider
          value={[properties.opacity]}
          onValueChange={([value]) => updateProperty('opacity', value)}
          max={1}
          min={0}
          step={0.01}
          className="w-full"
        />
      </div>

      {/* Position */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-slate-300 mb-1 block">X</Label>
          <Input
            type="number"
            value={properties.left}
            onChange={(e) => updateProperty('left', parseInt(e.target.value) || 0)}
            className="bg-slate-800 border-slate-600 text-white text-xs"
          />
        </div>
        <div>
          <Label className="text-xs text-slate-300 mb-1 block">Y</Label>
          <Input
            type="number"
            value={properties.top}
            onChange={(e) => updateProperty('top', parseInt(e.target.value) || 0)}
            className="bg-slate-800 border-slate-600 text-white text-xs"
          />
        </div>
      </div>

      {/* Size */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-slate-300 mb-1 block">Width</Label>
          <Input
            type="number"
            value={properties.width}
            readOnly
            className="bg-slate-800 border-slate-600 text-slate-400 text-xs"
          />
        </div>
        <div>
          <Label className="text-xs text-slate-300 mb-1 block">Height</Label>
          <Input
            type="number"
            value={properties.height}
            readOnly
            className="bg-slate-800 border-slate-600 text-slate-400 text-xs"
          />
        </div>
      </div>

      {/* Rotation */}
      <div>
        <Label className="text-xs text-slate-300 mb-2 block">
          Rotation ({properties.angle}°)
        </Label>
        <Slider
          value={[properties.angle]}
          onValueChange={([value]) => updateProperty('angle', value)}
          max={360}
          min={-360}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};
