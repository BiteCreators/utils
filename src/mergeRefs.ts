import React from 'react'

/**
 * Merges refs into one
 */

export const mergeRefs = <T = any>(
  refs: Array<React.LegacyRef<T> | React.MutableRefObject<T> | null | undefined>
): React.RefCallback<T> => {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
