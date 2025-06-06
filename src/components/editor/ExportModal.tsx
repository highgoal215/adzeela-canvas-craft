
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCanvasStore } from '@/stores/canvasStore';
import { Crown, Download } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExportModal = ({ open, onOpenChange }: ExportModalProps) => {
  const { canvas, userTier } = useCanvasStore();
  const [format, setFormat] = useState('png');
  const [quality, setQuality] = useState('medium');
  const [isExporting, setIsExporting] = useState(false);

  const qualityOptions = [
    { label: 'Low (Free)', value: 'low', resolution: '800x450', disabled: false },
    { label: 'Medium', value: 'medium', resolution: '1600x900', disabled: userTier === 'free' },
    { label: 'High (Premium)', value: 'high', resolution: '3200x1800', disabled: userTier === 'free' },
  ];

  const handleExport = async () => {
    if (!canvas) return;

    setIsExporting(true);
    
    try {
      // Get canvas as data URL
      let dataURL;
      
      if (userTier === 'free' && quality !== 'low') {
        toast.error('Upgrade to Premium for high-quality exports');
        setIsExporting(false);
        return;
      }

      if (quality === 'low') {
        dataURL = canvas.toDataURL({
          format: format,
          quality: 0.8,
          multiplier: 0.5
        });
      } else if (quality === 'medium') {
        dataURL = canvas.toDataURL({
          format: format,
          quality: 0.9,
          multiplier: 1
        });
      } else {
        dataURL = canvas.toDataURL({
          format: format,
          quality: 1,
          multiplier: 2
        });
      }

      // Add watermark for free users
      if (userTier === 'free') {
        const img = new Image();
        img.onload = () => {
          const watermarkCanvas = document.createElement('canvas');
          const ctx = watermarkCanvas.getContext('2d');
          
          watermarkCanvas.width = img.width;
          watermarkCanvas.height = img.height;
          
          // Draw original image
          ctx?.drawImage(img, 0, 0);
          
          // Add watermark
          if (ctx) {
            ctx.font = '24px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillText('ADZEELA', watermarkCanvas.width - 120, watermarkCanvas.height - 20);
          }
          
          // Download
          const link = document.createElement('a');
          link.download = `adzeela-design.${format}`;
          link.href = watermarkCanvas.toDataURL();
          link.click();
          
          toast.success('Design exported successfully!');
        };
        img.src = dataURL;
      } else {
        // Premium export without watermark
        const link = document.createElement('a');
        link.download = `adzeela-design.${format}`;
        link.href = dataURL;
        link.click();
        
        toast.success('Design exported successfully!');
      }
      
      onOpenChange(false);
    } catch (error) {
      toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Design</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Format
            </label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="bg-slate-800 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="png">PNG (Transparent)</SelectItem>
                <SelectItem value="jpeg">JPEG (Smaller file)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quality Selection */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Quality
            </label>
            <div className="space-y-2">
              {qualityOptions.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center justify-between p-3 rounded border cursor-pointer ${
                    quality === option.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : option.disabled
                      ? 'border-slate-700 bg-slate-800/50 opacity-50 cursor-not-allowed'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => !option.disabled && setQuality(option.value)}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{option.label}</span>
                      {option.disabled && <Crown className="w-4 h-4 text-amber-500" />}
                    </div>
                    <span className="text-xs text-slate-400">{option.resolution}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    quality === option.value ? 'border-blue-500 bg-blue-500' : 'border-slate-500'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Free User Notice */}
          {userTier === 'free' && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
              <div className="flex items-center space-x-2 text-amber-400 text-sm">
                <Crown className="w-4 h-4" />
                <span>Free exports include watermark. Upgrade for HD quality and no watermark.</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
