import React, { memo } from 'react'
import { useCss } from 'react-use'
import { useSizeDebounce } from '../../hooks'

// Constants
import { ImageSizingStrategy } from '../../constants'

// Utils
import clsx from 'clsx'

// Types
import { WrapperProps } from './types'
import { ImgSizeTypeProps } from '../../types/imgComponents'

const Wrapper: React.FC<WrapperProps & ImgSizeTypeProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { classes, type, size, ratio, onSizeUpdate, children, className, ...otherProps } = props

  const wrapperElementRef = useSizeDebounce((size) => {
    if (onSizeUpdate) {
      onSizeUpdate(size)
    }
  })

  const css = {
    wrapper: generateWrapperCss(),
  }

  return (
    <div ref={wrapperElementRef} className={clsx(css.wrapper, className, classes?.wrapper)} {...otherProps}>
      {children}
    </div>
  )

  function generateWrapperCss(): string {
    const cssBase = {
      position: 'relative',
      overflow: 'hidden',
    }

    switch (type) {
      default:
      case ImageSizingStrategy.FIT:
        return useCss({
          ...cssBase,
          width: '100%',
          height: '100%',
        })

      case ImageSizingStrategy.STATIC_DIMENSIONS:
        return useCss({
          ...cssBase,
          width: `${typeof size === 'number' ? size! : size!.width}px`,
          height: `${typeof size === 'number' ? size! : size!.height}px`,
        })

      case ImageSizingStrategy.ASPECT_RATIO:
        return useCss({
          ...cssBase,
          width: '100%',
          height: 0,
          paddingTop: `${100 * (1 / ratio!)}%`,
        })
    }
  }
}

export default memo(Wrapper)
