import React, { useContext, useState, memo } from 'react'

// Components
import LazyLoad from 'react-lazyload'
import { Img } from '../DisplayImage'
import { Wrapper } from '../Wrapper'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'
import { generateCloudimageUrl } from '../../utils/cloudimageUtils'

// Types
import { ImgPlainProps } from './types'
import { ImgSizeTypeProps } from '../../types/imgComponents'

const ImgPlain: React.FC<ImgPlainProps & ImgSizeTypeProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { src, type, size, ratio, lazyLoad, lazyLoadOptions, classes, className, children, ...otherProps } = props

  const reactCloudimageContext = useContext(ReactCloudimageContext)
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
          <Img src={cloudimageUrl} className={clsx(classes?.image)} />
        </>
      )
    }
  }
}

export default memo(ImgPlain)
