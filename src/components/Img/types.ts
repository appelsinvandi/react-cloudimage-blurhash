// Constants
import { ImageSizingStrategy } from '../../constants'

// Types
import { ImgBaseProps, WidthAndHeight } from '../../types/ImgComponents'
import { LazyLoadProps } from 'react-lazyload'

export interface ImgPlainProps extends ImgBaseProps {
  lazyLoad?: boolean
  lazyLoadOptions?: LazyLoadProps
  classes?: ImgPlainClasses
  type: ImageSizingStrategy
  ratio?: number
  size?: WidthAndHeight | number
}

export interface ImgBlurhashProps extends ImgBaseProps {
  hash: string
  lazyLoad?: boolean
  lazyLoadOptions?: LazyLoadProps
  classes?: ImgPlaceholderClasses
  type: ImageSizingStrategy
  ratio?: number
  size?: WidthAndHeight | number
}

export interface ImgTinyBlurProps extends ImgBaseProps {
  lazyLoad?: boolean
  lazyLoadOptions?: LazyLoadProps
  classes?: ImgPlaceholderClasses
  type: ImageSizingStrategy
  ratio?: number
  size?: WidthAndHeight | number
}

export interface ImgPlainClasses {
  wrapper?: string
  image?: string
}

export interface ImgPlaceholderClasses {
  wrapper?: string
  placeholder?: string
  image?: string
}
