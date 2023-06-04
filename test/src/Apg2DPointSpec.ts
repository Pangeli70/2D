/** -----------------------------------------------------------------------
 * @module [2D/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2021/02/21]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * @version 0.9.7 [APG 2023/06/03] Separation of concerns lib/srv
 * ------------------------------------------------------------------------
*/
import { Spc } from "../deps.ts"
import { Apg2DPoint, Apg2DUtility } from "../../mod.ts";


export class Apg2DPointSpec extends Spc.ApgSpcSpec {


  readonly points: Apg2DPoint[] = [];

  constructor() {
    super(import.meta.url)

    this.flags = {
      [this.Test01a_GetWalfWayPoint.name]: Spc.eApgSpcRun.yes,
      [this.Test01b_GetWalfWayPoint.name]: Spc.eApgSpcRun.yes,
      [this.Test02_NearestIn.name]: Spc.eApgSpcRun.yes,
      [this.Test03_SwapWith.name]: Spc.eApgSpcRun.yes,
      [this.Test04_DisplacedCopy.name]: Spc.eApgSpcRun.yes,
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

  Test01a_GetWalfWayPoint() {

    const spec = this.specifier;

    const run = spec.Init(this.Test01a_GetWalfWayPoint.name, this.flags);
    if (!run) return;

    const pts = this.points;

    spec.When(`points are (${pts[0].x},${pts[0].y}) and (${pts[1].x},${pts[1].y})`);

    const rx = 50;
    const ry = 50;

    spec.WeExpect(`halfway point is (${rx},${ry})`);
    const phw: Apg2DPoint = pts[0].halfwayFrom(pts[1]);
    const r: boolean = ((phw.x === rx) && (phw.y === ry));
    spec.WeGot(`(${phw.x},${phw.y})`, r);

    spec.Resume();

  }

  Test01b_GetWalfWayPoint() {

    const spec = this.specifier;

    const run = spec.Init(this.Test01b_GetWalfWayPoint.name, this.flags);
    if (!run) return;

    const pts = this.points;

    spec.When(`points are (${pts[2].x},${pts[2].y}) and (${pts[0].x},${pts[0].y})`)

    const rx = 10;
    const ry = -50;
    spec.WeExpect(`halfway point is (${rx},${ry})`);
    const phw: Apg2DPoint = pts[2].halfwayFrom(pts[0]);
    const r: boolean = ((phw.x === rx) && (phw.y === ry));
    spec.WeGot(`(${phw.x},${phw.y})`, r);

    spec.Resume();
  }


  Test02_NearestIn() {

    const spec = this.specifier;

    const run = spec.Init(this.Test02_NearestIn.name, this.flags);
    if (!run) return;

    const pts = this.points;

    const p = new Apg2DPoint(-35, 15);

    let strigifiedPts = "";
    pts.forEach((element) => {
      strigifiedPts += `(${element.x},${element.y}) `;
    });
    strigifiedPts = `[${strigifiedPts}]`;

    spec.When(`point is (${p.x},${p.y}) and points are (${strigifiedPts})`);

    const rx = pts[4].x;
    const ry = pts[4].y;
    spec.WeExpect(`nearest point is (${rx},${ry})`);
    const nearest: Apg2DPoint = p.nearestIn(pts);
    const r: boolean = ((nearest.x === rx) && (nearest.y === ry));
    spec.WeGot(`(${nearest.x},${nearest.y})`, r);

    spec.Resume();
  }


  Test03_SwapWith() {

    const spec = this.specifier;

    const run = spec.Init(this.Test03_SwapWith.name, this.flags);
    if (!run) return;

    const pts = this.points;

    spec.When(`point1 is (${pts[4].x},${pts[4].y}) and point2 is (${pts[5].x},${pts[5].y})`);
    const rx = pts[5].x;
    const ry = pts[5].y;

    spec.WeExpect(`point1 after swap is (${rx},${ry})`);
    pts[4].swapWith(pts[5]);
    const r: boolean = ((pts[4].x === rx) && (pts[4].y === ry));
    spec.WeGot(`(${pts[4].x},${pts[4].y})`, r);
    pts[5].swapWith(pts[4]);

    spec.Resume();
  }


  Test04_DisplacedCopy() {

    const spec = this.specifier;

    const run = spec.Init(this.Test04_DisplacedCopy.name, this.flags);
    if (!run) return;

    const pts = this.points;

    spec.When(`point is (${pts[0].x},${pts[0].y})`);

    const degrees = 135;
    const distance = 100;
    const rx = Math.cos(Apg2DUtility.DegToRad(degrees)) * distance;
    const ry = Math.sin(Apg2DUtility.DegToRad(degrees)) * distance;

    spec.WeExpect(`its displaced copy by (${degrees}) degrees ad (${distance}) units is (${rx},${ry})`);
    const dp = pts[0].displacedCopy(degrees, distance);
    const r: boolean = ((dp.x === rx) && (dp.y === ry));
    spec.WeGot(`(${dp.x.toFixed(4)},${dp.y.toFixed(4)})`, r);

    spec.Resume();
  }

  override executeSync() {

    this.Test01a_GetWalfWayPoint();
    this.Test01b_GetWalfWayPoint();
    this.Test02_NearestIn();
    this.Test03_SwapWith();
    this.Test04_DisplacedCopy();

  }
}

