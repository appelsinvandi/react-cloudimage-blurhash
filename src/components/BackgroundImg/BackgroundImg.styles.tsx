import { ComponentType } from '../../constants'
import {
  ImgBaseClasses,
  ImgBaseProps,
  ImgSizeFitProps,
  ImgSizeHeightBoundRatioProps,
  ImgSizeStaticDimensionsProps,
  ImgSizeWidthBoundRatioProps,
} from '../../types/imgComponents'
import { CSSProperties } from 'react'

interface ImgBackgroundClasses {
  childWrapper?: string
}
export type BackgroundImgClasses = ImgBaseClasses & ImgBackgroundClasses

export function generateBackgroundImgRootStyles(
  componentProps: ImgBaseProps &
    (ImgSizeHeightBoundRatioProps | ImgSizeFitProps | ImgSizeStaticDimensionsProps | ImgSizeWidthBoundRatioProps)
): CSSProperties {
  switch (componentProps.type) {
    case ComponentType.HEIGHT_BOUND_RATIO:
      return {
        position: 'relative',
        boxSizing: 'border-box',
        paddingLeft: `${100 * componentProps.ratio}%`,
        height: `100%`,
      }

    case ComponentType.STATIC_DIMENSIONS:
      return {
        position: 'relative',
        boxSizing: 'border-box',
        width: `${typeof componentProps.size === 'number' ? componentProps.size : componentProps.size.width}px`,
        height: `${typeof componentProps.size === 'number' ? componentProps.size : componentProps.size.height}px`,
      }

    case ComponentType.WIDTH_BOUND_RATIO:
      return {
        position: 'relative',
        boxSizing: 'border-box',
        paddingTop: `${100 * (1 / componentProps.ratio)}%`,
        width: `100%`,
      }

    case ComponentType.FIT:
    default:
      return {
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      }
  }
}

export function generateBackgroundImgContentStyles(): CSSProperties {
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
}

export function generateBackgroundImgImageStyles(): CSSProperties {
  return {
    height: '100%',
    width: '100%',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}

export function generateBackgroundImgChildWrapperStyles(): CSSProperties {
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
}
