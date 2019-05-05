/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:13 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSArrayList from "../ts-array-list.js";
import TSAIterator from "../../../partials/iterate/ts-a-iterator.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSMultiPathDoublyLinkedListNode {
    constructor(content, parentList) {
        this.content = content;
        this.parentList = parentList;
        this.previousNodeMap = new Map();
        this.nextNodeMap = new Map();
    }
    getElement() {
        return this.content;
    }
    getParentList() {
        return this.parentList;
    }
    hasPreviousNode(tractID = null) {
        return this.previousNodeMap.has(tractID);
    }
    getPreviousNode(tractID = null) {
        return this.previousNodeMap.get(tractID);
    }
    setPreviousNode(tractID, previousNode) {
        let displaced = this.getPreviousNode(tractID);
        this.previousNodeMap.set(tractID, previousNode);
        return displaced;
    }
    removePreviousNode(tractID) {
        let displaced = this.getPreviousNode(tractID);
        this.previousNodeMap.delete(tractID);
        return displaced;
    }
    hasNextNode(tractID = null) {
        return this.nextNodeMap.has(tractID);
    }
    getNextNode(tractID = null) {
        return this.nextNodeMap.get(tractID);
    }
    setNextNode(tractID, nextNode) {
        let displaced = this.getNextNode(tractID);
        this.nextNodeMap.set(tractID, nextNode);
        return displaced;
    }
    removeNextNode(tractID) {
        let displaced = this.getNextNode(tractID);
        this.nextNodeMap.delete(tractID);
        return displaced;
    }
    nextNodesIterator() {
        return new class extends TSAIterator {
            constructor(baseNode) {
                super();
                this.baseNode = baseNode;
                this.tractsIterator = (new TSArrayList(...this.baseNode.nextNodeMap.keys())).iterator();
            }
            hasNext() {
                return this.tractsIterator.hasNext();
            }
            next() {
                if (this.hasNext()) {
                    let tract = this.tractsIterator.next();
                    let node = this.baseNode.nextNodeMap.get(tract);
                    return { tract, node };
                }
                else
                    return undefined;
            }
            remove() {
                throw new Error("Unsupported operation on TSMultiPathDoublyLinkedListNode, '#remove()'.");
            }
            reset() {
                this.tractsIterator.reset();
            }
        }(this);
    }
    previousNodesIterator() {
        return new class extends TSAIterator {
            constructor(baseNode) {
                super();
                this.baseNode = baseNode;
                this.tractsIterator = (new TSArrayList(...this.baseNode.previousNodeMap.keys())).iterator();
            }
            hasNext() {
                return this.tractsIterator.hasNext();
            }
            next() {
                if (this.hasNext()) {
                    let tract = this.tractsIterator.next();
                    let node = this.baseNode.previousNodeMap.get(tract);
                    return { tract, node };
                }
                else
                    return undefined;
            }
            remove() {
                throw new Error("Unsupported operation on TSMultiPathDoublyLinkedListNode, '#remove()'.");
            }
            reset() {
                this.tractsIterator.reset();
            }
        }(this);
    }
}
export default TSMultiPathDoublyLinkedListNode;
//# sourceMappingURL=ts-multi-path-doubly-linked-list-node.js.map