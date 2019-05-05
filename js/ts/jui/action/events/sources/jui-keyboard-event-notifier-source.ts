/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:53 PM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEventNotifierSource from "./jui-event-notifier-source.js";
import JUIKeyboardEventType from "../types/jui-keyboard-event-type.js";
import JUIKeyboardEvent from "../jui-keyboard-event.js";
import JUITextFieldLeaf from "../../../elements/leaves/control-leaves/jui-text-field-leaf.js";
import JUINotifier from "../../jui-notifier.js";

/**
 * Serves as a standardized point-of-instantiation for {@link JUINotifier}s of {@link JUIKeyboardEvent}s.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIKeyboardEventNotifierSource<
	E extends JUIKeyboardEvent = JUIKeyboardEvent,
	T extends JUIKeyboardEventType = JUIKeyboardEventType,
	O extends KeyboardEvent = KeyboardEvent> extends JUIEventNotifierSource<E, T, O> {
	
	public constructor(notifier: JUINotifier<E>, eventSource: JUITextFieldLeaf, eventType: T) {
		
		super(notifier, eventSource, eventType);
		
	}
	
}

export default JUIKeyboardEventNotifierSource;