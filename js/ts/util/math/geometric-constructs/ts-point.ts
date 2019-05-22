/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:03 AM -- May 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A point in 2D space.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSPoint {
	
	private x: number;
	private y: number;
	
	public constructor(x: number, y: number) {
	
		this.x = x;
		this.y = y;
	
	}
	
	public getX(): number {
		
		return this.x;
		
	}
	
	public setX(x: number): void {
		
		this.x = x;
		
	}
	
	public getY(): number {
		
		return this.y;
		
	}
	
	public setY(y: number): void {
		
		this.y = y;
		
	}
	
	public toString(): string {
		
		return "(" + this.x + ", " + this.y + ")";
		
	}
	
}

export default TSPoint;