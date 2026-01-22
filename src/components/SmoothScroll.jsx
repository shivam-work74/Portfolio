import { ReactLenis } from '@studio-freight/react-lenis'

function SmoothScroll({ children }) {
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
