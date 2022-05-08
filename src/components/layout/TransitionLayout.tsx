import { TransitionContext } from 'context/TransitionContext';
import { useState, useContext, useLayoutEffect } from 'react';
import type { TransitionContextI } from 'types/TransitionContext';

const TransitionLayout: React.FC = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timeline } = useContext(TransitionContext) as TransitionContextI;

  useLayoutEffect(() => {
    if (children !== displayChildren) {
      if (timeline.duration() === 0) {
        setDisplayChildren(children);
      } else {
        timeline
          .play()
          .then(() => {
            timeline.seek(0).pause().clear();
            setDisplayChildren(children);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [children]);

  return <> {displayChildren} </>;
};

export default TransitionLayout;
