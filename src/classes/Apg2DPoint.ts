/** -----------------------------------------------------------------------
 * @module [2D]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/27]
 * @version 0.0.4 [APG 2018/11/22]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * @version 0.9.3 [APG 2022/12/11] DistanceFrom, renaming and cleanup
 * -----------------------------------------------------------------------
 */
import { Apg2DUtility } from "./Apg2DUtility.ts";
import { IApg2DPoint } from "../interfaces/IApg2DPoint.ts";

/**
 * Bidimensional Point for 2D CAD drawing operations
 */
export class Apg2DPoint implements IApg2DPoint {
  public x = 0;
  public y = 0;

  public constructor(ax: number, ay: number) {
    this.x = ax;
    this.y = ay;
  }

  static Clone(apoint: Apg2DPoint): Apg2DPoint {
    return new Apg2DPoint(apoint.x, apoint.y);
  }

  public copyFrom(apoint: Apg2DPoint): void {
    this.x = apoint.x;
    this.y = apoint.y;
  }

  public swapWith(apoint: Apg2DPoint) {
    const buf = Apg2DPoint.Clone(this);
    this.x = apoint.x;
    this.y = apoint.y;
    apoint.x = buf.x;
    apoint.y = buf.y;
  }

  public halfwayFrom(ap: Apg2DPoint): Apg2DPoint {
    const dx = (ap.x - this.x) / 2;
    const dy = (ap.y - this.y) / 2;

    return new Apg2DPoint(this.x + dx, this.y + dy);
  }

  public distanceFrom(apoint: Apg2DPoint) {
    const deltaX = this.x - apoint.x;
    const deltaY = this.y - apoint.x;
    const r = Apg2DUtility.Pythagoras(deltaX, deltaY);
    return r;
  }

  public nearestIn(apoints: Apg2DPoint[]): Apg2DPoint {
    let shortestDistance = Infinity;
    let index = 0;

    for (let i = 0; i < apoints.length; i++) {
      const deltaX = this.x - apoints[i].x;
      const deltaY = this.y - apoints[i].x;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance < shortestDistance) {
        index = i;
        shortestDistance = distance;
      }
    }

    return apoints[index];
  }

  public displacedCopy(adegrees: number, adistance: number): Apg2DPoint {
    return new Apg2DPoint(
      this.x + Math.cos(Apg2DUtility.DegToRad(adegrees)) * adistance,
      this.y + Math.sin(Apg2DUtility.DegToRad(adegrees)) * adistance,
    );
  }
}
