import { CSSProperties } from 'react'

export function generateBackgroundImgBlurredPlaceholderStyles(isLoaded: boolean): CSSProperties {
  return {
    position: 'absolute',

    height: '100%',
    width: '100%',

    backgroundSize: 'cover',
    backgroundPosition: 'center',

    opacity: isLoaded ? 0 : 1,
    transition: 'opacity .3s ease-in-out',
  }
}
