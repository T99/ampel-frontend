/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:40 AM -- May 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSPoint from "./ts-point.js";

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
	
}

export default TSCircle;