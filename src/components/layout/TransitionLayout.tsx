import { TransitionContext } from 'context/TransitionContext';
import { useState, useContext, useLayoutEffect } from 'react';
import type { TransitionContextI } from 'types/TransitionContext';
import { timeline } from 'motion';

const TransitionLayout: React.FC = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { sequence, setSequence } = useContext(TransitionContext) as TransitionContextI;

  useLayoutEffect(() => {
    if (children !== displayChildren) {
      if (sequence.length == 0) {
        setDisplayChildren(children);
      } else {
        const animation = timeline(sequence);
        animation.finished.then(() => {
          setDisplayChildren(children);
        })
      }
    }
  }, [children]);

  return <> {displayChildren} </>;
};

export default TransitionLayout;
