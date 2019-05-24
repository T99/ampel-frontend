/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:53 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import AlphanumericalGenerator from "../../../../../helpers/alphanumerical-generator.js";
import JUIEditableTextLeaf from "./jui-editable-text-leaf.js";
import JUIInputMask from "../../../../input-masks/jui-input-mask.js";
import JUIControlLeafType from "../../../../types/control-leaves/jui-control-leaf-type.js";

type Verification = {
	
	id: string,
	description?: string,
	failureMessage: string,
	test: (content: string) => boolean
	
};

/**
 * DOC-ME [5/19/19 @ 12:36 AM] - Documentation required!
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITextFieldLeaf extends JUIEditableTextLeaf {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-text-field-leaf";
	
	private inputElement: HTMLInputElement;
	
	private inputMask: JUIInputMask;
	
	private verifiers: Map<string, Verification> = new Map();
	
	public constructor(isTextHidden: boolean = false) {
		
		super(JUIControlLeafType.INPUT);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.inputElement = JUIControlLeafType.INPUT.create();
		// this.getWrapper().addStackedChild(this.inputElement);
		
		this.setIsTextHidden(isTextHidden);
		
	}
	
	public getContent(): string {
		
		return this.inputElement.value;
		
	}
	
	public setContent(content: string): string {
		
		let displaced: string = this.getContent();
		this.inputElement.value = content;
		return displaced;
		
	}
	
	/**
	 * Sets the textual hint for this JUITextFieldLeaf.
	 *
	 * @param {string} hint The textual hint for this JUITextFieldLeaf.
	 */
	public setHint(hint: string): void {
		
		this.inputElement.placeholder = hint;
		
	}
	
	/**
	 * Used to change whether the content of a JUITextField is readable (not hidden), or obscured (hidden, shown as '*'
	 * or bullets depending on the browser).
	 *
	 * @param {boolean} isTextHidden If true, content will be hidden, else content will be shown.
	 */
	public setIsTextHidden(isTextHidden: boolean): void {
		
		if (isTextHidden) this.inputElement.type = "password";
		else this.inputElement.type = "text";
		
	}
	
	public isTextHidden(): boolean {
		
		return (this.inputElement.type === "password");
		
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
	
	public setType(type: string): void {
		
		this.inputElement.type = type;
		
	}
	
	public applyInputMask(mask: JUIInputMask): void {
		
		if (this.hasInputMask()) {
			
			throw new Error("ERR | Attempted to add a second input mask to an already masked input.");
			
		} else this.inputMask = mask.create(this);
		
	}
	
	public hasInputMask(): boolean {
		
		return (this.inputMask !== undefined);
		
	}
	
	public removeInputMask(): void {
	
		if (this.hasInputMask()) {
			
			this.inputMask.removeMask();
			this.inputMask = undefined;
			
		}
	
	}
	
}

export default JUITextFieldLeaf;