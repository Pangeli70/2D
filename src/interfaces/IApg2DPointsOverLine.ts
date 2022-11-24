/** -----------------------------------------------------------------------
 * @module [2D]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/28]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * -----------------------------------------------------------------------
 */
import { Apg2DPoint } from '../classes/Apg2DPoint.ts';

/**
 * Interface Used for the result of Points over line method
 */
export interface IApg2DPointsOverLine {
  p1: Apg2DPoint;
  p2: Apg2DPoint;
  ok: boolean;
}
