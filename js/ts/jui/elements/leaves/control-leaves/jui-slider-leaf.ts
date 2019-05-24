/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:09 PM -- March 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElement from "../../jui-element.js";
import JUIControlLeafType from "../../../types/element-types/control-leaves/jui-control-leaf-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISliderLeaf extends JUIElement<HTMLInputElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-slider-leaf";
	
	// DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
	public constructor(minimumValue: number, maximumValue: number, defaultValue?: number, stepValue?: number) {
		
		super(JUIControlLeafType.INPUT);
		this.addClasses(this.TYPE_IDENTITY);
		this.getHTMLElement().setAttribute("type", "range");
		
		this.setMinimumValue(minimumValue);
		this.setMaximumValue(maximumValue);
		if (defaultValue !== undefined) this.setValue(defaultValue);
		if (stepValue !== undefined) this.setStepValue(stepValue);
		
	}
	
	// DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
	public setMinimumValue(minimumValue: number): number {
		
		let displaced: number = this.getMinimumValue();
		
		this.getHTMLElement().min = minimumValue.toString();
		
		return displaced;
	
	}
	
	// DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
	public getMinimumValue(): number {
		
		return parseInt(this.getHTMLElement().min);
		
	}
	
	// DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
	public setMaximumValue(maximumValue: number): number {
		
		let displaced: number = this.getMaximumValue();
		
		this.getHTMLElement().max = maximumValue.toString();
		
		return displaced;
		
	}
	
	// DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
	public getMaximumValue(): number {
		
		return parseInt(this.getHTMLElement().max);
		
	}
	
	// DOC-ME [3/24/19 @ 2:27 PM] - Documentation required!
	public setStepValue(stepValue: number): number {
		
		let displaced: number = this.getStepValue();
		
		this.getHTMLElement().step = (stepValue === 0 ? "any" : stepValue.toString());
		
		return displaced;
		
	}
	
	// DOC-ME [3/24/19 @ 2:33 PM] - Documentation required!
	public getStepValue(): number {
		
		let displacedString: string = this.getHTMLElement().step;
		
		return (displacedString === "any" ? 0 : parseInt(displacedString));
		
	}
	
	// DOC-ME [3/23/19 @ 7:36 PM] - Documentation required!
	public setValue(value: number): number {
		
		let displaced: number = parseInt(this.getHTMLElement().value);
		
		this.getHTMLElement().value = value.toString();
		
		return displaced;
		
	}
	
	// DOC-ME [3/23/19 @ 7:36 PM] - Documentation required!
	public getValue(): number {
		
		return parseFloat(this.getHTMLElement().value);
		
	}
	
}

export default JUISliderLeaf;