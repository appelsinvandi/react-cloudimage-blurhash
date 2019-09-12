import * as React from 'react'
import { CloudimageContextConfig, CloudimageContextValue } from './types'

export const CloudimageContext = React.createContext<CloudimageContextValue>({
  config: {
    token: '',
  },
})

export interface CloudimageProviderState {}

export interface CloudimageProviderProps {
  config: CloudimageContextConfig
}

class CloudimageProvider extends React.Component<CloudimageProviderProps, CloudimageProviderState> {
  // = Lifecycle

  render() {
    return (
      <CloudimageContext.Provider value={{ config: this.props.config }}>
        {this.props.children}
      </CloudimageContext.Provider>
    )
  }
}

export default CloudimageProvider
