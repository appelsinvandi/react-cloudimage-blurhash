import * as React from 'react'
import { ReactCloudimageContextValue } from './types'

export const ReactCloudimageContext = React.createContext<ReactCloudimageContextValue>({
  cloudimageConfig: {
    token: 'demo',
  },
  theme: {
    placeholderBackgroundColor: 'lightgray',
  },
  lazyLoadDefaults: {
    enabled: true,
  },
})

const ReactCloudimageProvider: React.FunctionComponent<ReactCloudimageContextValue> = ({
  cloudimageConfig,
  theme,
  lazyLoadDefaults,
  children,
}) => {
  return (
    <ReactCloudimageContext.Provider value={{ cloudimageConfig, theme, lazyLoadDefaults }}>
      {children}
    </ReactCloudimageContext.Provider>
  )
}

export default ReactCloudimageProvider
