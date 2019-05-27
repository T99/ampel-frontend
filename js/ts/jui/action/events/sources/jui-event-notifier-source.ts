/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:51 PM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUINotifierSource from "./jui-notifier-source.js";
import JUIEvent from "../jui-event.js";
import JUINotifier from "../../jui-notifier.js";
import { JUIElement } from "../../../elements/jui-element.js";
import JUIEventType from "../types/jui-event-type.js";

/**
 * Serves as a standardized point-of-instantiation for {@link JUINotifier}s of {@link JUIEvent}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIEventNotifierSource<
	E extends JUIEvent = JUIEvent,
	T extends JUIEventType = JUIEventType,
	O extends Event = Event> extends JUINotifierSource<JUIEvent> {
	
	protected eventSource: JUIElement;
	
	protected eventType: T;
	
	public constructor(notifier: JUINotifier<E>, eventSource: JUIElement, eventType: T) {
		
		super(notifier);
		
		this.eventSource = eventSource;
		this.eventType = eventType;
		
	}
	
	public attach(): void {
		
		if (!this.isAttached()) {
			
			this.eventSource.getElement().addEventListener(
				this.eventType.getDOMEventName(),
				this.getListener
			);
			
			this.attached = true;
			
		}
		
	}
	
	public detach(): void {
		
		if (this.isAttached()) {
			
			this.eventSource.getElement().removeEventListener(
				this.eventType.getDOMEventName(),
				this.getListener
			);
			
			this.attached = false;
			
		}
		
	}
	
	protected getListener(): (event: O) => void {
		
		return (event: O): void => this.notifier.notify(this.eventType.transcribeEvent(event));
		
	}
	
}

export default JUIEventNotifierSource;