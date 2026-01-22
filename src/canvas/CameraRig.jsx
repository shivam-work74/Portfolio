import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import useStore from '../store/index'

const CameraRig = ({ children }) => {
    const group = useRef()
    const scrollProgress = useStore((state) => state.scrollProgress)

    useFrame((state, delta) => {
        // Basic "breathing" or "floating" motion
        // Move slightly on sine waves
        const t = state.clock.elapsedTime

        // Phase 3: Scroll-jacking / Tunnel Effect
        // Start at z=5, end at z=-15
        const targetZ = 5 - (scrollProgress * 20)

        state.camera.position.z = THREE.MathUtils.lerp(
            state.camera.position.z,
            targetZ,
            0.1
        )

        state.camera.position.y = THREE.MathUtils.lerp(
            state.camera.position.y,
            Math.sin(t * 0.5) * 0.2, // Amplitude 0.2, Frequency 0.5
            0.1
        )

        // Slight parallax based on mouse
        // state.pointer.x is -1 to 1
        state.camera.position.x = THREE.MathUtils.lerp(
            state.camera.position.x,
            state.pointer.x * 0.5,
            0.05
        )

        // Look at center (0,0,0) or slightly forward
        state.camera.lookAt(0, 0, targetZ - 10)
    })

    return <group ref={group}>{children}</group>
}

export default CameraRig
