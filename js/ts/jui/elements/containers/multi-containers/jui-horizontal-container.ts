/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:58 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainerType from "../../../types/element-types/jui-container-type.js";
import JUIMultiContainer from "../jui-multi-container.js";
import { JUIContainerable } from "../../../jui-containerable.js";

// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
class JUIHorizontalContainer<T extends JUIContainerable = JUIContainerable> extends JUIMultiContainer<T> {
	
	// DOC-ME [12/9/18 @ 2:31 AM] - Documentation required!
	public readonly TYPE_IDENTITY: string = "jui-horizontal-container";
	
	// DOC-ME [12/8/18 @ 4:53 PM] - Documentation required!
	public constructor(containerType: JUIContainerType = JUIContainerType.DIV) {
		
		super(containerType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUIHorizontalContainer;