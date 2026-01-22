import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useStore from '../store/index'

const ScrollManager = () => {
    const scroll = useScroll()
    const setScrollProgress = useStore((state) => state.setScrollProgress)
    const setSection = useStore((state) => state.setSection)
    const setTransitioning = useStore((state) => state.setTransitioning)
    const currentSection = useStore((state) => state.currentSection)

    useFrame(() => {
        // scroll.offset is 0 to 1
        const offset = scroll.offset
        setScrollProgress(offset)

        // Determine new section based on thresholds
        let newSection = 'hero'
        if (offset < 0.2) newSection = 'hero'
        else if (offset < 0.4) newSection = 'about'
        else if (offset < 0.6) newSection = 'projects'
        else if (offset < 0.8) newSection = 'skills'
        else newSection = 'contact'

        // Trigger transition if section changed
        if (newSection !== currentSection) {
            setSection(newSection)
            setTransitioning(true)
            // Turn off glitch after 300ms
            setTimeout(() => setTransitioning(false), 300)
        }
    })

    return null
}

export default ScrollManager
