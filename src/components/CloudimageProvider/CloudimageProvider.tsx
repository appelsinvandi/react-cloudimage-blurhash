import * as React from 'react'
import { CloudimageContextConfig, CloudimageContextValue } from './types'

export const CloudimageContext = React.createContext<CloudimageContextValue>({
  config: {
    token: '',
  },
})

export interface CloudimageProviderProps {
  config: CloudimageContextConfig
}

const CloudimageProvider: React.FunctionComponent<CloudimageProviderProps> = (props) => {
  return <CloudimageContext.Provider value={{ config: props.config }}>{props.children}</CloudimageContext.Provider>
}

export default CloudimageProvider
