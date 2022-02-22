import readline from 'readline'
import { Common } from './common'
import { Bitmap } from './models/bitmap'
import { Pixel } from './models/pixel'

function main (): void {
  const commonFunctions = new Common()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  rl.on('line', (line) => {
    try {
      commonFunctions.saveBitmapValues(line.trim())
    } catch (error) {
      throw new Error(`Line parsing error: ${error}`)
    }
  })

  rl.on('close', () => {
    const bitmaps = commonFunctions.createBitmap()

    bitmaps.forEach((bitmap) => {
      const pixels = bitmap.getPixels()
      for (let i = 0; i < bitmap.getLineSize(); i++) {
        const outputLine = pixels
          .filter((pixel ) => pixel.getLineIndex() === i)
          .map((pixel) => {
            return commonFunctions.distanceCalculate(bitmap, pixel)
          })
          .join(' ')
        process.stdout.write(outputLine + '\n')
      }
      process.stdout.write('\n')
    })
  })
}

main();


