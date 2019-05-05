/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:07 PM -- February 08th, 2019.
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
class AUIStoplightQuestionEventManager extends JUIEventManager {
    constructor(redSelectionRing, yellowSelectionRing, greenSelectionRing) {
        super();
        this.RED_SELECTED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(redSelectionRing);
        this.YELLOW_SELECTED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(yellowSelectionRing);
        this.GREEN_SELECTED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(greenSelectionRing);
    }
}
export default AUIStoplightQuestionEventManager;
//# sourceMappingURL=aui-stoplight-question-event-manager.js.map