import * as React from 'react'
import ImgComponent, { ImgProps } from './Img'
import { CloudimageContext } from '../CloudimageProvider'

export const Img: React.SFC<ImgProps> = (props) => {
  return (
    <CloudimageContext.Consumer>
      {(context) => <ImgComponent config={context.config} {...props} />}
    </CloudimageContext.Consumer>
  )
}
