/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:10 PM -- February 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSQueue {
    constructor(...elements) {
        this.internalArray = [];
        this.enqueue(...elements);
    }
    enqueue(...elements) {
        this.internalArray.push(...elements);
    }
    dequeue() {
        return this.internalArray.shift();
    }
    peek() {
        return this.internalArray[0];
    }
    size() {
        return this.internalArray.length;
    }
    isEmpty() {
        return (this.size() === 0);
    }
    contains(element) {
        return this.internalArray.includes(element);
    }
    clear() {
        this.internalArray = [];
    }
    toArray() {
        return this.internalArray;
    }
}
export default TSQueue;
//# sourceMappingURL=ts-queue.js.map