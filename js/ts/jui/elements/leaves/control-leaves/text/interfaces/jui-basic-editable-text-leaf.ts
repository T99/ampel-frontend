/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:16 PM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIElement } from "../../../../jui-element.js";
import JUINotifier from "../../../../../action/jui-notifier.js";
import JUIKeyboardEvent from "../../../../../action/events/jui-keyboard-event.js";

/**
 * An interface for basic text input leaf elements.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface JUIBasicEditableTextLeaf {
	
	getContent(): string;
	
	setContent(content: string): void;
	
	hasContent(): boolean;
	
	getPlaceholderText(): string;
	
	setPlaceholderText(placeholderText: string): void;
	
	hasPlaceholderText(): boolean;
	
	getEventManager(): JUIBasicEditableTextLeaf.JUIBasicEditableTextLeafEvents;

}

export namespace JUIBasicEditableTextLeaf {
	
	export abstract class JUIBasicEditableTextLeafEvents extends JUIElement.JUIElementEvents {
		
		public readonly abstract ELEMENT_TEXT_EDITED: JUINotifier<string>;
		
		public readonly abstract KEY_PRESSED: JUINotifier<JUIKeyboardEvent>;
		
		public readonly abstract KEY_DOWN: JUINotifier<JUIKeyboardEvent>;
		
		public readonly abstract KEY_UP: JUINotifier<JUIKeyboardEvent>;
		
		protected constructor(element: JUIElement) {
			
			super(element);
			
		}
		
	}
	
}