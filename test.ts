/** -----------------------------------------------------------------------
 * @module [2D/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2021/02/21]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * ------------------------------------------------------------------------
*/
import { Uts } from "./deps.ts";
import { Apg2DLineSpec } from "./test/src/Apg2DLineSpec.ts";
import { Apg2DPointSpec } from "./test/src/Apg2DPointSpec.ts";

export function Apg2DSpecSuite(arun: Uts.eApgUtsSpecRun) {

  if (arun != Uts.eApgUtsSpecRun.yes) return;

  new Apg2DPointSpec().specRunSync(Uts.eApgUtsSpecRun.yes);
  new Apg2DLineSpec().specRunSync(Uts.eApgUtsSpecRun.yes);
}

Apg2DSpecSuite(Uts.eApgUtsSpecRun.yes);
