import React, { useContext, memo } from 'react'
import { useCss } from 'react-use'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'

// Types
import { ImgProps } from './types'

const Img: React.FC<ImgProps & React.HTMLAttributes<HTMLImageElement>> = (props) => {
  const { src, classes, className, ...otherProps } = props

  const reactCloudimageBlurhashContext = useContext(ReactCloudimageContext)

  const css = {
    image: generateImageCss(),
  }

  return <img src={src} className={clsx(css.image, className, classes?.imageElement)} {...otherProps} />

  function generateImageCss() {
    return useCss({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 0,
      width: '100%',
      height: '100%',
      backgroundColor: reactCloudimageBlurhashContext.theme?.placeholderBackgroundColor ?? 'lightgrey',
    })
  }
}

export default memo(Img)
