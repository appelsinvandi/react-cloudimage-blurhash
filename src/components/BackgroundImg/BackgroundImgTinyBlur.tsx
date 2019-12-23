import React, { useContext, useState, memo } from 'react'
import { useBoolean } from 'react-use'

// Components
import LazyLoad from 'react-lazyload'
import BackgroundContent from './BackgroundContent'
import { PlaceholderTinyBlur } from '../Placeholder'
import { BackgroundImg } from '../DisplayImage'
import { Wrapper } from '../Wrapper'
import { ImageLoader } from '../ImageLoader'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'
import { generateCloudimageUrl } from '../../utils/cloudimageUtils'

// Types
import { BackgroundImgTinyBlurProps } from './types'
import { ImgSizeTypeProps } from '../../types/imgComponents'

const BackgroundImgTinyBlur: React.FC<BackgroundImgTinyBlurProps &
  ImgSizeTypeProps &
  React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { src, type, size, ratio, lazyLoad, lazyLoadOptions, classes, className, children, ...otherProps } = props

  const reactCloudimageContext = useContext(ReactCloudimageContext)
  const [isImageLoaded, setImageLoaded] = useBoolean(false)
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 })

  const cloudimageUrl = generateCloudimageUrl(reactCloudimageContext.cloudimageConfig.token, props, componentSize)

  return (
    // @ts-ignore
    <Wrapper
      className={clsx(className, classes?.wrapper)}
      type={type}
      size={size}
      ratio={ratio}
      onSizeUpdate={setComponentSize}
      {...otherProps}
    >
      <Content />
    </Wrapper>
  )

  function handleImageLoad() {
    setImageLoaded(true)
  }

  function generateLazyLoadProps() {
    return { ...(reactCloudimageContext.lazyLoadDefaults?.options ?? {}), ...(lazyLoadOptions ?? {}) }
  }

  function Content() {
    if (componentSize.width === 0 && componentSize.height === 0) {
      return null
    }

    if (lazyLoad === true || (lazyLoad == null && reactCloudimageContext.lazyLoadDefaults?.enabled !== false)) {
      return (
        <LazyLoad once {...generateLazyLoadProps()}>
          <ImgWithExtras />
        </LazyLoad>
      )
    } else {
      return <ImgWithExtras />
    }

    function ImgWithExtras() {
      return (
        <>
          <PlaceholderTinyBlur
            src={cloudimageUrl}
            isMainImageLoaded={isImageLoaded}
            className={clsx(classes?.placeholder)}
          />
          <ImageLoader src={cloudimageUrl} onImageLoad={handleImageLoad} />
          <BackgroundImg src={cloudimageUrl} className={clsx(classes?.image)} />
          <BackgroundContent className={clsx(classes?.content)}>{children}</BackgroundContent>
        </>
      )
    }
  }
}

export default memo(BackgroundImgTinyBlur)
