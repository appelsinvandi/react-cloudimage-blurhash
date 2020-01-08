import React, { memo, useContext } from 'react'
import cxs from 'cxs'
import { useSizeDebounce } from '../../hooks'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Constants
import { ImageSizingStrategy } from '../../constants'

// Utils
import clsx from 'clsx'

// Types
import { WrapperProps } from './types'
import { ImgSizeTypeProps } from '../../types/imgComponents'

const Wrapper: React.FC<WrapperProps & ImgSizeTypeProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { classes, type, size, ratio, onSizeUpdate, children, className, ...otherProps } = props

  const reactCloudimageBlurhashContext = useContext(ReactCloudimageContext)

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
      zIndex: 0,
      overflow: 'hidden',
      backgroundColor: reactCloudimageBlurhashContext.theme?.placeholderBackgroundColor ?? 'lightgrey',
    }

    switch (type) {
      default:
      case ImageSizingStrategy.FIT:
        return cxs({
          ...cssBase,
          width: '100%',
          height: '100%',
        })

      case ImageSizingStrategy.STATIC_DIMENSIONS:
        return cxs({
          ...cssBase,
          width: `${typeof size === 'number' ? size! : size!.width}px`,
          height: `${typeof size === 'number' ? size! : size!.height}px`,
        })

      case ImageSizingStrategy.ASPECT_RATIO:
        return cxs({
          ...cssBase,
          width: '100%',
          height: 0,
          paddingBottom: `${100 * (1 / ratio!)}%`,
        })
    }
  }
}

export default memo(Wrapper)
