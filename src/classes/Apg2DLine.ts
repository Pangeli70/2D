/** -----------------------------------------------------------------------
 * @module [2D]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/27]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
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
  p1: Apg2DPoint;

  p2: Apg2DPoint;

  deltaX: number;

  deltaY: number;

  slope: number;

  /** Slope coefficient in angle */
  angle: number;

  interceptY: number;

  interceptX: number;

  length: number;

  vector: Apg2DPoint;

  quadrant: eApg2DQuadrant;

  /** 
   * Creates a straight line object given 2 points. 
   */
  constructor(ap1: Apg2DPoint, ap2: Apg2DPoint) {
    this.p1 = Apg2DPoint.Clone(ap1);
    this.p2 = Apg2DPoint.Clone(ap2);

    this.deltaX = ap2.x - ap1.x;
    this.deltaY = ap2.y - ap1.y;
    this.slope = this.deltaY / this.deltaX;

    this.interceptY = ap1.y - this.slope * ap1.x;

    // Calculate the X interception (useful for vertical lines)
    if (this.deltaX === 0) {
      this.interceptX = ap2.x;
    } else {
      this.interceptX = this.interceptY * -1 / this.slope;
      if (Object.is(this.interceptX, -0)) {
        this.interceptX = 0;
      }
    }

    this.length = Math.sqrt(
      this.deltaX * this.deltaX + this.deltaY * this.deltaY,
    );

    this.vector = new Apg2DPoint(
      this.deltaX / this.length,
      this.deltaY / this.length,
    );

    if (this.deltaX >= 0) {
      if (this.deltaY >= 0) {
        this.quadrant = eApg2DQuadrant.posXposY;
      } else {
        this.quadrant = eApg2DQuadrant.posXnegY;
      }
    } else {
      if (this.deltaY >= 0) {
        this.quadrant = eApg2DQuadrant.negXposY;
      } else {
        this.quadrant = eApg2DQuadrant.negXnegY;
      }
    }

    this.angle = Apg2DUtility.degreesFromSlope(this.slope, this.quadrant);
  }

  /**
   * Static factory function creates a line object starting from the
   * four x,y values.
   * @param ax1 
   * @param ay1 
   * @param ax2 
   * @param ay2 
   */
  public static Factory(
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
  public Intersection(aline: Apg2DLine): Apg2DPoint | undefined {
    // Check for parallels
    if (this.slope === aline.slope) {
      return undefined;
    }

    const r: Apg2DPoint = new Apg2DPoint(0, 0);

    // This line is vertical
    if (this.slope === Infinity || this.slope === -Infinity) {
      r.x = this.interceptX;
      r.y = aline.slope * r.x + aline.interceptY;
    } // Other line is vertical
    else if (aline.slope === Infinity || aline.slope === -Infinity) {
      r.x = aline.interceptX;
      r.y = this.slope * r.x + this.interceptY;
    } // Other cases
    else {
      r.x = (this.interceptY - aline.interceptY) / (aline.slope - this.slope);
      r.y = this.slope * r.x + this.interceptY;
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
   * @remarks If the line is vertical ... ??
   */
  public PointsOverLine(apoint: Apg2DPoint, aradious: number): Apg2DPoint[] {
    const r: Apg2DPoint[] = [];

    // Check that the poin is over line
    if (!this.Contains(apoint)) {
      return r;
    }

    aradious = Math.abs(aradious);

    let dx = 1;
    let dy = this.slope;
    // the line is vertical
    if (this.slope === Infinity || this.slope === -Infinity) {
      dx = 0;
      dy = aradious;
    } else {
      const hypotenuse = Apg2DUtility.pythagoras(dx, dy);
      dx = dx * aradious / hypotenuse;
      dy = Math.abs(this.slope * dx);
    }
    if (this.quadrant == eApg2DQuadrant.posXposY) {
      r.push(new Apg2DPoint(apoint.x - dx, apoint.y - dy));
      r.push(new Apg2DPoint(apoint.x + dx, apoint.y + dy));
    } else if (this.quadrant == eApg2DQuadrant.negXposY) {
      r.push(new Apg2DPoint(apoint.x + dx, apoint.y - dy));
      r.push(new Apg2DPoint(apoint.x - dx, apoint.y + dy));
    } else if (this.quadrant == eApg2DQuadrant.negXnegY) {
      r.push(new Apg2DPoint(apoint.x + dx, apoint.y + dy));
      r.push(new Apg2DPoint(apoint.x - dx, apoint.y - dy));
    } else {
      r.push(new Apg2DPoint(apoint.x - dx, apoint.y + dy));
      r.push(new Apg2DPoint(apoint.x + dx, apoint.y - dy));
    }

    return r;
  }

  private _bisectorParallel(aline: Apg2DLine, aquadrant: eApg2DQuadrant) {
    const p1 = new Apg2DPoint(
      this.p1.x + this.deltaX / 2,
      this.p1.y + this.deltaY / 2,
    );
    const p2 = new Apg2DPoint(
      aline.p1.x + aline.deltaX / 2,
      aline.p1.y + aline.deltaY / 2,
    );

    const midPoint: Apg2DPoint = p1.HalfwayFrom(p2);
    let displacedMidPoint: Apg2DPoint;
    if (aquadrant == eApg2DQuadrant.posXposY) {
      const additionalAngle = 0;
      const newSlope = Math.tan(
        Apg2DUtility.degToRad(this.angle + additionalAngle),
      );
      const k = this.slope < 0 ? -1 : 1;
      displacedMidPoint = new Apg2DPoint(
        midPoint.x + 1 * k,
        midPoint.y + newSlope * k,
      );
    } else if (aquadrant == eApg2DQuadrant.negXposY) {
      const additionalAngle = 90;
      const newSlope = Math.tan(
        Apg2DUtility.degToRad(this.angle + additionalAngle),
      );

      displacedMidPoint = new Apg2DPoint(
        midPoint.x - 1,
        midPoint.y - newSlope,
      );
    } else if (aquadrant == eApg2DQuadrant.negXnegY) {
      const additionalAngle = 180;
      const newSlope = Math.tan(
        Apg2DUtility.degToRad(this.angle + additionalAngle),
      );
      const k = this.slope < 0 ? -1 : 1;
      displacedMidPoint = new Apg2DPoint(
        midPoint.x - 1 * k,
        midPoint.y - newSlope * k,
      );
    } else {
      const additionalAngle = 270;
      const newSlope = Math.tan(
        Apg2DUtility.degToRad(this.angle + additionalAngle),
      );
      displacedMidPoint = new Apg2DPoint(
        midPoint.x + 1,
        midPoint.y + newSlope,
      );
    }

    return new Apg2DLine(midPoint, displacedMidPoint); // TODO@9 check for quadrant and for horizontal
  }

  private _bisector(
    aline: Apg2DLine,
    aquadrant: eApg2DQuadrant,
    aintersection: Apg2DPoint,
  ) {
    // Points over a line at a convenient distance to avoid problems with almost parallel lines
    // index 0 and index 1 points follow the versus of the line from smaller to bigger
    const ptsOLThis: Apg2DPoint[] = this.PointsOverLine(aintersection, 100000);
    const ptsOLArg: Apg2DPoint[] = aline.PointsOverLine(aintersection, 100000);

    let pts0: Apg2DPoint[] = ptsOLThis;
    let pts1: Apg2DPoint[] = ptsOLArg;

    let line0: Apg2DLine = { ...this };
    let line1: Apg2DLine = aline;

    // in order to be able to manage the required bisector for the various quadrants
    // it is important to determine the right countercockwise sequence of the
    // two lines based upon angle and then the points over line
    // the argument line preceeds the current line so swap order
    if (aline.angle < this.angle) {
      pts0 = ptsOLArg;
      pts1 = ptsOLThis;
      line0 = aline;
      line1 = this;
    }

    const diff = Math.abs(line1.angle - line0.angle);

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

    const midPoint: Apg2DPoint = p1.HalfwayFrom(p2);

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
  public Bisector(
    aline: Apg2DLine,
    aquadrant: eApg2DQuadrant = eApg2DQuadrant.posXposY,
  ): Apg2DLine {
    let r: Apg2DLine;
    const intersection: Apg2DPoint | undefined = this.Intersection(aline);

    // if lines are parallel
    if (intersection === undefined) {
      // if lines are vertical
      if (this.slope === Infinity || this.slope === -Infinity) {
        const p1 = new Apg2DPoint(-1, 0);
        const p2 = new Apg2DPoint(1, 0);
        const xaxis = new Apg2DLine(p1, p2);
        const ip1 = <Apg2DPoint>this.Intersection(xaxis); // cant be null: already checked
        const ip2 = <Apg2DPoint>aline.Intersection(xaxis); // cant be null: already checked
        const ip3 = ip1.HalfwayFrom(ip2);
        const ip4 = new Apg2DPoint(ip3.x, ip3.y + 1);
        r = new Apg2DLine(ip3, ip4); // TODO @9 check for quadrant
      } else {
        r = this._bisectorParallel(aline, aquadrant);
      }
    } else {
      r = this._bisector(aline, aquadrant, intersection);
    }
    return r;
  }

  /** 
   * Determines the line perpendicular to this one and passing through the passed point
   * 
   * @param {Apg2DPoint} apoint: Point.
   * @retunrs {Apg2DLine} New perpendicular line
   * @remarks Any point is allowed belonging or not to this line
   */
  public Perpendicular(apoint: Apg2DPoint): Apg2DLine {
    // Oggetto retta perpendicolare alla retta data passante per il punto dato
    let ldx = 0, ldy = 0, ld = 0;

    // Calcolo angolo retta perpendicolare per convenzione aumenta di 90°
    ld = this.angle + 90;

    // Controlla che non sia più di 360°
    if (ld >= 360) ld -= 360;

    // Calcola deltaX, deltaY e l in base all'inclinazione della retta perpendicolare
    // Controlla anche per errori di arrotondamento funzione coseno
    if (ld === 90) {
      ldx = 0;
      ldy = 1;
    } else if (ld === 270) {
      ldx = 0;
      ldy = -1;
    } else {
      /** Calcola (A)ngolo (P)erpendicolare  in radianti */
      const lap = Apg2DUtility.degToRad(ld);
      ldx = Math.cos(lap);
      ldy = Math.sin(lap);
    }

    const pt = new Apg2DPoint(apoint.x + ldx, apoint.y + ldy);

    const r = new Apg2DLine(apoint, pt);

    return r;
  }

  /** Calcola i dati relativi ai 4 possibili angoli e quadranti delimitati da due rette non parallele
   * @param {Apg2DLine} ar1 Primo oggetto Retta (non è importante l'ordine)
   * @returns {_angoli} Oggetto angoli quadranti (a1, explementary, complementary, ia1, ia2_3, ia4)
   */
  anglesAndQuadrants(ar: Apg2DLine) {
    // Oggetto Angoli quadranti date due rette
    const r: {
      angle?: number;
      a1?: number;
      complementary?: number;
      explementary?: number;
      ia1?: number;
      ia2_3?: number;
      ia4?: number;
    } = {};

    // Copia e ordina ar2.angle (+ grande) ar1.angle (+ piccolo)
    // TODO @9 questa è una schifezza verificare la copia 
    const r2 = ar.angle > this.angle ? ar : this;
    const r1 = ar.angle > this.angle ? this : ar;

    // Angle value
    r.angle = r2.angle - r1.angle;

    // Greater than 180° invert
    if (r.angle > 180) {
      r.angle = 360 - r.angle;
    }

    r.a1 = r.angle;
    r.complementary = 360 - r.angle; // esplementare
    r.explementary = 180 - r.angle; // complementare

    // Detect angle type based on the symbolic vector of the two lines
    const s = r2.quadrant + r1.quadrant;

    switch (s) {
      case "++++": // <90 <90
      case "-+++": // <180 <90
      case "-+-+": // <180 <180
      case "---+": // <270 <180
      case "----": // <270 <270
      case "+---": // >270 <270
      case "+-+-": // >270 >270
        r.ia1 = r1.angle; // angolo inizio quadrante 1
        r.ia2_3 = r.ia1 + r.a1; // angolo inizio quadrante 2 e quadrante 3
        r.ia4 = r.ia2_3 + r.explementary + r.a1; // angolo inizio quadrante 4
        break;
      case "--++": // <270 <90
      case "+-++": // >270 <90
      case "+--+": // >270 <180
        r.ia1 = r2.angle; // angolo inizio quadrante 1
        r.ia2_3 = 360 - (r.ia1 + r.a1); // angolo inizio quadrante 2 e quadrante 3
        r.ia4 = r.ia2_3 + r.explementary; // angolo inizio quadrante 4
    }

    return r;
  }

  /** Verify if the point is part of the line
   * @param {Apg2DPoint} ap Point to verify
   * @returns {boolean} True if the point is on the line within epsilon distance
   */
  public Contains(ap: Apg2DPoint): boolean {
    let r = false;

    let lv = 0;
    let leps = 0;
    // If the line is vertical
    if (this.slope === Infinity || this.slope === -Infinity) {
      leps = ap.x - this.p1.x;
    } else {
      lv = this.slope * ap.x + this.interceptY;
      leps = Math.abs(lv - ap.y);
    }

    r = (leps < Apg2DUtility.APG_ROUNDING_EPSILON);

    return r;
  }

  /** Verifica se il punto passato appartiene al segmento passante per i due punti che generano la retta
   * @param {Apg2DPoint} apr Oggetto Punto da verificare
   * @ritorna {boolean} Vero se il punto appartiene al segmento
   */
  public InTheSegment(apr: Apg2DPoint): boolean {
    // Verifica innazitutto se il punto è sulla retta
    let r = this.Contains(apr);
    if (r) {
      // Poi verifica se è nel segmento
      if (this.p1.x < this.p2.x) {
        r = (r && apr.x >= this.p1.x && apr.x <= this.p2.x);
      } else {
        r = (r && apr.x >= this.p2.x && apr.x <= this.p1.x);
      }
    }
    return r;
  }

  /** Calcola un punto alla distanza specificata da un punto dato su una retta data.
   * @param {Apg2DPoint} app Oggetto Punto Partenza (deve appartenere alla retta)
   * @param {number} al Lunghezza del segmento (valore relativo in base al vettore della retta)
   * @returns {Apg2DPoint} Oggetto Punto (x, y)
   */
  public PointAtTheDistanceFromPoint(
    app: Apg2DPoint,
    al: number,
  ): Apg2DPoint | undefined {
    // Verifica che il punto sia sulla retta
    if (!this.Contains(app)) {
      return undefined;
    }

    let ldx, ldy;

    // retta orizzontale verso deltaX
    if (this.angle === 0 || this.angle === 360) {
      ldx = al;
      ldy = 0;
      // retta orizzontale verso sx
    } else if (this.angle === 180) {
      ldx = -al;
      ldy = 0;
      // retta verticale verso alto
    } else if (this.angle === 90) {
      ldx = 0;
      ldy = al;
      // retta verticale verso basso
    } else if (this.angle === 270) {
      ldx = 0;
      ldy = -al;
    } else {
      // Lunghezza dell'(IPO)tenusa con deltaX = 1
      const ipo = Math.sqrt(1 * 1 + this.slope * this.slope);

      if (
        !(ipo === Number.POSITIVE_INFINITY || ipo === Number.NEGATIVE_INFINITY)
      ) {
        // percentuale della lunghezza desiderata
        const perc = al / ipo;
        ldx = 1 * perc * Math.sign(this.deltaX);
        ldy = this.slope * ldx;
      } else {
        // Non dovrebbe mai arrivare qui. I casi orizzontale e verticale sono già stati verificati
        ldx = 0;
        ldy = 0;
        return undefined;
      }
    }

    return new Apg2DPoint(app.x + ldx, app.y + ldy);
  }

  /** Calcola l'offset alla distanza passata di un punto rispetto alla retta corrente
   * @param {Apg2DPoint} ap Oggetto Punto
   * @param {number} aoffset Distanza di offset (Valore positivo o negativo)
   * @returns {Apg2DPoint} Punto offsettato (x, y).
   */
  OffsetPoint(ap: Apg2DPoint, aoffset: number): Apg2DPoint {
    const perpendicular = this.Perpendicular(ap);
    const intercept = <Apg2DPoint>this.Intersection(perpendicular); // this can't be undefined
    return <Apg2DPoint>perpendicular.PointAtTheDistanceFromPoint(
      intercept,
      aoffset,
    ); // this can't be undefined
  }
}
