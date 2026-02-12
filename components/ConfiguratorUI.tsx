"use client";

import { useConfigStore } from '@/utils/store';
import { Wifi, Type, Palette, Check, Box } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const secureSupabaseUrl = supabaseUrl.replace('http://', 'https://');
const BASE_STORAGE_URL = `${secureSupabaseUrl}/storage/v1/object/public/models/`;

const MODELS = [
    { name: 'Manos Corazón', value: `${BASE_STORAGE_URL}MANOS.glb` },
    { name: 'Corazón', value: `${BASE_STORAGE_URL}CORAZON.glb` },
    { name: 'Corazón Colgante', value: `${BASE_STORAGE_URL}Decoracion2.glb` },
    { name: 'Oso', value: `${BASE_STORAGE_URL}Oso.glb` },
];

const COLORS = [
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Black', value: '#171717' },
    { name: 'White', value: '#F5F5F5' },
    { name: 'Orange', value: '#F97316' },
];

export default function ConfiguratorUI() {
    const {
        color, setColor,
        secondaryColor, setSecondaryColor,
        nfcEnabled, toggleNfc,
        customText, setCustomText,
        selectedModel, setModel
    } = useConfigStore();

    const isDecoracion = selectedModel.includes('Decoracion2');

    return (
        <div className="glass-panel p-6 rounded-3xl space-y-8 w-full max-w-md">
            <div>
                <h2 className="text-2xl font-bold mb-1">Personalización</h2>
                <p className="text-sm text-gray-400">Diseña tu producto único.</p>
            </div>

            {/* Model Selection */}
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Box size={16} /> Modelo
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {MODELS.map((m) => (
                        <button
                            key={m.name}
                            onClick={() => setModel(m.value)}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${selectedModel === m.value
                                ? 'bg-white text-black border-white'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {m.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Selection (Base / Holder) */}
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Palette size={16} /> {isDecoracion ? 'Color Base (Holder)' : `Color Base (${COLORS.find(c => c.value === color)?.name})`}
                </label>
                <div className="flex flex-wrap gap-3">
                    {COLORS.map((c) => (
                        <button
                            key={c.value}
                            onClick={() => setColor(c.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${color === c.value ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                                }`}
                            style={{ backgroundColor: c.value }}
                            aria-label={`Select ${c.name}`}
                        />
                    ))}
                </div>
            </div>

            {/* Secondary Color Selection (Rose / Detail) - Only for Decoracion2 */}
            {isDecoracion && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <Palette size={16} /> Color Detalle (Rose)
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {COLORS.map((c) => (
                            <button
                                key={`sec-${c.value}`}
                                onClick={() => setSecondaryColor(c.value)}
                                className={`w-10 h-10 rounded-full border-2 transition-all ${secondaryColor === c.value ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                                    }`}
                                style={{ backgroundColor: c.value }}
                                aria-label={`Select Secondary ${c.name}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Custom Text */}
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Type size={16} /> Texto Personalizado
                </label>
                <input
                    type="text"
                    maxLength={8}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Tu Nombre"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
                <p className="text-xs text-gray-500 text-right">{customText.length}/8 caracteres</p>
            </div>

            {/* NFC Toggle */}
            <div className="space-y-3">
                <div
                    onClick={toggleNfc}
                    className={`cursor-pointer group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${nfcEnabled
                        ? 'bg-purple-500/20 border-purple-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${nfcEnabled ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                            <Wifi size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm">Chip NFC Inteligente</h3>
                            <p className="text-xs text-gray-400">Habilita funciones digitales</p>
                        </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${nfcEnabled ? 'bg-purple-500 border-purple-500' : 'border-gray-500'
                        }`}>
                        {nfcEnabled && <Check size={14} className="text-white" />}
                    </div>
                </div>
            </div>

            {/* Action Button - Simulation */}
            <button className="w-full btn-primary mt-4">
                Añadir al Carrito
            </button>
        </div>
    );
}
