/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:57 PM -- February 22nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEventManager from "../../../jui/action/managers/jui-event-manager.js";
import JUIMouseEventType from "../../../jui/action/events/types/jui-mouse-event-type.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUITrueFalseQuestionEventManager extends JUIEventManager {
    constructor(yesElement, noElement) {
        super();
        this.YES_SELECTED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(yesElement);
        this.NO_SELECTED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(noElement);
    }
}
export default AUITrueFalseQuestionEventManager;
//# sourceMappingURL=aui-true-false-question-event-manager.js.map