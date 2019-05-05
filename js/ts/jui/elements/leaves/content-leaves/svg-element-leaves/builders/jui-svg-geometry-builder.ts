/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:45 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import BuilderBase from "../../../../../../helpers/builder-base.js";
import JUISVGGeometry from "../jui-svg-geometry.js";
import JUIColor from "../../../../../descriptors/colors/jui-color.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUISVGGeometryBuilder<E extends JUISVGGeometry<SVGGraphicsElement>> extends BuilderBase<E> {
	
	public constructor() {
		
		super();
		
		this.addOptionals(
			"strokeWidth",
			"strokeColor",
			"fillColor",
			"fillOpacity"
		);
		
	}
	
	public withStrokeWidth(strokeWidth: number): JUISVGGeometryBuilder<E> {
		
		this.fulfillRequirement("strokeWidth", strokeWidth);
		
		return this;
		
	}
	
	public withStrokeColor(strokeColor: JUIColor): JUISVGGeometryBuilder<E> {
		
		this.fulfillRequirement("strokeColor", strokeColor);
		
		return this;
		
	}
	
	public withFillColor(fillColor: JUIColor): JUISVGGeometryBuilder<E> {
		
		this.fulfillRequirement("fillColor", fillColor);
		
		return this;
		
	}
	
	public withFillOpacity(fillOpacity: number): JUISVGGeometryBuilder<E> {
		
		this.fulfillRequirement("fillOpacity", fillOpacity);
		
		return this;
		
	}
	
}

export default JUISVGGeometryBuilder;