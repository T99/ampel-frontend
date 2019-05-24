/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:16 PM -- January 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIAlignment from "../../../../descriptors/jui-alignment.js";
import JUIColor from "../../../../descriptors/colors/jui-color.js";
import JUIElement from "../../../jui-element.js";
import JUISVGGeometryElementType from "../../../../types/content-leaves/jui-svg-geometry-element-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUISVGGeometry<E extends SVGGraphicsElement> extends JUIElement<E> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-svg-geometry";
	
	// TODO [1/26/19 @ 7:26 PM] - This can be a CSS unit, not just a number.
	protected strokeWidth: number;
	
	protected strokeColor: JUIColor;
	
	protected fillColor: JUIColor;
	
	protected fillOpacity: number;
	
	protected constructor(geometryType: JUISVGGeometryElementType) {
		
		super(geometryType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
	public abstract move(xDelta: number, yDelta: number): void;
	
	public abstract scale(factor: number, origin?: JUIAlignment): void;
	
	public setStrokeWidth(strokeWidth: number): void {
		
		this.strokeWidth = strokeWidth;
		this.element.setAttribute("stroke-width", strokeWidth.toString());
		
	}
	
	public setStrokeColor(strokeColor: JUIColor): void {
		
		/*
		 * TODO [1/23/19 @ 4:52 PM]
		 * 	These properties should be bindable and talk with a JUI CSS system rather than directly with the stylesheet.
		 */
		
		this.strokeColor = strokeColor;
		this.element.setAttribute("stroke", strokeColor.getCSSString());
		
	}
	
	public setFillColor(fillColor: JUIColor): void {
		
		this.fillColor = fillColor;
		this.element.setAttribute("fill", fillColor.getCSSString());
		
	}
	
	public setFillOpacity(fillOpacity: number): void {
		
		// TODO [1/26/19 @ 7:28 PM] - This should only ever be between 0 and 1 (0 <= x <= 1).
		this.fillOpacity = fillOpacity;
		this.element.setAttribute("fill-opacity", fillOpacity.toString());
		
	}
	
}

export default JUISVGGeometry;