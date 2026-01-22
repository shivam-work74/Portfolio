import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Detailed } from '@react-three/drei'
import useStore from '../store/index'
import { LivingCodeShaderMaterial } from './LivingCodeShader'

const MorphingAvatar = () => {
    const currentSection = useStore((state) => state.currentSection)
    const meshRef = useRef()
    const materialRef = useRef()

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2
            meshRef.current.rotation.x += delta * 0.1
        }
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.elapsedTime
        }
    })

    // Start with a simple conditional render or geometry switch
    // Phase 2 Goal: "Design" -> Smooth, "Code" -> Wireframe

    const isCode = currentSection === 'projects' || currentSection === 'skills'

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                {/* DIFFERENT GEOMETRY based on state could happen here, or just different props */}
                {isCode ? (
                    <icosahedronGeometry args={[1.2, 0]} /> // Low poly / faceted for 'code'
                ) : (
                    <sphereGeometry args={[1.2, 64, 64]} /> // Smooth for 'design' (hero/about)
                )}

                {/* Use our LivingShader but maybe tweak wireframe prop */}
                <livingCodeShaderMaterial
                    ref={materialRef}
                    wireframe={isCode}
                    transparent
                    uColor={isCode ? [0.2, 1.0, 0.4] : [0.2, 0.5, 1.0]} // Greenish for code, Blueish for Design
                />
            </mesh>
        </Float>
    )
}

export default MorphingAvatar
