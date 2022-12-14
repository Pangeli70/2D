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

      [this.test14A_BisectorCross1.name]: Uts.eApgUtsSpecRun.yes,
      [this.test14B_BisectorCross2.name]: Uts.eApgUtsSpecRun.yes,
      [this.test14C_BisectorCross3.name]: Uts.eApgUtsSpecRun.yes,
      [this.test14D_BisectorCross4.name]: Uts.eApgUtsSpecRun.yes,

      [this.test15A_BisectorPlus1.name]: Uts.eApgUtsSpecRun.yes,
      [this.test15B_BisectorPlus2.name]: Uts.eApgUtsSpecRun.yes,
      [this.test15C_BisectorPlus3.name]: Uts.eApgUtsSpecRun.yes,
      [this.test15D_BisectorPlus4.name]: Uts.eApgUtsSpecRun.yes,

      [this.test16A_BisectorRandom1.name]: Uts.eApgUtsSpecRun.yes,
      [this.test16B_BisectorRandom2.name]: Uts.eApgUtsSpecRun.yes,
      [this.test16C_BisectorRandom3.name]: Uts.eApgUtsSpecRun.yes,
      [this.test16D_BisectorRandom4.name]: Uts.eApgUtsSpecRun.yes,

      [this.test17A_BisectorParallel1.name]: Uts.eApgUtsSpecRun.yes,
      [this.test17B_BisectorParallel2.name]: Uts.eApgUtsSpecRun.yes,

      [this.test18_PointAtDistanceFromPoint.name]: Uts.eApgUtsSpecRun.yes,
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

    this.specWhen(`points are (${x1},${y1}) and (${x2},${y2}) the line in 45 degrees passing from origin `);

    this.specWeExpect('slope is [1]');
    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, 1);
    this.specWeGot(`[${l1.slope}]`, r);

    const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    this.specWeExpect(`length is [${len}]`)
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`[${l1.length}]`, r);

    this.specWeExpect(`angle is [45]`)
    r = this.areEqualNoDeep(l1.angle, 45);
    this.specWeGot(`[${l1.angle}]`, r);

    this.specWeExpect(`intercept X is [0]`)
    r = this.areEqualNoDeep(l1.interceptX, 0);
    this.specWeGot(`[${l1.interceptX}]`, r);

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

    this.specWhen(`points are (${x1},${y1}) and (${x2},${y2}) the line is vertical toward up and`);

    this.specWeExpect(`slope is infinity`);
    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, Infinity);
    this.specWeGot(`[${l1.slope}]`, r);

    const len = y2 - y1;
    this.specWeExpect(`length is ${len}`);
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`[${l1.length}]`, r);

    this.specWeExpect(`angle is ${90}`);
    r = this.areEqualNoDeep(90, l1.angle);
    this.specWeGot(`[${l1.angle}]`, r);

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

    this.specWhen(`points are (${x1},${y1}) and (${x2},${y2}) the line is vertical toward down`);

    this.specWeExpect(`slope is negative infinity`);
    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, -Infinity);
    this.specWeGot(`[${l1.slope}]`, r);

    const len = Math.abs(y2 - y1);
    this.specWeExpect(`length is ${len}`);
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`[${l1.length}]`, r);

    this.specWeExpect(`angle is ${270}`);
    r = this.areEqualNoDeep(l1.angle, 270);
    this.specWeGot(`[${l1.angle}]`, r);

    this.specWeExpect(`quadrant is ${eApg2DQuadrant.posXnegY}`);
    r = this.areEqualNoDeep(eApg2DQuadrant.posXnegY, l1.quadrant);
    this.specWeGot(`[${l1.quadrant}]`, r);

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

    this.specWhen(`points are (${x1},${y1}) and (${x2},${y2}) the line is horizontal right`);

    this.specWeExpect(`slope is 0 `);
    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, 0);
    this.specWeGot(`[${l1.slope}]`, r);

    const len = Math.abs(x2 - x1);
    this.specWeExpect(`length is ${len}`);
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`[${l1.length}]`, r);

    this.specWeExpect(`quadrant is ${eApg2DQuadrant.posXposY}`);
    r = this.areEqualNoDeep(l1.quadrant, eApg2DQuadrant.posXposY);
    this.specWeGot(`[${l1.quadrant}]`, r);

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

    this.specWhen(`points are (${x1},${y1}) and (${x2},${y2}) the line is horizontal left`);

    this.specWeExpect(`slope is -0`);
    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    r = this.areEqualNoDeep(l1.slope, -0);
    this.specWeGot(`[-${l1.slope}]`, r);

    this.specWeExpect(`angle is 180`);
    r = this.areEqualNoDeep(180, l1.angle);
    this.specWeGot(`[${l1.angle}]`, r);

    const len = Math.abs(x2 - x1);
    this.specWeExpect(`length is ${len}`);
    r = this.areEqualNoDeep(l1.length, len);
    this.specWeGot(`[${l1.length}]`, r);

    this.specWeExpect(`quadrant is ${eApg2DQuadrant.negXposY}`);
    r = this.areEqualNoDeep(l1.quadrant, eApg2DQuadrant.negXposY);
    this.specWeGot(`[${l1.quadrant}]`, r);

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

    this.specWhen(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(`that intersect at (${p0.x},${p0.y})`);
    const intersec: Apg2DPoint | undefined = l1.intersection(l2);
    if (!intersec) {
      r = false;
      this.specWeGot(`that don't intersect at all`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      this.specWeGot(`[(${intersec.x}.${intersec.y})]`, r)
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

    this.specWhen(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(`that intersect at (${p0.x},${p0.y}`);
    const intersec: Apg2DPoint | undefined = l1.intersection(l2);
    if (!intersec) {
      r = false;
      this.specWeGot(`that don't intersect at all`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      this.specWeGot(`[(${intersec.x}.${intersec.y})])`, r)
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
    this.specWhen(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(`that intersect at (${p0.x},${p0.y})`);
    const intersec: Apg2DPoint | undefined = l1.intersection(l2);
    if (!intersec) {
      r = false;
      this.specWeGot(`that don't intersect at all)`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      this.specWeGot(`[(${intersec.x}.${intersec.y})]`, r)
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

    this.specWhen(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(`taht are parallel with same angles [45,45] and direction`);
    const intersec: Apg2DPoint | undefined = l1.intersection(l2);
    r = this.areEqualNoDeep(intersec, undefined);
    r = r && this.areEqualNoDeep(l1.slope, 1);
    r = r && this.areEqualNoDeep(l2.slope, 1);
    r = r && this.areEqualNoDeep(l1.angle, 45);
    r = r && this.areEqualNoDeep(l2.angle, 45);
    this.specWeGot(`[${l1.angle},${l2.angle}]`, r);

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

    this.specWhen(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(`that are parallel with opposite angles [45,225] and direction`);
    const intersec: Apg2DPoint | undefined = l1.intersection(l2);
    r = this.areEqualNoDeep(intersec, undefined);
    r = r && this.areEqualNoDeep(l1.slope, 1);
    r = r && this.areEqualNoDeep(l2.slope, 1);
    r = r && this.areEqualNoDeep(l1.angle, 45);
    r = r && this.areEqualNoDeep(l2.angle, 225);
    this.specWeGot(`[${l1.angle},${l2.angle}]`, r);

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

    const p1: Apg2DPoint = new Apg2DPoint(x4, y4);
    const p2: Apg2DPoint = new Apg2DPoint(x5, y5);

    this.specWeExpect(``);
    const pts: Apg2DPoint[] = l1.pointsOverLine(p0, rad);
    r = this.areEqualNoDeep(pts.length, 2);
    this.specWeGot(`Point (${p0.x},${p0.y}) is over line`, r);

    this.specWeExpect(``);
    r = pts[0].x == p1.x && pts[0].y == p1.y;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`First intersection is (${p1.x},${p1.y}) [(${pts[0].x},${pts[0].y})]`, r);

    this.specWeExpect(``);
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

    this.specWhen(`line is [(${x1},${y1})(${x2},${y2})],  point is (${x3},${y3}) and radious is ${rad}`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const p0: Apg2DPoint = new Apg2DPoint(x3, y3);

    this.specWeExpect(``);
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

    this.specWhen(`line is [(${x1},${y1})(${x2},${y2})],  point is (${x3},${y3}) and radious is ${rad} ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const p0: Apg2DPoint = new Apg2DPoint(x3, y3);

    const p1: Apg2DPoint = new Apg2DPoint(x4, y4);
    const p2: Apg2DPoint = new Apg2DPoint(x5, y5);

    this.specWeExpect(``);
    const pts: Apg2DPoint[] = l1.pointsOverLine(p0, rad);
    r = this.areEqualNoDeep(pts.length, 2);
    this.specWeGot(`Point (${p0.x},${p0.y}) is over line`, r);

    this.specWeExpect(``);
    r = pts[0].x == p1.x && pts[0].y == p1.y;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`First intersection is (${p1.x},${p1.y}) [(${pts[0].x},${pts[0].y})]`, r);

    this.specWeExpect(``);
    r = pts[1].x == p2.x && pts[1].y == p2.y;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`Second intersection is (${p2.x},${p2.y}) [(${pts[1].x},${pts[1].y})]`, r);

    this.specResume();
  }

  test14A_BisectorCross1() {

    const run = this.specInit(this.test14A_BisectorCross1.name);
    if (!run) return;

    const x1 = -100;
    const y1 = 100;
    const x2 = 100;
    const y2 = -100;
    const x3 = -100;
    const y3 = -100;
    const x4 = 100;
    const y4 = 100;

    this.specWhen(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 0);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 0`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 90);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 90`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 180);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 180`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 270);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 270`, r);

    this.specResume();
  }

  test14B_BisectorCross2() {

    const run = this.specInit(`${this.test14B_BisectorCross2.name}`);
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

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 90);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 90`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 180);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 180`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 270);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 270`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 0);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 0`, r);

    this.specResume();
  }

  test14C_BisectorCross3() {

    const run = this.specInit(`${this.test14C_BisectorCross3.name}`);
    if (!run) return;

    const x1 = 100;
    const y1 = -100;
    const x2 = -100;
    const y2 = 100;
    const x3 = 100;
    const y3 = 100;
    const x4 = -100;
    const y4 = -100;

    this.specWhen(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 180);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 180`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 270);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 270`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 0);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 0`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 90);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 90`, r);

    this.specResume();
  }

  test14D_BisectorCross4() {

    const run = this.specInit(`${this.test14D_BisectorCross4.name}`);
    if (!run) return;

    const x1 = -100;
    const y1 = 100;
    const x2 = 100;
    const y2 = -100;
    const x3 = 100;
    const y3 = 100;
    const x4 = -100;
    const y4 = -100;

    this.specWhen(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 270);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 270`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 0);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 0`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 90);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 90`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 180);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 180`, r);

    this.specResume();
  }

  test15A_BisectorPlus1() {

    const run = this.specInit(this.test15A_BisectorPlus1.name);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 0;
    const y2 = 100;
    const x3 = -100;
    const y3 = 0;
    const x4 = 100;
    const y4 = 0;

    this.specWhen(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ..`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 45);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 45`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 135);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 135`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 225);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 225`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 315);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 315`, r);

    this.specResume();
  }

  test15B_BisectorPlus2() {

    const run = this.specInit(`${this.test15B_BisectorPlus2.name}`);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 0;
    const y2 = 100;
    const x3 = 100;
    const y3 = 0;
    const x4 = -100;
    const y4 = 0;

    this.specWhen(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 135);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 135`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 225);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 225`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 315);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 315`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 45);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 45`, r);

    this.specResume();
  }

  test15C_BisectorPlus3() {

    const run = this.specInit(this.test15C_BisectorPlus3.name);
    if (!run) return;

    const x1 = 100;
    const y1 = 0;
    const x2 = -100;
    const y2 = 0;
    const x3 = 0;
    const y3 = 100;
    const x4 = 0;
    const y4 = -100;

    this.specWhen(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 225);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 225`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 315);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 315`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 45);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 45`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 135);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 135`, r);

    this.specResume();
  }

  test15D_BisectorPlus4() {

    const run = this.specInit(`${this.test15D_BisectorPlus4.name}`);
    if (!run) return;

    const x1 = 0;
    const y1 = 100;
    const x2 = 0;
    const y2 = -100;
    const x3 = -100;
    const y3 = 0;
    const x4 = 100;
    const y4 = 0;

    this.specWhen(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 315);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 315`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 45);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 45`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 135);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 135`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 225);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 225`, r);

    this.specResume();
  }

  test16A_BisectorRandom1() {

    const run = this.specInit(`${this.test16A_BisectorRandom1.name}`);
    if (!run) return;

    const x1 = -10;
    const y1 = -100;
    const x2 = 10;
    const y2 = 100;
    const x3 = -10;
    const y3 = 100;
    const x4 = 10;
    const y4 = -100;

    this.specWhen(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle is 0`);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 0);
    this.specWeGot(`${bisector1.angle}`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle is 90`);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = this.areEqualNoDeep(bisector2.angle, 90);
    this.specWeGot(`${bisector2.angle}`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle is 180`);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 180);
    this.specWeGot(`${bisector3.angle}`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle is 270`);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 270);
    this.specWeGot(`${bisector4.angle}`, r);

    this.specResume();
  }

  test16B_BisectorRandom2() {

    const run = this.specInit(`${this.test16B_BisectorRandom2.name}`);
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
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})] `);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle is 300`);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 300);
    this.specWeGot(`${bisector1.angle}`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle is 30`);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 30)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`${bisector2.angle}`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle is 120`);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 120);
    this.specWeGot(`[${bisector3.angle}]`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle  is 210`);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = this.areEqualNoDeep(bisector4.angle, 210);
    this.specWeGot(`[${bisector4.angle}]`, r);

    this.specResume();
  }

  test16C_BisectorRandom3() {

    const run = this.specInit(this.test16C_BisectorRandom3.name);
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
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle is 120`);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 120);
    this.specWeGot(`[${bisector1.angle}]`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle is 210`);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 210)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`[${bisector2.angle}]`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle  is 300`);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 300);
    this.specWeGot(`[${bisector3.angle}]`, r);

    this.specWeExpect(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle  is 30`);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 30)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`[${bisector4.angle}]`, r);

    this.specResume();
  }

  test16D_BisectorRandom4() {

    const run = this.specInit(this.test16D_BisectorRandom4.name);
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
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]  ...`);


    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 250);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 250`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 340)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 340`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 70);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 70`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 160)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 160`, r);

    this.specResume();
  }

  test17A_BisectorParallel1() {

    const run = this.specInit(this.test17A_BisectorParallel1.name);
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
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]  ...`);

    const l1: Apg2DLine = Apg2DLine.Build(x1, y1, x2, y2);
    const l2: Apg2DLine = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1: Apg2DLine = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 45);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 45`, r);

    this.specWeExpect(``);
    r = this.areEqualNoDeep(bisector1.interceptX, -50);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) bisector X intercept [${bisector1.interceptX}] is -50`, r);

    this.specWeExpect(``);
    const bisector2: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 135)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 135`, r);

    this.specWeExpect(``);
    const bisector3: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 225);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 225`, r);

    this.specWeExpect(``);
    const bisector4: Apg2DLine = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 315)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 315`, r);

    this.specResume();
  }

  test17B_BisectorParallel2() {

    const run = this.specInit(this.test17B_BisectorParallel2.name);
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
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]  ...`);

    const l1 = Apg2DLine.Build(x1, y1, x2, y2);
    const l2 = Apg2DLine.Build(x3, y3, x4, y4);

    this.specWeExpect(``);
    const bisector1 = l1.bisector(l2);
    let r = this.areEqualNoDeep(bisector1.angle, 135);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) the bisector angle [${bisector1.angle}] is 135`, r);

    this.specWeExpect(``);
    r = this.areEqualNoDeep(bisector1.interceptX, 0);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXposY}) bisector X intercept [${bisector1.interceptX}] is 0`, r);

    this.specWeExpect(``);
    const bisector2 = l1.bisector(l2, eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 225)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXposY}) the bisector angle [${bisector2.angle}] is 225`, r);

    this.specWeExpect(``);
    const bisector3 = l1.bisector(l2, eApg2DQuadrant.negXnegY);
    r = this.areEqualNoDeep(bisector3.angle, 315);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.negXnegY}) the bisector angle [${bisector3.angle}] is 315`, r);

    this.specWeExpect(``);
    const bisector4 = l1.bisector(l2, eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 45)) < Apg2DUtility.EPSILON;
    r = this.areEqualNoDeep(r, true);
    this.specWeGot(`in quadrant (${eApg2DQuadrant.posXnegY}) the bisector angle [${bisector4.angle}] is 45`, r);

    this.specResume();
  }

  test18_PointAtDistanceFromPoint() {

    const run = this.specInit(this.test18_PointAtDistanceFromPoint.name);
    if (!run) return;

    const x1 = 100;
    const y1 = 100;
    const x2 = 400;
    const y2 = 400;
    const x3 = 250;
    const y3 = 250;
    const x4 = 200;
    const y4 = 300;
    const offset = Math.sqrt(100 ** 2 + 100 ** 2) / 2;

    const f = 2;
    this.specWhen(
      `When line is [(${x1},${y1})(${x2},${y2})], point over line is (${x3},${y3}) and offset is ${offset}  ...`);

    const line = Apg2DLine.Build(x1, y1, x2, y2);
    const pointOverLine = new Apg2DPoint(x3, y3);
    const testPoint = new Apg2DPoint(x4, y4);

    this.specWeExpect(`(${testPoint.x}, ${testPoint.y})`);
    const offsettedPoint = line.pointAtDistanceFromPoint(pointOverLine, offset);
    const r = this.areDeepEqual(offsettedPoint, testPoint);
    this.specWeGot(`(${offsettedPoint!.x}, ${offsettedPoint!.y})`, r);

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

    this.test14A_BisectorCross1();
    this.test14B_BisectorCross2();
    this.test14C_BisectorCross3();
    this.test14D_BisectorCross4();

    this.test15A_BisectorPlus1();
    this.test15B_BisectorPlus2();
    this.test15C_BisectorPlus3();
    this.test15D_BisectorPlus4();

    this.test16A_BisectorRandom1();
    this.test16B_BisectorRandom2();
    this.test16C_BisectorRandom3();
    this.test16D_BisectorRandom4();

    this.test17A_BisectorParallel1();
    this.test17B_BisectorParallel2();

    this.test18_PointAtDistanceFromPoint();
  }
}