/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:12 PM -- January 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUISVGGeometry from "./jui-svg-geometry.js";
import JUIAlignment from "../../../../descriptors/jui-alignment.js";
import JUISVGGeometryElementType from "../../../../types/element-types/content-leaves/jui-svg-geometry-element-type.js";

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
		
		super(JUISVGGeometryElementType.CIRCLE);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.setRadius(radius);
		this.setXOrigin(xOrigin);
		this.setYOrigin(yOrigin);
		
	}
	
	public static createFromCenterPoint(diameter: number, xOrigin: number, yOrigin: number): JUISVGCircle {
		
		return new JUISVGCircle(diameter / 2, xOrigin, yOrigin);
		
	}
	
	public setRadius(radius: any): void {
		
		this.element.setAttribute("r", radius);
		
	}
	
	public setDiameter(diameter: number): void {
		
		this.element.setAttribute("r", (diameter / 2).toString());
		
	}
	
	public setXOrigin(xOrigin: any): void {
		
		this.element.setAttribute("cx", xOrigin);
		
	}
	
	public setYOrigin(yOrigin: any): void {
		
		this.element.setAttribute("cy", yOrigin);
		
	}
	
	public move(xDelta: any, yDelta: any): void {
		
		return;
		
	}
	
	public scale(factor: any, origin?: JUIAlignment): void {
		
		return;
		
	}
	
}

export default JUISVGCircle;