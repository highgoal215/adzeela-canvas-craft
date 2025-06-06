
import React from 'react';
import { 
  Save, 
  Download, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut,
  Monitor,
  Smartphone,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCanvasStore } from '@/stores/canvasStore';
import { ExportModal } from './ExportModal';
import { toast } from 'sonner';

export const TopToolbar = () => {
  const { setCanvasSize, zoom, setZoom, canvas, userTier } = useCanvasStore();
  const [showExportModal, setShowExportModal] = React.useState(false);

  const presets = [
    { label: 'Digital Signage (1920×1080)', width: 1920, height: 1080, icon: Monitor },
    { label: 'Portrait (1080×1920)', width: 1080, height: 1920, icon: Smartphone },
    { label: 'Square (1080×1080)', width: 1080, height: 1080, icon: Square },
    { label: 'Custom', width: 800, height: 600, icon: Monitor },
  ];

  const handlePresetChange = (value: string) => {
    const preset = presets.find(p => p.label === value);
    if (preset) {
      setCanvasSize({ width: preset.width, height: preset.height });
      toast.success(`Canvas size changed to ${preset.width}×${preset.height}`);
    }
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 3);
    setZoom(newZoom);
    if (canvas) {
      canvas.setZoom(newZoom);
      canvas.renderAll();
    }
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom / 1.2, 0.1);
    setZoom(newZoom);
    if (canvas) {
      canvas.setZoom(newZoom);
      canvas.renderAll();
    }
  };

  return (
    <div className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-white">Adzeela Canvas</h1>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-4">
        <Select onValueChange={handlePresetChange}>
          <SelectTrigger className="w-48 bg-slate-800 border-slate-600 text-white">
            <SelectValue placeholder="Select preset" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {presets.map((preset) => (
              <SelectItem key={preset.label} value={preset.label} className="text-white hover:bg-slate-700">
                <div className="flex items-center space-x-2">
                  <preset.icon className="w-4 h-4" />
                  <span>{preset.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-slate-400 hover:text-white">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-slate-400 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-slate-400 hover:text-white">
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button 
          onClick={() => setShowExportModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        
        {userTier === 'free' && (
          <div className="text-xs text-amber-400 ml-2">
            Free Plan
          </div>
        )}
      </div>

      <ExportModal 
        open={showExportModal} 
        onOpenChange={setShowExportModal}
      />
    </div>
  );
};
