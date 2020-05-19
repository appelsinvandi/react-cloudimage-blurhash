import React, { useMemo } from 'react'
import { ReactCloudimageContextValue } from './types'
import { ReactCloudimageContext, defaultContext } from './Context'

const ReactCloudimageProvider: React.FunctionComponent<ReactCloudimageContextValue> = ({
  cloudimageConfig,
  theme,
  lazyLoadDefaults,
  children,
}) => {
  const comparableValue = JSON.stringify({ ...defaultContext, cloudimageConfig, theme, lazyLoadDefaults })
  const value = useMemo(() => ({ ...defaultContext, cloudimageConfig, theme, lazyLoadDefaults }), [comparableValue])

  return <ReactCloudimageContext.Provider value={value}>{children}</ReactCloudimageContext.Provider>
}

export default ReactCloudimageProvider
