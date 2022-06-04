import { TimelineDefinition } from "@motionone/dom/types/timeline/types"

export interface TransitionContextI {
  sequence: TimelineDefinition
  setSequence: React.Dispatch<React.SetStateAction<TimelineDefinition>>
}

export interface TransitionProviderProps {
  children: React.ReactElement
}
