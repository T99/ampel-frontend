/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 PM -- January 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEvent from "./jui-event.js";
import JUIKeyboardEventType from "./types/jui-keyboard-event-type.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIKeyboardEvent extends JUIEvent {
	
	protected key: string;
	
	public constructor(source: Element, type: JUIKeyboardEventType, timestamp: Date, key: string) {
		
		super(source, type, timestamp);
		
		// TODO [1/28/19 @ 3:12 PM] - Make an enum for this.
		this.key = key;
		
	}
	
	public getKey(): string {
		
		return this.key;
		
	}
	
}

export default JUIKeyboardEvent;