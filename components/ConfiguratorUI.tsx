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
    { name: 'Green', value: '#10B981' },
    { name: 'Black', value: '#171717' },
    { name: 'White', value: '#F5F5F5' },
];

export default function ConfiguratorUI() {
    const {
        color, setColor,
        secondaryColor, setSecondaryColor,
        nfcEnabled, toggleNfc,
        useCustomText, toggleCustomText,
        customText, setCustomText,
        selectedModel, setModel
    } = useConfigStore();

    const isDecoracion = selectedModel.includes('Decoracion2');

    return (
        <div className="bg-white p-6 rounded-3xl space-y-8 w-full max-w-md shadow-lg border border-gray-100">
            <div>
                <h2 className="text-2xl font-bold mb-1 text-black">Personalización</h2>
                <p className="text-sm text-gray-500">Diseña tu producto único.</p>
            </div>

            {/* Model Selection */}
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Box size={16} /> Modelo
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {MODELS.map((m) => (
                        <button
                            key={m.name}
                            onClick={() => setModel(m.value)}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${selectedModel === m.value
                                ? 'bg-black text-white border-black'
                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {m.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Selection (Base / Holder) */}
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Palette size={16} /> {isDecoracion ? 'Color Base (Holder)' : `Color Base (${COLORS.find(c => c.value === color)?.name})`}
                </label>
                <div className="flex flex-wrap gap-3">
                    {COLORS.map((c) => (
                        <button
                            key={c.value}
                            onClick={() => setColor(c.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${color === c.value ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'
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
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Palette size={16} /> Color Detalle (Rose)
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {COLORS.map((c) => (
                            <button
                                key={`sec-${c.value}`}
                                onClick={() => setSecondaryColor(c.value)}
                                className={`w-10 h-10 rounded-full border-2 transition-all ${secondaryColor === c.value ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'
                                    }`}
                                style={{ backgroundColor: c.value }}
                                aria-label={`Select Secondary ${c.name}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Custom Text Toggle */}
            <div className="space-y-3">
                <div
                    onClick={toggleCustomText}
                    className={`cursor-pointer group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${useCustomText
                        ? 'bg-green-500/10 border-green-500/50'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${useCustomText ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            <Type size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-black">Texto Personalizado</h3>
                            <p className="text-xs text-gray-500">Personaliza tu producto</p>
                        </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${useCustomText ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}>
                        {useCustomText && <Check size={14} className="text-white" />}
                    </div>
                </div>

                {/* Input field - visible only when toggled on */}
                {useCustomText && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <input
                            type="text"
                            maxLength={8}
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            placeholder="Tu Nombre"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                        />
                        <p className="text-xs text-gray-500 text-right mt-1">{customText.length}/8 caracteres</p>
                    </div>
                )}
            </div>

            {/* NFC Toggle */}
            <div className="space-y-3">
                <div
                    onClick={toggleNfc}
                    className={`cursor-pointer group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${nfcEnabled
                        ? 'bg-green-500/10 border-green-500/50'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${nfcEnabled ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            <Wifi size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-black">Chip NFC Inteligente</h3>
                            <p className="text-xs text-gray-500">Habilita funciones digitales</p>
                        </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${nfcEnabled ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}>
                        {nfcEnabled && <Check size={14} className="text-white" />}
                    </div>
                </div>
            </div>

            {/* Action Button - Updated to Green */}
            <button className="w-full py-4 bg-[#00C15D] text-white font-bold rounded-full hover:bg-[#00A850] transition-all shadow-lg active:scale-95 text-lg">
                Añadir al Carrito
            </button>
        </div>
    );
}
