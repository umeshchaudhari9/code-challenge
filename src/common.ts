import { Bitmap } from './models/bitmap'
import { Pixel } from './models/pixel'

/**
 * Create bitmap like structure to store given data
 */
interface BitmapDescription {
  rows: number;
  columns: number;
  pixels: string;
}

/**
 * Common functions class
 */
export class Common {
  public bitmapDescriptions: Array<BitmapDescription>;
  public numberOfTestCases: number | undefined;

  constructor () {
    this.bitmapDescriptions = []
  }

  /**
   * Function to parse command lines one by one
   * @param line single command line entered or provided
   * @returns 
   */
  public saveBitmapValues (line: string): null {

    // checking if first command line if not a number and with given constraints 
    if (!this.numberOfTestCases) {

      // checking if the testcases is in between 1 to 1000
      if (!(Number(line) >= 1 && Number(line) <= 1000)) {
        throw 'Invalid number of test cases!'
      }
      this.numberOfTestCases = Number(line)
      return null
    }

    // returning null if the line is empty
    if (line === '') {
      return null
    }

    // parsing actuall rows and columns for the bitmap
    if (line.includes(' ')) {
      const [rows, columns] = line.split(' ')
      if (
        !(Number(rows) >= 1 && Number(rows) <= 182) ||
        !(Number(columns) >= 1 && Number(columns) <= 182)
      ) {
        throw 'Invalid value of bitmap size!'
      }
      const newBitmapDescription: BitmapDescription = {
        rows: Number(rows),
        columns: Number(columns),
        pixels: ''
      }
      this.bitmapDescriptions.push(newBitmapDescription)
      return null
    } else {
      // checking if its first line of the bitmap
      if (this.bitmapDescriptions[this.bitmapDescriptions.length - 1].pixels === '') {
        this.bitmapDescriptions[this.bitmapDescriptions.length - 1].pixels = line
      } else {
        this.bitmapDescriptions[this.bitmapDescriptions.length - 1].pixels += ',' + line
      }
      return null
    }
  }

  /**
   * Function that saves all the given values in the bitmaps structure
   * @returns created bitmap like structure
   */
  public createBitmap (): Bitmap[] {
    const bitmaps: Bitmap[] = []
    this.bitmapDescriptions.forEach((bitmapDescription: BitmapDescription) => {
      const { rows, columns, pixels: stringPixels } = bitmapDescription
      const pixels: Pixel[] = []
      const lines = stringPixels.split(',')
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          const pixel = new Pixel(i, j, Number(lines[i].charAt(j)))
          pixels.push(pixel)
        }
      }
      const bitmap = new Bitmap(rows, columns, pixels)
      bitmaps.push(bitmap)
    })
    return bitmaps
  }

  /**
   * Function which iterates on all the pixels and calculate the distance for each pixel to nearest white pixel
   * @param bitmap created bitmap with the given values
   * @param pixel current pixel
   * @returns shorted distance to white pixel from the given pixel
   */
  public distanceCalculate (bitmap: Bitmap, pixel: Pixel): number {

    // checking if the given pixel is already white then returning 0
    if (pixel.getColor() === 1) {
      return 0
    }
  
    return bitmap
      .getPixels()
      .filter((pixel) => pixel.getColor() === 1)
      .reduce((nearestDistance: number, currentPixel: Pixel) => {
        const newDistance: number = Math.abs(currentPixel.getLineIndex() - pixel.getLineIndex()) +
          Math.abs(currentPixel.getColumnIndex() - pixel.getColumnIndex())
        nearestDistance = Math.min(nearestDistance, newDistance)
  
        return nearestDistance
      }, Math.max(bitmap.getLineSize(), bitmap.getColumnSize()))
  }
}
