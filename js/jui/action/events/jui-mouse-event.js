/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:10 PM -- January 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEvent from "./jui-event.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMouseEvent extends JUIEvent {
    constructor(source, type, timestamp, event) {
        super(source, type, timestamp);
        this.internalEvent = event;
    }
    getOffsetY() {
        return this.internalEvent.offsetY;
    }
    getOffsetX() {
        return this.internalEvent.offsetX;
    }
    getClientY() {
        return this.internalEvent.clientY;
    }
    getClientX() {
        return this.internalEvent.clientX;
    }
    getMovementY() {
        return this.internalEvent.movementY;
    }
    getMovementX() {
        return this.internalEvent.movementX;
    }
    getPageY() {
        return this.internalEvent.pageY;
    }
    getPageX() {
        return this.internalEvent.pageX;
    }
    getScreenY() {
        return this.internalEvent.screenY;
    }
    getScreenX() {
        return this.internalEvent.screenX;
    }
}
export default JUIMouseEvent;
//# sourceMappingURL=jui-mouse-event.js.map