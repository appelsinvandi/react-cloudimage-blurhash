import { CloudimageFilters } from './cloudimageFilters'
import { CloudimageOperations } from './cloudimageOperations'
import { ImageSizingStrategy } from '../constants'
import { LazyLoadProps } from 'react-lazyload'

export interface WidthAndHeight {
  width: number
  height: number
}
export interface ImgBaseProps {
  alt?: string
  filters?: CloudimageFilters
  noLazyLoad?: boolean
  lazyLoadOptions?: LazyLoadProps
  operations?: CloudimageOperations
  src: string
}
export interface ImgSizeFitProps {
  type: ImageSizingStrategy.FIT
}
export interface ImgSizeStaticDimensionsProps {
  type: ImageSizingStrategy.STATIC_DIMENSIONS
  /**
   * The exact image size to fetch from Cloudimage.
   * If only a number is provided, it will be fetched in aspect ratio 1:1.
   */
  size: WidthAndHeight | number
}
export interface ImgSizeWidthBoundRatioProps {
  type: ImageSizingStrategy.ASPECT_RATIO
  /**
   * The ratio to use for calculating the height of the image to fetch.
   * This should be a float, ex.: 16/9.
   */
  ratio: number
}
export type ImgSizeTypeProps = ImgSizeFitProps | ImgSizeStaticDimensionsProps | ImgSizeWidthBoundRatioProps
