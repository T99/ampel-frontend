/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIVideoLeafType from "../../../types/leaves/content-leaves/jui-video-leaf-type.js";
import JUIContentLeafType from "../../../types/leaves/jui-content-leaf-type.js";
import JUIContentLeaf from "../jui-content-leaf.js";

// DOC-ME [12/14/18 @ 11:53 AM] - Documentation required!
class JUIVideoLeaf extends JUIContentLeaf {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-video-leaf";
	
	// DOC-ME [12/14/18 @ 9:40 AM] - Documentation required!
	public constructor(/* videoType: JUIVideoLeafType */) {
		
		super(JUIVideoLeafType.VIDEO.toString() as unknown as JUIContentLeafType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUIVideoLeaf;