import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-br from-black via-gray-900 to-black">
      <main className="flex flex-col items-center gap-8 max-w-2xl relative z-10 p-12 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-2xl">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/10 rounded-full border border-purple-500/20">
            Nuevo Lanzamiento
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-white from-white to-gray-400">
            Colosson 3D
          </h1>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Personaliza tu experiencia con tecnología NFC y diseño de vanguardia. Crea tu versión única ahora.
          </p>
        </div>

        <Link href="/configurator">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-bold text-black transition-all duration-300 bg-white rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-white/50 focus:outline-none pl-8 pr-6">
            Configurador 3D
            <span className="p-1 transition-transform duration-300 bg-black/10 rounded-full group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </button>
        </Link>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]"></div>
      </div>
    </div>
  );
}
