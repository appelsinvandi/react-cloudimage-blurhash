// Constants
import { ImageSizingStrategy } from 'constants/propConstants'

// Types
import { WidthAndHeight } from 'types/imgComponents'

export interface WrapperProps {
  classes?: WrapperClasses
  type: ImageSizingStrategy
  size?: WidthAndHeight | number
  ratio?: number
  onSizeUpdate?: (size: WidthAndHeight) => void
  id?: string
  className?: string
}

export interface WrapperClasses {
  wrapper?: string
}
