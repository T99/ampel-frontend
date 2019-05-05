/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:30 AM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainerable from "../../jui-containerable.js";
import JUISingleContainer from "../jui-single-container.js";
import JUIContainerType from "../../types/jui-container-type.js";

/**
 * A container that scrolls over the content of a singular child.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIScrollContainer<T extends JUIContainerable> extends JUISingleContainer<T> {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-scroll-container";
	
	private scrollX: boolean = true;
	
	private scrollY: boolean = false;
	
	// DOC-ME [12/8/18 @ 3:44 PM] - Documentation required!
	public constructor(scrollY?: boolean, scrollX?: boolean, containerType?: JUIContainerType) {
		
		super(containerType);
		
		this.addClasses(this.TYPE_IDENTITY);
		
		if (scrollX !== undefined) this.scrollX = scrollX;
		if (scrollY !== undefined) this.scrollY = scrollY;
		
		if (this.scrollX) this.addClasses("scroll-x");
		if (this.scrollY) this.addClasses("scroll-y");
		
	}
	
}

export default JUIScrollContainer;