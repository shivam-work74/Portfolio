import React from 'react'
import { EffectComposer, Bloom, ChromaticAberration, Glitch } from '@react-three/postprocessing'
import { Vector2 } from 'three'
import useStore from '../store/index'

const Effects = () => {
    const isTransitioning = useStore((state) => state.isTransitioning)

    return (
        <EffectComposer disableNormalPass>
            {/* 
               Bloom: Gives that "Neon" / "Cyberpunk" glow 
               luminanceThreshold: 0.2 means pixels brighter than 0.2 will glow
               mipmapBlur: Makes the glow softer/higher quality
            */}
            <Bloom
                luminanceThreshold={0.2}
                mipmapBlur
                intensity={1.5}
                radius={0.4}
            />

            {/* 
               Chromatic Aberration: Simulates lens imperfection (RGB split) 
               offset: Amount of split
            */}
            {/* <ChromaticAberration 
                offset={new Vector2(0.002, 0.002)} 
            /> */}

            {/* 
               Glitch: Active mainly during transitions for "Digital" feel
               active: Controlled by store
            */}
            {/* <Glitch 
                active={isTransitioning}
                delay={new Vector2(0, 0)} // No delay when active
                duration={new Vector2(0.3, 0.5)} 
                strength={new Vector2(0.3, 1.0)}
                ratio={0.85}
            /> */}
        </EffectComposer>
    )
}

export default Effects
