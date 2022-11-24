/** -----------------------------------------------------------------------
 * @module [2D/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2021/02/21]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * ------------------------------------------------------------------------
*/
import { Uts } from "../../deps.ts"
import { Apg2DPoint, Apg2DUtility } from "../../mod.ts";


export class Apg2DPointSpec extends Uts.ApgUtsSpecable {


  readonly points: Apg2DPoint[] = [];

  constructor() {
    super(import.meta.url)

    this.flags = {
      [this.Test01_GetWalfWayPoint.name]: Uts.eApgUtsSpecRun.yes,
      [this.Test02_NearestIn.name]: Uts.eApgUtsSpecRun.yes,
      [this.Test03_SwapWith.name]: Uts.eApgUtsSpecRun.yes,
      [this.Test04_DisplacedCopy.name]: Uts.eApgUtsSpecRun.yes,
    }

    const p0 = new Apg2DPoint(0, 0);
    this.points.push(p0);

    const p1 = new Apg2DPoint(100, 100);
    this.points.push(p1);

    const p2 = new Apg2DPoint(20, -100);
    this.points.push(p2);

    const p3 = new Apg2DPoint(80, 40);
    this.points.push(p3);

    const p4 = new Apg2DPoint(-40, 20);
    this.points.push(p4);

    const p5 = new Apg2DPoint(-100, -50);
    this.points.push(p5);


  }

  Test01_GetWalfWayPoint() {

    const run = this.specInit(this.Test01_GetWalfWayPoint.name);
    if (!run) return;

    const pts = this.points;

    this.specWhen(`When points are (${pts[0].x},${pts[0].y}) and (${pts[1].x},${pts[1].y})`);
    {
      const rx = 50;
      const ry = 50;
      const phw: Apg2DPoint = pts[0].HalfwayFrom(pts[1]);
      const r: boolean = ((phw.x === rx) && (phw.y === ry));
      this.specWeGot(`Halfway point is (${rx},${ry})`, r);
    }

    this.specWhen(`When points are (${pts[2].x},${pts[2].y}) and (${pts[0].x},${pts[0].y})`)
    {
      const rx = 10;
      const ry = -50;
      const phw: Apg2DPoint = pts[2].HalfwayFrom(pts[0]);
      const r: boolean = ((phw.x === rx) && (phw.y === ry));
      this.specWeGot(`Halfway point is (${rx},${ry})`, r);
    }
  }

  Test02_NearestIn() {

    const run = this.specInit(this.Test02_NearestIn.name);
    if (!run) return;

    const pts = this.points;

    const p = new Apg2DPoint(-35, 15);

    let strigifiedPts = "";
    pts.forEach((element) => {
      strigifiedPts += `(${element.x},${element.y}) `;
    });
    strigifiedPts = `[${strigifiedPts}]`;

    this.specWhen(`When point is (${p.x},${p.y}) and points are (${strigifiedPts})`);
    {
      const rx = pts[4].x;
      const ry = pts[4].y;
      const nearest: Apg2DPoint = p.NearestIn(pts);
      console.log(nearest);
      const r: boolean = ((nearest.x === rx) && (nearest.y === ry));
      this.specWeGot(`Nearest point is (${rx},${ry})`, r);
    }

  }

  Test03_SwapWith() {

    const run = this.specInit(this.Test03_SwapWith.name);
    if (!run) return;

    const pts = this.points;

    this.specWhen(`When points are (${pts[4].x},${pts[4].y}) and (${pts[5].x},${pts[5].y})`);
    {
      const rx = pts[5].x;
      const ry = pts[5].y;
      pts[4].SwapWith(pts[5]);
      const r: boolean = ((pts[4].x === rx) && (pts[4].y === ry));
      this.specWeGot(`After swap first points is (${rx},${ry})`, r);
      pts[5].SwapWith(pts[4]);
    }
  }

  Test04_DisplacedCopy() {

    const run = this.specInit(this.Test04_DisplacedCopy.name);
    if (!run) return;

    const pts = this.points;

    this.specWhen(`When point is (${pts[0].x},${pts[0].y})`);
    {
      const degrees = 135;
      const distance = 100;
      const rx = Math.cos(Apg2DUtility.degToRad(degrees)) * distance;
      const ry = Math.sin(Apg2DUtility.degToRad(degrees)) * distance;
      const dp = pts[0].DisplacedCopy(degrees, distance);
      const r: boolean = ((dp.x === rx) && (dp.y === ry));
      this.specWeGot(
        `Its displaced copy by ${degrees}[deg]-${distance}[units] is (${rx.toFixed(4)
        },${ry.toFixed(4)})`, r);
    }
  }

  override specExecuteSync() {

    this.Test01_GetWalfWayPoint();
    this.Test02_NearestIn();
    this.Test03_SwapWith();
    this.Test04_DisplacedCopy();

  }
}

