
import React from 'react';
import { Button } from '@/components/ui/button';
import { Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useCanvasStore } from '@/stores/canvasStore';
import { Textbox } from 'fabric';

export const TextTools = () => {
  const { canvas } = useCanvasStore();

  const addText = (style: 'heading' | 'body' | 'caption') => {
    if (!canvas) return;

    let text, fontSize, fontWeight;
    
    switch (style) {
      case 'heading':
        text = 'Add a heading';
        fontSize = 48;
        fontWeight = 'bold';
        break;
      case 'body':
        text = 'Add body text';
        fontSize = 18;
        fontWeight = 'normal';
        break;
      case 'caption':
        text = 'Add a caption';
        fontSize = 14;
        fontWeight = 'normal';
        break;
    }

    const textbox = new Textbox(text, {
      left: 100,
      top: 100,
      fontSize,
      fontWeight,
      fill: '#000000',
      fontFamily: 'Arial',
      editable: true
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
  };

  const textStyles = [
    { id: 'heading', label: 'Heading', icon: Type, preview: 'Aa' },
    { id: 'body', label: 'Body Text', icon: Type, preview: 'Aa' },
    { id: 'caption', label: 'Caption', icon: Type, preview: 'Aa' },
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Text</h3>

      {/* Text Styles */}
      <div className="space-y-2 mb-6">
        {textStyles.map((style) => (
          <Button
            key={style.id}
            variant="outline"
            className="w-full justify-start bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
            onClick={() => addText(style.id as 'heading' | 'body' | 'caption')}
          >
            <style.icon className="w-4 h-4 mr-3" />
            <span className="flex-1 text-left">{style.label}</span>
            <span className="text-lg font-bold">{style.preview}</span>
          </Button>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="text-xs font-medium text-slate-400 mb-2">ALIGNMENT</h4>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
