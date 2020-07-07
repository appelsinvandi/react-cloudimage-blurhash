import React, { useContext, useState, memo } from 'react'

// Components
import LazyLoad from 'react-lazyload'
import { PlaceholderBlurhashWasm } from '../Placeholder'
import { Img } from '../DisplayImage'
import { Wrapper } from '../Wrapper'
import { ImageLoader } from '../ImageLoader'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'
import { generateCloudimageUrl } from '../../utils/cloudimageUtils'

// Types
import { ImgBlurhashProps } from './types'
import { ImgSizeTypeProps } from '../../types/imgComponents'

const ImgBlurhashWasm: React.FC<ImgBlurhashProps & ImgSizeTypeProps> = (props) => {
  const { hash, type, size, ratio, lazyLoad, lazyLoadOptions, classes, className, ...otherProps } = props

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
        {...otherProps}
      >
        <LazyLoad once {...generateLazyLoadProps()}>
          <PlaceholderBlurhashWasm
            key="PLACEHOLDER"
            hash={hash}
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
        {...otherProps}
      >
        <PlaceholderBlurhashWasm
          key="PLACEHOLDER"
          hash={hash}
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

export default memo(ImgBlurhashWasm)
