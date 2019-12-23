import React from 'react'

// Types
import { ImageLoaderProps } from './types'

const ImageLoader: React.FC<ImageLoaderProps> = ({ onImageLoad, src }) => {
  return <img src={src} style={{ display: 'none' }} onLoad={onImageLoad} />
}

export default ImageLoader
