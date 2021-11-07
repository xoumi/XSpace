import { gsap } from 'gsap'
import { useRef, useLayoutEffect } from 'react'
import { isEqual } from 'lodash-es'

export default function useFlip (refs: Array<null | HTMLElement>): void {
  const prev = useRef(refs)
  const previous = prev.current.map((ref) => ref !== null ? ref.getBoundingClientRect() : null)

  useLayoutEffect(() => {
    refs.forEach((ref, i: number) => {
      const prev = previous[i]
      const current = ref?.getBoundingClientRect()
      if (prev != null && current != null && !isEqual(prev, current)) {
        gsap.from(ref, {
          x: prev.x - current.x,
          y: prev.y - current.y,
          scaleX: prev.width / current.width,
          scaleY: prev.height / current.height,
          transformOrigin: 'top left',
          ease: 'power3.inOut',
          onComplete: () => { gsap.set(ref, { clearProps: 'all' }) }
        })
      }
    })
    prev.current = refs
  })
}
