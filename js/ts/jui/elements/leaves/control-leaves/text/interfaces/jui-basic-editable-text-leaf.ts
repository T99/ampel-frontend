/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:16 PM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

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
	
	export interface JUIBasicEditableTextLeafEvents {
		
		readonly ELEMENT_TEXT_EDITED: JUINotifier<string>;
		
		readonly KEY_PRESSED: JUINotifier<JUIKeyboardEvent>;
		
		readonly KEY_DOWN: JUINotifier<JUIKeyboardEvent>;
		
		readonly KEY_UP: JUINotifier<JUIKeyboardEvent>;
		
	}
	
}