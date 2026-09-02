import { useEffect } from 'react'
import type { RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Shared Memphis card pointer interaction.
 *
 * Extracted from the Engineer Mode / Hero pointer-parallax pattern: the cursor
 * position is normalized to [-1, 1] on both axes and written to `--px` / `--py`
 * custom properties inside a requestAnimationFrame. The card's CSS uses those
 * variables for a restrained follow/tilt so every card behaves identically.
 *
 * Disabled for touch devices (no hover-capable fine pointer) and when the user
 * prefers reduced motion, matching the Hero interaction guards.
 */
export function useCardTilt<T extends HTMLElement>(ref: RefObject<T | null>) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        node.style.setProperty('--px', x.toFixed(3))
        node.style.setProperty('--py', y.toFixed(3))
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        node.style.setProperty('--px', '0')
        node.style.setProperty('--py', '0')
      })
    }

    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, reduced])
}
