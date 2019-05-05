/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 PM -- January 18th, 2019.
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
class JUIKeyboardEvent extends JUIEvent {
    constructor(source, type, timestamp, key) {
        super(source, type, timestamp);
        // TODO [1/28/19 @ 3:12 PM] - Make an enum for this.
        this.key = key;
    }
    getKey() {
        return this.key;
    }
}
export default JUIKeyboardEvent;
//# sourceMappingURL=jui-keyboard-event.js.map