/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:07 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEventType from "./jui-event-type.js";
import JUIMouseEvent from "../jui-mouse-event.js";
import JUIElement from "../../../elements/jui-element.js";
import JUINotifier from "../../jui-notifier.js";
import JUIEvent from "../jui-event.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMouseEventType extends JUIEventType {
	
	public static readonly MOUSE_CLICK: JUIMouseEventType = new JUIMouseEventType("mouse-click", "click");
	
	public static readonly MOUSE_DOUBLE_CLICK: JUIMouseEventType = new JUIMouseEventType("mouse-double-click", "dblclick");
	
	public static readonly MOUSE_RIGHT_CLICK: JUIMouseEventType = new JUIMouseEventType("mouse-right-click", "contextmenu");
	
	public static readonly MOUSE_DOWN: JUIMouseEventType = new JUIMouseEventType("mouse-down", "mousedown");
	
	public static readonly MOUSE_UP: JUIMouseEventType = new JUIMouseEventType("mouse-up", "mouseup");
	
	public static readonly MOUSE_ENTER: JUIMouseEventType = new JUIMouseEventType("mouse-enter", "mouseenter");
	
	public static readonly MOUSE_LEAVE: JUIMouseEventType = new JUIMouseEventType("mouse-leave", "mouseleave");
	
	public static readonly MOUSE_MOVE: JUIMouseEventType = new JUIMouseEventType("mouse-move", "mousemove");
	
	public static readonly MOUSE_OVER: JUIMouseEventType = new JUIMouseEventType("mouse-over", "mouseover");
	
	public static readonly MOUSE_OUT: JUIMouseEventType = new JUIMouseEventType("mouse-out", "mouseout");
	
	private static mouseEventMap: Map<string, JUIMouseEventType> = new Map<string, JUIMouseEventType>();
	
	private static mouseEventDOMMap: Map<string, JUIMouseEventType> = new Map<string, JUIMouseEventType>();
	
	protected constructor(eventTypeName: string, eventTypeDOMName: string) {
		
		super(eventTypeName, eventTypeDOMName);
		
	}
	
	public getNotifierForEventType(eventSource: JUIElement): JUINotifier<JUIMouseEvent> {

		let notifier: JUINotifier<JUIMouseEvent> = new JUINotifier<JUIMouseEvent>();

		eventSource.getHTMLElement().addEventListener(
			this.getDOMEventName(),
			(event: MouseEvent) => notifier.notify(this.transcribeEvent(event))
		);

		return notifier;

	}
	
	public transcribeEvent(event: MouseEvent): JUIMouseEvent {
		
		return new JUIMouseEvent(
			event.srcElement,
			JUIMouseEventType.getEventTypeForEventDOMName(event.type),
			new Date(event.timeStamp),
			event
		);
		
	}
	
	public static getEventTypeForEventName(eventName: string): JUIMouseEventType {
		
		return JUIMouseEventType.mouseEventMap.get(eventName);
		
	}
	
	public static getEventTypeForEventDOMName(eventDOMName: string): JUIMouseEventType {
		
		return JUIMouseEventType.mouseEventDOMMap.get(eventDOMName);
		
	}
	
}

export default JUIMouseEventType;