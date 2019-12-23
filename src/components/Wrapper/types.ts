// Constants
import { ImageSizingStrategy } from 'constants'

// Types
import { WidthAndHeight } from 'types/imgComponents'

export interface WrapperProps {
  classes?: WrapperClasses
  type: ImageSizingStrategy
  size?: WidthAndHeight | number
  ratio?: number
  onSizeUpdate?: (size: WidthAndHeight) => void
}

export interface WrapperClasses {
  wrapper?: string
}
