import { ReactLenis } from '@studio-freight/react-lenis'
import { useScroll } from 'framer-motion';
import { useEffect } from 'react';
import useStore from '../store';

function SmoothScroll({ children }) {
    const { scrollYProgress } = useScroll();
    const setScrollProgress = useStore((state) => state.setScrollProgress);
    const unlockAchievement = useStore((state) => state.unlockAchievement);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setScrollProgress(latest);
            if (latest > 0.98) {
                unlockAchievement(7); // Deep Diver
            }
        });
    }, [scrollYProgress, setScrollProgress, unlockAchievement]);

    return (
        <ReactLenis root options={{
            lerp: 0.08,
            duration: 1.2,
            smoothTouch: true,
            wheelMultiplier: 1,
        }}>
            {children}
        </ReactLenis>
    )
}

export default SmoothScroll;
