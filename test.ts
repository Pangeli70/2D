/** -----------------------------------------------------------------------
 * @module [2D/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2021/02/21]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * @version 0.9.3 [APG 2022/12/13] Store result on remote host
 * ------------------------------------------------------------------------
*/
import { Uts } from "./deps.ts";
import { Apg2DLineSpec } from "./test/src/Apg2DLineSpec.ts";
import { Apg2DPointSpec } from "./test/src/Apg2DPointSpec.ts";

export async function Apg2DTests(arun: Uts.eApgUtsSpecRun) {

  
  if (arun != Uts.eApgUtsSpecRun.yes) return;
  
  const URI = "https://apg-tst.deno.dev/store";
  // const URI = "http://localhost:49609/store";

  const pointSpec = new Apg2DPointSpec()
  pointSpec.specRunSync(Uts.eApgUtsSpecRun.yes);
  const _r1 = await pointSpec.sendToTestService(URI, "A2D", "Apg2DPointSpec");

  const lineSpec = new Apg2DLineSpec()
  lineSpec.specRunSync(Uts.eApgUtsSpecRun.yes);
  const _r2 = await lineSpec.sendToTestService(URI, "A2D", "Apg2DLineSpec");
}

await Apg2DTests(Uts.eApgUtsSpecRun.yes);
