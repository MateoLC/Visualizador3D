"use client";

import dynamic from 'next/dynamic';
import ConfiguratorUI from '@/components/ConfiguratorUI';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Dynamically import Experience so window/canvas is available
const Experience = dynamic(() => import('@/components/Experience'), {
    ssr: false,
    loading: () => <div className="text-white p-10">Cargando 3D...</div>
});

export default function ConfiguratorPage() {
    return (
        <div className="h-[100dvh] w-full flex flex-col lg:flex-row overflow-hidden bg-white">

            {/* 3D Visualizer Area */}
            <div className="relative w-full h-[45dvh] lg:h-full lg:flex-1 bg-white">

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-10">
                    <Link href="/">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-medium hover:bg-white transition-colors border border-gray-200 shadow-sm text-black">
                            <ChevronLeft size={16} /> Volver
                        </button>
                    </Link>
                </div>

                <ErrorBoundary>
                    <Experience />
                </ErrorBoundary>
            </div>

            {/* Controls Area */}
            {/* Desktop: Right Panel */}
            {/* Mobile: Bottom Sheet logic */}
            <div className="w-full lg:w-[480px] bg-white border-t lg:border-l border-gray-100 h-[55dvh] lg:h-full overflow-y-auto z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
                <div className="min-h-full flex flex-col justify-start lg:justify-center p-6 lg:p-10">
                    <ConfiguratorUI />
                </div>
            </div>
        </div>
    );
}
