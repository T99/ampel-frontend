/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:08 PM -- December 22nd, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIButtonLeaf from "../../jui/elements/leaves/control-leaves/jui-button-leaf.js";

/**
 * An Ampel styled button.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIButton extends JUIButtonLeaf {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-button";
	
	public constructor(buttonText: string) {
		
		super(buttonText);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default AUIButton;