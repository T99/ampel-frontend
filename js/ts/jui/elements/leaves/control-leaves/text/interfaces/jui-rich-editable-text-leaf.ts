/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:39 AM -- May 19th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIInputMask from "../../../../../input-masks/jui-input-mask.js";
import { JUIBasicEditableTextLeaf } from "./jui-basic-editable-text-leaf.js";
import JUINotifier from "../../../../../action/jui-notifier.js";

/**
 * An interface for rich editable text leaves.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface JUIRichEditableTextLeaf extends JUIBasicEditableTextLeaf {
	
	getMaskContent(): string;
	
	applyInputMask(mask: JUIInputMask): void;
	
	hasInputMask(): boolean;
	
	removeInputMask(): void;
	
	getEventManager(): JUIRichEditableTextLeaf.JUIRichEditableTextLeafEvents;
	
}

export namespace JUIRichEditableTextLeaf {
	
	export interface JUIRichEditableTextLeafEvents extends JUIBasicEditableTextLeaf.JUIBasicEditableTextLeafEvents {
	
		readonly ELEMENT_MASK_TEXT_UPDATED: JUINotifier<string>;
	
	}
	
}