/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:12 PM -- January 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUISVGGeometry from "./jui-svg-geometry.js";
import JUISVGGeometryType from "../../../../types/leaves/content-leaves/jui-svg-geometry-type.js";
import JUIAlignment from "../../../../descriptors/jui-alignment.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISVGCircle extends JUISVGGeometry<SVGCircleElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-svg-circle";
	
	public constructor(radius: number, xOrigin: number, yOrigin: number) {
		
		super(JUISVGGeometryType.CIRCLE);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.setRadius(radius);
		this.setXOrigin(xOrigin);
		this.setYOrigin(yOrigin);
		
	}
	
	public static createFromCenterPoint(diameter: number, xOrigin: number, yOrigin: number): JUISVGCircle {
		
		return new JUISVGCircle(diameter / 2, xOrigin, yOrigin);
		
	}
	
	public setRadius(radius: number): void {
		
		this.element.setAttribute("r", radius.toString());
		
	}
	
	public setDiameter(diameter: number): void {
		
		this.element.setAttribute("r", (diameter / 2).toString());
		
	}
	
	public setXOrigin(xOrigin: number): void {
		
		this.element.setAttribute("cx", xOrigin.toString());
		
	}
	
	public setYOrigin(yOrigin: number): void {
		
		this.element.setAttribute("cy", yOrigin.toString());
		
	}
	
	public move(xDelta: number, yDelta: number): void {
		
		return;
		
	}
	
	public scale(factor: number, origin?: JUIAlignment): void {
		
		return;
		
	}
	
}

export default JUISVGCircle;