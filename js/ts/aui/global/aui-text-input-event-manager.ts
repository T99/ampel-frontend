/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:15 PM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEventManager from "../../jui/action/managers/jui-event-manager.js";
import JUINotifier from "../../jui/action/jui-notifier.js";
import JUIKeyboardEvent from "../../jui/action/events/jui-keyboard-event.js";
import JUIKeyboardEventType from "../../jui/action/events/types/jui-keyboard-event-type.js";
import JUITextFieldLeaf from "../../jui/elements/leaves/control-leaves/jui-text-field-leaf.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUITextInputEventManager extends JUIEventManager {
	
	public readonly KEY_PRESSED: JUINotifier<JUIKeyboardEvent>;
	
	public constructor(textFieldLeaf: JUITextFieldLeaf) {
		
		super();
		
		this.KEY_PRESSED = JUIKeyboardEventType.KEY_PRESS.getNotifierForEventType(textFieldLeaf);
		
	}
	
}

export default AUITextInputEventManager;