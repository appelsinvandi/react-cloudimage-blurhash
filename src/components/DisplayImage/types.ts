import { CloudimageOperations } from '../../types/cloudimageOperations'

export interface BackgroundImgProps {
  src?: string
  classes?: DisplayImageClasses
  className?: string
  operations?: CloudimageOperations
}

export interface ImgProps {
  src?: string
  classes?: DisplayImageClasses
  className?: string
}

export interface DisplayImageClasses {
  imageElement?: string
}
