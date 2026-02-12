"use client";

import React, { useEffect, useState } from 'react';
import { Html, useGLTF, Center } from '@react-three/drei';
import { useConfigStore } from '@/utils/store';
import * as THREE from 'three';

export function Model() {
    const { color, secondaryColor, nfcEnabled, customText, useCustomText, selectedModel } = useConfigStore();
    const { scene } = useGLTF(selectedModel);

    // Determine scale based on model type
    const isCorazon = selectedModel.includes('CORAZON');
    const isDecoracion = selectedModel.includes('Decoracion2');
    const isOso = selectedModel.includes('Oso');

    // Default scale logic
    let modelScale = 0.25;

    if (isCorazon) {
        modelScale = 0.1;
    } else if (isDecoracion) {
        modelScale = 0.08;
    } else if (isOso) {
        modelScale = 0.12; // Reduced from 0.2 to zoom out
    }

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                // Clone material to avoid shared state issues if revisited
                if (mesh.material) {
                    const materialName = (mesh.material as THREE.Material).name;
                    const meshName = mesh.name;
                    const newMaterial = (mesh.material as THREE.Material).clone();

                    // Apply Colors
                    if ('color' in newMaterial) {
                        const standardMat = newMaterial as THREE.MeshStandardMaterial; // Cast for TS

                        if (isDecoracion) {
                            // Logic for Decoracion2: Dual Color
                            // Check for "holder" or "MaterialBase" -> Primary Color
                            // Check for "Rose" or "CoraMaterial" -> Secondary Color
                            if (meshName.includes('holder') || materialName.includes('MaterialBase')) {
                                standardMat.color.set(color);
                            } else if (meshName.includes('Rose') || materialName.includes('CoraMaterial')) {
                                standardMat.color.set(secondaryColor);
                            } else {
                                // Default fallback for other parts of Decoracion2
                                standardMat.color.set(color);
                            }
                        } else {
                            // Logic for Manos / Corazon: Single Color
                            standardMat.color.set(color);
                        }
                    }

                    // Improve material shading
                    if ('roughness' in newMaterial) {
                        (newMaterial as THREE.MeshStandardMaterial).roughness = 0.3;
                    }
                    if ('metalness' in newMaterial) {
                        (newMaterial as THREE.MeshStandardMaterial).metalness = 0.1;
                    }

                    mesh.material = newMaterial;
                }
            }
        });
    }, [scene, color, secondaryColor, isDecoracion, selectedModel]); // Re-run if model or colors change

    return (
        <group dispose={null}>
            <Center position={[0, 0, 0]}>
                <primitive object={scene} scale={modelScale} />
            </Center>




        </group>
    );
}
