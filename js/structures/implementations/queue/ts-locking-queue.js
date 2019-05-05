/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:32 AM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TSLock from "../ts-lock.js";
import TSDoublyLinkedList from "../list/ts-doubly-linked-list.js";
import TSLockingQueueNode from "./nodes/ts-locking-queue-node.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLockingQueue {
    constructor() {
        this.lock = new TSLock();
        this.dll = new TSDoublyLinkedList();
    }
    getLock() {
        return __awaiter(this, void 0, void 0, function* () {
            let lock = new TSLock();
            let node = this.dll.insertLast(new TSLockingQueueNode());
            lock.subscribeToRelinquishNotifier(() => {
                if (this.dll.hasNextNode(node))
                    node.getNextNode().getElement().readyUp();
                this.dll.removeNode(node);
            });
            if (this.dll.hasPreviousNode(node))
                yield node.getElement().getReadyPromise();
            return lock;
        });
    }
    contains(element) {
        return this.dll.contains(element);
    }
    isEmpty() {
        return this.dll.isEmpty();
    }
    size() {
        return this.dll.size();
    }
    toArray() {
        return this.dll.toArray();
    }
}
export default TSLockingQueue;
//# sourceMappingURL=ts-locking-queue.js.map