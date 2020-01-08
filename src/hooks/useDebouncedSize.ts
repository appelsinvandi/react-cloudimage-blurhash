import { useState } from 'react'
import useDebounce from 'react-use/lib/useDebounce'
import useMeasure from 'react-use/lib/useMeasure'

// Types
import { WidthAndHeight } from '../types/imgComponents'

export const useSizeDebounce = (onNewSize: (size: WidthAndHeight) => void) => {
  const [savedDimensions, setSavedDimensions] = useState({ width: 0, height: 0 })
  const [ref, { width, height }] = useMeasure()

  useDebounce(
    () => {
      const ceiledWidth = Math.ceil(width / 100) * 100
      const ceiledHeight = Math.ceil(height / 100) * 100

      if ((onNewSize && savedDimensions.width < ceiledWidth) || savedDimensions.height < ceiledHeight) {
        setSavedDimensions({ width: ceiledWidth, height: ceiledHeight })
        onNewSize({ width: ceiledWidth, height: ceiledHeight })
      }
    },
    200,
    [width, height]
  )

  return ref
}
