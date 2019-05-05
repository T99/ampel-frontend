/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:02 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContentLeaf from "../jui-content-leaf.js";
import JUIContentLeafType from "../../../types/leaves/jui-content-leaf-type.js";

/**
 * A progress bar.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIProgressLeaf extends JUIContentLeaf<HTMLProgressElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-progress-leaf";
	
	public constructor(maximumValue: number, currentValue: number = 0) {
	
		super(JUIContentLeafType.PROGRESS);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
	public getMaximumValue(): number {
		
		return this.getHTMLElement().max;
		
	}
	
	public setMaximumValue(maximumValue: number): number {
		
		let displaced: number = this.getMaximumValue();
		this.getHTMLElement().max = maximumValue;
		return displaced;
		
	}
	
	public getCurrentValue(): number {
		
		return this.getHTMLElement().value;
		
	}
	
	public setCurrentValue(currentValue: number): number {
		
		let displaced: number = this.getCurrentValue();
		this.getHTMLElement().value = currentValue;
		return displaced;
		
	}
	
}

export default JUIProgressLeaf;