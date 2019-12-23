export interface PlaceholderTinyBlurProps {
  src: string
  isMainImageLoaded: boolean
  classes?: PlaceholderClasses
}

export interface PlaceholderBlurhashProps {
  hash: string
  isMainImageLoaded: boolean
  classes?: PlaceholderClasses
}

export interface PlaceholderBlurhashWasmProps {
  hash: string
  isMainImageLoaded: boolean
  classes?: PlaceholderClasses
}

export interface PlaceholderClasses {
  placeholderImage?: string
}
