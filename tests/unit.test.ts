import { Common } from '../src/common';
import { Bitmap } from '../src/models/bitmap';
import { Pixel } from '../src/models/pixel';

describe('Common function Tests', () => {
  it('should throw err when an invalid number passed as input', () => {
    const commonFunctions = new Common();
    try {
      commonFunctions.saveBitmapValues('-1');
    } catch (error: any) {
      console.log("errorerror", error);
      expect(error).toEqual("Invalid number of test cases!");
    }
  });

  it('should save Number of test case when passed normal number', () => {
    const commonFunctions = new Common();
    try {
      let result = commonFunctions.saveBitmapValues('2');
      expect(result).not.toEqual("Invalid number of test cases!");
    } catch (error: any) {
      console.log("Error", error);
    }
  });

  it('should accept empty line as separator and not throw any error', () => {
    const commonFunctions = new Common();
    try {
      let result = commonFunctions.saveBitmapValues('');
      expect(result).not.toEqual("Invalid number of test cases!");
    } catch (error: any) {
      console.log("Error", error);
    }
  });
});

describe('DistanceCalculator function Tests', () => {
  const pixels: Pixel[] = [new Pixel(0, 0, 0), new Pixel(0, 1, 0), new Pixel(1, 0, 0), new Pixel(1, 1, 1)];
  const bitmap: Bitmap = new Bitmap(2, 2, pixels);
  const targetBlackPixel: Pixel = new Pixel(0, 0, 0);
  const targetWhitePixel: Pixel = new Pixel(1, 1, 1);
  const commonFunctions = new Common();
  describe('calculateDistanceToTheNearestWhite', () => {
    it('should return shortest distance to white pixel', () => {
      expect(commonFunctions.distanceCalculate(bitmap, targetBlackPixel)).toEqual(2);
    });
    it('should return 0 if given pixel is already white', () => {
      expect(commonFunctions.distanceCalculate(bitmap, targetWhitePixel)).toEqual(0);
    });
  });
});