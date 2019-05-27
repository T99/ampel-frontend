/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:53 AM -- December 17th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUITextLeaf} from "../../jui/elements/leaves/content-leaves/jui-text-leaf.js";
import JUITextLeafType from "../../jui/types/element-types/content-leaves/jui-text-leaf-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUITextLabel extends JUITextLeaf {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-text-label";
	
	public constructor(content: string, textType: JUITextLeafType = JUITextLeafType.P) {
		
		super(content, textType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default AUITextLabel;