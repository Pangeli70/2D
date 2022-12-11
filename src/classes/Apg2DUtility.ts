/** -----------------------------------------------------------------------
 * @module [2D]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/27]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * @version 0.9.3 [APG 2022/12/11] Renaming and cleanup
 * -----------------------------------------------------------------------
 */
import { eApg2DQuadrant } from "../enums/eApg2DQuadrant.ts";

export abstract class Apg2DUtility {
  // Constat to manage rounding errors and coordinate comparison
  static readonly EPSILON = 0.000001;

  static DegToRad(adegrees: number) {
    return adegrees * Math.PI / 180;
  }

  static RadToDeg(aradians: number) {
    return aradians * 180 / Math.PI;
  }

  /** Get the inclination of a segment as angle by slope
     * @param {number} aslope angular coefficient of a segment
     * @param {string} aquadrant symbol that describes the orientation quadrant
     * @returns {number} orientation in angle (standard quadrants)
     */
  static DegreesFromSlope(aslope: number, aquadrant: eApg2DQuadrant) {
    let r = 0;

    let degrees = Apg2DUtility.RadToDeg(Math.atan(aslope));

    if (degrees < 0 || Object.is(degrees, -0)) {
      degrees += 180;
    }

    switch (aquadrant) {
      case eApg2DQuadrant.posXposY:
        r = degrees;
        break;
      case eApg2DQuadrant.posXnegY:
        r = degrees + 180;
        break;
      case eApg2DQuadrant.negXposY:
        r = degrees;
        break;
      case eApg2DQuadrant.negXnegY:
        r = degrees + 180;
        break;
    }

    return r;
  }

  static Pythagoras(dx: number, dy: number): number {
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
