import { create } from 'zustand';

interface ConfigState {
  color: string;
  secondaryColor: string;
  nfcEnabled: boolean;
  useCustomText: boolean;
  customText: string;
  selectedFont: string;
  selectedModel: string;
  setColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  toggleNfc: () => void;
  toggleCustomText: () => void;
  setCustomText: (text: string) => void;
  setFont: (font: string) => void;
  setModel: (url: string) => void;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const secureSupabaseUrl = supabaseUrl.replace('http://', 'https://');
const DEFAULT_MODEL = `${secureSupabaseUrl}/storage/v1/object/public/models/MANOS.glb`;

export const useConfigStore = create<ConfigState>((set) => ({
  color: '#EF4444',
  secondaryColor: '#F5F5F5',
  nfcEnabled: false,
  useCustomText: false,
  customText: 'C-3D',
  selectedFont: 'Inter',
  selectedModel: DEFAULT_MODEL,
  setColor: (color) => set({ color }),
  setSecondaryColor: (secondaryColor) => set({ secondaryColor }),
  toggleNfc: () => set((state) => ({ nfcEnabled: !state.nfcEnabled })),
  toggleCustomText: () => set((state) => ({ useCustomText: !state.useCustomText })),
  setCustomText: (customText) => set({ customText }),
  setFont: (selectedFont) => set({ selectedFont }),
  setModel: (selectedModel) => set({ selectedModel }),
}));
