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

const ImgTinyBlur: React.FC<ImgTinyBlurProps & ImgSizeTypeProps> = (props) => {
  const { type, size, ratio, lazyLoad, lazyLoadOptions, classes, className } = props

  const reactCloudimageContext = useContext(ReactCloudimageContext)
  const [isImageLoaded, setImageLoaded] = useState(false)
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 })

  const cloudimageUrl = generateCloudimageUrl(reactCloudimageContext.cloudimageConfig.token, props, componentSize)

  if (lazyLoad === true || (lazyLoad == null && reactCloudimageContext.lazyLoadDefaults?.enabled !== false)) {
    return (
      // @ts-ignore
      <Wrapper
        key="WRAPPER"
        className={clsx(className, classes?.wrapper)}
        type={type}
        size={size}
        ratio={ratio}
        onSizeUpdate={setComponentSize}
      >
        <LazyLoad once {...generateLazyLoadProps()}>
          <PlaceholderTinyBlur
            key="PLACEHOLDER"
            cloudimageUrl={cloudimageUrl!}
            isMainImageLoaded={isImageLoaded}
            className={clsx(classes?.placeholder)}
          />
          <ImageLoader key="IMAGE_LOADER" src={cloudimageUrl} onImageLoad={handleImageLoad} />
          <Img key="IMAGE" src={cloudimageUrl} className={clsx(classes?.image)} />
        </LazyLoad>
      </Wrapper>
    )
  } else {
    return (
      // @ts-ignore
      <Wrapper
        key="WRAPPER"
        className={clsx(className, classes?.wrapper)}
        type={type}
        size={size}
        ratio={ratio}
        onSizeUpdate={setComponentSize}
      >
        <PlaceholderTinyBlur
          key="PLACEHOLDER"
          cloudimageUrl={cloudimageUrl!}
          isMainImageLoaded={isImageLoaded}
          className={clsx(classes?.placeholder)}
        />
        <ImageLoader key="IMAGE_LOADER" src={cloudimageUrl} onImageLoad={handleImageLoad} />
        <Img key="IMAGE" src={cloudimageUrl} className={clsx(classes?.image)} />
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
