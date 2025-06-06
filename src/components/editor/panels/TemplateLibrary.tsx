
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCanvasStore } from '@/stores/canvasStore';
import { Rect, Textbox } from 'fabric';
import { toast } from 'sonner';

export const TemplateLibrary = () => {
  const { canvas } = useCanvasStore();

  const templates = [
    {
      id: 1,
      name: 'Digital Signage',
      preview: '/placeholder.svg',
      category: 'Signage'
    },
    {
      id: 2,
      name: 'Sale Banner',
      preview: '/placeholder.svg',
      category: 'Marketing'
    },
    {
      id: 3,
      name: 'Event Poster',
      preview: '/placeholder.svg',
      category: 'Events'
    },
    {
      id: 4,
      name: 'Product Display',
      preview: '/placeholder.svg',
      category: 'Retail'
    }
  ];

  const loadTemplate = (templateId: number) => {
    if (!canvas) return;

    // Clear existing objects
    canvas.clear();
    canvas.backgroundColor = '#ffffff';

    // Load template based on ID
    switch (templateId) {
      case 1:
        // Digital Signage Template
        const bg = new Rect({
          left: 0,
          top: 0,
          width: canvas.width || 800,
          height: canvas.height || 450,
          fill: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          selectable: false
        });
        
        const title = new Textbox('Welcome to Our Store', {
          left: 50,
          top: 100,
          fontSize: 48,
          fill: 'white',
          fontWeight: 'bold',
          fontFamily: 'Arial'
        });
        
        const subtitle = new Textbox('Premium Quality Products', {
          left: 50,
          top: 180,
          fontSize: 24,
          fill: 'white',
          fontFamily: 'Arial'
        });
        
        canvas.add(bg, title, subtitle);
        break;
        
      case 2:
        // Sale Banner Template
        const saleBg = new Rect({
          left: 0,
          top: 0,
          width: canvas.width || 800,
          height: canvas.height || 450,
          fill: '#ff4757',
          selectable: false
        });
        
        const saleText = new Textbox('50% OFF', {
          left: 250,
          top: 150,
          fontSize: 72,
          fill: 'white',
          fontWeight: 'bold',
          textAlign: 'center'
        });
        
        canvas.add(saleBg, saleText);
        break;
    }
    
    canvas.renderAll();
    toast.success('Template loaded successfully!');
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Templates</h3>
        <span className="text-xs text-slate-400">{templates.length} templates</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group cursor-pointer"
            onClick={() => loadTemplate(template.id)}
          >
            <div className="aspect-video bg-slate-800 rounded-lg border border-slate-700 group-hover:border-blue-500 transition-colors relative overflow-hidden">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium truncate">{template.name}</p>
                <p className="text-slate-300 text-xs">{template.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Browse More Templates
        </Button>
      </div>
    </div>
  );
};
