import React, { useRef, useEffect, memo, useMemo, useContext, useState } from 'react'
import cxs from 'cxs'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'

// Types
import { PlaceholderTinyBlurProps } from './types'

const PlaceholderTinyBlur: React.FC<PlaceholderTinyBlurProps & React.HTMLAttributes<HTMLImageElement>> = (props) => {
  const { src, isMainImageLoaded, className, classes, ...otherProps } = props
  const reactCloudimageBlurhashContext = useContext(ReactCloudimageContext)

  const componentRef = useRef<HTMLDivElement>(null)
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const width = Math.floor((componentRef.current?.clientWidth || 0) / 10)
    const height = Math.floor((componentRef.current?.clientHeight || 0) / 10)

    if (imgDimensions.width !== width && imgDimensions.height !== height) {
      setImgDimensions({ width, height })
    }
  })

  // Skip render if the src is missing (invalid)
  if (src == null) {
    return null
  }

  const css = {
    placeholderImage: cxs({
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      zIndex: 10,
      width: '100%',
      height: '100%',
      filter: 'blur(10px)',
      opacity: 1,
      backgroundColor: reactCloudimageBlurhashContext.theme?.placeholderBackgroundColor ?? 'lightgrey',
      '.is-loaded': {
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out 0s',
      },
    }),
  }

  return useMemo(
    () => (
      <img
        className={clsx(css.placeholderImage, className, classes?.placeholderImage, {
          'is-loaded': isMainImageLoaded,
        })}
        src={src}
        {...otherProps}
      />
    ),
    [classes, className, isMainImageLoaded, otherProps]
  )
}

export default memo(PlaceholderTinyBlur)
