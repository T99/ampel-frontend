/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:57 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEvent from "../jui-event.js";
import JUINotifier from "../../jui-notifier.js";
import { JUIContainerable } from "../../../jui-containerable.js";

/**
 * Enumerates possible {@link JUIEvent} types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v
 * @since v
 */
abstract class JUIEventType {
	
	protected eventTypeName: string;
	
	protected eventTypeDOMName: string;
	
	private static baseEventMap: Map<string, JUIEventType> = new Map<string, JUIEventType>();
	
	private static baseEventDOMMap: Map<string, JUIEventType> = new Map<string, JUIEventType>();
	
	protected constructor(eventTypeName: string, eventTypeDOMName: string) {
		
		this.eventTypeName = eventTypeName;
		this.eventTypeDOMName = eventTypeDOMName;
		
		JUIEventType.baseEventMap.set(this.eventTypeName, this);
		JUIEventType.baseEventDOMMap.set(this.eventTypeDOMName, this);
		
	}
	
	public getNotifierForEventType(eventSource: JUIContainerable): JUINotifier<JUIEvent> {

		let notifier: JUINotifier<JUIEvent> = new JUINotifier<JUIEvent>();

		eventSource.getElement().addEventListener(
			this.getDOMEventName(),
			(event: Event) => notifier.notify(this.transcribeEvent(event))
		);

		return notifier;

	}
	
	public transcribeEvent(event: Event): JUIEvent {

		// TODO [1/28/19 @ 3:13 PM] - Find a fix for the following deprecated code.
		return new JUIEvent(
			event.srcElement as Element,
			JUIEventType.getEventTypeForEventDOMName(event.type),
			new Date(event.timeStamp)
		);

	}
	
	public getEventName(): string {
		
		return this.eventTypeName;
		
	}
	
	public getDOMEventName(): string {
		
		return this.eventTypeDOMName;
		
	}
	
	public static getEventTypeForEventName(eventName: string): JUIEventType {
		
		return JUIEventType.baseEventMap.get(eventName);
		
	}
	
	public static getEventTypeForEventDOMName(eventDOMName: string): JUIEventType {
		
		return JUIEventType.baseEventMap.get(eventDOMName);
		
	}
	
}

export default JUIEventType;