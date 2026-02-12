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
        <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-black">

            {/* 3D Visualizer Area */}
            <div className="relative w-full h-[60vh] lg:h-full lg:flex-1 bg-gradient-to-b from-gray-900 to-black">

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-10">
                    <Link href="/">
                        <button className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full text-sm font-medium hover:bg-black/40 transition-colors border border-white/5">
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
            {/* Mobile: Bottom Sheet logic (simple static placement for now, can be enhanced to draggable sheet) */}
            <div className="w-full lg:w-[480px] bg-black/80 lg:bg-black/40 backdrop-blur-2xl border-t lg:border-l border-white/10 h-[40vh] lg:h-full overflow-y-auto z-20 shadow-2xl">
                <div className="h-full flex flex-col justify-center p-6 lg:p-10">
                    <ConfiguratorUI />
                </div>
            </div>
        </div>
    );
}
