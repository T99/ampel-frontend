/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:40 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIControlLeaf from "../../../jui-control-leaf.js";
import JUIControlLeafType from "../../../../../types/leaves/jui-control-leaf-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUISingleSelectorLeaf extends JUIControlLeaf<HTMLInputElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-single-selector-leaf";
	
	protected constructor(startSelected: boolean) {
		
		super(JUIControlLeafType.INPUT);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.setSelected(startSelected);
		
	}
	
	public abstract isSelected(): boolean;
	
	public abstract setSelected(isSelected: boolean): boolean;
	
}

export default JUISingleSelectorLeaf;