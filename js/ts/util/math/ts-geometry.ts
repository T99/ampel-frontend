/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:02 AM -- May 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSPoint from "./geometric-constructs/ts-point.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSGeometry {
	
	public static otherEnd(x: number, y: number, length: number, radians: number): TSPoint {
		
		return new TSPoint(
			x + length * Math.cos(radians),
			y + length * Math.sin(radians)
		);
		
	}
	
	public static lengthBetween(x1: number, y1: number, x2: number, y2: number): number {
		
		return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
		
	}
	
	public static centerPoints(x1: number, y1: number, x2: number, y2: number, r: number): { upperX: number, upperY: number, lowerX: number, lowerY: number} {
		
		let result: { upperX: number, upperY: number, lowerX: number, lowerY: number} = {
			upperX: undefined,
			upperY: undefined,
			lowerX: undefined,
			lowerY: undefined
		};
		
		// let k: number = TSGeometry.lengthBetween(x1, y1, x2, y2);
		// let p: number = k / 2;
		// let q: number = Math.sqrt(Math.pow(r, 2) - Math.pow(p, 2));
		// let h: number = Math.acos((Math.pow(p, 2) + Math.pow(r, 2) - Math.pow(q, 2)) / (2 * p * r));
		
		return result;
		
	}
	
}

export default TSGeometry;