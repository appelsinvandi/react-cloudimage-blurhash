import React, { useRef, useEffect, memo } from 'react'
import { useCss } from 'react-use'

// Utils
import clsx from 'clsx'

// Types
import { PlaceholderTinyBlurProps } from './types'

const PlaceholderTinyBlur: React.FC<PlaceholderTinyBlurProps & React.HTMLAttributes<HTMLImageElement>> = (props) => {
  const { src, isMainImageLoaded, className, classes, ...otherProps } = props

  const componentRef = useRef<HTMLDivElement>(null)
  const [imgDimensions, setImgDimensions] = React.useState({ width: 0, height: 0 })

  useEffect(() => {
    const width = Math.floor((componentRef.current?.clientWidth || 0) / 10)
    const height = Math.floor((componentRef.current?.clientHeight || 0) / 10)

    if (imgDimensions.width !== width && imgDimensions.height !== height) {
      setImgDimensions({ width, height })
    }
  })

  const css = {
    placeholderImage: generatePlaceholderImageCss(),
  }

  return (
    // @ts-ignore
    <img
      {...otherProps}
      className={clsx(css.placeholderImage, className, classes?.placeholderImage, {
        'is-loaded': isMainImageLoaded,
      })}
      src={src}
    />
  )

  function generatePlaceholderImageCss() {
    return useCss({
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
      '&.is-loaded': {
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out 0s',
      },
    })
  }
}

export default memo(PlaceholderTinyBlur)
