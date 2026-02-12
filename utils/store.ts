import { create } from 'zustand';

interface ConfigState {
  color: string;
  secondaryColor: string;
  nfcEnabled: boolean;
  customText: string;
  selectedFont: string;
  selectedModel: string;
  setColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  toggleNfc: () => void;
  setCustomText: (text: string) => void;
  setFont: (font: string) => void;
  setModel: (url: string) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  color: '#EF4444',
  secondaryColor: '#F5F5F5',
  nfcEnabled: false,
  customText: 'C-3D',
  selectedFont: 'Inter',
  selectedModel: 'http://colosson-antigravity-visualizador-supaba-31c826-72-61-77-85.traefik.me/storage/v1/object/public/models/MANOS.glb',
  setColor: (color) => set({ color }),
  setSecondaryColor: (secondaryColor) => set({ secondaryColor }),
  toggleNfc: () => set((state) => ({ nfcEnabled: !state.nfcEnabled })),
  setCustomText: (customText) => set({ customText }),
  setFont: (selectedFont) => set({ selectedFont }),
  setModel: (selectedModel) => set({ selectedModel }),
}));
