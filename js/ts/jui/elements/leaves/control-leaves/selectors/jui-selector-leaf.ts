/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:54 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElement from "../../../jui-element.js";
import JUIControlLeafType from "../../../../types/element-types/control-leaves/jui-control-leaf-type.js";

// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
abstract class JUISelectorLeaf extends JUIElement {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-selector-leaf";
	
	// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
	protected constructor(type: JUIControlLeafType) {
		
		// TODO [12/14/18 @ 12:14 PM] - Make a proper type class.
		super(type);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUISelectorLeaf;