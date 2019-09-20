import * as React from 'react'

// Utils
import clsx from 'clsx'
import { generateBlurhashElement } from '../../utils'

// Styles
import { generateBackgroundImgBlurredPlaceholderStyles } from './BlurhashBackgroundImage.styles'

interface ComponentProps {
  hash: string
  isLoaded: boolean
}
export type BlurhashBackgroundImageProps = ComponentProps & React.HTMLAttributes<HTMLDivElement>

const BlurhashBackgroundImage: React.FC<BlurhashBackgroundImageProps> = ({
  hash,
  isLoaded,
  className,
  ...otherProps
}) => {
  const blurhashUri = React.useMemo(() => generateBlurhashElement(hash).toDataURL(), [hash])

  return (
    <div
      style={{
        ...generateBackgroundImgBlurredPlaceholderStyles(isLoaded),
        backgroundImage: `url(${blurhashUri})`,
      }}
      className={clsx(className, { 'state__is-loaded': isLoaded })}
      {...otherProps}
    />
  )
}

export default React.memo(BlurhashBackgroundImage)
