/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:39 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUISingleSelectorLeaf from "./jui-single-selector-leaf.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIRadioSingleSelectorLeaf extends JUISingleSelectorLeaf {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-radio-single-selector-leaf";
	
	public constructor(startSelected: boolean = false) {
		
		super(startSelected);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.getHTMLElement().setAttribute("type", "radio");
	
	}
	
	public isSelected(): boolean {
		
		return this.getHTMLElement().checked;
		
	}
	
	public setSelected(isSelected: boolean): boolean {
		
		let displaced: boolean = this.isSelected();
		this.getHTMLElement().checked = isSelected;
		return displaced;
		
	}
	
}

export default JUIRadioSingleSelectorLeaf;