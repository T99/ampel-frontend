/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:39 AM -- May 19th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIInputMask from "../../../../../input-masks/jui-input-mask.js";
import { JUIBasicEditableTextLeaf } from "./jui-basic-editable-text-leaf.js";

/**
 * An interface for rich editable text leaves.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface JUIRichEditableTextLeaf extends JUIBasicEditableTextLeaf {
	
	applyInputMask(mask: JUIInputMask): void;
	
	hasInputMask(): boolean;
	
	removeInputMask(): void;
	
}

export default JUIRichEditableTextLeaf;