/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:44 PM -- March 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUICanvasLeaf from "./jui-canvas-leaf.js";
import JUINamedColor from "../../../descriptors/colors/jui-named-color.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIDrawingCanvasLeaf extends JUICanvasLeaf {
    constructor(strokeColor = JUINamedColor.BLACK, strokeSize = 100) {
        super();
        this.brushDown = false;
        this.setStrokeColor(strokeColor);
        this.setStrokeSize(strokeSize);
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.getEventManager().ELEMENT_MOUSE_DOWN.subscribe(() => this.brushDown = true);
        this.getEventManager().ELEMENT_MOUSE_UP.subscribe(() => this.brushDown = false);
        this.getEventManager().ELEMENT_MOUSE_LEAVE.subscribe(() => this.brushDown = false);
        this.getEventManager().ELEMENT_MOUSE_MOVE.subscribe((notification) => {
            if ((!this.brushDown) || (this.previousX === undefined) || (this.previousY === undefined)) {
                this.previousX = notification.getPageX() - this.getHTMLElement().getBoundingClientRect().left;
                this.previousY = notification.getPageY() - this.getHTMLElement().getBoundingClientRect().top;
            }
            else if (this.brushDown) {
                console.log("Drawing in '" + this.context.strokeStyle + "'.");
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
    setStrokeColor(strokeColor) {
        console.log("Setting stroke color: " + strokeColor.getCSSString());
        let displaced = this.getStrokeColor();
        this.strokeColor = strokeColor;
        this.context.strokeStyle = this.strokeColor.getCSSString();
        console.log("this.context.strokeStyle -> " + this.context.strokeStyle);
        return displaced;
    }
    getStrokeColor() {
        return this.strokeColor;
    }
    setStrokeSize(strokeSize) {
        let displaced = this.getStrokeSize();
        this.strokeSize = strokeSize;
        this.context.lineWidth = strokeSize;
        return displaced;
    }
    getStrokeSize() {
        return this.strokeSize;
    }
    clear() {
        this.context.clearRect(0, 0, this.getHTMLElement().width, this.getHTMLElement().height);
    }
}
export default JUIDrawingCanvasLeaf;
//# sourceMappingURL=jui-drawing-canvas-leaf.js.map