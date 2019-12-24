// Constants
import { ImageSizingStrategy } from '../constants'

// Types
import { ImgBaseProps, ImgSizeTypeProps, WidthAndHeight } from '../types/imgComponents'

export function generateCloudimageUrl(
  token: string,
  componentProps: ImgBaseProps & ImgSizeTypeProps,
  componentDimensions: WidthAndHeight
): string | undefined {
  const url = new URL(`https://${token}.cloudimg.io/v7/${componentProps.src}`)

  let width: number
  let height: number
  switch (componentProps.type) {
    default:
    case ImageSizingStrategy.FIT:
      height = componentDimensions.height
      width = componentDimensions.width
      break

    case ImageSizingStrategy.STATIC_DIMENSIONS:
      height = typeof componentProps.size === 'number' ? componentProps.size : componentProps.size.height
      width = typeof componentProps.size === 'number' ? componentProps.size : componentProps.size.width
      break

    case ImageSizingStrategy.ASPECT_RATIO:
      height = Math.ceil(componentDimensions.width * (1 / componentProps.ratio))
      width = componentDimensions.width
      break
  }
  // Images can't have these dimensions anyways
  if (width <= 0 || height <= 0) {
    return undefined
  }
  url.searchParams.append('height', String(getPixelDensityRegulatedValue(height)))
  url.searchParams.append('width', String(getPixelDensityRegulatedValue(width)))

  // Add operation params
  if (componentProps.operations?.func != null) {
    url.searchParams.append('func', componentProps.operations.func)
  }
  if (componentProps.operations?.gravity != null) {
    url.searchParams.append('gravity', componentProps.operations.gravity)
  }
  if (componentProps.operations?.positionableCrop?.bottomRight != null) {
    let point = componentProps.operations.positionableCrop.bottomRight
    url.searchParams.append('br_px', `${point.x},${point.y}`)
  }
  if (componentProps.operations?.positionableCrop?.topLeft != null) {
    let point = componentProps.operations.positionableCrop.topLeft
    url.searchParams.append('tl_px', `${point.x},${point.y}`)
  }
  if (componentProps.operations?.preventEnlargement != null && componentProps.operations.preventEnlargement) {
    url.searchParams.append('org_if_sml', '1')
  }
  if (componentProps.operations?.rotate != null) {
    url.searchParams.append('r', String(componentProps.operations.rotate))
  }
  if (componentProps.operations?.trim != null) {
    url.searchParams.append('trim', String(componentProps.operations.trim))
  }

  // Add filter params
  if (componentProps.filters?.backgroundColor != null) {
    url.searchParams.append('bg_color', componentProps.filters.backgroundColor)
  }
  if (componentProps.filters?.blur != null) {
    url.searchParams.append('blur', String(componentProps.filters.blur))
  }
  if (componentProps.filters?.brightness != null) {
    url.searchParams.append('bright', String(componentProps.filters.brightness))
  }
  if (componentProps.filters?.contrast != null) {
    url.searchParams.append('contrast', String(componentProps.filters.contrast))
  }
  if (componentProps.filters?.greyscale != null && componentProps.filters.greyscale) {
    url.searchParams.append('grey', '1')
  }
  if (componentProps.filters?.pixelate != null) {
    url.searchParams.append('pixelate', String(componentProps.filters.pixelate))
  }
  if (componentProps.filters?.roundedCorners != null) {
    url.searchParams.append('radius', String(componentProps.filters.roundedCorners))
  }
  if (componentProps.filters?.sharpen != null) {
    url.searchParams.append('sharp', String(componentProps.filters.sharpen))
  }

  return url.href
}

function getPixelDensityRegulatedValue(pixels: number): number {
  return pixels * (window.devicePixelRatio || 1)
}
