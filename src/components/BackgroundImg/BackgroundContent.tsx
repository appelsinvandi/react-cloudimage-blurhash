import React from 'react'
import cxs from 'cxs'

// Utils
import clsx from 'clsx'

// Types
import { BackgroundContentProps } from './types'

const BackgroundContent: React.FC<BackgroundContentProps & React.HTMLAttributes<HTMLDivElement>> = ({
  classes,
  className,
  children,
  ...otherProps
}) => {
  const css = {
    content: cxs({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 20,
      width: '100%',
      height: '100%',
    }),
  }

  return (
    <div className={clsx(css.content, className, classes?.contentElement)} {...otherProps}>
      {children}
    </div>
  )
}

export default BackgroundContent
