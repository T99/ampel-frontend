/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:28 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEventManager from "./jui-event-manager.js";
import JUIMouseEventType from "../events/types/jui-mouse-event-type.js";
/**
 * Manages the events of a given {@link JUIElement}, including the following events:
 *
 * 	- ELEMENT_MOUSE_CLICKED
 * 	- ELEMENT_MOUSE_DOUBLE_CLICKED
 * 	- ELEMENT_MOUSE_RIGHT_CLICKED
 * 	- ELEMENT_MOUSE_DOWN
 * 	- ELEMENT_MOUSE_UP
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIElementEventManager extends JUIEventManager {
    /**
     * Initializes a new JUIElementEventManager with a given base element.
     *
     * @param {JUIElement} baseElement The element for which the {@link JUINotifier}s in this class will dispatch.
     */
    constructor(baseElement) {
        super();
        this.ELEMENT_MOUSE_CLICKED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(baseElement);
        this.ELEMENT_MOUSE_DOUBLE_CLICKED = JUIMouseEventType.MOUSE_DOUBLE_CLICK.getNotifierForEventType(baseElement);
        this.ELEMENT_MOUSE_RIGHT_CLICKED = JUIMouseEventType.MOUSE_RIGHT_CLICK.getNotifierForEventType(baseElement);
        this.ELEMENT_MOUSE_DOWN = JUIMouseEventType.MOUSE_DOWN.getNotifierForEventType(baseElement);
        this.ELEMENT_MOUSE_UP = JUIMouseEventType.MOUSE_UP.getNotifierForEventType(baseElement);
        this.ELEMENT_MOUSE_ENTER = JUIMouseEventType.MOUSE_ENTER.getNotifierForEventType(baseElement);
        this.ELEMENT_MOUSE_LEAVE = JUIMouseEventType.MOUSE_LEAVE.getNotifierForEventType(baseElement);
        this.ELEMENT_MOUSE_MOVE = JUIMouseEventType.MOUSE_MOVE.getNotifierForEventType(baseElement);
    }
}
export default JUIElementEventManager;
//# sourceMappingURL=jui-element-event-manager.js.map