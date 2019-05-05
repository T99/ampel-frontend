/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:53 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIControlLeaf from "../jui-control-leaf.js";
import JUIControlLeafType from "../../../types/leaves/jui-control-leaf-type.js";
import JUITextFieldLeafType from "../../../types/leaves/control-leaves/jui-text-field-leaf-type.js";
import AlphanumericalGenerator from "../../../../helpers/alphanumerical-generator.js";
import JUIControlComponent from "../../../control/jui-control-component.js";
import JUIKeyboardEvent from "../../../action/events/jui-keyboard-event.js";

type Verification = {
	
	id: string,
	description?: string,
	failureMessage: string,
	test: (content: string) => boolean
	
};

// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
class JUITextFieldLeaf extends JUIControlLeaf<HTMLInputElement> implements JUIControlComponent {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-text-field-leaf";
	
	private isTextHidden: boolean = false;
	
	private verifiers: Map<string, Verification> = new Map();
	
	// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
	public constructor(isTextHidden?: boolean) {
		
		super(JUITextFieldLeafType.INPUT.toString() as unknown as JUIControlLeafType);
		this.addClasses(this.TYPE_IDENTITY);
		
		if (isTextHidden) this.setIsTextHidden(isTextHidden);
		
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
	
	/**
	 * Used to change whether the content of a JUITextField is readable (not hidden), or obscured (hidden, shown as '*'
	 * or bullets depending on the browser).
	 *
	 * @param {boolean} isTextHidden If true, content will be hidden, else content will be shown.
	 */
	public setIsTextHidden(isTextHidden: boolean): void {
		
		if (this.isTextHidden !== isTextHidden) {
			
			this.isTextHidden = isTextHidden;
			if (this.isTextHidden) this.getHTMLElement().type = "password";
			else this.getHTMLElement().type = "text";
			
		}
		
	}
	
	public getIsTextHidden(): boolean {
		
		return this.isTextHidden;
		
	}
	
	public checkValidity(): boolean {
		
		for (let verification of this.verifiers.values()) {
			
			if (!verification.test(this.getContent())) return false;
			
		}
		
		return true;
		
	}
	
	public addVerification(test: (content: string) => boolean, failureMessage: string, description?: string):
		string {
		
		let id: string = AlphanumericalGenerator.getIdFromOrderedPattern("6a");
		
		this.verifiers.set(id, {
			
			id,
			description,
			failureMessage,
			test
	
		});
		
		return id;
		
	}
	
	public getComponentValue(): any {
		
		return this.getContent();
		
	}
	
	public validateComponent(): boolean {
		
		return this.checkValidity();
		
	}
	
}

export default JUITextFieldLeaf;