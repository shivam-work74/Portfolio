import React, { useState } from 'react'
import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import useStore from '../store/index'
import * as THREE from 'three'

// Individual Artifact Component
const Artifact = ({ position, project, onSelect }) => {
    const [ref, api] = useBox(() => ({
        mass: 1,
        position,
        args: [1, 1, 1],
        linearDamping: 0.5,
        angularDamping: 0.5
    }))

    const [hovered, setHover] = useState(false)
    const [dragging, setDragging] = useState(false)

    const playInteractionSound = useStore((state) => state.playInteractionSound)

    useFrame((state) => {
        if (dragging) {
            // Simple "Gravity Gun" / Drag effect
            // Key idea: Move towards mouse projected at z=-5
            const destX = state.mouse.x * 10
            const destY = state.mouse.y * 10

            // "Telekinesis" style: Force position, reset velocity
            api.position.set(destX, destY, -5)
            api.velocity.set(0, 0, 0)
            api.angularVelocity.set(0, 0, 0)
        }
    })

    return (
        <mesh
            ref={ref}
            onPointerOver={() => {
                setHover(true)
                playInteractionSound() // Trigger Audio
            }}
            onPointerOut={() => setHover(false)}
            onPointerDown={(e) => {
                e.stopPropagation()
                setDragging(true)
                playInteractionSound() // Trigger Audio
            }}
            onPointerUp={(e) => {
                e.stopPropagation()
                setDragging(false)
                // Simple click-release selection
                onSelect(project)
            }}
            castShadow
            receiveShadow
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={hovered || dragging ? "#00ffff" : "#4444ff"}
                emissive={hovered || dragging ? "#00ffff" : "#000000"}
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.8}
                wireframe={false}
            />
        </mesh>
    )
}

const ProjectArtifacts = () => {
    // 3 Placeholder projects
    const projects = [
        { id: 1, name: "Project Alpha" },
        { id: 2, name: "Project Beta" },
        { id: 3, name: "Project Gamma" },
        { id: 4, name: "Project Delta" }
    ]

    // Positioned in the "Tunnel" where the "Projects" section is roughly expected
    const positions = [
        [-2, 0, -5],
        [2, 1, -5],
        [-1, -2, -6],
        [1, 2, -6]
    ]

    const setSelectedProject = useStore((state) => state.setSelectedProject)

    return (
        <group>
            {projects.map((proj, i) => (
                <Artifact
                    key={proj.id}
                    position={positions[i]}
                    project={proj}
                    onSelect={setSelectedProject}
                />
            ))}
        </group>
    )
}

export default ProjectArtifacts
