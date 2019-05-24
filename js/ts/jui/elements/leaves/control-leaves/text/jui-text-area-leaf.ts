/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:27 AM -- March 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElement from "../../../jui-element.js";
import JUIControlLeafType from "../../../../types/control-leaves/jui-control-leaf-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITextAreaLeaf extends JUIElement<HTMLTextAreaElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-text-area-leaf";
	
	public constructor() {
		
		super(JUIControlLeafType.TEXTAREA);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
	public getContent(): string {
		
		return this.element.value;
		
	}
	
	public setContent(content: string): string {
		
		let displaced: string = this.getContent();
		this.element.value = content;
		return displaced;
		
	}
	
	/**
	 * Sets the textual hint for this JUITextFieldLeaf.
	 *
	 * @param {string} hint The textual hint for this JUITextFieldLeaf.
	 */
	public setHint(hint: string): void {
		
		this.getHTMLElement().placeholder = hint;
		
	}
	
}

export default JUITextAreaLeaf;