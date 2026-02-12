"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Model } from './Model';

function Loader() {
    return (
        <Html center>
            <div className="text-white text-sm font-bold animate-pulse">Cargando Modelo...</div>
        </Html>
    )
}

export default function Experience() {
    return (
        <div className="w-full h-full min-h-[50vh] lg:min-h-screen bg-black/5 relative">
            <Canvas shadows camera={{ position: [0, 0, 18], fov: 45 }}>
                <color attach="background" args={['#ffffff']} />

                <group position={[0, -0.5, 0]}>
                    <Suspense fallback={<Loader />}>
                        <Model />
                    </Suspense>
                </group>

                {/* Brighter 3-Point Lighting Setup */}
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 5, 5]} intensity={2.5} castShadow />
                <directionalLight position={[-5, 5, 5]} intensity={1.5} />
                <spotLight position={[0, 10, -10]} intensity={2} angle={0.5} penumbra={1} />

                <OrbitControls
                    makeDefault
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
