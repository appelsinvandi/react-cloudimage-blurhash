import { LazyLoadProps } from 'react-lazyload'
import { CloudimageFilters } from '../../types/cloudimageFilters'

export interface ReactCloudimageContextValue {
  cloudimageConfig: CloudimageContextConfig
  theme?: ReactCloudimageThemeProperties
  lazyLoadDefaults?: ReactCloudimageLazyLoadDefaults
}

export interface CloudimageContextConfig {
  /**
   * Your Cloudimage customer token. You can find this token in your Cloudimage dashboard.
   *
   * _Default: "demo"_
   */
  token: string
  /**
   * Applies default Cloudimage filters to every image, if none other are defined.
   * Multiple filters can be applied.
   */
  filters?: CloudimageFilters
}

export interface ReactCloudimageThemeProperties {
  placeholderBackgroundColor?: string
}

export interface ReactCloudimageLazyLoadDefaults {
  enabled?: boolean
  options?: LazyLoadProps
}
