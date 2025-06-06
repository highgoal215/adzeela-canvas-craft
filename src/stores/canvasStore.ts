
import { create } from 'zustand';
import { fabric } from 'fabric';

interface CanvasState {
  canvas: fabric.Canvas | null;
  selectedObject: fabric.Object | null;
  zoom: number;
  canvasSize: { width: number; height: number };
  userTier: 'free' | 'standard' | 'premium';
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  setCanvas: (canvas: fabric.Canvas) => void;
  setSelectedObject: (object: fabric.Object | null) => void;
  setZoom: (zoom: number) => void;
  setCanvasSize: (size: { width: number; height: number }) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvas: null,
  selectedObject: null,
  zoom: 1,
  canvasSize: { width: 1920, height: 1080 },
  userTier: 'free',
  sidebarOpen: true,
  theme: 'dark',
  setCanvas: (canvas) => set({ canvas }),
  setSelectedObject: (object) => set({ selectedObject: object }),
  setZoom: (zoom) => set({ zoom }),
  setCanvasSize: (size) => set({ canvasSize: size }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: newTheme });
    document.documentElement.className = newTheme;
  },
}));
