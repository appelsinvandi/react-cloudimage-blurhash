import React, { useRef, useEffect, memo, useMemo, useContext, useState } from 'react'
import cxs from 'cxs'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'

// Types
import { PlaceholderTinyBlurProps } from './types'

const PlaceholderTinyBlur: React.FC<PlaceholderTinyBlurProps> = (props) => {
  const { cloudimageUrl, isMainImageLoaded, className, classes } = props
  const reactCloudimageContext = useContext(ReactCloudimageContext)

  const componentRef = useRef<HTMLDivElement>(null)
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const width = Math.floor((componentRef.current?.clientWidth || 0) / 10)
    const height = Math.floor((componentRef.current?.clientHeight || 0) / 10)

    if (imgDimensions.width !== width && imgDimensions.height !== height) {
      setImgDimensions({ width, height })
    }
  })

  const blurAmount = 4
  let tinyCloudimageUrl: null | string = null
  if (cloudimageUrl != null) {
    tinyCloudimageUrl = cloudimageUrl
      .replace(/width=(\d+)/gi, (_m, v) => `width=${Math.floor(Number(v) / blurAmount)}`)
      .replace(/height=(\d+)/gi, (_m, v) => `height=${Math.floor(Number(v) / blurAmount)}`)
  }
  const css = {
    placeholderImage: cxs({
      position: 'absolute',
      top: `-${blurAmount}px`,
      right: `-${blurAmount}px`,
      bottom: `-${blurAmount}px`,
      left: `-${blurAmount}px`,
      zIndex: 10,
      width: `calc(100% + ${blurAmount * 2}px)`,
      height: `calc(100% + ${blurAmount * 2}px)`,
      filter: `blur(${blurAmount}px)`,
      opacity: 1,
      backgroundColor: reactCloudimageContext.theme?.placeholderBackgroundColor ?? 'lightgrey',
      '.is-loaded': {
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out 0s',
      },
    }),
  }

  return useMemo(() => {
    return (
      <img
        className={clsx(css.placeholderImage, className, classes?.placeholderImage, {
          'is-loaded': isMainImageLoaded,
        })}
        src={tinyCloudimageUrl!}
      />
    )
  }, [tinyCloudimageUrl, classes, className, isMainImageLoaded])
}

export default memo(PlaceholderTinyBlur)
