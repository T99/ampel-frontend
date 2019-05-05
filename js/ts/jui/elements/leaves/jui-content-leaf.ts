/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:50 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUILeaf from "../jui-leaf.js";
import JUIContentLeafType from "../../types/leaves/jui-content-leaf-type.js";
import JUILeafType from "../../types/jui-leaf-type.js";

// DOC-ME [12/8/18 @ 4:53 PM] - Documentation required!
abstract class JUIContentLeaf<E extends Element = Element> extends JUILeaf<E> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-content-leaf";
	
	// DOC-ME [12/9/18 @ 3:07 AM] - Documentation required!
	protected constructor(contentLeafType: JUIContentLeafType) {
		
		super(contentLeafType.toString() as unknown as JUILeafType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUIContentLeaf;