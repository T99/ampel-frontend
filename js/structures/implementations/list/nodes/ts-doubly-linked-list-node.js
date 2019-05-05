/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:54 PM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSDoublyLinkedListNode {
    constructor(content, parentList, previousNode, nextNode) {
        this.content = content;
        this.parentList = parentList;
        this.previous = previousNode;
        this.next = nextNode;
    }
    getElement() {
        return this.content;
    }
    getParentList() {
        return this.parentList;
    }
    hasPreviousNode() {
        return (this.previous !== undefined);
    }
    getPreviousNode() {
        return this.previous;
    }
    setPreviousNode(previousNode) {
        let displaced = this.previous;
        this.previous = previousNode;
        return displaced;
    }
    hasNextNode() {
        return (this.next !== undefined);
    }
    getNextNode() {
        return this.next;
    }
    setNextNode(nextNode) {
        let displaced = this.next;
        this.next = nextNode;
        return displaced;
    }
}
export default TSDoublyLinkedListNode;
//# sourceMappingURL=ts-doubly-linked-list-node.js.map