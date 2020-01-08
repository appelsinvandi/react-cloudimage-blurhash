import React, { memo } from 'react'
import cxs from 'cxs'

// Utils
import clsx from 'clsx'

// Types
import { BackgroundImgProps } from './types'

const BackgroundImg: React.FC<BackgroundImgProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { src, classes, children, className, ...otherProps } = props

  const css = {
    image: cxs({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url("${src}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'none',
    }),
  }

  return (
    <div className={clsx(css.image, className, classes?.imageElement)} {...otherProps}>
      {children}
    </div>
  )
}

export default memo(BackgroundImg)
