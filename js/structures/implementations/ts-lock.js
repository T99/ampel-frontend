/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:33 AM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUINotifier from "../../jui/action/jui-notifier.js";
/**
 * An object-based lock.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLock {
    constructor() {
        this.relinquishNotifier = new JUINotifier();
    }
    relinquish() {
        this.relinquishNotifier.notify();
    }
    subscribeToRelinquishNotifier(handler) {
        return this.relinquishNotifier.subscribe(handler);
    }
}
export default TSLock;
//# sourceMappingURL=ts-lock.js.map