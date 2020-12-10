import React, { memo } from 'react'
import cxs from 'cxs'

// Utils
import clsx from 'clsx'

// Types
import { CloudimageFunc } from 'types'
import { BackgroundImgProps } from './types'

const BackgroundImg: React.FC<BackgroundImgProps> = (props) => {
  const { src, classes, children, operations, className } = props

  let backgroundSize: string | undefined
  if (operations?.func == null || operations?.func === CloudimageFunc.Bound || operations?.func === CloudimageFunc.Cover || operations?.func === CloudimageFunc.Fit) {
    backgroundSize = 'contain'
  } else if (operations?.func === CloudimageFunc.Crop || operations?.func === CloudimageFunc.Face) {
    backgroundSize = 'cover'
  } else {
    backgroundSize = 'cover'
  }

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
      backgroundSize: backgroundSize,
      backgroundPosition: 'center',
      backgroundRepeat: 'none',
    }),
  }

  return <div className={clsx(css.image, className, classes?.imageElement)}>{children}</div>
}

export default memo(BackgroundImg)
