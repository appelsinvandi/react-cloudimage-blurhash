import { createContext } from 'react'
import { ReactCloudimageContextValue } from './types'

export const defaultContext = {
  cloudimageConfig: {
    token: 'demo',
  },
  theme: {
    placeholderBackgroundColor: 'lightgray',
  },
  lazyLoadDefaults: {
    enabled: true,
  },
}
export const ReactCloudimageContext = createContext<ReactCloudimageContextValue>(defaultContext)
