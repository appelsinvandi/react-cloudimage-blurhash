import { CloudimageFilters } from '../../types/cloudimageFilters'

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

export interface CloudimageContextValue {
  config: CloudimageContextConfig
}
