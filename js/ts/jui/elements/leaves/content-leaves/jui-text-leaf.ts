/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContentLeaf from "../jui-content-leaf.js";
import JUIContentLeafType from "../../../types/leaves/jui-content-leaf-type.js";
import JUITextLeafType from "../../../types/leaves/content-leaves/jui-text-leaf-type.js";

/**
 * A {@link JUIElement} that displays text.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITextLeaf extends JUIContentLeaf<HTMLElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-text-leaf";
	
	// DOC-ME [12/14/18 @ 9:52 AM] - Documentation required!
	public constructor(content: string, textType?: JUITextLeafType) {
		
		super((textType ? textType : JUITextLeafType.P).toString() as unknown as JUIContentLeafType);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.setText(content);
		
	}
	
	// DOC-ME [12/14/18 @ 9:52 AM] - Documentation required!
	public setText(content: string): string {
		
		let displaced: string = this.getText();
		this.getHTMLElement().innerText = content;
		return displaced;
		
	}
	
	// DOC-ME [12/22/18 @ 4:07 PM] - Documentation required!
	public getText(): string {
		
		return this.getHTMLElement().innerText;
		
	}
	
}

export default JUITextLeaf;