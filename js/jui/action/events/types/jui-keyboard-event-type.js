/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:10 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEventType from "./jui-event-type.js";
import JUIKeyboardEvent from "../jui-keyboard-event.js";
import JUINotifier from "../../jui-notifier.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIKeyboardEventType extends JUIEventType {
    constructor(eventTypeName, eventTypeDOMName) {
        super(eventTypeName, eventTypeDOMName);
    }
    getNotifierForEventType(eventSource) {
        let notifier = new JUINotifier();
        eventSource.getHTMLElement().addEventListener(this.getDOMEventName(), (event) => notifier.notify(this.transcribeEvent(event)));
        return notifier;
    }
    transcribeEvent(event) {
        return new JUIKeyboardEvent(event.srcElement, JUIKeyboardEventType.getEventTypeForEventDOMName(event.type), new Date(event.timeStamp), event.key);
    }
    static getEventTypeForEventName(eventName) {
        return JUIKeyboardEventType.keyboardEventMap.get(eventName);
    }
    static getEventTypeForEventDOMName(eventDOMName) {
        return JUIKeyboardEventType.keyboardEventMap.get(eventDOMName);
    }
}
JUIKeyboardEventType.KEY_PRESS = new JUIKeyboardEventType("key-press", "keypress");
JUIKeyboardEventType.KEY_DOWN = new JUIKeyboardEventType("key-down", "keydown");
JUIKeyboardEventType.KEY_UP = new JUIKeyboardEventType("key-up", "keyup");
JUIKeyboardEventType.keyboardEventMap = new Map();
JUIKeyboardEventType.keyboardEventDOMMap = new Map();
export default JUIKeyboardEventType;
//# sourceMappingURL=jui-keyboard-event-type.js.map