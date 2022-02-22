import readline from 'readline'
import { Common } from './common'

/**
 * Entry point to the project
 */
function main (): void {
  const commonFunctions = new Common()

  /**
   * creating readline interface for the command line parse
   */
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  /**
   * listner to the command line values and parsing it through the saveBitmapValues function
   */
  rl.on('line', (line) => {
    try {
      commonFunctions.saveBitmapValues(line.trim())
    } catch (error) {
      throw new Error(`Line parsing error: ${error}`)
    }
  })

  /**
   * Listner that calls in the end of command line input to process the bitmap
   */
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

/**
 * calling main function as the entry point to the project
 */
main();


