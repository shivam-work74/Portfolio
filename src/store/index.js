import { create } from 'zustand'

const useStore = create((set) => ({
    // 'hero', 'about', 'skills', 'projects', etc.
    currentSection: 'hero',
    hasStarted: false,
    scrollProgress: 0,

    // Actions to update state
    setSection: (section) => set({ currentSection: section }),
    setStarted: (started) => set({ hasStarted: started }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),

    // Phase 4
    selectedProject: null,
    setSelectedProject: (project) => set({ selectedProject: project }),
    isGravityGunActive: false,
    setGravityGunActive: (active) => set({ isGravityGunActive: active }),

    // Phase 5
    isTransitioning: false,
    setTransitioning: (active) => set({ isTransitioning: active }),

    // Phase 6
    isMuted: false,
    setMuted: (muted) => set({ isMuted: muted }),
    interactionSoundTrigger: 0, // specialized trigger to listen to
    playInteractionSound: () => set((state) => ({ interactionSoundTrigger: state.interactionSoundTrigger + 1 })),

    // Achievement System
    unlockedAchievements: [],
    unlockAchievement: (id) => set((state) => {
        if (state.unlockedAchievements.includes(id)) return state;
        return { unlockedAchievements: [...state.unlockedAchievements, id] };
    }),
}))

export default useStore
