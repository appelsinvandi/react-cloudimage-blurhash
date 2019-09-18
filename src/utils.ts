import { decode } from 'blurhash'
import { ComponentType } from './constants'
import {
  ImgBaseProps,
  ImgBaseState,
  ImgSizeFitProps,
  ImgSizeHeightBoundRatioProps,
  ImgSizeStaticDimensionsProps,
  ImgSizeWidthBoundRatioProps,
} from './types/imgComponents'

export function generateCloudimageUrl(
  token: string,
  src: string,
  componentProps: ImgBaseProps &
    (ImgSizeHeightBoundRatioProps | ImgSizeFitProps | ImgSizeStaticDimensionsProps | ImgSizeWidthBoundRatioProps),
  componentState: ImgBaseState
): string {
  const url = new URL(`https://${token}.cloudimg.io/v7/${src}`)

  let width
  let height
  switch (componentProps.type) {
    default:
    case ComponentType.FIT:
      height = componentState.monitoredDimensions.height
      width = componentState.monitoredDimensions.width
      break

    case ComponentType.HEIGHT_BOUND_RATIO:
      height = componentState.monitoredDimensions.height
      width = componentState.monitoredDimensions.height * componentProps.ratio
      break

    case ComponentType.STATIC_DIMENSIONS:
      height = typeof componentProps.size === 'number' ? componentProps.size : componentProps.size.height
      width = typeof componentProps.size === 'number' ? componentProps.size : componentProps.size.width
      break

    case ComponentType.WIDTH_BOUND_RATIO:
      height = componentState.monitoredDimensions.width * (1 / componentProps.ratio)
      width = componentState.monitoredDimensions.width
      break
  }
  url.searchParams.append('height', String(getPixelDensityRegulatedValue(height)))
  url.searchParams.append('width', String(getPixelDensityRegulatedValue(width)))

  // Add operation params
  if (componentProps.operations != null) {
    if (componentProps.operations.func != null) {
      url.searchParams.append('func', componentProps.operations.func)
    }
    if (componentProps.operations.gravity != null) {
      url.searchParams.append('gravity', componentProps.operations.gravity)
    }
    if (componentProps.operations.positionableCrop != null) {
      if (componentProps.operations.positionableCrop.bottomRight != null) {
        let point = componentProps.operations.positionableCrop.bottomRight
        url.searchParams.append('br_px', `${point.x},${point.y}`)
      }
      if (componentProps.operations.positionableCrop.topLeft != null) {
        let point = componentProps.operations.positionableCrop.topLeft
        url.searchParams.append('tl_px', `${point.x},${point.y}`)
      }
    }
    if (componentProps.operations.preventEnlargement != null && componentProps.operations.preventEnlargement) {
      url.searchParams.append('org_if_sml', '1')
    }
    if (componentProps.operations.rotate != null) {
      url.searchParams.append('r', String(componentProps.operations.rotate))
    }
    if (componentProps.operations.trim != null) {
      url.searchParams.append('trim', String(componentProps.operations.trim))
    }
  }

  // Add filter params
  if (componentProps.filters != null) {
    if (componentProps.filters.backgroundColor != null) {
      url.searchParams.append('bg_color', componentProps.filters.backgroundColor)
    }
    if (componentProps.filters.blur != null) {
      url.searchParams.append('blur', String(componentProps.filters.blur))
    }
    if (componentProps.filters.brightness != null) {
      url.searchParams.append('bright', String(componentProps.filters.brightness))
    }
    if (componentProps.filters.contrast != null) {
      url.searchParams.append('contrast', String(componentProps.filters.contrast))
    }
    if (componentProps.filters.greyscale != null && componentProps.filters.greyscale) {
      url.searchParams.append('grey', '1')
    }
    if (componentProps.filters.pixelate != null) {
      url.searchParams.append('pixelate', String(componentProps.filters.pixelate))
    }
    if (componentProps.filters.roundedCorners != null) {
      url.searchParams.append('radius', String(componentProps.filters.roundedCorners))
    }
    if (componentProps.filters.sharpen != null) {
      url.searchParams.append('sharp', String(componentProps.filters.sharpen))
    }
  }

  return url.href
}

export function generateBlurhashElement(blurhash: string): HTMLCanvasElement {
  const pixels = decode(blurhash, 32, 32, 1)

  const canvas = document.createElement('canvas')
  canvas.height = 32
  canvas.width = 32
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const imageData = ctx.createImageData(32, 32)
  imageData.data.set(pixels)
  ctx.putImageData(imageData, 0, 0)

  return canvas
}

function getPixelDensityRegulatedValue(pixels: number): number {
  return pixels * (window.devicePixelRatio || 1)
}
