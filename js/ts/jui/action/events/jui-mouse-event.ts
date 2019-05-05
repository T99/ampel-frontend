/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:10 PM -- January 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEvent from "./jui-event.js";
import JUIMouseEventType from "./types/jui-mouse-event-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMouseEvent extends JUIEvent {
	
	protected internalEvent: MouseEvent;
	
	public constructor(source: Element, type: JUIMouseEventType, timestamp: Date, event: MouseEvent) {
		
		super(source, type, timestamp);
		
		this.internalEvent = event;
		
	}
	
	public getOffsetY(): number {
		
		return this.internalEvent.offsetY;
		
	}
	
	public getOffsetX(): number {
		
		return this.internalEvent.offsetX;
		
	}
	
	public getClientY(): number {
		
		return this.internalEvent.clientY;
		
	}
	
	public getClientX(): number {
		
		return this.internalEvent.clientX;
		
	}
	
	public getMovementY(): number {
		
		return this.internalEvent.movementY;
		
	}
	
	public getMovementX(): number {
		
		return this.internalEvent.movementX;
		
	}
	
	public getPageY(): number {
		
		return this.internalEvent.pageY;
		
	}
	
	public getPageX(): number {
		
		return this.internalEvent.pageX;
		
	}
	
	public getScreenY(): number {
		
		return this.internalEvent.screenY;
		
	}
	
	public getScreenX(): number {
		
		return this.internalEvent.screenX;
		
	}
	
}

export default JUIMouseEvent;