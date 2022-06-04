import { animate } from 'motion'
import { useRef, useLayoutEffect } from 'react'
import { isEqual } from 'lodash-es'

export default function useFlip (refs: Array<null | HTMLElement>): void {
  const prev = useRef(refs)
  const previous = prev.current.map((ref) => ref !== null ? ref.getBoundingClientRect() : null)

  useLayoutEffect(() => {
    refs.forEach((ref, i: number) => {
      const prev = previous[i]
      const current = ref?.getBoundingClientRect()
      if (prev != null && current != null && !isEqual(prev, current) && ref !== null) {
        animate(ref, {
          transform: `
            translate(${prev.x - current.x}px, ${prev.y - current.y}px)
            scale(${prev.width / current.width}, ${prev.height / current.height})
          `,
        }, {
          duration: 10,
          easing: [.7, .2, .35, 1],
          direction: 'reverse'
        }).finished.then(() => ref.removeAttribute('style'))
      }
    })
    prev.current = refs
  })
}
