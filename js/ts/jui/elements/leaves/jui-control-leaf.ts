/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:50 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUILeaf from "../jui-leaf.js";
import JUIControlLeafType from "../../types/leaves/jui-control-leaf-type.js";
import JUILeafType from "../../types/jui-leaf-type.js";

// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
abstract class JUIControlLeaf<E extends HTMLElement = HTMLInputElement> extends JUILeaf<E> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-control-leaf";
	
	// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
	protected constructor(controlLeafType: JUIControlLeafType) {
		
		super(controlLeafType.toString() as unknown as JUILeafType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUIControlLeaf;