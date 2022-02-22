import { Pixel } from './pixel'

/**
 * Bitmap class which creates Bitmaps and saves globally
 */
export class Bitmap {
  private lineSize: number;
  private columnSize: number;
  private pixels: Pixel[];

  
  constructor (lineSize: number, columnSize: number, pixels: Pixel[]) {
    this.lineSize = lineSize
    this.columnSize = columnSize
    this.pixels = pixels
  }

  /**
   * function to get the linesize
   * @returns linesize of the bitmap
   */
  public getLineSize (): number {
    return this.lineSize
  }

  /**
   * function to get the columnsize of given bitmap
   * @returns columnsize of the bitmap
   */
  public getColumnSize (): number {
    return this.columnSize
  }

  /**
   * function to get saved or given pixels data
   * @returns given pixels array 
   */
  public getPixels (): Pixel[] {
    return this.pixels
  }

  /**
   * function to set pixel color
   * @param pixel pixel which needs to be update
   * @param color color which needs to be update
   */
  public setPixelColor (pixel: Pixel, color: number): void {
    const foundPixelIndex = this.pixels.findIndex((p) => p.getLineIndex() === pixel.getLineIndex() && p.getColumnIndex() === pixel.getColumnIndex())
    this.pixels[foundPixelIndex].setColor(color)
  }
}
