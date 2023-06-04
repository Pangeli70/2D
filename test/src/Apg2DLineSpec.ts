/** -----------------------------------------------------------------------
 * @module [2D/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2021/02/21]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * @version 0.9.7 [APG 2023/06/03] Separation of concerns lib/srv
 * ------------------------------------------------------------------------
*/
import { Uts , Spc, A2D} from "../deps.ts"



export class Apg2DLineSpec extends Spc.ApgSpcSpec {

  constructor() {
    super(import.meta.url)

    this.flags = {
      [this.test01_BasicLine45Deg.name]: Spc.eApgSpcRun.yes,
      [this.test02_LineIsVerticalUp.name]: Spc.eApgSpcRun.yes,
      [this.test03_LineIsVerticalDown.name]: Spc.eApgSpcRun.yes,
      [this.test04_LineIsHorizontalRight.name]: Spc.eApgSpcRun.yes,
      [this.test05_LineIsHorizontalLeft.name]: Spc.eApgSpcRun.yes,

      [this.test06_CrossLinesIntersectingAtOrigin.name]: Spc.eApgSpcRun.yes,
      [this.test07_PlusLinesIntersectingAtOrigin.name]: Spc.eApgSpcRun.yes,

      [this.test08_LinesIntersecting.name]: Spc.eApgSpcRun.yes,
      [this.test09_LinesAreParallel.name]: Spc.eApgSpcRun.yes,
      [this.test10_LinesAreParallelAndOpposite.name]: Spc.eApgSpcRun.yes,

      [this.test11_pointsOverLine.name]: Spc.eApgSpcRun.yes,
      [this.test12_PointsNotOverLine.name]: Spc.eApgSpcRun.yes,
      [this.test13_PointOverVerticalLine.name]: Spc.eApgSpcRun.yes,

      [this.test14A_BisectorCross1.name]: Spc.eApgSpcRun.yes,
      [this.test14B_BisectorCross2.name]: Spc.eApgSpcRun.yes,
      [this.test14C_BisectorCross3.name]: Spc.eApgSpcRun.yes,
      [this.test14D_BisectorCross4.name]: Spc.eApgSpcRun.yes,

      [this.test15A_BisectorPlus1.name]: Spc.eApgSpcRun.yes,
      [this.test15B_BisectorPlus2.name]: Spc.eApgSpcRun.yes,
      [this.test15C_BisectorPlus3.name]: Spc.eApgSpcRun.yes,
      [this.test15D_BisectorPlus4.name]: Spc.eApgSpcRun.yes,

      [this.test16A_BisectorRandom1.name]: Spc.eApgSpcRun.yes,
      [this.test16B_BisectorRandom2.name]: Spc.eApgSpcRun.yes,
      [this.test16C_BisectorRandom3.name]: Spc.eApgSpcRun.yes,
      [this.test16D_BisectorRandom4.name]: Spc.eApgSpcRun.yes,

      [this.test17A_BisectorParallel1.name]: Spc.eApgSpcRun.yes,
      [this.test17B_BisectorParallel2.name]: Spc.eApgSpcRun.yes,

      [this.test18_PointAtDistanceFromPoint.name]: Spc.eApgSpcRun.yes,
    }
  }

  test01_BasicLine45Deg() {


    const spec = this.specifier;
    const run = spec.Init(this.test01_BasicLine45Deg.name, this.flags);
    if (!run) return;

    const x1 = 100;
    const y1 = 100;
    const x2 = 200;
    const y2 = 200;
    let r = false;

    spec.When(`points are (${x1},${y1}) and (${x2},${y2}) the line in 45 degrees passing from origin `);

    spec.WeExpect('slope is [1]');
    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    r = spec.AreEqual(l1.slope, 1);
    spec.WeGot(`[${l1.slope}]`, r);

    const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    spec.WeExpect(`length is [${len}]`)
    r = spec.AreEqual(l1.length, len);
    spec.WeGot(`[${l1.length}]`, r);

    spec.WeExpect(`angle is [45]`)
    r = spec.AreEqual(l1.angle, 45);
    spec.WeGot(`[${l1.angle}]`, r);

    spec.WeExpect(`intercept X is [0]`)
    r = spec.AreEqual(l1.interceptX, 0);
    spec.WeGot(`[${l1.interceptX}]`, r);

    spec.Resume();
  }

  test02_LineIsVerticalUp() {

    const spec = this.specifier;

    const run = spec.Init(this.test02_LineIsVerticalUp.name, this.flags);
    if (!run) return;

    const x1 = 100;
    const y1 = 100;
    const x2 = 100;
    const y2 = 200;
    let r = false;

    spec.When(`points are (${x1},${y1}) and (${x2},${y2}) the line is vertical toward up and`);

    spec.WeExpect(`slope is infinity`);
    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    r = spec.AreEqual(l1.slope, Infinity);
    spec.WeGot(`[${l1.slope}]`, r);

    const len = y2 - y1;
    spec.WeExpect(`length is ${len}`);
    r = spec.AreEqual(l1.length, len);
    spec.WeGot(`[${l1.length}]`, r);

    spec.WeExpect(`angle is ${90}`);
    r = spec.AreEqual(90, l1.angle);
    spec.WeGot(`[${l1.angle}]`, r);

    spec.Resume();
  }

  test03_LineIsVerticalDown() {

    const spec = this.specifier;

    const run = spec.Init(this.test03_LineIsVerticalDown.name, this.flags);
    if (!run) return;

    const x1 = -100;
    const y1 = 200;
    const x2 = -100;
    const y2 = 100;
    let r = false;

    spec.When(`points are (${x1},${y1}) and (${x2},${y2}) the line is vertical toward down`);

    spec.WeExpect(`slope is negative infinity`);
    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    r = spec.AreEqual(l1.slope, -Infinity);
    spec.WeGot(`[${l1.slope}]`, r);

    const len = Math.abs(y2 - y1);
    spec.WeExpect(`length is ${len}`);
    r = spec.AreEqual(l1.length, len);
    spec.WeGot(`[${l1.length}]`, r);

    spec.WeExpect(`angle is ${270}`);
    r = spec.AreEqual(l1.angle, 270);
    spec.WeGot(`[${l1.angle}]`, r);

    spec.WeExpect(`quadrant is ${A2D.eApg2DQuadrant.posXnegY}`);
    r = spec.AreEqual(A2D.eApg2DQuadrant.posXnegY, l1.quadrant);
    spec.WeGot(`[${l1.quadrant}]`, r);

    spec.Resume();

  }

  test04_LineIsHorizontalRight() {

    const spec = this.specifier;

    const run = spec.Init(this.test04_LineIsHorizontalRight.name, this.flags);
    if (!run) return;

    const x1 = 100;
    const y1 = 100;
    const x2 = 200;
    const y2 = 100;
    let r = false;

    spec.When(`points are (${x1},${y1}) and (${x2},${y2}) the line is horizontal right`);

    spec.WeExpect(`slope is 0 `);
    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    r = spec.AreEqual(l1.slope, 0);
    spec.WeGot(`[${l1.slope}]`, r);

    const len = Math.abs(x2 - x1);
    spec.WeExpect(`length is ${len}`);
    r = spec.AreEqual(l1.length, len);
    spec.WeGot(`[${l1.length}]`, r);

    spec.WeExpect(`quadrant is ${A2D.eApg2DQuadrant.posXposY}`);
    r = spec.AreEqual(l1.quadrant, A2D.eApg2DQuadrant.posXposY);
    spec.WeGot(`[${l1.quadrant}]`, r);

    spec.Resume();
  }

  test05_LineIsHorizontalLeft() {

    const spec = this.specifier;

    const run = spec.Init(this.test05_LineIsHorizontalLeft.name, this.flags);
    if (!run) return;

    const x1 = 200;
    const y1 = 100;
    const x2 = -100;
    const y2 = 100;

    let r = false;

    spec.When(`points are (${x1},${y1}) and (${x2},${y2}) the line is horizontal left`);

    spec.WeExpect(`slope is -0`);
    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    r = spec.AreEqual(l1.slope, -0);
    spec.WeGot(`[-${l1.slope}]`, r);

    spec.WeExpect(`angle is 180`);
    r = spec.AreEqual(180, l1.angle);
    spec.WeGot(`[${l1.angle}]`, r);

    const len = Math.abs(x2 - x1);
    spec.WeExpect(`length is ${len}`);
    r = spec.AreEqual(l1.length, len);
    spec.WeGot(`[${l1.length}]`, r);

    spec.WeExpect(`quadrant is ${A2D.eApg2DQuadrant.negXposY}`);
    r = spec.AreEqual(l1.quadrant, A2D.eApg2DQuadrant.negXposY);
    spec.WeGot(`[${l1.quadrant}]`, r);

    spec.Resume();
  }

  test06_CrossLinesIntersectingAtOrigin() {

    const spec = this.specifier;

    const run = spec.Init(this.test06_CrossLinesIntersectingAtOrigin.name, this.flags);
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

    const p0 = new A2D.Apg2DPoint(x0, y0);
    let r = false;

    spec.When(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`that intersect at (${p0.x},${p0.y})`);
    const intersec: A2D.Apg2DPoint | undefined = l1.intersection(l2);
    if (!intersec) {
      r = false;
      spec.WeGot(`that don't intersect at all`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      spec.WeGot(`[(${intersec.x}.${intersec.y})]`, r)
    }

    spec.Resume();
  }

  test07_PlusLinesIntersectingAtOrigin() {

    const spec = this.specifier;

    const run = spec.Init(this.test07_PlusLinesIntersectingAtOrigin.name, this.flags);
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

    const p0 = new A2D.Apg2DPoint(x0, y0);
    let r = false;

    spec.When(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`that intersect at (${p0.x},${p0.y}`);
    const intersec: A2D.Apg2DPoint | undefined = l1.intersection(l2);
    if (!intersec) {
      r = false;
      spec.WeGot(`that don't intersect at all`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      spec.WeGot(`[(${intersec.x}.${intersec.y})])`, r)
    }

    spec.Resume();
  }

  test08_LinesIntersecting() {

    const spec = this.specifier;

    const run = spec.Init(this.test08_LinesIntersecting.name, this.flags);
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

    const p0 = new A2D.Apg2DPoint(x0, y0);

    let r = false;
    spec.When(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`that intersect at (${p0.x},${p0.y})`);
    const intersec: A2D.Apg2DPoint | undefined = l1.intersection(l2);
    if (!intersec) {
      r = false;
      spec.WeGot(`that don't intersect at all)`, r)
    } else {
      r = Uts.ApgUtsObj.DeepCompare(intersec, p0);
      spec.WeGot(`[(${intersec.x}.${intersec.y})]`, r)
    }

    spec.Resume();
  }

  test09_LinesAreParallel() {

    const spec = this.specifier;

    const run = spec.Init(this.test09_LinesAreParallel.name, this.flags);
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

    spec.When(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`taht are parallel with same angles [45,45] and direction`);
    const intersec: A2D.Apg2DPoint | undefined = l1.intersection(l2);
    r = spec.AreEqual(intersec, undefined);
    r = r && spec.AreEqual(l1.slope, 1);
    r = r && spec.AreEqual(l2.slope, 1);
    r = r && spec.AreEqual(l1.angle, 45);
    r = r && spec.AreEqual(l2.angle, 45);
    spec.WeGot(`[${l1.angle},${l2.angle}]`, r);

    spec.Resume();
  }


  test10_LinesAreParallelAndOpposite() {

    const spec = this.specifier;

    const run = spec.Init(this.test10_LinesAreParallelAndOpposite.name, this.flags);
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

    spec.When(`lines are [(${x1},${y1})(${x2},${y2})] and [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`that are parallel with opposite angles [45,225] and direction`);
    const intersec: A2D.Apg2DPoint | undefined = l1.intersection(l2);
    r = spec.AreEqual(intersec, undefined);
    r = r && spec.AreEqual(l1.slope, 1);
    r = r && spec.AreEqual(l2.slope, 1);
    r = r && spec.AreEqual(l1.angle, 45);
    r = r && spec.AreEqual(l2.angle, 225);
    spec.WeGot(`[${l1.angle},${l2.angle}]`, r);

    spec.Resume();
  }

  test11_pointsOverLine() {

    const spec = this.specifier;

    const run = spec.Init(this.test11_pointsOverLine.name, this.flags);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 100;
    const y2 = 0;
    const x3 = 50;
    const y3 = -50;
    const rad = 25;
    const m = Math.cos(A2D.Apg2DUtility.DegToRad(45)) * rad;
    const x4 = x3 - m;
    const y4 = y3 - m;
    const x5 = x3 + m; 
    const y5 = y3 + m;

    let r = false;

    spec.When(`line is [(${x1},${y1})(${x2},${y2})],  point is (${x3},${y3}) and radious is ${rad}`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const p0: A2D.Apg2DPoint = new A2D.Apg2DPoint(x3, y3);

    const p1: A2D.Apg2DPoint = new A2D.Apg2DPoint(x4, y4);
    const p2: A2D.Apg2DPoint = new A2D.Apg2DPoint(x5, y5);

    spec.WeExpect(`point (${p0.x},${p0.y}) is over line`);
    const pts: A2D.Apg2DPoint[] = l1.pointsOverLine(p0, rad);
    r = spec.AreEqual(pts.length, 2);
    spec.WeGot(r ? "yes" : "no", r);

    spec.WeExpect(`first intersection is (${p1.x},${p1.y})`);
    r = pts[0].x == p1.x && pts[0].y == p1.y;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[(${pts[0].x},${pts[0].y})]`, r);

    spec.WeExpect(`second intersection is (${p2.x},${p2.y})`);
    r = pts[1].x == p2.x && pts[1].y == p2.y;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[(${pts[1].x},${pts[1].y})]`, r);

    spec.Resume();
  }

  test12_PointsNotOverLine() {

    const spec = this.specifier;

    const run = spec.Init(this.test12_PointsNotOverLine.name, this.flags);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 100;
    const y2 = 0;
    const x3 = 50;
    const y3 = -50 - (A2D.Apg2DUtility.EPSILON * 1.1);
    const rad = 25;

    let r = false;

    spec.When(`line is [(${x1},${y1})(${x2},${y2})],  point is (${x3},${y3}) and radious is ${rad}`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const p0: A2D.Apg2DPoint = new A2D.Apg2DPoint(x3, y3);

    spec.WeExpect(`point (${p0.x},${p0.y}) is off the line because Epsilon is ${A2D.Apg2DUtility.EPSILON}`);
    const pts: A2D.Apg2DPoint[] = l1.pointsOverLine(p0, rad);
    r = spec.AreEqual(pts.length, 0);
    spec.WeGot(r ? "yes" : "no", r);

    spec.Resume();
  }

  test13_PointOverVerticalLine() {

    const spec = this.specifier;

    const run = spec.Init(this.test13_PointOverVerticalLine.name, this.flags);
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

    spec.When(`line is [(${x1},${y1})(${x2},${y2})],  point is (${x3},${y3}) and radious is ${rad}`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const p0: A2D.Apg2DPoint = new A2D.Apg2DPoint(x3, y3);

    const p1: A2D.Apg2DPoint = new A2D.Apg2DPoint(x4, y4);
    const p2: A2D.Apg2DPoint = new A2D.Apg2DPoint(x5, y5);

    spec.WeExpect(`point (${p0.x},${p0.y}) is over line`);
    const pts: A2D.Apg2DPoint[] = l1.pointsOverLine(p0, rad);
    r = spec.AreEqual(pts.length, 2);
    spec.WeGot(r ? "yes" : "no", r);

    spec.WeExpect(`First intersection is (${p1.x},${p1.y})`);
    r = pts[0].x == p1.x && pts[0].y == p1.y;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[(${pts[0].x},${pts[0].y})]`, r);

    spec.WeExpect(`Second intersection is (${p2.x},${p2.y})`);
    r = pts[1].x == p2.x && pts[1].y == p2.y;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[(${pts[1].x},${pts[1].y})]`, r);

    spec.Resume();
  }

  test14A_BisectorCross1() {

    const spec = this.specifier;

    const run = spec.Init(this.test14A_BisectorCross1.name, this.flags);
    if (!run) return;

    const x1 = -100;
    const y1 = 100;
    const x2 = 100;
    const y2 = -100;
    const x3 = -100;
    const y3 = -100;
    const x4 = 100;
    const y4 = 100;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle  is 0`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 0);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle  is 90`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 90);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle  is 180`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 180);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle  is 270`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 270);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test14B_BisectorCross2() {

    const spec = this.specifier;

    const run = spec.Init(this.test14B_BisectorCross2.name, this.flags);
    if (!run) return;

    const x1 = -100;
    const y1 = -100;
    const x2 = 100;
    const y2 = 100;
    const x3 = 100;
    const y3 = -100;
    const x4 = -100;
    const y4 = 100;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle  is 90`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 90);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle  is 180`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 180);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle  is 270`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 270);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle  is 0`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 0);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test14C_BisectorCross3() {

    const spec = this.specifier;

    const run = spec.Init(this.test14C_BisectorCross3.name, this.flags);
    if (!run) return;

    const x1 = 100;
    const y1 = -100;
    const x2 = -100;
    const y2 = 100;
    const x3 = 100;
    const y3 = 100;
    const x4 = -100;
    const y4 = -100;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle  is 180`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 180);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle  is 270`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 270);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle  is 0`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 0);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle  is 90`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 90);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test14D_BisectorCross4() {

    const spec = this.specifier;

    const run = spec.Init(this.test14D_BisectorCross4.name, this.flags);
    if (!run) return;

    const x1 = -100;
    const y1 = 100;
    const x2 = 100;
    const y2 = -100;
    const x3 = 100;
    const y3 = 100;
    const x4 = -100;
    const y4 = -100;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle  is 270`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 270);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle  is 0`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 0);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle  is 90`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 90);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle  is 180`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 180);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test15A_BisectorPlus1() {

    const spec = this.specifier;
    
    const run = spec.Init(this.test15A_BisectorPlus1.name, this.flags);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 0;
    const y2 = 100;
    const x3 = -100;
    const y3 = 0;
    const x4 = 100;
    const y4 = 0;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle  is 45`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 45);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle is 135`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 135);
    spec.WeGot(`[${bisector2.angle}] `, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle is 225`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 225);
    spec.WeGot(`[${bisector3.angle}] `, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle  is 315`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 315);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test15B_BisectorPlus2() {

    const spec = this.specifier;

    const run = spec.Init(this.test15B_BisectorPlus2.name, this.flags);
    if (!run) return;

    const x1 = 0;
    const y1 = -100;
    const x2 = 0;
    const y2 = 100;
    const x3 = 100;
    const y3 = 0;
    const x4 = -100;
    const y4 = 0;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);


    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    
    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle  is 135`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 135);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle  is 225`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 225);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle  is 315`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 315);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle  is 45`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 45);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }


  test15C_BisectorPlus3() {

    const spec = this.specifier;

    const run = spec.Init(this.test15C_BisectorPlus3.name, this.flags);
    if (!run) return;

    const x1 = 100;
    const y1 = 0;
    const x2 = -100;
    const y2 = 0;
    const x3 = 0;
    const y3 = 100;
    const x4 = 0;
    const y4 = -100;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle  is 225`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 225);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle  is 315`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 315);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle  is 45`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 45);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle is 135`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 135);
    spec.WeGot(`[${bisector4.angle}] `, r);

    spec.Resume();
  }

  test15D_BisectorPlus4() {

    const spec = this.specifier;

    const run = spec.Init(this.test15D_BisectorPlus4.name, this.flags);
    if (!run) return;

    const x1 = 0;
    const y1 = 100;
    const x2 = 0;
    const y2 = -100;
    const x3 = -100;
    const y3 = 0;
    const x4 = 100;
    const y4 = 0;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle is 315`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 315);
    spec.WeGot(`[${bisector1.angle}] `, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle is 45`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 45);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle  is 135`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 135);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle  is 225`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 225);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test16A_BisectorRandom1() {

    const spec = this.specifier;

    const run = spec.Init(this.test16A_BisectorRandom1.name, this.flags);
    if (!run) return;

    const x1 = -10;
    const y1 = -100;
    const x2 = 10;
    const y2 = 100;
    const x3 = -10;
    const y3 = 100;
    const x4 = 10;
    const y4 = -100;

    spec.When(`first line is [(${x1},${y1})(${x2},${y2})] and second line is [(${x3},${y3})(${x4},${y4})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle is 0`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 0);
    spec.WeGot(`${bisector1.angle}`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle is 90`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = spec.AreEqual(bisector2.angle, 90);
    spec.WeGot(`${bisector2.angle}`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle is 180`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 180);
    spec.WeGot(`${bisector3.angle}`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle is 270`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 270);
    spec.WeGot(`${bisector4.angle}`, r);

    spec.Resume();
  }

  test16B_BisectorRandom2() {

    const spec = this.specifier;

    const run = spec.Init(this.test16B_BisectorRandom2.name, this.flags);
    if (!run) return;

    const alpha: number = A2D.Apg2DUtility.DegToRad(20);
    const beta: number = A2D.Apg2DUtility.DegToRad(220);

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

    spec.When(
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})] `);


    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle is 300`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 300);
    spec.WeGot(`${bisector1.angle}`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle is 30`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 30)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`${bisector2.angle}`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle is 120`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 120);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle is 210`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = spec.AreEqual(bisector4.angle, 210);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test16C_BisectorRandom3() {

    const spec = this.specifier;

    const run = spec.Init(this.test16C_BisectorRandom3.name, this.flags);
    if (!run) return;

    const alpha: number = A2D.Apg2DUtility.DegToRad(110);
    const beta: number = A2D.Apg2DUtility.DegToRad(130);

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

    spec.When(
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle is 120`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 120);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle is 210`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 210)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle is 300`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 300);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle is 30`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 30)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test16D_BisectorRandom4() {

    const spec = this.specifier;

    const run = spec.Init(this.test16D_BisectorRandom4.name, this.flags);
    if (!run) return;

    const alpha: number = A2D.Apg2DUtility.DegToRad(200);
    const beta: number = A2D.Apg2DUtility.DegToRad(300);

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

    spec.When(
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle is 250`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 250);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle is 340`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 340)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[${bisector2.angle}] `, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle is 70`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 70);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle is 160`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 160)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }

  test17A_BisectorParallel1() {

    const spec = this.specifier;

    const run = spec.Init(this.test17A_BisectorParallel1.name, this.flags);
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

    spec.When(
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]`);

    const l1: A2D.Apg2DLine = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2: A2D.Apg2DLine = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle is 45`);
    const bisector1: A2D.Apg2DLine = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 45);
    spec.WeGot(`[${bisector1.angle}] `, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) bisector X intercept is -50`);
    r = spec.AreEqual(bisector1.interceptX, -50);
    spec.WeGot(`[${bisector1.interceptX}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle is 135`);
    const bisector2: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 135)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle is 225`);
    const bisector3: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 225);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle is 315`);
    const bisector4: A2D.Apg2DLine = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 315)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[${bisector4.angle}]`, r);

    spec.Resume();
  }


  test17B_BisectorParallel2() {

    const spec = this.specifier;

    const run = spec.Init(this.test17B_BisectorParallel2.name, this.flags);
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

    spec.When(
      `first line is [(${x1.toFixed(f)},${y1.toFixed(f)})(${x2.toFixed(f)
      },${y2.toFixed(f)})] and second line is [(${x3.toFixed(f)},${y3.toFixed(f)
      })(${x4.toFixed(f)},${y4.toFixed(f)})]`);

    const l1 = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const l2 = A2D.Apg2DLine.Build(x3, y3, x4, y4);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) the bisector angle is 135`);
    const bisector1 = l1.bisector(l2);
    let r = spec.AreEqual(bisector1.angle, 135);
    spec.WeGot(`[${bisector1.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXposY}) bisector X intercept is 0`);
    r = spec.AreEqual(bisector1.interceptX, 0);
    spec.WeGot(`[${bisector1.interceptX}] `, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXposY}) the bisector angle is 225`);
    const bisector2 = l1.bisector(l2, A2D.eApg2DQuadrant.negXposY);
    r = Math.abs((bisector2.angle - 225)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[${bisector2.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.negXnegY}) the bisector angle is 315`);
    const bisector3 = l1.bisector(l2, A2D.eApg2DQuadrant.negXnegY);
    r = spec.AreEqual(bisector3.angle, 315);
    spec.WeGot(`[${bisector3.angle}]`, r);

    spec.WeExpect(`in quadrant (${A2D.eApg2DQuadrant.posXnegY}) the bisector angle is 45`);
    const bisector4 = l1.bisector(l2, A2D.eApg2DQuadrant.posXnegY);
    r = Math.abs((bisector4.angle - 45)) < A2D.Apg2DUtility.EPSILON;
    r = spec.AreEqual(r, true);
    spec.WeGot(`[${bisector4.angle}] `, r);

    spec.Resume();
  }

  test18_PointAtDistanceFromPoint() {

    const spec = this.specifier;

    const run = spec.Init(this.test18_PointAtDistanceFromPoint.name, this.flags);
    if (!run) return;

    const x1 = 100, y1 = 100;
    const x2 = 400, y2 = 400;
    const x3 = 250, y3 = 250;
    const x4 = 200, y4 = 300;
    const x5 = 150, y5 = 150;
    const x6 = 300, y6 = 0;
    const offset1 = Math.sqrt(100 ** 2 + 100 ** 2) / 2;
    const offset2 = Math.sqrt(150 ** 2 + 150 ** 2) * -1;

    const f = 2;
    spec.When(`line is [(${x1},${y1})(${x2},${y2})], point over line is (${x3},${y3}) and offset is ${offset1}`);

    const line = A2D.Apg2DLine.Build(x1, y1, x2, y2);
    const pointOverLine1 = new A2D.Apg2DPoint(x3, y3);
    const testPoint1 = new A2D.Apg2DPoint(x4, y4);
    const pointOverLine2 = new A2D.Apg2DPoint(x5, y5);
    const testPoint2 = new A2D.Apg2DPoint(x6, y6);

    spec.WeExpect(`(${testPoint1.x}, ${testPoint1.y})`);
    const offPt1 = line.pointAtDistanceFromPoint(pointOverLine1, offset1);
    const r1 = spec.AreEqual(offPt1, testPoint1);
    spec.WeGot(`(${offPt1!.x}, ${offPt1!.y})`, r1);

    spec.When(`line is [(${x1},${y1})(${x2},${y2})], point over line is (${x5},${y5}) and offset is ${offset2}`);
    spec.WeExpect(`(${testPoint2.x}, ${testPoint2.y})`);
    const offPt2 = line.pointAtDistanceFromPoint(pointOverLine2, offset2);
    const r2 = spec.AreEqual(offPt1, testPoint1);
    spec.WeGot(`(${offPt2!.x}, ${offPt2!.y})`, r2);

    spec.Resume();
  }


  override executeSync() {

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