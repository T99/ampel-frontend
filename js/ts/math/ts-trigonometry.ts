/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:07 AM -- May 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTrigonometry {
	
	public static degreesToRadians(degrees: number): number {
	
		return (degrees * (Math.PI / 180));
	
	}
	
	public static radiansToDegrees(radians: number): number {
		
		return (radians * (180 / Math.PI));
		
	}
	
	public static normalizeAngle(angle: number): number {
	
		return ((angle + (360 * (Math.abs(Math.round(angle / 360)) + 1))) % 360);
	
	}
	
	public static normalizeHeading(heading: number): number {
		
		return TSTrigonometry.normalizeAngle(heading);
		
	}
	
	public static angleToHeading(angle: number): number {
	
		angle = TSTrigonometry.normalizeAngle(angle);
		
		if ((angle >= 0) && (angle <= 90)) return 90 - angle;
		else return (450 - angle);
	
	}
	
	public static headingToAngle(heading: number): number {
		
		return TSTrigonometry.angleToHeading(heading);
		
	}
	
	public static angleBetweenPoints(x1: number, y1: number, x2: number, y2: number): number {
	
		return Math.asin((x2 - x1) / (y2 - y1));
	
	}
	
}

export default TSTrigonometry;