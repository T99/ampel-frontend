/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:24 PM -- December 03rd, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUISingleContainer from "../jui-single-container.js";
import JUIContainerType from "../../../types/jui-container-type.js";
import JUIAlignment from "../../../descriptors/jui-alignment.js";
import JUIContainerable from "../../../jui-containerable.js";

/**
 * A container that aligns a singular child within itself.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIAlignmentContainer<T extends JUIContainerable> extends JUISingleContainer<T> {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-alignment-container";
	
	private alignment: JUIAlignment;
	
	// DOC-ME [12/8/18 @ 3:44 PM] - Documentation required!
	public constructor(alignment: JUIAlignment, containerType: JUIContainerType = JUIContainerType.DIV) {
		
		super(containerType);
		this.alignment = alignment;
		this.addClasses(this.TYPE_IDENTITY, alignment.toString());
		
	}
	
	public setAlignment(alignment: JUIAlignment): void {
		
		this.removeClasses(this.alignment.toString());
		this.alignment = alignment;
		this.addClasses(this.alignment.toString());
		
	}
	
}

export default JUIAlignmentContainer;