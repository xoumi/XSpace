import { useState, createContext } from 'react';
import { TimelineDefinition } from '@motionone/dom/types/timeline/types';
import type { TransitionContextI, TransitionProviderProps } from 'types/TransitionContext';

const TransitionContext = createContext<TransitionContextI | Record<string, unknown>>({});

const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }): React.ReactElement => {
  const [sequence, setSequence] = useState<TimelineDefinition>([]);

  return (
    <TransitionContext.Provider
      value={{
        sequence,
        setSequence,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};
export default TransitionProvider;
export { TransitionContext };
