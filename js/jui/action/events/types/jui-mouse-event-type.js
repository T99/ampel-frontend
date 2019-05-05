/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:07 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEventType from "./jui-event-type.js";
import JUIMouseEvent from "../jui-mouse-event.js";
import JUINotifier from "../../jui-notifier.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMouseEventType extends JUIEventType {
    constructor(eventTypeName, eventTypeDOMName) {
        super(eventTypeName, eventTypeDOMName);
    }
    getNotifierForEventType(eventSource) {
        let notifier = new JUINotifier();
        eventSource.getHTMLElement().addEventListener(this.getDOMEventName(), (event) => notifier.notify(this.transcribeEvent(event)));
        return notifier;
    }
    transcribeEvent(event) {
        return new JUIMouseEvent(event.srcElement, JUIMouseEventType.getEventTypeForEventDOMName(event.type), new Date(event.timeStamp), event);
    }
    static getEventTypeForEventName(eventName) {
        return JUIMouseEventType.mouseEventMap.get(eventName);
    }
    static getEventTypeForEventDOMName(eventDOMName) {
        return JUIMouseEventType.mouseEventDOMMap.get(eventDOMName);
    }
}
JUIMouseEventType.MOUSE_CLICK = new JUIMouseEventType("mouse-click", "click");
JUIMouseEventType.MOUSE_DOUBLE_CLICK = new JUIMouseEventType("mouse-double-click", "dblclick");
JUIMouseEventType.MOUSE_RIGHT_CLICK = new JUIMouseEventType("mouse-right-click", "contextmenu");
JUIMouseEventType.MOUSE_DOWN = new JUIMouseEventType("mouse-down", "mousedown");
JUIMouseEventType.MOUSE_UP = new JUIMouseEventType("mouse-up", "mouseup");
JUIMouseEventType.MOUSE_ENTER = new JUIMouseEventType("mouse-enter", "mouseenter");
JUIMouseEventType.MOUSE_LEAVE = new JUIMouseEventType("mouse-leave", "mouseleave");
JUIMouseEventType.MOUSE_MOVE = new JUIMouseEventType("mouse-move", "mousemove");
JUIMouseEventType.MOUSE_OVER = new JUIMouseEventType("mouse-over", "mouseover");
JUIMouseEventType.MOUSE_OUT = new JUIMouseEventType("mouse-out", "mouseout");
JUIMouseEventType.mouseEventMap = new Map();
JUIMouseEventType.mouseEventDOMMap = new Map();
export default JUIMouseEventType;
//# sourceMappingURL=jui-mouse-event-type.js.map