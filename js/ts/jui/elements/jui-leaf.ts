/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:45 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElement from "./jui-element.js";
import JUILeafType from "../types/jui-leaf-type.js";
import JUIElementType from "../types/jui-element-type.js";

// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
abstract class JUILeaf<E extends Element> extends JUIElement<E> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-leaf";
	
	// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
	protected constructor(leafType: JUILeafType) {
		
		super(leafType.toString() as unknown as JUIElementType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUILeaf;