/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:44 PM -- March 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUICanvasLeaf from "./jui-canvas-leaf.js";
import JUIMouseEvent from "../../../action/events/jui-mouse-event.js";
import JUIColor from "../../../descriptors/colors/jui-color.js";
import JUINamedColor from "../../../descriptors/colors/jui-named-color.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIDrawingCanvasLeaf extends JUICanvasLeaf {
	
	private brushDown: boolean = false;
	
	private strokeColor: JUIColor;
	
	private strokeSize: number;
	
	private previousX: number;
	
	private previousY: number;
	
	public constructor(strokeColor: JUIColor = JUINamedColor.BLACK, strokeSize: number = 100) {
	
		super();
		
		this.setStrokeColor(strokeColor);
		this.setStrokeSize(strokeSize);
		this.context.lineJoin = "round";
		this.context.lineCap = "round";
		
		this.getEventManager().ELEMENT_MOUSE_DOWN.subscribe((): any => this.brushDown = true);
		this.getEventManager().ELEMENT_MOUSE_UP.subscribe((): any => this.brushDown = false);
		this.getEventManager().ELEMENT_MOUSE_LEAVE.subscribe((): any => this.brushDown = false);
		this.getEventManager().ELEMENT_MOUSE_MOVE.subscribe((notification: JUIMouseEvent): void => {
			
			if ((!this.brushDown) || (this.previousX === undefined) || (this.previousY === undefined)) {
				
				this.previousX = notification.getPageX() - this.getHTMLElement().getBoundingClientRect().left;
				this.previousY = notification.getPageY() - this.getHTMLElement().getBoundingClientRect().top;
				
			} else if (this.brushDown) {
				
				this.context.beginPath();
				this.context.moveTo(this.previousX, this.previousY);
				
				this.previousX = notification.getPageX() - this.getHTMLElement().getBoundingClientRect().left;
				this.previousY = notification.getPageY() - this.getHTMLElement().getBoundingClientRect().top;
				
				this.context.lineTo(this.previousX, this.previousY);
				this.context.stroke();
				this.context.closePath();
				
			}
		
		});
	
	}
	
	public setStrokeColor(strokeColor: JUIColor): JUIColor {
		
		let displaced: JUIColor = this.getStrokeColor();
		this.strokeColor = strokeColor;
		this.context.strokeStyle = this.strokeColor.getCSSString();
		
		return displaced;
		
	}
	
	public getStrokeColor(): JUIColor {
		
		return this.strokeColor;
		
	}
	
	public setStrokeSize(strokeSize: number): number {
		
		let displaced: number = this.getStrokeSize();
		this.strokeSize = strokeSize;
		this.context.lineWidth = strokeSize;
		return displaced;
		
	}
	
	public getStrokeSize(): number {
		
		return this.strokeSize;
		
	}
	
	public clear(): void {
	
		this.context.clearRect(0, 0, this.getHTMLElement().width, this.getHTMLElement().height);
		
	}
	
}

export default JUIDrawingCanvasLeaf;