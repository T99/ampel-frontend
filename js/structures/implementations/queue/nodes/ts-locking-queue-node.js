/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:26 PM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * A node within a {@link TSLockingQueue}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLockingQueueNode {
    constructor() {
        this.readyPromise = new Promise((resolve) => {
            this.readyPromiseResolver = resolve;
        });
    }
    getReadyPromise() {
        return this.readyPromise;
    }
    readyUp() {
        this.readyPromiseResolver();
    }
}
export default TSLockingQueueNode;
//# sourceMappingURL=ts-locking-queue-node.js.map