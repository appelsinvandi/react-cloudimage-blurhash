import * as React from 'react'

// Components
import LazyLoad from 'react-lazyload'

// Utils
import clsx from 'clsx'
import debounce from 'debounce'
import elementResizeEvent from 'element-resize-event'
import { generateCloudimageUrl, generateBlurhashElement } from '../../utils'

// Constants
import { ComponentType } from '../../constants'

// Types
import {
  ImgBaseProps,
  ImgBaseState,
  ImgSizeFitProps,
  ImgSizeHeightBoundRatioProps,
  ImgSizeStaticDimensionsProps,
  ImgSizeWidthBoundRatioProps,
} from '../../types/imgComponents'
import { CloudimageContextConfig } from '../CloudimageProvider'

// Styles
import {
  BackgroundImgClasses,
  generateBackgroundImgBlurredPlaceholderStyles,
  generateBackgroundImgChildWrapperStyles,
  generateBackgroundImgContentStyles,
  generateBackgroundImgImageStyles,
  generateBackgroundImgRootStyles,
} from './BackgroundImg.styles'

interface BackgroundImgSpecificProps extends ImgBaseProps {
  classes?: BackgroundImgClasses
  config: CloudimageContextConfig
}
export type BackgroundImgProps = BackgroundImgSpecificProps &
  (ImgSizeHeightBoundRatioProps | ImgSizeFitProps | ImgSizeStaticDimensionsProps | ImgSizeWidthBoundRatioProps) &
  React.HTMLAttributes<HTMLDivElement>

export type BackgroundImgState = ImgBaseState

class BackgroundImg extends React.Component<BackgroundImgProps, BackgroundImgState> {
  state = {
    isImageLoaded: false,
    monitoredDimensions: {
      height: 0,
      width: 0,
    },
    previousImageUrl: null,
  } as BackgroundImgState

  static defaultProps = {
    noLazyLoad: false,
  }

  wrapperElement: HTMLDivElement | null = null

  // = Handlers

  handleImageLoad = () => {
    this.setState({
      isImageLoaded: true,
      previousImageUrl: this.generateCloudimageUrl(true),
    })
  }

  handleUpdateComponentDimensions = debounce(() => {
    if (this.wrapperElement != null) {
      const roundedHeight = Math.ceil(this.wrapperElement.clientHeight / 100) * 100
      const roundedWidth = Math.ceil(this.wrapperElement.clientWidth / 100) * 100

      return this.setState({
        monitoredDimensions: {
          height: Math.max(this.monitoredDimensions.height, roundedHeight),
          width: Math.max(this.monitoredDimensions.width, roundedWidth),
        },
      })
    }
  }, 500)

  // = Generators

  generateBlurhashThumbnail = () => {
    if (this.blurhash == null) {
      return null
    }

    const isLoaded = this.isImageLoaded || this.previousImageUrl != null

    return (
      <div
        style={{
          ...generateBackgroundImgBlurredPlaceholderStyles(isLoaded),
          backgroundImage: `url(${generateBlurhashElement(this.blurhash).toDataURL()})`,
        }}
        className={clsx(this.classes.blurredPlaceholder, {
          'state__is-loaded': isLoaded,
        })}
      />
    )
  }

  generateImage = () => {
    if (this.noLazyLoad) {
      return (
        <>
          <img style={{ display: 'none' }} src={this.generateCloudimageUrl(true)} onLoad={this.handleImageLoad} />
          <div
            className={clsx(this.classes.image)}
            style={{ ...generateBackgroundImgImageStyles(), backgroundImage: `url(${this.generateCloudimageUrl()})` }}
          />
        </>
      )
    } else {
      return (
        <LazyLoad height="100%" resize={true} once={true}>
          <img style={{ display: 'none' }} src={this.generateCloudimageUrl(true)} onLoad={this.handleImageLoad} />
          <div
            className={clsx(this.classes.image)}
            style={{ ...generateBackgroundImgImageStyles(), backgroundImage: `url(${this.generateCloudimageUrl()})` }}
          />
        </LazyLoad>
      )
    }
  }

  generateCloudimageUrl(forceNewUrl: boolean = false) {
    if (!this.isImageLoaded && this.previousImageUrl != null && !forceNewUrl) {
      return this.previousImageUrl
    }

    return generateCloudimageUrl(this.config.token, this.src, this.props, this.state)
  }

  // = Getters

  get isImageLoaded() {
    return this.state.isImageLoaded
  }

  get previousImageUrl() {
    return this.state.previousImageUrl
  }

  get config() {
    return this.props.config
  }

  get src() {
    return this.props.src
  }

  get operations() {
    return this.props.operations
  }

  get filters() {
    return this.props.filters || this.config.filters
  }

  get blurhash() {
    return this.props.blurhash
  }

  get ratio() {
    switch (this.props.type) {
      case ComponentType.HEIGHT_BOUND_RATIO:
      case ComponentType.WIDTH_BOUND_RATIO:
        return this.props.ratio

      default:
        return NaN
    }
  }

  get noLazyLoad() {
    return this.props.noLazyLoad
  }

  get monitoredDimensions() {
    return this.state.monitoredDimensions
  }

  get propsDimensions() {
    switch (this.props.type) {
      case ComponentType.STATIC_DIMENSIONS:
        return this.props.size

      default:
        return {}
    }
  }

  get classes() {
    return this.props.classes || {}
  }

  get rootProps() {
    const {
      alt,
      blurhash,
      classes,
      className,
      config,
      filters,
      noLazyLoad,
      operations,
      src,
      type,
      // @ts-ignore
      ratio,
      // @ts-ignore
      size,
      ...otherProps
    } = this.props
    return otherProps
  }

  // = Lifecycle

  componentDidMount() {
    if (this.wrapperElement != null && (this.ratio != null || this.propsDimensions != null)) {
      elementResizeEvent(this.wrapperElement, this.handleUpdateComponentDimensions)

      this.handleUpdateComponentDimensions()
    }
  }

  shouldComponentUpdate(_nextProps: BackgroundImgProps, nextState: BackgroundImgState) {
    // Don't update if the dimensions are actually the same, though the object is not.
    if (
      nextState.monitoredDimensions !== this.monitoredDimensions &&
      nextState.monitoredDimensions.height === this.monitoredDimensions.height &&
      nextState.monitoredDimensions.width === this.monitoredDimensions.width
    ) {
      return false
    }

    return true
  }

  componentDidUpdate(_prevProps: BackgroundImgProps, prevState: BackgroundImgState) {
    // Trigger image reload state if a bigger image is to be fetched
    if (
      prevState.monitoredDimensions.height < this.monitoredDimensions.height ||
      prevState.monitoredDimensions.width < this.monitoredDimensions.width
    ) {
      this.setState({
        isImageLoaded: false,
      })
    }
  }

  render() {
    return (
      <div
        style={generateBackgroundImgRootStyles(this.props)}
        className={clsx(this.classes.root, this.props.className)}
        ref={(ref) => (this.wrapperElement = ref)}
        {...this.rootProps}
      >
        <div style={generateBackgroundImgContentStyles()} className={clsx(this.classes.content)}>
          {this.generateBlurhashThumbnail()}
          {this.generateImage()}
        </div>
        <div style={generateBackgroundImgChildWrapperStyles()} className={clsx(this.classes.childWrapper)}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default BackgroundImg
