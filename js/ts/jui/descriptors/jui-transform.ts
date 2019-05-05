/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:31 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIUnitDescriptor from "./units/jui-unit-descriptor.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITransform {
	
	private cssString: string;
	
	private constructor(cssString: string) {
		
		this.cssString = cssString;
		
	}
	
	public static scale(xFactor: number, yFactor: number): JUITransform {
		
		return new JUITransform("scale(" + xFactor + ", " + yFactor + ")");
		
	}
	
	public static scaleX(factor: number): JUITransform {
		
		return new JUITransform("scaleX(" + factor + ")");
		
	}
	
	public static scaleY(factor: number): JUITransform {
		
		return new JUITransform("scaleY(" + factor + ")");
		
	}
	
	public static scaleZ(factor: number): JUITransform {
		
		return new JUITransform("scaleZ(" + factor + ")");
		
	}
	
	public static translate(xValue: number, xUnit: JUIUnitDescriptor, yValue: number, yUnit: JUIUnitDescriptor): JUITransform {
		
		return new JUITransform("translate(" + xValue + xUnit.toString() + ", " + yValue + yUnit.toString() + ")");
		
	}
	
	public static translateX(value: number, unit: JUIUnitDescriptor): JUITransform {
		
		return new JUITransform("translateX(" + value + unit.toString() + ")");
		
	}
	
	public static translateY(value: number, unit: JUIUnitDescriptor): JUITransform {
		
		return new JUITransform("translateY(" + value + unit.toString() + ")");
		
	}
	
	public static translateZ(value: number, unit: JUIUnitDescriptor): JUITransform {
		
		return new JUITransform("translateZ(" + value + unit.toString() + ")");
		
	}
	
	public getCSSString(): string {
		
		return this.cssString;
		
	}
	
}

export default JUITransform;