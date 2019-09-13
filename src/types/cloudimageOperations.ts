export type PixelPoint = {
  x: number
  y: number
}

export enum CloudimageGravity {
  Center = 'center',
  East = 'east',
  North = 'north',
  NorthEast = 'northeast',
  NorthWest = 'northwest',
  South = 'south',
  SouthEast = 'southeast',
  SouthWest = 'southwest',
  West = 'west',
}

export enum CloudimageFunc {
  /**
   * Resizes to a given width and height box and keeps proportions.
   *
   * Similar to CSS: `background-size: contain;`
   */
  Bound = 'bound',
  /**
   * Resizes the image to the given width and height ignoring original image proportions.
   *
   * Similar to CSS: `object-fit: fill;`
   */
  Cover = 'cover',
  /**
   * Keeps image proportions cutting the image to fit the defined width and height.
   *
   * Similar to CSS: `background-size: cover;`
   */
  Crop = 'crop',
  /**
   * Resizes the image keeping proportions adding padding to satisfy the desired dimensions.
   *
   * Similar to CSS: `object-fit: contain;`
   */
  Fit = 'fit',
}

export interface CloudimagePositionableCrop {
  /**
   * The pixel coordinate for to bottom right cropping rectangle corner.
   *
   * Coordinates are relative to top left of the image.
   */
  bottomRight?: PixelPoint
  /**
   * The pixel coordinate for to top left cropping rectangle corner.
   *
   * Coordinates are relative to top left of the image.
   */
  topLeft?: PixelPoint
}

export interface CloudimageOperations {
  /** Sets the scaling function. */
  func?: CloudimageFunc
  /**
   * Defines which part of the image the func operation should favor.
   *
   * Default: CloudimageOperationGravity.Center.
   */
  gravity?: CloudimageGravity
  /** Resizes the image to a specified height, in pixels. Keeps proportions. */
  // height?: number
  /**
   * Allows to crop an image with a non-centred focal point.
   * It is extremely useful when you want to crop a specific part of the image, like for example a face for a profile picture.
   * To set the coordinates of the crop rectangle, use the tl_px or/and br_px operations.
   *
   * To set the final size, you can use the width or/and height operations.
   */
  positionableCrop?: CloudimagePositionableCrop
  /** Prevents resizing if the target size is larger than the origin image. */
  preventEnlargement?: boolean
  /**
   * Rotates the image by a specified angle, in degrees.
   *
   * Image is rotated counterclockwise.
   */
  rotate?: number
  /**
   * Removes single-colour frame around the image.
   *
   * The parameter does not specify the amount of border or frame to trim but rather how aggressive the trim algorithm should be.
   * A bigger value of the parameter (e.g. 90) will trim rather more than not enough. Typical values are between 10 and 20.
   * This allows you to use the same parameter values for all your images.
   */
  trim?: number
  /** Resizes the image to a specified width, in pixels. Keeps proportions. */
  // width?: number
}
