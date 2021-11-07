export interface TransitionContextI {
  timeline: gsap.core.Timeline
  setTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline>>
}

export interface TransitionProviderProps {
  children: React.ReactElement
}
