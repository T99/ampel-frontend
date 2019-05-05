/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:41 PM -- January 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEventType from "./types/jui-event-type.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIEvent {
	
	protected source: Element;
	protected type: JUIEventType;
	protected timestamp: Date;
	
	public constructor(source: Element, type: JUIEventType, timestamp: Date) {
		
		this.source = source;
		this.type = type;
		this.timestamp = timestamp;
		
	}
	
	public getSource(): Element {
		
		return this.source;
		
	}
	
	public getType(): JUIEventType {
		
		return this.type;
		
	}
	
	public getTimestamp(): Date {
		
		return this.timestamp;
		
	}
	
	public getEpochTime(): number {
		
		return this.timestamp.getTime();
		
	}
	
}

export default JUIEvent;