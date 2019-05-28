/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:04 AM -- May 24th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIElement } from "../../../../jui-element.js";
import JUIInputType from "../../../../../types/input-types/jui-input-type.js";
import JUITextualInputType from "../../../../../types/input-types/jui-textual-input-type.js";
import JUIControlLeafType from "../../../../../types/element-types/control-leaves/jui-control-leaf-type.js";
import { JUIBasicEditableTextLeaf } from "../interfaces/jui-basic-editable-text-leaf.js";
import JUIKeyboardEvent from "../../../../../action/events/jui-keyboard-event.js";
import JUINotifier from "../../../../../action/jui-notifier.js";

/**
 * A 'raw' text input field used mainly in the creation of more complete and sophisticated text input elements.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class JUIBasicTextField extends JUIElement<HTMLInputElement> implements JUIBasicEditableTextLeaf {
	
	public readonly TYPE_IDENTITY: string = "jui-raw-text-field";
	
	protected readonly events: JUIBasicTextField.JUIBasicTextFieldEvents;
	
	public constructor(type: JUITextualInputType = JUITextualInputType.PLAIN) {
	
		super(JUIControlLeafType.INPUT);
		this.addClasses(this.TYPE_IDENTITY);
		this.events = new JUIBasicTextField.JUIBasicTextFieldEvents(this);
		this.setInputType(type);
	
	}
	
	public getContent(): string {
		
		return this.getElement().value;
		
	}
	
	public setContent(content: string): void {
		
		this.getElement().value = content;
		
	}
	
	public hasContent(): boolean {
		
		return ((this.getContent() !== "") && (this.getContent() !== undefined));
		
	}
	
	public getPlaceholderText(): string {
		
		let placeholder: string = this.getElement().placeholder;
		
		if (placeholder === undefined) return "";
		else return placeholder;
		
	}
	
	public setPlaceholderText(placeholderText: string): void {
		
		this.getElement().placeholder = placeholderText;
		
	}
	
	public hasPlaceholderText(): boolean {
		
		return ((this.getPlaceholderText() !== "") && (this.getPlaceholderText() !== undefined));
		
	}
	
	public getInputType(): JUIInputType {
		
		return JUIInputType.getInputTypeForTypeString(this.getElement().type);
		
	}
	
	public setInputType(type: JUITextualInputType): void {
		
		this.getElement().type = type.getTypeString();
		
	}
	
	public getEventManager(): JUIBasicTextField.JUIBasicTextFieldEvents {
		
		return this.events;
		
	}
	
}

export namespace JUIBasicTextField {
	
	export class JUIBasicTextFieldEvents extends JUIElement.JUIElementEvents implements JUIBasicEditableTextLeaf.JUIBasicEditableTextLeafEvents {
		
		public readonly ELEMENT_TEXT_EDITED: JUINotifier<string>;
		
		public readonly KEY_DOWN: JUINotifier<JUIKeyboardEvent>;
		
		public readonly KEY_PRESSED: JUINotifier<JUIKeyboardEvent>;
		
		public readonly KEY_UP: JUINotifier<JUIKeyboardEvent>;
		
		public constructor(element: JUIBasicTextField) {
			
			super(element);
			
		}
		
	}
	
}