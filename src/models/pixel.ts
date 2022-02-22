/**
 * Pixel class which creates pixel like structure
 */
export class Pixel {
  private i: number;
  private j: number;
  private color: number;

 
  constructor (i: number, j: number, color: number) {
    this.i = i
    this.j = j
    this.color = color
  }

  /**
   * 
   * @returns get current line index
   */
  public getLineIndex (): number {
    return this.i
  }

  /**
   * 
   * @returns get current line index
   */
  public getColumnIndex (): number {
    return this.j
  }

  /**
   * 
   * @returns current pixels color
   */
  public getColor (): number {
    return this.color
  }

  /**
   * 
   * @returns sets given color to the pixel
   */
  public setColor (color: number): void {
    this.color = color
  }
}
