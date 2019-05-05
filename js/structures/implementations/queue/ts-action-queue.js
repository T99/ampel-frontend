/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:39 PM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSQueue from "./ts-queue.js";
/**
 * A queue of actions/lambdas.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSActionQueue {
    constructor(...actions) {
        this.internalQueue = new TSQueue(...actions);
    }
    execute() {
        return this.dequeue()();
    }
    executeAll() {
        let results = [];
        while (!this.isEmpty())
            results.push(this.execute());
        return results;
    }
    contains(element) {
        return this.internalQueue.contains(element);
    }
    dequeue() {
        return this.internalQueue.dequeue();
    }
    enqueue(element) {
        this.internalQueue.enqueue(element);
    }
    isEmpty() {
        return this.internalQueue.isEmpty();
    }
    peek() {
        return this.internalQueue.peek();
    }
    size() {
        return this.internalQueue.size();
    }
    toArray() {
        return this.internalQueue.toArray();
    }
}
export default TSActionQueue;
//# sourceMappingURL=ts-action-queue.js.map