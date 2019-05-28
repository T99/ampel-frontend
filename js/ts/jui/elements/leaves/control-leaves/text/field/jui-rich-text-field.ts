/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:53 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIModule } from "../../../../../jui-module.js";
import JUIStackContainer from "../../../../containers/multi-containers/jui-stack-container.js";
import JUIAlignment from "../../../../../descriptors/jui-alignment.js";
import JUITextualInputType from "../../../../../types/input-types/jui-textual-input-type.js";
import { JUIBasicTextField } from "./jui-basic-text-field.js";
import JUIInputMask from "../../../../../input-masks/jui-input-mask.js";
import JUIInputType from "../../../../../types/input-types/jui-input-type.js";
import { JUIRichEditableTextLeaf } from "../interfaces/jui-rich-editable-text-leaf.js";
import JUINotifier from "../../../../../action/jui-notifier.js";
import JUIKeyboardEvent from "../../../../../action/events/jui-keyboard-event.js";
import JUIKeyboardEventType from "../../../../../action/events/types/jui-keyboard-event-type.js";

/**
 * DOC-ME [5/19/19 @ 12:36 AM] - Documentation required!
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class JUIRichTextField extends JUIModule<JUIStackContainer<JUIBasicTextField>, HTMLElement> implements JUIRichEditableTextLeaf {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-text-field-leaf";
	
	private inputElement: JUIBasicTextField;
	
	private inputMask: JUIInputMask;
	
	protected readonly events: JUIRichTextField.JUIRichTextFieldEvents;
	
	public constructor(type: JUITextualInputType = JUITextualInputType.PLAIN) {
		
		super(new JUIStackContainer<JUIBasicTextField>(JUIAlignment.CENTER));
		this.addClasses(this.TYPE_IDENTITY);
		
		this.inputElement = new JUIBasicTextField(type);
		this.getModuleElement().addStackedChild(this.inputElement);
		this.events = new JUIRichTextField.JUIRichTextFieldEvents(this, this.inputElement, this.inputMask);
		
	}
	
	public getContent(): string {
		
		return this.inputElement.getContent();
		
	}
	
	public getMaskContent(): string {
		
		return "";
		
	}
	
	public setContent(content: string): void {
		
		this.inputElement.setContent(content);
		
	}
	
	public hasContent(): boolean {
		
		return this.inputElement.hasContent();
		
	}
	
	public getPlaceholderText(): string {
		
		// TODO [5/27/19 @ 4:07 PM] - Finish the 'getPlaceholderText' method.
		return "";
		
	}
	
	public setPlaceholderText(placeholderText: string): void {
	
		// TODO [5/27/19 @ 4:07 PM] - Finish the 'setPlaceholderText' method.
	
	}
	
	public hasPlaceholderText(): boolean {
		
		// TODO [5/27/19 @ 4:07 PM] - Finish the 'hasPlaceholderText' method.
		return false;
		
	}
	
	public getInputType(): JUIInputType {
		
		return this.inputElement.getInputType();
		
	}
	
	public setInputType(type: JUITextualInputType): void {
		
		this.inputElement.setInputType(type);
		
	}
	
	public applyInputMask(mask: JUIInputMask): void {
		
		this.removeInputMask();
		this.inputMask = mask;
		
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
	
	public getEventManager(): JUIRichTextField.JUIRichTextFieldEvents {
		
		return this.events;
		
	}
	
}

export namespace JUIRichTextField {
	
	export class JUIRichTextFieldEvents extends JUIModule.JUIModuleEvents implements JUIRichEditableTextLeaf.JUIRichEditableTextLeafEvents {
		
		public readonly ELEMENT_TEXT_EDITED: JUINotifier<string>;
		
		public readonly KEY_PRESSED: JUINotifier<JUIKeyboardEvent>;
		
		public readonly KEY_DOWN: JUINotifier<JUIKeyboardEvent>;
		
		public readonly KEY_UP: JUINotifier<JUIKeyboardEvent>;
		
		public readonly ELEMENT_MASK_TEXT_UPDATED: JUINotifier<string>;
		
		public constructor(element: JUIRichTextField, inputElement: JUIBasicTextField, maskElement: JUIInputMask) {
			
			super(element);
			
			this.KEY_PRESSED = JUIKeyboardEventType.KEY_PRESS.getNotifierForEventType(inputElement);
			this.KEY_DOWN = JUIKeyboardEventType.KEY_DOWN.getNotifierForEventType(inputElement);
			this.KEY_UP = JUIKeyboardEventType.KEY_UP.getNotifierForEventType(inputElement);
			
		}
		
	}
	
}