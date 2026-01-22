import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sparkles, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// "The Neural Void" - High visibility particle field
const ParticleField = () => {
    const ref = useRef();
    // High count for density, divisible by 3
    const sphere = useMemo(() => random.inSphere(new Float32Array(15000), { radius: 3.5 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 50;
        ref.current.rotation.y -= delta / 60;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#aaafff" // Slight blue tint for tech feel
                    size={0.005}    // Larger size for visibility
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}   // High opacity
                    blending={2}    // Additive blending (THREE.AdditiveBlending)
                />
            </Points>
        </group>
    );
};

// "The Hyper-Structure" - Rotating wireframe globe
const HyperStructure = () => {
    const meshRef = useRef();
    const outerRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.y = t * 0.05;
        outerRef.current.rotation.y = -t * 0.02;
        outerRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
    });

    return (
        <group>
            {/* Core Icosahedron */}
            <mesh ref={meshRef} scale={[2.5, 2.5, 2.5]}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color="#4F46E5" // Electric Indigo
                    wireframe
                    opacity={0.15}
                    transparent
                />
            </mesh>

            {/* Outer Geodesic Sphere overlay */}
            <mesh ref={outerRef} scale={[4, 4, 4]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    opacity={0.05}
                    transparent
                />
            </mesh>
        </group>
    );
}

const Scene = () => {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <color attach="background" args={['#050505']} />

                <Suspense fallback={null}>
                    <ParticleField />
                    <HyperStructure />
                    {/* Floating localized sparkles for depth */}
                    <Sparkles count={100} scale={6} size={4} speed={0.4} opacity={0.5} color="#FF4F00" />

                    <ambientLight intensity={1} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
