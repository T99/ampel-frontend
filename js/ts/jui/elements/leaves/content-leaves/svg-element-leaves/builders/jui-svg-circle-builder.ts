/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:51 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUISVGCircle from "../jui-svg-circle.js";
import JUISVGGeometryBuilder from "./jui-svg-geometry-builder.js";
import InvalidArgumentsError from "../../../../../../errors/invalid-arguments-error.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISVGCircleBuilder extends JUISVGGeometryBuilder<JUISVGCircle> {
	
	public constructor() {
		
		super();
		
		this.addRequirements(
			"radius",
			"xOrigin",
			"yOrigin"
		);
		
	}
	
	public withRadius(radius: any): JUISVGCircleBuilder {
		
		this.fulfillRequirement("radius", radius);
		
		return this;
		
	}
	
	public withDiameter(diameter: any): JUISVGCircleBuilder {
		
		this.fulfillRequirement("radius", diameter / 2);
		
		return this;
		
	}
	
	public withXOrigin(xOrigin: any): JUISVGCircleBuilder {
		
		this.fulfillRequirement("xOrigin", xOrigin);
		
		return this;
		
	}
	
	public withYOrigin(yOrigin: any): JUISVGCircleBuilder {
		
		this.fulfillRequirement("yOrigin", yOrigin);
		
		return this;
		
	}
	
	public build(): JUISVGCircle {
		
		if (this.checkFulfillment()) {
			
			let result: JUISVGCircle = new JUISVGCircle(
				this.getValueOfRequirement("radius"),
				this.getValueOfRequirement("xOrigin"),
				this.getValueOfRequirement("yOrigin")
			);
			
			if (this.checkFulfillment("strokeWidth")) result.setStrokeWidth(this.getValueOfRequirement("strokeWidth"));
			if (this.checkFulfillment("strokeColor")) result.setStrokeColor(this.getValueOfRequirement("strokeColor"));
			if (this.checkFulfillment("fillColor")) result.setFillColor(this.getValueOfRequirement("fillColor"));
			if (this.checkFulfillment("fillOpacity")) result.setFillOpacity(this.getValueOfRequirement("fillOpacity"));
			
			return result;
			
		} else throw new InvalidArgumentsError(this.getErrorMessageForIncompleteBuilder());
		
	}
	
}

export default JUISVGCircleBuilder;