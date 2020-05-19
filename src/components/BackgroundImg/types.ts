// Constants
import { ImageSizingStrategy } from '../../constants'

// Types
import { ImgBaseProps, WidthAndHeight } from '../../types/imgComponents'
import { LazyLoadProps } from 'react-lazyload'

export interface BackgroundImgPlainProps extends ImgBaseProps {
  lazyLoad?: boolean
  lazyLoadOptions?: LazyLoadProps
  classes?: BackgroundImgPlainClasses
  type: ImageSizingStrategy
  ratio?: number
  size?: WidthAndHeight | number
}

export interface BackgroundImgBlurhashProps extends ImgBaseProps {
  hash: string
  lazyLoad?: boolean
  lazyLoadOptions?: LazyLoadProps
  classes?: BackgroundImgPlaceholderClasses
  type: ImageSizingStrategy
  ratio?: number
  size?: WidthAndHeight | number
}

export interface BackgroundImgTinyBlurProps extends ImgBaseProps {
  lazyLoad?: boolean
  lazyLoadOptions?: LazyLoadProps
  classes?: BackgroundImgPlaceholderClasses
  type: ImageSizingStrategy
  ratio?: number
  size?: WidthAndHeight | number
}

export interface BackgroundContentProps {
  classes?: BackgroundContentClasses
}

export interface BackgroundImgPlainClasses {
  wrapper?: string
  image?: string
  content?: string
}

export interface BackgroundImgPlaceholderClasses {
  wrapper?: string
  placeholder?: string
  image?: string
  content?: string
}

export interface BackgroundContentClasses {
  contentElement?: string
}
