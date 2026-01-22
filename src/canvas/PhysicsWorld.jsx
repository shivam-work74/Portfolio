import React from 'react'
import { Physics } from '@react-three/cannon'

const PhysicsWorld = ({ children }) => {
    return (
        <Physics gravity={[0, 0, 0]} defaultContactMaterial={{ restitution: 0.9 }}>
            {children}
        </Physics>
    )
}

export default PhysicsWorld
