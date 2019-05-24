/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:54 AM -- March 24th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainerable from "../../../jui-containerable.js";
import JUIMultiContainer from "../jui-multi-container.js";
import JUIContainerType from "../../../types/jui-container-type.js";
import JUIAlignment from "../../../descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../single-containers/jui-alignment-container.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIStackContainer<T extends JUIContainerable = JUIContainerable> extends JUIMultiContainer<JUIAlignmentContainer<T>> {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-stack-container";
	
	private alignment: JUIAlignment;
	
	// DOC-ME [12/8/18 @ 3:44 PM] - Documentation required!
	public constructor(alignment: JUIAlignment, containerType: JUIContainerType = JUIContainerType.DIV) {
		
		super(containerType);
		this.alignment = alignment;
		this.addClasses(this.TYPE_IDENTITY, alignment.toString());
		
	}
	
	public addStackedChild(child: T): void {
		
		let alignmentContainer: JUIAlignmentContainer<T> = new JUIAlignmentContainer(this.alignment);
		alignmentContainer.setChild(child);
		this.addChild(alignmentContainer);
		
	}
	
}

export default JUIStackContainer;