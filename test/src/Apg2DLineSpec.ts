/** -----------------------------------------------------------------------
 * @module [2D/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2021/02/21]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * ------------------------------------------------------------------------
*/
import { Uts } from "../../deps.ts"
import { Apg2DLine, Apg2DPoint, Apg2DUtility, eApg2DQuadrant } from "../../mod.ts";


export class Apg2DLineSpec extends Uts.ApgUtsSpecable {

  constructor() {
    super(import.meta.url)

    this.flags = {
      [this.test01_BasicLine45Deg.name]: Uts.eApgUtsSpecRun.yes,
      [this.test02_LineIsVerticalUp.name]: Uts.eApgUtsSpecRun.yes,
      [this.test03_LineIsVerticalDown.name]: Uts.eApgUtsSpecRun.yes,
      [this.test04_LineIsHorizontalRight.name]: Uts.eApgUtsSpecRun.yes,
      [this.test05_LineIsHorizontalLeft.name]: Uts.eApgUtsSpecRun.yes,

      [this.test06_CrossLinesIntersectingAtOrigin.name]: Uts.eApgUtsSpecRun.yes,
      [this.test07_PlusLinesIntersectingAtOrigin.name]: Uts.eApgUtsSpecRun.yes,

      [this.test08_LinesIntersecting.name]: Uts.eApgUtsSpecRun.yes,
      [this.test09_LinesAreParallel.name]: Uts.eApgUtsSpecRun.yes,
      [this.test10_LinesAreParallelAndOpposite.name]: Uts.eApgUtsSpecRun.yes,

      [this.test11_pointsOverLine.name]: Uts.eApgUtsSpecRun.yes,
      [this.test12_PointsNotOverLine.name]: Uts.eApgUtsSpecRun.yes,
      [this.test13_PointOverVerticalLine.name]: Uts.eApgUtsSpecRun.yes,

      [this.test14A_bisectorCross1.name]: Uts.eApgUtsSpecRun.yes,
      [this.test14B_bisectorCross2.name]: Uts.eApgUtsSpecRun.yes,
      [this.test14C_bisectorCross3.name]: Uts.eApgUtsSpecRun.yes,
      [this.test14D_bisectorCross4.name]: Uts.eApgUtsSpecRun.yes,

      [this.test15A_bisectorPlus1.name]: Uts.eApgUtsSpecRun.yes,
      [this.test15B_bisectorPlus2.name]: Uts.eApgUtsSpecRun.yes,
      [this.test15C_bisectorPlus3.name]: Uts.eApgUtsSpecRun.yes,
      [this.test15D_bisectorPlus4.name]: Uts.eApgUtsSpecRun.yes,

      [this.test16A_bisectorRandom1.name]: Uts.eApgUtsSpecRun.yes,
      [this.test16B_bisectorRandom2.name]: Uts.eApgUtsSpecRun.yes,
      [this.test16C_bisectorRandom3.name]: Uts.eApgUtsSpecRun.yes,
      [this.test16D_bisectorRandom4.name]: Uts.eApgUtsSpecRun.yes,

      [this.test17A_bisectorParallel1.name]: Uts.eApgUtsSpecRun.yes,
      [this.test17B_bisectorParallel2.name]: Uts.eApgUtsSpecRun.yes,
    }
  }

  test01_BasicLine45Deg() {

    const run = this.specInit(this.test01_BasicLine45Deg.name);
    if (!run) return;

    const x1 = 100;
    const y1 = 100;
    const x2 = 200;
    const y2 = 200;
    let r = false;

    this.specWhen(`points are (${x1},${y1}) and (${x2},${y2}) the line in 45 degrees passing from origin and ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, 1);
    this.specWeExpect('slope is [1]')
    this.specWeGot(`slope = [${l1.slope}]`, r);

    const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeExpect(`length is [${len}]`)
    this.specWeGot(`length = [${l1.length}]`, r);

    r = this.areEqualNoDeep(l1.angle, 45);
    this.specWeExpect(`angle is [45]`)
    this.specWeGot(`angle = [${l1.angle}]`, r);

    r = this.areEqualNoDeep(l1.interceptX, 0);
    this.specWeExpect(`intercept X is [0]`)
    this.specWeGot(`intercept X = [${l1.interceptX}]`, r);

    this.specResume();
  }

  test02_LineIsVerticalUp() {

    const run = this.specInit(this.test02_LineIsVerticalUp.name);
    if (!run) return;

    const x1 = 100;
    const y1 = 100;
    const x2 = 100;
    const y2 = 200;
    let r = false;

    this.specWhen(`points are (${x1},${y1}) and (${x2},${y2}) the line is vertical toward up and...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, Infinity);
    this.specWeGot(`Slope is infinity [${l1.slope}]`, r);

    const len = y2 - y1;
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`Length is ${len} [${l1.length}]`, r);

    r = this.areEqualNoDeep(90, l1.angle);
    this.specWeGot(`Angle is ${90} [${l1.angle}]`, r);

    this.specResume();
  }


  test03_LineIsVerticalDown() {

    const run = this.specInit(`${this.test03_LineIsVerticalDown.name}`);
    if (!run) return;

    const x1 = -100;
    const y1 = 200;
    const x2 = -100;
    const y2 = 100;
    let r = false;

    this.specWhen(`When points are (${x1},${y1}) and (${x2},${y2}) the line is vertical toward down and ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, -Infinity);
    this.specWeGot(`Slope is negative infinity [${l1.slope}]`, r);

    const len = Math.abs(y2 - y1);
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`Length is ${len} [${l1.length}]`, r);

    r = this.areEqualNoDeep(l1.angle, 270);
    this.specWeGot(`Angle is ${270} [${l1.angle}]`, r);

    r = this.areEqualNoDeep(eApg2DQuadrant.posXnegY, l1.quadrant);
    this.specWeGot(`Quadrant is ${eApg2DQuadrant.posXnegY} [${l1.quadrant}]`, r);

    this.specResume();

  }

  test04_LineIsHorizontalRight() {

    const run = this.specInit(`${this.test04_LineIsHorizontalRight.name}`);
    if (!run) return;

    const x1 = 100;
    const y1 = 100;
    const x2 = 200;
    const y2 = 100;
    let r = false;

    this.specWhen(`When points are (${x1},${y1}) and (${x2},${y2}) the line is horizontal right and...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, 0);
    this.specWeGot(
      `Slope is 0 [${l1.slope}]`, r);

    const len = Math.abs(x2 - x1);
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`Length is ${len} [${l1.length}]`, r);

    r = this.areEqualNoDeep(l1.quadrant, eApg2DQuadrant.posXposY);
    this.specWeGot(`Quadrant is ${eApg2DQuadrant.posXposY} [${l1.quadrant}]`, r);

    this.specResume();
  }


  test05_LineIsHorizontalLeft() {

    const run = this.specInit(`${this.test05_LineIsHorizontalLeft.name}`);
    if (!run) return;

    const x1 = 200;
    const y1 = 100;
    const x2 = -100;
    const y2 = 100;

    let r = false;

    this.specWhen(`When points are (${x1},${y1}) and (${x2},${y2}) the line is horizontal left and ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, -0);
    this.specWeGot(`Slope is -0 [-${l1.slope}]`, r);

    r = this.areEqualNoDeep(180, l1.angle);
    this.specWeGot(`Angle is 180 [${l1.angle}]`, r);

    const len = Math.abs(x2 - x1);
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`Length is ${len} [${l1.length}]`, r);

    r = this.areEqualNoDeep(l1.quadrant, eApg2DQuadrant.negXposY);
    this.specWeGot(`Quadrant is ${eApg2DQuadrant.negXposY} [${l1.quadrant}]`, r);

    this.specResume();
  }

  test06_CrossLinesIntersectingAtOrigin() {

    const run = this.specInit(this.test06_CrossLinesIntersectingAtOrigin.name);
    if (!run) return;

    const x0 = 0;
    const y0 = 0;
    const x1 = -100;
    const y1 = -100;
    const x2 = 100;
    const y2 = 100;
    const x3 = -100;
    const y3 = 100;
    const x4 = 100;
    const y4 = -100;

    const p0 = new Apg2DPoint(x0, y0);
    let r = false;

    this.specWhen(`When lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})] they...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const intersec: Apg2DPoint | undefined = l1.intersection(l2);

    if (!intersec) {
      r = false;
      this.specWeGot(`Don't intersect at (${p0.x},${p0.y})`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      this.specWeGot(`Intersect at (${p0.x},${p0.y}) [(${intersec.x}.${intersec.y})]`, r)
    }

    this.specResume();
  }

  test07_PlusLinesIntersectingAtOrigin() {
    const run = this.specInit(this.test07_PlusLinesIntersectingAtOrigin.name);
    if (!run) return;

    const x0 = 0;
    const y0 = 0;
    const x1 = 0;
    const y1 = -100;
    const x2 = 0;
    const y2 = 100;
    const x3 = -100;
    const y3 = 0;
    const x4 = 100;
    const y4 = 0;

    const p0 = new Apg2DPoint(x0, y0);
    let r = false;

    this.specWhen(`When lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})] they...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const intersec: Apg2DPoint | undefined = l1.intersection(l2);
    if (!intersec) {
      r = false;
      this.specWeGot(`Don't intersect at (${p0.x},${p0.y})`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      this.specWeGot(`Intersect at (${p0.x},${p0.y} [(${intersec.x}.${intersec.y})])`, r)
    }

    this.specResume();
  }

  test08_LinesIntersecting() {
    const run = this.specInit(this.test08_LinesIntersecting.name);
    if (!run) return;

    const x0 = 200;
    const y0 = -200;
    const x1 = -100;
    const y1 = 100;
    const x2 = 0;
    const y2 = 0;
    const x3 = 200;
    const y3 = 100;
    const x4 = 200;
    const y4 = 0;

    const p0 = new Apg2DPoint(x0, y0);

    let r = false;
    this.specWhen(`When lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})] they...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const intersec: Apg2DPoint | undefined = l1.intersection(l2);
    if (!intersec) {
      r = false;
      this.specWeGot(`Don't intersect at (${p0.x},${p0.y})`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      this.specWeGot(`Intersect at (${p0.x},${p0.y}) [(${intersec.x}.${intersec.y})]`, r)
    }

    this.specResume();
  }

  test09_LinesAreParallel() {
    const run = this.specInit(this.test09_LinesAreParallel.name);
    if (!run) return;

    const x1 = 0;
    const y1 = 0;
    const x2 = 100;
    const y2 = 100;
    const x3 = 100;
    const y3 = 0;
    const x4 = 200;
    const y4 = 100;

    let r = false;

    this.specWhen(`When lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})] they...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const intersec: Apg2DPoint | undefined = l1.intersection(l2);

    r = this.areEqualNoDeep(intersec, undefined);
    r = r && this.areEqualNoDeep(l1.slope, 1);
    r = r && this.areEqualNoDeep(l2.slope, 1);
    r = r && this.areEqualNoDeep(l1.angle, 45);
    r = r && this.areEqualNoDeep(l2.angle, 45);
    this.specWeGot(`Are parallel with same angle [${l1.angle},${l2.angle}] and direction [45,45]`, r);

    this.specResume();
  }

  test10_LinesAreParallelAndOpposite() {

    const run = this.specInit(this.test10_LinesAreParallelAndOpposite.name);
    if (!run) return;

    const x1 = 0;
    const y1 = 0;
    const x2 = 100;
    const y2 = 100;
    const x3 = 200;
    const y3 = 100;
    const x4 = 0;
    const y4 = -100;

    let r = false;

    this.specWhen(`When lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})] they...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const intersec: Apg2DPoint | undefined = l1.intersection(l2);

    r = this.areEqualNoDeep(intersec, undefined);
    r = r && this.areEqualNoDeep(l1.slope, 1);
    r = r && this.areEqualNoDeep(l2.slope, 1);
    r = r && this.areEqualNoDeep(l1.angle, 45);
    r = r && this.areEqualNoDeep(l2.angle, 225);

    this.specWeGot(`Are parallel with opposite angle [${l1.angle},${l2.angle}] and direction [45,225]`, r);

    this.specResume();
  }

  test11_pointsOverLine() {


    const run = this.specInit(this.test11_pointsOverLine.name);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 100;
    const y2 = 0;
    const x3 = 50;
    const y3 = -50;
    const rad = 25;
    const m = Math.cos(Apg2DUtility.DegToRad(45)) * rad;
    const x4 = x3 - m;
    const y4 = y3 - m;
    const x5 = x3 + m;
    const y5 = y3 + m;

    let r = false;

    this.specWhen(`When line is [(${x1},${y1})(${x2},${y2})],  point is (${x3},${y3}) and radious is ${rad} ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const p0: Apg2DPoint = new Apg2DPoint(x3, y3);

    const pts: Apg2DPoint[] = l1.pointsOverLine(p0, rad);
    const p1: Apg2DPoint = new Apg2DPoint(x4, y4);
    const p2: Apg2DPoint = new Apg2DPoint(x5, y5);

    r = this.areEqualNoDeep(pts.length, 2);
    this.specWeGot(`Point (${p0.x},${p0.y}) is over line`, r);

    r = pts[0].x == p1.x && pts[0].y == p1.y;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`First intersection is (${p1.x},${p1.y}) [(${pts[0].x},${pts[0].y})]`, r);

    r = pts[1].x == p2.x && pts[1].y == p2.y;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`Second intersection is (${p2.x},${p2.y}) [(${pts[1].x},${pts[1].y})]`, r);

    this.specResume();
  }

  test12_PointsNotOverLine() {

    const run = this.specInit(this.test12_PointsNotOverLine.name);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 100;
    const y2 = 0;
    const x3 = 50;
    const y3 = -50 - (Apg2DUtility.EPSILON * 1.1);
    const rad = 25;

    let r = false;

    this.specWhen(`When line is [(${x1},${y1})(${x2},${y2})],  point is (${x3},${y3}) and radious is ${rad}`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const p0: Apg2DPoint = new Apg2DPoint(x3, y3);

    const pts: Apg2DPoint[] = l1.pointsOverLine(p0, rad);

    r = this.areEqualNoDeep(pts.length, 0);
    this.specWeGot(`Point (${p0.x},${p0.y}) is off the line because Epsilon is ${Apg2DUtility.EPSILON}`, r);

    this.specResume();
  }

  test13_PointOverVerticalLine() {

    const run = this.specInit(this.test13_PointOverVerticalLine.name);
    if (!run) return;

    const x1 = 100;
    const y1 = -100;
    const x2 = 100;
    const y2 = 100;
    const x3 = 100;
    const y3 = 0;
    const rad = 25;
    const x4 = 100;
    const y4 = y3 - rad;
    const x5 = 100;
    const y5 = y3 + rad;

    let r = false;

    this.specWhen(`When line is [(${x1},${y1})(${x2},${y2})],  point is (${x3},${y3}) and radious is ${rad} ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const p0: Apg2DPoint = new Apg2DPoint(x3, y3);

    const pts: Apg2DPoint[] = l1.pointsOverLine(p0, rad);
    const p1: Apg2DPoint = new Apg2DPoint(x4, y4);
    const p2: Apg2DPoint = new Apg2DPoint(x5, y5);

    r = this.areEqualNoDeep(pts.length, 2);
    this.specWeGot(`Point (${p0.x},${p0.y}) is over line`, r);

    r = pts[0].x == p1.x && pts[0].y == p1.y;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`First intersection is (${p1.x},${p1.y}) [(${pts[0].x},${pts[0].y})]`, r);

    r = pts[1].x == p2.x && pts[1].y == p2.y;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`Second intersection is (${p2.x},${p2.y}) [(${pts[1].x},${pts[1].y})]`, r);

    this.specResume();
  }


  test14A_bisectorCross1() {

    const run = this.specInit(this.test14A_bisectorCross1.name);
    if (!run) return;

    const x1 = -100;
    const y1 = 100;
    const x2 = 100;
    const y2 = -100;
    const x3 = -100;
    const y3 = -100;
    const x4 = 100;
    const y4 = 100;

    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 0);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 0`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 90);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 90`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 180);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 180`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 270);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 270`, r);

    this.specResume();
  }


  test14B_bisectorCross2() {

    const run = this.specInit(`${this.test14B_bisectorCross2.name}`);
    if (!run) return;

    const x1 = -100;
    const y1 = -100;
    const x2 = 100;
    const y2 = 100;
    const x3 = 100;
    const y3 = -100;
    const x4 = -100;
    const y4 = 100;


    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 90);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 90`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 180);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 180`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 270);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 270`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 0);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 0`, r);

    this.specResume();
  }

  test14C_bisectorCross3() {

    const run = this.specInit(`${this.test14C_bisectorCross3.name}`);
    if (!run) return;

    const x1 = 100;
    const y1 = -100;
    const x2 = -100;
    const y2 = 100;
    const x3 = 100;
    const y3 = 100;
    const x4 = -100;
    const y4 = -100;

    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 180);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 180`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 270);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 270`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 0);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 0`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 90);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 90`, r);

    this.specResume();
  }


  test14D_bisectorCross4() {

    const run = this.specInit(`${this.test14D_bisectorCross4.name}`);
    if (!run) return;

    const x1 = -100;
    const y1 = 100;
    const x2 = 100;
    const y2 = -100;
    const x3 = 100;
    const y3 = 100;
    const x4 = -100;
    const y4 = -100;

    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 270);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 270`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 0);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 0`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 90);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 90`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 180);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 180`, r);

    this.specResume();
  }

  test15A_bisectorPlus1() {

    const run = this.specInit(this.test15A_bisectorPlus1.name);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 0;
    const y2 = 100;
    const x3 = -100;
    const y3 = 0;
    const x4 = 100;
    const y4 = 0;

    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ..`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 45);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 45`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 135);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 135`, r);


    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 225);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 225`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 315);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 315`, r);

    this.specResume();
  }

  test15B_bisectorPlus2() {

    const run = this.specInit(`${this.test15B_bisectorPlus2.name}`);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 0;
    const y2 = 100;
    const x3 = 100;
    const y3 = 0;
    const x4 = -100;
    const y4 = 0;

    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 135);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 135`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 225);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 225`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 315);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 315`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 45);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 45`, r);

    this.specResume();
  }

  test15C_bisectorPlus3() {

    const run = this.specInit(this.test15C_bisectorPlus3.name);
    if (!run) return;

    const x1 = 100;
    const y1 = 0;
    const x2 = -100;
    const y2 = 0;
    const x3 = 0;
    const y3 = 100;
    const x4 = 0;
    const y4 = -100;


    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 225);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 225`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 315);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 315`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 45);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 45`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 135);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 135`, r);

    this.specResume();
  }


  test15D_bisectorPlus4() {

    const run = this.specInit(`${this.test15D_bisectorPlus4.name}`);
    if (!run) return;

    const x1 = 0;
    const y1 = 100;
    const x2 = 0;
    const y2 = -100;
    const x3 = -100;
    const y3 = 0;
    const x4 = 100;
    const y4 = 0;

    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 315);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 315`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 45);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 45`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 135);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 135`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 225);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 225`, r);

    this.specResume();
  }


  test16A_bisectorRandom1() {

    const run = this.specInit(`${this.test16A_bisectorRandom1.name}`);
    if (!run) return;

    const x1 = -10;
    const y1 = -100;
    const x2 = 10;
    const y2 = 100;
    const x3 = -10;
    const y3 = 100;
    const x4 = 10;
    const y4 = -100;

    this.specWhen(`When first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 0);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 0`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 90);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 90`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 180);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 180`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 270);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 270`, r);
  }

  test16B_bisectorRandom2() {

    const run = this.specInit(`${this.test16B_bisectorRandom2.name}`);
    if (!run) return;

    const alpha: number = Apg2DUtility.DegToRad(20);
    const beta: number = Apg2DUtility.DegToRad(220);

    const s1 = Math.sin(alpha);
    const s2 = Math.sin(beta);
    const c1 = Math.cos(alpha);
    const c2 = Math.cos(beta);

    const re = 100;

    const x1 = c1 * -re;
    const y1 = s1 * -re;
    const x2 = c1 * re;
    const y2 = s1 * re;
    const x3 = c2 * -re;
    const y3 = s2 * -re;
    const x4 = c2 * re;
    const y4 = s2 * re;

    const f = 3;

    this.specWhen(
      `When first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 300);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 300`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 30)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 30`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 120);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 120`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 210);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 210`, r);

    this.specResume();
  }

  test16C_bisectorRandom3() {

    const run = this.specInit(this.test16C_bisectorRandom3.name);
    if (!run) return;

    const alpha: number = Apg2DUtility.DegToRad(110);
    const beta: number = Apg2DUtility.DegToRad(130);

    const s1 = Math.sin(alpha);
    const s2 = Math.sin(beta);
    const c1 = Math.cos(alpha);
    const c2 = Math.cos(beta);

    const re = 100;

    const x1 = c1 * -re;
    const y1 = s1 * -re;
    const x2 = c1 * re;
    const y2 = s1 * re;
    const x3 = c2 * -re;
    const y3 = s2 * -re;
    const x4 = c2 * re;
    const y4 = s2 * re;

    const f = 3;

    this.specWhen(
      `When first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 120);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 120`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 210)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 210`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 300`, r);

    r = this.areEqualNoDeep(bisector3.angle, 300);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 30`, r);

    r = Math.abs((bisector4.angle - 30)) <
      Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);

    this.specResume();
  }

  test16D_bisectorRandom4() {

    const run = this.specInit(this.test16D_bisectorRandom4.name);
    if (!run) return;

    const alpha: number = Apg2DUtility.DegToRad(200);
    const beta: number = Apg2DUtility.DegToRad(300);

    const s1 = Math.sin(alpha);
    const s2 = Math.sin(beta);
    const c1 = Math.cos(alpha);
    const c2 = Math.cos(beta);

    const re = 100;

    const x1 = c1 * -re;
    const y1 = s1 * -re;
    const x2 = c1 * re;
    const y2 = s1 * re;
    const x3 = c2 * -re;
    const y3 = s2 * -re;
    const x4 = c2 * re;
    const y4 = s2 * re;

    const f = 3;

    this.specWhen(
      `When first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 250);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 250`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 340)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 340`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 70);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 70`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 160)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 160`, r);

    this.specResume();
  }

  test17A_bisectorParallel1() {

    const run = this.specInit(this.test17A_bisectorParallel1.name);
    if (!run) return;

    const x1 = -100;
    const y1 = 0;
    const x2 = 0;
    const y2 = 100;
    const x3 = 0;
    const y3 = 0;
    const x4 = 100;
    const y4 = 100;

    const f = 0;


    this.specWhen(
      `When first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 45);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 45`, r);

    r = this.areEqualNoDeep(bisector1.interceptX, -50);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector X intercept [${bisector1.interceptX}] is -50`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 135)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 135`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 225);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 225`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 315)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 315`, r);

    this.specResume();
  }

  test17B_bisectorParallel2() {

    const run = this.specInit(this.test17B_bisectorParallel2.name);
    if (!run) return;

    const x1 = 110;
    const y1 = -100;
    const x2 = -90;
    const y2 = 100;
    const x3 = 90;
    const y3 = -100;
    const x4 = -110;
    const y4 = 100;

    const f = 0;


    this.specWhen(
      `When first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 135);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector angle [${bisector1.angle}] is 135`, r);

    r = this.areEqualNoDeep(bisector1.interceptX, 0);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXposY}) bisector X intercept [${bisector1.interceptX}] is 0`, r);

    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 225)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXposY}) bisector angle [${bisector2.angle}] is 225`, r);

    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 315);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.negXnegY}) bisector angle [${bisector3.angle}] is 315`, r);

    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 45)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`With quadrant (${eApg2DQuadrant.posXnegY}) bisector angle [${bisector4.angle}] is 45`, r);

    this.specResume();
  }



  override specExecuteSync() {

    this.test01_BasicLine45Deg();
    this.test02_LineIsVerticalUp();
    this.test03_LineIsVerticalDown();
    this.test04_LineIsHorizontalRight();
    this.test05_LineIsHorizontalLeft();

    this.test06_CrossLinesIntersectingAtOrigin();
    this.test07_PlusLinesIntersectingAtOrigin();

    this.test08_LinesIntersecting();
    this.test09_LinesAreParallel();
    this.test10_LinesAreParallelAndOpposite();

    this.test11_pointsOverLine();
    this.test12_PointsNotOverLine();
    this.test13_PointOverVerticalLine();

    this.test14A_bisectorCross1();
    this.test14B_bisectorCross2();
    this.test14C_bisectorCross3();
    this.test14D_bisectorCross4();

    this.test15A_bisectorPlus1();
    this.test15B_bisectorPlus2();
    this.test15C_bisectorPlus3();
    this.test15D_bisectorPlus4();

    this.test16A_bisectorRandom1();
    this.test16B_bisectorRandom2();
    this.test16C_bisectorRandom3();
    this.test16D_bisectorRandom4();

    this.test17A_bisectorParallel1();
    this.test17B_bisectorParallel2();

  }


}