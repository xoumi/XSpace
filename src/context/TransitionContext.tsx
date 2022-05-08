import { useState, createContext } from 'react';
import gsap from 'gsap';
import type { TransitionContextI, TransitionProviderProps } from 'types/TransitionContext';

const TransitionContext = createContext<TransitionContextI | Record<string, unknown>>({});

const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }): React.ReactElement => {
  const [timeline, setTimeline] = useState(() => gsap.timeline({ paused: true }));

  return (
    <TransitionContext.Provider
      value={{
        timeline,
        setTimeline,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};
export default TransitionProvider;
export { TransitionContext };
