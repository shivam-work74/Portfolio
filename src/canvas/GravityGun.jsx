import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef } from 'react'
import * as THREE from 'three'
import useStore from '../store/index'

// NOTE: @react-three/cannon interaction is complex.
// For a simple "Gravity Gun" effect without complex constraints, 
// we can just raycast and apply force/velocity to the physics body.
// However, getting the specific 'body' form the raycast in cannon is tricky without 'useSpring' constraint.

// SIMPLIFIED APPROACH:
// We will rely on mouse interaction. 
// Ideally, we'd use 'usePointToPointConstraint' but that requires the ref of the object.
// Since Artifacts are separate, we will implement the logic INSIDE the Artifact or pass a "Magnet" position prop.

// REVISED: Let's make GravityGun just a visual controller or state updater.
// Actually, the easiest way to do "Gravity Gun" in this setup is to have the Artifacts themselves check 
// if the mouse is clicked and pulling them.

// Let's implement a visual line here, and let the Artifact handle the pull logic 
// (or strictly speaking, a global physics event handler is better but harder to wire up).
// Let's go with the efficient approach:
// The Gun tracks the mouse. If interactions are active, it highlights.

const GravityGun = () => {
    const { mouse, camera, scene } = useThree()
    const isGravityGunActive = useStore((state) => state.isGravityGunActive)
    const setGravityGunActive = useStore((state) => state.setGravityGunActive)

    // Raycaster for visual feedback
    const raycaster = useRef(new THREE.Raycaster())

    useFrame(() => {
        // Logic to show a beam if active
    })

    // Actual physics force application is best handled by the physics object API 
    // or by updating a constraint.
    // Given the component isolation, let's keep it simple:
    // This component purely handles visual feedback for now.
    // The ACTUAL force logic will be added to the Artifact component for simplicity in Phase 4.

    return null
}

export default GravityGun
