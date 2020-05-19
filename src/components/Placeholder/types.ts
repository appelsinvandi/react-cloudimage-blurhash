export interface PlaceholderTinyBlurProps {
  cloudimageUrl: string
  isMainImageLoaded: boolean
  classes?: PlaceholderClasses
  className?: string
}

export interface PlaceholderBlurhashProps {
  hash: string
  isMainImageLoaded: boolean
  classes?: PlaceholderClasses
  className?: string
}

export interface PlaceholderBlurhashWasmProps {
  hash: string
  isMainImageLoaded: boolean
  classes?: PlaceholderClasses
  className?: string
}

export interface PlaceholderClasses {
  placeholderImage?: string
}
