import React, { useRef, useMemo, useContext, useEffect, useState } from 'react'
import cxs from 'cxs'

// Context
import { ReactCloudimageContext } from '../ReactCloudimageProvider'

// Utils
import clsx from 'clsx'
const blurhashDecode = import(/* webpackChunkName: "rcb_blurhash_wasm" */ 'blurhash-wasm').then((e) => e.decode)

// Types
import { PlaceholderBlurhashWasmProps } from './types'

const PlaceholderBlurhashWasm: React.FC<PlaceholderBlurhashWasmProps> = (props) => {
  const { hash, isMainImageLoaded, classes, className } = props
  const reactCloudimageBlurhashContext = useContext(ReactCloudimageContext)

  const blurhashCanvas = useRef<HTMLCanvasElement>(null)
  const [blurhashPixels, setBlurhashPixels] = useState<Uint8Array | null>(null)

  useEffect(() => {
    async function decodeBlurhash() {
      const decode = await blurhashDecode
      const decodedBlurhash = decode(hash, 32, 32)!
      setBlurhashPixels(decodedBlurhash)
    }

    decodeBlurhash()
  }, [hash])
  useEffect(() => {
    const ctx = blurhashCanvas.current?.getContext('2d')
    if (ctx != null && blurhashPixels != null) {
      const imageData = ctx.createImageData(32, 32)
      imageData.data.set(blurhashPixels!)
      ctx.putImageData(imageData, 0, 0)
    }
  }, [blurhashPixels, blurhashCanvas.current])

  const css = {
    placeholderImage: cxs({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 10,
      width: '100%',
      height: '100%',
      opacity: 1,
      backgroundColor: reactCloudimageBlurhashContext.theme?.placeholderBackgroundColor ?? 'lightgrey',
      '.is-loaded': {
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out 0s',
        backgroundColor: 'transparent',
      },
    }),
  }

  return useMemo(
    () => (
      <canvas
        ref={blurhashCanvas}
        className={clsx(css.placeholderImage, className, classes?.placeholderImage, {
          'is-loaded': isMainImageLoaded,
        })}
        height="32"
        width="32"
      />
    ),
    [classes, className, isMainImageLoaded]
  )
}

export default PlaceholderBlurhashWasm
