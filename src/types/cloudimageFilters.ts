export interface CloudimageFilters {
  /**
   * If an operation or a filter leaves the image with empty areas, defining a backgroundColor will fill it with that color.
   *
   * Value is expected to be a hex code or color name. Ex.: "cccc30" or "green"
   */
  backgroundColor?: string
  /**
   * Applies Gaussian blur to the image.
   *
   * The value is the kernel size of the filter in pixels.
   */
  blur?: number
  /**
   * Adjusts the brightness of the image.
   *
   * Range: 0-100.
   */
  brightness?: number
  /**
   * Adjusts the brightness of the image.
   *
   * Range: 0-255.
   */
  contrast?: number
  /** Discards all colours and transforms the image into black and white. */
  greyscale?: boolean
  /**
   * Applies a pixelation effect to an image. You can set the desired block size in pixels.
   * If the image is resized, filter is applied after resizing.
   */
  pixelate?: number
  /**
   * Rounds the corners of images with a radius of the given value in pixels.
   * If you wish to fill the cut corners with a specific colour, you can use the backgroundColor filter.
   */
  roundedCorners?: number
  /**
   * Sharpening is a powerful tool to emphasize texture and details, especially on smaller images, e.g. thumbnails.
   * Cloudimage can apply an "un-sharp mask" filter which—despite its name—will make your image look sharper.
   *
   * Value is the radius filter (X) in pixels.
   */
  sharpen?: number
}
