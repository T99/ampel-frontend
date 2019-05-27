/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 PM -- April 06th, 2019.
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
class JUICheckboxSingleSelectorLeaf extends JUISingleSelectorLeaf {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-checkbox-single-selector-leaf";
	
	public constructor(startSelected: boolean = false) {
		
		super(startSelected);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.getElement().setAttribute("type", "checkbox");
		
	}
	
	public isSelected(): boolean {
		
		return this.getElement().checked;
		
	}
	
	public setSelected(isSelected: boolean): boolean {
		
		let displaced: boolean = this.isSelected();
		this.getElement().checked = isSelected;
		return displaced;
		
	}
	
}

export default JUICheckboxSingleSelectorLeaf;