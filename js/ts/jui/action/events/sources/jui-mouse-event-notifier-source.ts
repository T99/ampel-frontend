/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:11 PM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUINotifier from "../../jui-notifier.js";
import JUIMouseEvent from "../jui-mouse-event.js";
import JUIEventNotifierSource from "./jui-event-notifier-source.js";
import JUIMouseEventType from "../types/jui-mouse-event-type.js";
import JUIElement from "../../../elements/jui-element.js";

/**
 * Serves as a standardized point-of-instantiation for {@link JUINotifier}s of {@link JUIMouseEvent}s.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMouseEventNotifierSource<
	E extends JUIMouseEvent = JUIMouseEvent,
	T extends JUIMouseEventType = JUIMouseEventType,
	O extends MouseEvent = MouseEvent> extends JUIEventNotifierSource<E, T, O> {
	
	public constructor(notifier: JUINotifier<E>, eventSource: JUIElement, eventType: T) {
		
		super(notifier, eventSource, eventType);
		
	}
	
}

export default JUIMouseEventNotifierSource;