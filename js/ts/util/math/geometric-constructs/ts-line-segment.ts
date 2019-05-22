/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:03 AM -- May 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSPoint from "./ts-point.js";
import TSGeometry from "../ts-geometry.js";
import TSTrigonometry from "../ts-trigonometry.js";

/**
 * A line segment with two endpoints.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLineSegment {
	
	private startingPoint: TSPoint;
	
	private endingPoint: TSPoint;
	
	public constructor(startingPoint: TSPoint, endingPoint: TSPoint) {
		
		this.startingPoint = startingPoint;
		this.endingPoint = endingPoint;
		
	}
	
	public static createWithRawPoints(x1: number, y1: number, x2: number, y2: number): TSLineSegment {
		
		return new TSLineSegment(new TSPoint(x1, y1), new TSPoint(x2, y2));
		
	}
	
	public static createWithSinglePoint(x1: number, y1: number, length: number, radians: number): TSLineSegment {

		return new TSLineSegment(new TSPoint(x1, y1), TSGeometry.otherEnd(x1, y1, length, radians));
		
	}
	
	public getStartingPoint(): TSPoint {
		
		return this.startingPoint;
		
	}
	
	public setStartingPoint(startingPoint: TSPoint): void {
		
		this.startingPoint = startingPoint;
		
	}
	
	public getEndingPoint(): TSPoint {
		
		return this.endingPoint;
		
	}
	
	public setEndingPoint(endingPoint: TSPoint): void {
		
		this.endingPoint = endingPoint;
		
	}
	
	public getLength(): number {
		
		return TSGeometry.lengthBetween(
			this.startingPoint.getX(),
			this.startingPoint.getY(),
			this.endingPoint.getX(),
			this.endingPoint.getY()
		);
		
	}
	
	public getSlope(): number {
		
		return ((this.endingPoint.getY() - this.startingPoint.getY()) / (this.endingPoint.getX() - this.startingPoint.getX()));
		
	}
	
	public getAngle(): number {
	
		return TSTrigonometry.angleBetweenPoints(
			this.startingPoint.getX(),
			this.startingPoint.getY(),
			this.endingPoint.getX(),
			this.endingPoint.getY()
		);
	
	}
	
	public getMidpoint(): TSPoint {
		
		let sX: number = this.getStartingPoint().getX();
		let sY: number = this.getStartingPoint().getY();
		let eX: number = this.getEndingPoint().getX();
		let eY: number = this.getEndingPoint().getY();
		
		return new TSPoint(
			sX + ((eX - sX) / 2),
			sY + ((eY - sY) / 2)
		);
		
	}
	
	public toString(): string {
		
		return "[" + this.startingPoint.toString() + " --> " + this.endingPoint.toString() + "]";
		
	}
	
}

export default TSLineSegment;