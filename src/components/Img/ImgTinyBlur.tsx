import React, { useContext, useState, memo } from 'react'

// Components
import LazyLoad from 'react-lazyload'
import { PlaceholderTinyBlur } from '../Placeholder'
import { Img } from '../DisplayImage'
import { Wrapper } from '../Wrapper'
import { ImageLoader } from '../ImageLoader'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'
import { generateCloudimageUrl } from '../../utils/cloudimageUtils'

// Types
import { ImgTinyBlurProps } from './types'
import { ImgSizeTypeProps } from '../../types/imgComponents'

const ImgTinyBlur: React.FC<ImgTinyBlurProps & ImgSizeTypeProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { src, type, size, ratio, lazyLoad, lazyLoadOptions, classes, className, children, ...otherProps } = props

  const reactCloudimageContext = useContext(ReactCloudimageContext)
  const [isImageLoaded, setImageLoaded] = useState(false)
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 })

  const cloudimageUrl = generateCloudimageUrl(reactCloudimageContext.cloudimageConfig.token, props, componentSize)

  if (lazyLoad === true || (lazyLoad == null && reactCloudimageContext.lazyLoadDefaults?.enabled !== false)) {
    return (
      // @ts-ignore
      <Wrapper
        className={clsx(className, classes?.wrapper)}
        type={type}
        size={size}
        ratio={ratio}
        onSizeUpdate={setComponentSize}
        {...otherProps}
        key="WRAPPER"
      >
        <LazyLoad once {...generateLazyLoadProps()}>
          <PlaceholderTinyBlur
            src={src}
            isMainImageLoaded={isImageLoaded}
            className={clsx(classes?.placeholder)}
            key="PLACEHOLDER"
          />
          <ImageLoader src={cloudimageUrl} onImageLoad={handleImageLoad} key="IMAGE_LOADER" />
          <Img src={cloudimageUrl} className={clsx(classes?.image)} key="IMAGE" />
        </LazyLoad>
      </Wrapper>
    )
  } else {
    return (
      // @ts-ignore
      <Wrapper
        className={clsx(className, classes?.wrapper)}
        type={type}
        size={size}
        ratio={ratio}
        onSizeUpdate={setComponentSize}
        {...otherProps}
        key={'WRAPPER'}
      >
        <PlaceholderTinyBlur
          src={src}
          isMainImageLoaded={isImageLoaded}
          className={clsx(classes?.placeholder)}
          key="PLACEHOLDER"
        />
        <ImageLoader src={cloudimageUrl} onImageLoad={handleImageLoad} key="IMAGE_LOADER" />
        <Img src={cloudimageUrl} className={clsx(classes?.image)} key="IMAGE" />
      </Wrapper>
    )
  }

  function handleImageLoad() {
    setImageLoaded(true)
  }

  function generateLazyLoadProps() {
    return { ...(reactCloudimageContext.lazyLoadDefaults?.options ?? {}), ...(lazyLoadOptions ?? {}) }
  }
}

export default memo(ImgTinyBlur)
