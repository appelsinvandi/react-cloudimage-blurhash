import React, { useContext, useState, memo } from 'react'

// Components
import LazyLoad from 'react-lazyload'
import BackgroundContent from './BackgroundContent'
import { PlaceholderBlurhashWasm } from '../Placeholder'
import { BackgroundImg } from '../DisplayImage'
import { Wrapper } from '../Wrapper'
import { ImageLoader } from '../ImageLoader'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'
import { generateCloudimageUrl } from '../../utils/cloudimageUtils'

// Types
import { BackgroundImgBlurhashProps } from './types'
import { ImgSizeTypeProps } from '../../types/imgComponents'

const BackgroundImgBlurhashWasm: React.FC<BackgroundImgBlurhashProps & ImgSizeTypeProps> = (props) => {
  const { hash, type, size, ratio, lazyLoad, lazyLoadOptions, classes, id, className, children, ...otherProps } = props

  const reactCloudimageContext = useContext(ReactCloudimageContext)
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 })
  const [isImageLoaded, setImageLoaded] = useState(false)

  const cloudimageUrl = generateCloudimageUrl(reactCloudimageContext.cloudimageConfig.token, props, componentSize)

  if (lazyLoad === true || (lazyLoad == null && reactCloudimageContext.lazyLoadDefaults?.enabled !== false)) {
    return (
      // @ts-ignore
      <Wrapper
        key="WRAPPER"
        id={id}
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
          <BackgroundImg key="IMAGE" src={cloudimageUrl} className={clsx(classes?.image)} />
          <BackgroundContent key="CONTENT" className={clsx(classes?.content)}>
            {children}
          </BackgroundContent>
        </LazyLoad>
      </Wrapper>
    )
  } else {
    return (
      // @ts-ignore
      <Wrapper
        key="WRAPPER"
        id={id}
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
        <BackgroundImg key="IMAGE" src={cloudimageUrl} className={clsx(classes?.image)} />
        <BackgroundContent key="CONTENT" className={clsx(classes?.content)}>
          {children}
        </BackgroundContent>
      </Wrapper>
    )
  }

  function generateLazyLoadProps() {
    return { ...(reactCloudimageContext.lazyLoadDefaults?.options ?? {}), ...(lazyLoadOptions ?? {}) }
  }

  function handleImageLoad() {
    setImageLoaded(true)
  }
}

export default memo(BackgroundImgBlurhashWasm)
