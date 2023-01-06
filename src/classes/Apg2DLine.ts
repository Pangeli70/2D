/** -----------------------------------------------------------------------
 * @module [2D]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/27]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * @version 0.9.3 [APG 2022/12/11] Cleanup and Renaming
 * -----------------------------------------------------------------------
 */
import { Apg2DPoint } from "./Apg2DPoint.ts";
import { Apg2DUtility } from "./Apg2DUtility.ts";
import { eApg2DQuadrant } from "../enums/eApg2DQuadrant.ts";

/** 
 * Bidimensional line for 2D CAD operations with straight lines and segments
 * It contains the necessary algebric and vectorial data
 */
export class Apg2DLine {
  private _p1: Apg2DPoint;
  get p1() { return this._p1; }

  private _p2: Apg2DPoint;
  get p2() { return this._p2; }

  private _deltaX: number;

  private _deltaY: number;

  private _slope: number;
  get slope() { return this._slope; }

  /** Slope coefficient in angle */
  private _angle: number;
  get angle() { return this._angle; }

  private _interceptY: number;
  get interceptY() { return this._interceptY; }

  private _interceptX: number;
  get interceptX() { return this._interceptX; }

  private _length: number;
  get length() { return this._length; }

  private _vector: Apg2DPoint;
  get vector() { return this._vector; }

  private _quadrant: eApg2DQuadrant;
  get quadrant() { return this._quadrant; }



  constructor(ap1: Apg2DPoint, ap2: Apg2DPoint) {
    this._p1 = Apg2DPoint.Clone(ap1);
    this._p2 = Apg2DPoint.Clone(ap2);

    this._deltaX = ap2.x - ap1.x;
    this._deltaY = ap2.y - ap1.y;
    this._slope = this._deltaY / this._deltaX;

    this._interceptY = ap1.y - this._slope * ap1.x;

    // Calculate the X interception (useful for vertical lines)
    if (this._deltaX === 0) {
      this._interceptX = ap2.x;
    } else {
      this._interceptX = this._interceptY * -1 / this._slope;
      if (Object.is(this._interceptX, -0)) {
        this._interceptX = 0;
      }
    }

    this._length = Math.sqrt(
      this._deltaX * this._deltaX + this._deltaY * this._deltaY,
    );

    this._vector = new Apg2DPoint(
      this._deltaX / this._length,
      this._deltaY / this._length,
    );

    if (this._deltaX >= 0) {
      if (this._deltaY >= 0) {
        this._quadrant = eApg2DQuadrant.posXposY;
      } else {
        this._quadrant = eApg2DQuadrant.posXnegY;
      }
    } else {
      if (this._deltaY >= 0) {
        this._quadrant = eApg2DQuadrant.negXposY;
      } else {
        this._quadrant = eApg2DQuadrant.negXnegY;
      }
    }

    this._angle = Apg2DUtility.DegreesFromSlope(this._slope, this._quadrant);
  }

  public static Build(
    ax1: number,
    ay1: number,
    ax2: number,
    ay2: number,
  ): Apg2DLine {
    const p1: Apg2DPoint = new Apg2DPoint(ax1, ay1);
    const p2: Apg2DPoint = new Apg2DPoint(ax2, ay2);
    return new Apg2DLine(p1, p2);
  }

  /** 
   * Calculates the intersection point with another line.
   * @remarks If lines are parallel returns undefined
   */
  public intersection(aline: Apg2DLine): Apg2DPoint | undefined {
    // Check for parallels
    if (this._slope === aline._slope) {
      return undefined;
    }

    const r: Apg2DPoint = new Apg2DPoint(0, 0);

    // This line is vertical
    if (this._slope === Infinity || this._slope === -Infinity) {
      r.x = this._interceptX;
      r.y = aline._slope * r.x + aline._interceptY;
    } // Other line is vertical
    else if (aline._slope === Infinity || aline._slope === -Infinity) {
      r.x = aline._interceptX;
      r.y = this._slope * r.x + this._interceptY;
    } // Other cases
    else {
      r.x = (this._interceptY - aline._interceptY) / (aline._slope - this._slope);
      r.y = this._slope * r.x + this._interceptY;
    }

    return r;
  }

  /**
   * Calculates two points on a line at the same distance from the specified point.
   *
   * @param {Apg2DPoint} apoint Point on the line
   * @param {number} aradious radious of the circle that will intersect the line with origin at the 
   * specified point
   * @returns {Apg2DPoint[]} An array of 2 points following the versus of the line, 
   * or an empty array if the point don't belogns to the line
   */
  public pointsOverLine(apoint: Apg2DPoint, aradious: number): Apg2DPoint[] {
    const r: Apg2DPoint[] = [];

    // Check that the poin is over line
    if (!this.contains(apoint)) {
      return r;
    }

    aradious = Math.abs(aradious);

    let dx = 1;
    let dy = this._slope;
    // the line is vertical
    if (this._slope === Infinity || this._slope === -Infinity) {
      dx = 0;
      dy = aradious;
    } else {
      const hypotenuse = Apg2DUtility.Pythagoras(dx, dy);
      dx = dx * aradious / hypotenuse;
      dy = Math.abs(this._slope * dx);
    }
    if (this._quadrant == eApg2DQuadrant.posXposY) {
      r.push(new Apg2DPoint(apoint.x - dx, apoint.y - dy));
      r.push(new Apg2DPoint(apoint.x + dx, apoint.y + dy));
    } else if (this._quadrant == eApg2DQuadrant.negXposY) {
      r.push(new Apg2DPoint(apoint.x + dx, apoint.y - dy));
      r.push(new Apg2DPoint(apoint.x - dx, apoint.y + dy));
    } else if (this._quadrant == eApg2DQuadrant.negXnegY) {
      r.push(new Apg2DPoint(apoint.x + dx, apoint.y + dy));
      r.push(new Apg2DPoint(apoint.x - dx, apoint.y - dy));
    } else {
      r.push(new Apg2DPoint(apoint.x - dx, apoint.y + dy));
      r.push(new Apg2DPoint(apoint.x + dx, apoint.y - dy));
    }

    return r;
  }

  #bisectorParallel(aline: Apg2DLine, aquadrant: eApg2DQuadrant) {
    const p1 = new Apg2DPoint(
      this._p1.x + this._deltaX / 2,
      this._p1.y + this._deltaY / 2,
    );
    const p2 = new Apg2DPoint(
      aline._p1.x + aline._deltaX / 2,
      aline._p1.y + aline._deltaY / 2,
    );

    const midPoint: Apg2DPoint = p1.halfwayFrom(p2);
    let displacedMidPoint: Apg2DPoint;
    if (aquadrant == eApg2DQuadrant.posXposY) {
      const additionalAngle = 0;
      const newSlope = Math.tan(
        Apg2DUtility.DegToRad(this._angle + additionalAngle),
      );
      const k = this._slope < 0 ? -1 : 1;
      displacedMidPoint = new Apg2DPoint(
        midPoint.x + 1 * k,
        midPoint.y + newSlope * k,
      );
    }
    else if (aquadrant == eApg2DQuadrant.negXposY) {
      const additionalAngle = 90;
      const newSlope = Math.tan(
        Apg2DUtility.DegToRad(this._angle + additionalAngle),
      );

      displacedMidPoint = new Apg2DPoint(
        midPoint.x - 1,
        midPoint.y - newSlope,
      );
    }
    else if (aquadrant == eApg2DQuadrant.negXnegY) {
      const additionalAngle = 180;
      const newSlope = Math.tan(
        Apg2DUtility.DegToRad(this._angle + additionalAngle),
      );
      const k = this._slope < 0 ? -1 : 1;
      displacedMidPoint = new Apg2DPoint(
        midPoint.x - 1 * k,
        midPoint.y - newSlope * k,
      );
    }
    else {
      const additionalAngle = 270;
      const newSlope = Math.tan(
        Apg2DUtility.DegToRad(this._angle + additionalAngle),
      );
      displacedMidPoint = new Apg2DPoint(
        midPoint.x + 1,
        midPoint.y + newSlope,
      );
    }

    return new Apg2DLine(midPoint, displacedMidPoint); // TODO@9 check for quadrant and for horizontal
  }

  #bisector(
    aline: Apg2DLine,
    aquadrant: eApg2DQuadrant,
    aintersection: Apg2DPoint,
  ) {
    // Points over a line at a convenient distance to avoid problems with almost parallel lines
    // index 0 and index 1 points follow the versus of the line from smaller to bigger
    const ptsOLThis: Apg2DPoint[] = this.pointsOverLine(aintersection, 100000);
    const ptsOLArg: Apg2DPoint[] = aline.pointsOverLine(aintersection, 100000);

    let pts0: Apg2DPoint[] = ptsOLThis;
    let pts1: Apg2DPoint[] = ptsOLArg;

    let line0: Apg2DLine = { ...this };
    let line1: Apg2DLine = aline;

    // To manage the required bisector for the various quadrants
    // it is important to determine the right countercockwise sequence of the
    // two lines based upon angle and then the points over line
    // the argument line preceeds the current line so swap order
    if (aline._angle < this._angle) {
      pts0 = ptsOLArg;
      pts1 = ptsOLThis;
      line0 = aline;
      line1 = this;
    }

    const diff = Math.abs(line1._angle - line0._angle);

    // Mid point between previous points depends on quadrant so we have to choose the
    // right points
    let p1: Apg2DPoint;
    let p2: Apg2DPoint;

    if (aquadrant == eApg2DQuadrant.posXposY) {
      p1 = pts1[1];
      p2 = pts0[1];
    } else if (aquadrant == eApg2DQuadrant.negXposY) {
      if (diff > 180) {
        p1 = pts0[1];
        p2 = pts1[0];
      } else {
        p1 = pts1[1];
        p2 = pts0[0];
      }
    } else if (aquadrant == eApg2DQuadrant.negXnegY) {
      p1 = pts0[0];
      p2 = pts1[0];
    } else {
      if (diff > 180) {
        p1 = pts1[1];
        p2 = pts0[0];
      } else {
        p1 = pts0[1];
        p2 = pts1[0];
      }
    }

    const midPoint: Apg2DPoint = p1.halfwayFrom(p2);

    return new Apg2DLine(aintersection, midPoint);
  }

  /**
   * Calculates the bisector line of this line with another line
   * 
   * @param {Apg2DLine} aline The other line
   * @param {eApg2DQuadrant} aquadrant is used to determine which of the four possible bisectors has 
   * to be calculated.
   * The posXPosY quadrant is referred to the versus of the two lines. The mid point is 
   * calculated in the the quadrant where both lines have the same versus like the cartesian plane. 
   * @remarks If the lines are parallel returns the intermediate line
   */
  public bisector(
    aline: Apg2DLine,
    aquadrant: eApg2DQuadrant = eApg2DQuadrant.posXposY,
  ): Apg2DLine {
    let r: Apg2DLine;
    const intersection: Apg2DPoint | undefined = this.intersection(aline);

    // if lines are parallel
    if (intersection === undefined) {
      // if lines are vertical
      if (this._slope === Infinity || this._slope === -Infinity) {
        const p1 = new Apg2DPoint(-1, 0);
        const p2 = new Apg2DPoint(1, 0);
        const xaxis = new Apg2DLine(p1, p2);
        const ip1 = <Apg2DPoint>this.intersection(xaxis); // cant be null: already checked
        const ip2 = <Apg2DPoint>aline.intersection(xaxis); // cant be null: already checked
        const ip3 = ip1.halfwayFrom(ip2);
        const ip4 = new Apg2DPoint(ip3.x, ip3.y + 1);
        r = new Apg2DLine(ip3, ip4); // TODO @9 check for quadrant
      } else {
        r = this.#bisectorParallel(aline, aquadrant);
      }
    } else {
      r = this.#bisector(aline, aquadrant, intersection);
    }
    return r;
  }


  /** 
   * Determines the line perpendicular to this one and passing through the passed point
   * 
   * @param {Apg2DPoint} apoint: Point.
   * @returns {Apg2DLine} New perpendicular line
   * @remarks Any point is allowed belonging or not to this line
   */
  public perpendicular(apoint: Apg2DPoint): Apg2DLine {

    let dx = 0, dy = 0, orthoAngle = 0;

    orthoAngle = this._angle + 90;


    if (orthoAngle >= 360) orthoAngle -= 360;

    if (orthoAngle === 90) {
      dx = 0;
      dy = 1;
    }
    else if (orthoAngle === 270) {
      dx = 0;
      dy = -1;
    }
    else {
      const orthoAngleInRadians = Apg2DUtility.DegToRad(orthoAngle);
      dx = Math.cos(orthoAngleInRadians);
      dy = Math.sin(orthoAngleInRadians);
    }

    const orthoPoint = new Apg2DPoint(apoint.x + dx, apoint.y + dy);

    const r = new Apg2DLine(apoint, orthoPoint);

    return r;
  }


  /** Get angles defined by two intersecting lines
   */
  intersectionAngles(aline: Apg2DLine) {
    const r = {
      angle: 0,
      complementary: 0,
      explementary: 0,
      q1AngleStart: 0,
      q2_3AngleStart: 0,
      q4AngleStart: 0
    };

    // Copy reference and Swap
    const line1 = aline.angle > this.angle ? this : aline;
    const line2 = aline.angle > this.angle ? aline : this;

    // Angle value
    r.angle = line2.angle - line1.angle;

    // Greater than 180° invert
    if (r.angle > 180) {
      r.angle = 360 - r.angle;
    }

    r.complementary = 360 - r.angle;
    r.explementary = 180 - r.angle;

    // Detect angle type based on the symbolic vector of the two lines
    const s = line2.quadrant + line1.quadrant;

    switch (s) {
      case "++++": // <90 <90
      case "-+++": // <180 <90
      case "-+-+": // <180 <180
      case "---+": // <270 <180
      case "----": // <270 <270
      case "+---": // >270 <270
      case "+-+-": // >270 >270
        r.q1AngleStart = line1.angle;
        r.q2_3AngleStart = r.q1AngleStart + r.angle;
        r.q4AngleStart = r.q2_3AngleStart + r.explementary + r.angle;
        break;
      case "--++": // <270 <90
      case "+-++": // >270 <90
      case "+--+": // >270 <180
        r.q1AngleStart = line2.angle;
        r.q2_3AngleStart = 360 - (r.q1AngleStart + r.angle);
        r.q4AngleStart = r.q2_3AngleStart + r.explementary;
    }

    return r;
  }


  /** Verifies if the point is part of the line
   * @remarks True if the point is on the line within epsilon distance
   */
  public contains(ap: Apg2DPoint): boolean {
    let r = false;

    let lv = 0;
    let leps = 0;
    // If the line is vertical
    if (this._slope === Infinity || this._slope === -Infinity) {
      leps = ap.x - this._p1.x;
    } else {
      lv = this._slope * ap.x + this._interceptY;
      leps = Math.abs(lv - ap.y);
    }

    r = (leps < Apg2DUtility.EPSILON);

    return r;
  }



  public isInTheSegment(apr: Apg2DPoint): boolean {

    let r = this.contains(apr);

    if (r) {

      if (this._p1.x < this._p2.x) {
        r = (apr.x >= this._p1.x && apr.x <= this._p2.x);
      } else {
        r = (apr.x >= this._p2.x && apr.x <= this._p1.x);
      }
    }

    return r;
  }


  /** Follows the line orientation.
   * @remarks Point must be on the line
   */
  public pointAtDistanceFromPoint(
    apointOnLine: Apg2DPoint,
    adistance: number,
  ): Apg2DPoint | undefined {

    if (!this.contains(apointOnLine)) {
      return undefined;
    }

    let ldx = 0, ldy = 0;

    // horizontal to right
    if (this._angle === 0 || this._angle === 360) {
      ldx = adistance;
      ldy = 0;
    }
    // horizontal to left
    else if (this._angle === 180) {
      ldx = -adistance;
      ldy = 0;
    }
    // vertical to top
    else if (this._angle === 90) {
      ldx = 0;
      ldy = adistance;
    }
    // vertical to bottom
    else if (this._angle === 270) {
      ldx = 0;
      ldy = -adistance;
    }
    // diagonal
    else {
      const hypotenuseWithDeltaX1 = Apg2DUtility.Pythagoras(1, this._slope);
      const timesHypotenuseWithDeltaX1InDistance = adistance / hypotenuseWithDeltaX1;

      ldx = timesHypotenuseWithDeltaX1InDistance * Math.sign(this._slope);
      ldy = this._slope * ldx;
    }

    const r = new Apg2DPoint(apointOnLine.x + ldx, apointOnLine.y + ldy)
    return r;
  }


  offsetPoint(ap: Apg2DPoint, aoffset: number): Apg2DPoint {
    const perpendicular = this.perpendicular(ap);
    const intercept = <Apg2DPoint>this.intersection(perpendicular); // this can't be undefined
    const r = <Apg2DPoint>perpendicular.pointAtDistanceFromPoint(
      intercept,
      aoffset,
    ); // this can't be undefined
    return r;
  }
}
