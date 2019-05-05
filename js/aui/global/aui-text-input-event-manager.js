/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:15 PM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEventManager from "../../jui/action/managers/jui-event-manager.js";
import JUIKeyboardEventType from "../../jui/action/events/types/jui-keyboard-event-type.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUITextInputEventManager extends JUIEventManager {
    constructor(textFieldLeaf) {
        super();
        this.KEY_PRESSED = JUIKeyboardEventType.KEY_PRESS.getNotifierForEventType(textFieldLeaf);
    }
}
export default AUITextInputEventManager;
//# sourceMappingURL=aui-text-input-event-manager.js.map