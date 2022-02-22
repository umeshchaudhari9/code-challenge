import { Bitmap } from './models/bitmap'
import { Pixel } from './models/pixel'

interface BitmapDescription {
  rows: number;
  columns: number;
  pixels: string;
}

export class Common {
  public bitmapDescriptions: Array<BitmapDescription>;
  public numberOfTestCases: number | undefined;

  constructor () {
    this.bitmapDescriptions = []
  }

  public saveBitmapValues (line: string): null {
    if (!this.numberOfTestCases) {
      if (!(Number(line) >= 1 && Number(line) <= 1000)) {
        throw 'Invalid number of test cases!'
      }
      this.numberOfTestCases = Number(line)
      return null
    }

    if (line === '') {
      return null
    }

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
      if (this.bitmapDescriptions[this.bitmapDescriptions.length - 1].pixels === '') {
        this.bitmapDescriptions[this.bitmapDescriptions.length - 1].pixels = line
      } else {
        this.bitmapDescriptions[this.bitmapDescriptions.length - 1].pixels += ',' + line
      }
      return null
    }
  }

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

  public distanceCalculate (bitmap: Bitmap, pixel: Pixel): number {
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
