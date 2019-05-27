/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:40 PM -- April 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIContainerable } from "../../../jui-containerable.js";
import JUIMultiContainer from "../jui-multi-container.js";
import JUIContainerType from "../../../types/element-types/jui-container-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIGridContainer<T extends JUIContainerable = JUIContainerable> extends JUIMultiContainer<T> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-grid-container";
	
	public constructor(containerType: JUIContainerType = JUIContainerType.DIV) {
	
		super(containerType);
		
		this.addClasses(this.TYPE_IDENTITY);
	
	}
	
}

export default JUIGridContainer;