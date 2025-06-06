
import { create } from 'zustand';
import { Canvas as FabricCanvas, FabricObject } from 'fabric';

interface CanvasState {
  canvas: FabricCanvas | null;
  selectedObject: FabricObject | null;
  layers: FabricObject[];
  canvasSize: { width: number; height: number };
  zoom: number;
  userTier: 'free' | 'premium';
  
  setCanvas: (canvas: FabricCanvas) => void;
  setSelectedObject: (object: FabricObject | null) => void;
  setLayers: (layers: FabricObject[]) => void;
  setCanvasSize: (size: { width: number; height: number }) => void;
  setZoom: (zoom: number) => void;
  addLayer: (object: FabricObject) => void;
  removeLayer: (object: FabricObject) => void;
  updateLayer: (object: FabricObject) => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvas: null,
  selectedObject: null,
  layers: [],
  canvasSize: { width: 1920, height: 1080 },
  zoom: 1,
  userTier: 'free',
  
  setCanvas: (canvas) => set({ canvas }),
  setSelectedObject: (object) => set({ selectedObject: object }),
  setLayers: (layers) => set({ layers }),
  setCanvasSize: (size) => set({ canvasSize: size }),
  setZoom: (zoom) => set({ zoom }),
  
  addLayer: (object) => set((state) => ({ 
    layers: [...state.layers, object] 
  })),
  
  removeLayer: (object) => set((state) => ({ 
    layers: state.layers.filter(layer => layer !== object) 
  })),
  
  updateLayer: (object) => set((state) => {
    const index = state.layers.findIndex(layer => layer === object);
    if (index !== -1) {
      const newLayers = [...state.layers];
      newLayers[index] = object;
      return { layers: newLayers };
    }
    return state;
  })
}));
