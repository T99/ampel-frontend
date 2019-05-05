/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:10 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEventType from "./jui-event-type.js";
import JUIKeyboardEvent from "../jui-keyboard-event.js";
import JUIElement from "../../../elements/jui-element.js";
import JUINotifier from "../../jui-notifier.js";
import JUIMouseEvent from "../jui-mouse-event.js";
import JUITextFieldLeaf from "../../../elements/leaves/control-leaves/jui-text-field-leaf.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIKeyboardEventType extends JUIEventType {
	
	public static readonly KEY_PRESS: JUIKeyboardEventType = new JUIKeyboardEventType("key-press", "keypress");
	
	public static readonly KEY_DOWN: JUIKeyboardEventType = new JUIKeyboardEventType("key-down", "keydown");
	
	public static readonly KEY_UP: JUIKeyboardEventType = new JUIKeyboardEventType("key-up", "keyup");
	
	private static keyboardEventMap: Map<string, JUIKeyboardEventType> = new Map<string, JUIKeyboardEventType>();
	
	private static keyboardEventDOMMap: Map<string, JUIKeyboardEventType> = new Map<string, JUIKeyboardEventType>();
	
	protected constructor(eventTypeName: string, eventTypeDOMName: string) {
		
		super(eventTypeName, eventTypeDOMName);
		
	}
	
	public getNotifierForEventType(eventSource: JUITextFieldLeaf): JUINotifier<JUIKeyboardEvent> {

		let notifier: JUINotifier<JUIKeyboardEvent> = new JUINotifier<JUIKeyboardEvent>();

		eventSource.getHTMLElement().addEventListener(
			this.getDOMEventName(),
			(event: KeyboardEvent) => notifier.notify(this.transcribeEvent(event))
		);

		return notifier;

	}
	
	public transcribeEvent(event: KeyboardEvent): JUIKeyboardEvent {
		
		return new JUIKeyboardEvent(
			event.srcElement,
			JUIKeyboardEventType.getEventTypeForEventDOMName(event.type),
			new Date(event.timeStamp),
			event.key
		);
		
	}
	
	public static getEventTypeForEventName(eventName: string): JUIKeyboardEventType {
		
		return JUIKeyboardEventType.keyboardEventMap.get(eventName);
		
	}
	
	public static getEventTypeForEventDOMName(eventDOMName: string): JUIKeyboardEventType {
		
		return JUIKeyboardEventType.keyboardEventMap.get(eventDOMName);
		
	}
	
}

export default JUIKeyboardEventType;