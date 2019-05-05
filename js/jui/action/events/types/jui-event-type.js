/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:57 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEvent from "../jui-event.js";
import JUINotifier from "../../jui-notifier.js";
/**
 * Enumerates possible {@link JUIEvent} types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v
 * @since v
 */
class JUIEventType {
    constructor(eventTypeName, eventTypeDOMName) {
        this.eventTypeName = eventTypeName;
        this.eventTypeDOMName = eventTypeDOMName;
        JUIEventType.baseEventMap.set(this.eventTypeName, this);
        JUIEventType.baseEventDOMMap.set(this.eventTypeDOMName, this);
    }
    getNotifierForEventType(eventSource) {
        let notifier = new JUINotifier();
        eventSource.getHTMLElement().addEventListener(this.getDOMEventName(), (event) => notifier.notify(this.transcribeEvent(event)));
        return notifier;
    }
    transcribeEvent(event) {
        // TODO [1/28/19 @ 3:13 PM] - Find a fix for the following deprecated code.
        return new JUIEvent(event.srcElement, JUIEventType.getEventTypeForEventDOMName(event.type), new Date(event.timeStamp));
    }
    getEventName() {
        return this.eventTypeName;
    }
    getDOMEventName() {
        return this.eventTypeDOMName;
    }
    static getEventTypeForEventName(eventName) {
        return JUIEventType.baseEventMap.get(eventName);
    }
    static getEventTypeForEventDOMName(eventDOMName) {
        return JUIEventType.baseEventMap.get(eventDOMName);
    }
}
JUIEventType.baseEventMap = new Map();
JUIEventType.baseEventDOMMap = new Map();
export default JUIEventType;
//# sourceMappingURL=jui-event-type.js.map