import React, { useContext, memo } from 'react'
import { useCss } from 'react-use'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'

// Types
import { BackgroundImgProps } from './types'

const BackgroundImg: React.FC<BackgroundImgProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { src, classes, children, style, className, ...otherProps } = props

  const reactCloudimageBlurhashContext = useContext(ReactCloudimageContext)

  const css = {
    image: generateImageCss(),
  }

  return (
    <div
      className={clsx(css.image, className, classes?.imageElement)}
      style={{
        ...style,
        backgroundImage: `url("${src}")`,
      }}
      {...otherProps}
    >
      {children}
    </div>
  )

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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'none',
    })
  }
}

export default memo(BackgroundImg)
