import { CloudimageContextConfig } from '../components/CloudimageProvider'
import { CloudimageFilters } from './cloudimageFilters'
import { CloudimageOperations } from './cloudimageOperations'
import { ComponentType } from '../constants'
import { LazyLoadProps } from 'react-lazyload'

export interface ImgBaseClasses {
  blurredPlaceholder?: string
  content?: string
  image?: string
  root?: string
}

export interface ImgBaseProps {
  alt?: string
  blurhash?: string
  classes?: ImgBaseClasses
  className?: string
  config?: CloudimageContextConfig
  filters?: CloudimageFilters
  noLazyLoad?: boolean
  lazyLoadOptions?: LazyLoadProps
  operations?: CloudimageOperations
  src: string
  type: ComponentType
}
export interface ImgSizeHeightBoundRatioProps extends ImgBaseProps {
  type: ComponentType.HEIGHT_BOUND_RATIO
  /**
   * The ratio to use for calculating the width of the image to fetch.
   * This should be a float, ex.: 16/9.
   */
  ratio: number
}
export interface ImgSizeFitProps extends ImgBaseProps {
  type: ComponentType.FIT
}
export interface ImgSizeStaticDimensionsProps extends ImgBaseProps {
  type: ComponentType.STATIC_DIMENSIONS
  /**
   * The exact image size to fetch from Cloudimage.
   * If only a number is provided, it will be fetched in aspect ratio 1:1.
   */
  size:
    | {
        height: number
        width: number
      }
    | number
}
export interface ImgSizeWidthBoundRatioProps extends ImgBaseProps {
  type: ComponentType.WIDTH_BOUND_RATIO
  /**
   * The ratio to use for calculating the height of the image to fetch.
   * This should be a float, ex.: 16/9.
   */
  ratio: number
}

export interface ImgBaseState {
  isImageLoaded: boolean
  monitoredDimensions: {
    height: number
    width: number
  }
  previousImageUrl: string | null
}
