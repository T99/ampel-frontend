/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:40 AM -- May 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSPoint from "./ts-point.js";
import TSLineSegment from "./ts-line-segment.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSCircle {
	
	private centerPoint: TSPoint;
	
	private radius: number;
	
	public constructor(centerPoint: TSPoint, radius: number) {
	
		this.centerPoint = centerPoint;
		this.radius = radius;
	
	}
	
	public static createDirectly(x: number, y: number, radius: number): TSCircle {
		
		return new TSCircle(new TSPoint(x, y), radius);
		
	}
	
	public static createWithTwoPoints(point1: TSPoint, point2: TSPoint, radius: number): [ TSCircle, TSCircle ] {
		
		let resultTuple: [ TSCircle, TSCircle ] = [ undefined, undefined ];
		
		// let connection: TSLineSegment = new TSLineSegment(point1, point2);
		
		return resultTuple;
		
	}
	
	public getRadius(): number {
		
		return this.radius;
		
	}
	
	public setRadius(radius: number): void {
		
		this.radius = radius;
		
	}
	
	public getDiameter(): number {
		
		return (2 * this.getRadius());
		
	}
	
	public setDiameter(diameter: number): void {
		
		this.radius = (diameter / 2);
		
	}
	
	public getCenterPoint(): TSPoint {
		
		return this.centerPoint;
		
	}
	
	public setCenterPoint(centerPoint: TSPoint): void {
		
		this.centerPoint = centerPoint;
		
	}
	
	public getCircumference(): number {
	
		return (2 * Math.PI * this.getRadius());
	
	}
	
	public getArea(): number {
		
		return (Math.PI * Math.pow(this.getRadius(), 2));
		
	}
	
	public getPointAtAngle(radians: number): TSPoint {
		
		return (TSLineSegment.createWithSinglePoint(
			this.getCenterPoint().getX(),
			this.getCenterPoint().getY(),
			this.getRadius(),
			radians
		)).getEndingPoint();
		
	}
	
	public getArcLength(radians: number): number {
		
		return (this.getCircumference() * (Math.abs(radians) / (2 * Math.PI)));
		
	}
	
	public containsPoint(point: TSPoint): boolean {
		
		let connection: TSLineSegment = new TSLineSegment(this.getCenterPoint(), point);
		
		return (connection.getLength() <= this.getRadius());
		
	}
	
}

export default TSCircle;