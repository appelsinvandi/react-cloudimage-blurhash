import * as React from 'react'
import BackgroundImgComponent, { BackgroundImgProps } from './BackgroundImg'
import { CloudimageContext } from '../CloudimageProvider'

export const BackgroundImg: React.SFC<BackgroundImgProps> = (props) => {
  return (
    <CloudimageContext.Consumer>
      {(context) => <BackgroundImgComponent config={context.config} {...props} />}
    </CloudimageContext.Consumer>
  )
}
