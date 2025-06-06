
import React, { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas, Rect, Circle, Textbox } from 'fabric';
import { useCanvasStore } from '@/stores/canvasStore';

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    canvas, 
    setCanvas, 
    setSelectedObject, 
    addLayer, 
    removeLayer,
    canvasSize 
  } = useCanvasStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 450,
      backgroundColor: '#ffffff',
    });

    // Configure canvas
    fabricCanvas.selection = true;
    fabricCanvas.preserveObjectStacking = true;

    // Event listeners
    fabricCanvas.on('selection:created', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    fabricCanvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    fabricCanvas.on('object:added', (e) => {
      if (e.target) {
        addLayer(e.target);
      }
    });

    fabricCanvas.on('object:removed', (e) => {
      if (e.target) {
        removeLayer(e.target);
      }
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Update canvas size when canvasSize changes
  useEffect(() => {
    if (canvas) {
      const scale = Math.min(800 / canvasSize.width, 450 / canvasSize.height);
      canvas.setDimensions({
        width: canvasSize.width * scale,
        height: canvasSize.height * scale
      });
      canvas.setZoom(scale);
      canvas.renderAll();
    }
  }, [canvas, canvasSize]);

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-2xl p-4">
        <canvas 
          ref={canvasRef}
          className="border border-gray-200 rounded"
        />
      </div>
      
      {/* Canvas Info */}
      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {canvasSize.width} × {canvasSize.height}
      </div>
    </div>
  );
};
