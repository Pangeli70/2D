/** -----------------------------------------------------------------------
 * @module [2D]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/28]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2021/02/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/24] Github Beta
 * -----------------------------------------------------------------------
 */

/**
  * Enum that is used as symbolic vector to identify the area (quadrant) between
  * two cossing lines. In the cartesian plane those lines are the x and y axis.
  * For every other pair of lines that are intersecting each other it will define 
  * the portions of the plane starting from the one that is delimited by the lines
  * with the same versus and then proceeds counterclockwise.
  */
export enum eApg2DQuadrant {
  posXposY = "++",
  negXposY = "-+",
  negXnegY = "--",
  posXnegY = "+-",
}
