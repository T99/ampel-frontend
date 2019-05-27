/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:21 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainerType from "./types/element-types/jui-container-type.js";
import JUIAlignmentContainer from "./elements/containers/single-containers/jui-alignment-container.js";
import JUIAlignment from "./descriptors/jui-alignment.js";
import { JUIContainerable } from "./jui-containerable.js";

/**
 * One full-viewport page within the {@link JUIWorld}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIPage<T extends JUIContainerable = JUIContainerable> extends JUIAlignmentContainer<T> {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-page";
	
	public constructor(alignment: JUIAlignment = JUIAlignment.CENTER) {
		
		super(alignment, JUIContainerType.DIV);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUIPage;