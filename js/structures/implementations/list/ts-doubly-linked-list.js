/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:54 PM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSDoublyLinkedListNode from "./nodes/ts-doubly-linked-list-node.js";
import TSNaturalComparator from "../comparators/ts-natural-comparator.js";
import TSBubbleSort from "../sorting-methods/ts-bubble-sort.js";
import TSADoublyLinkedList from "../../partials/list/ts-a-doubly-linked-list.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSDoublyLinkedList extends TSADoublyLinkedList {
    constructor(...elements) {
        super();
        this.prologue = new TSDoublyLinkedListNode(null, this, undefined, undefined);
        this.epilogue = new TSDoublyLinkedListNode(null, this, this.prologue, undefined);
        this.prologue.setNextNode(this.epilogue);
        this.addAll(elements);
    }
    getEpilogueNode() {
        return this.epilogue;
    }
    getPrologueNode() {
        return this.prologue;
    }
    insertBetween(content, previousNode, nextNode) {
        // Ensure that the provided nodes are neighbors.
        if ((previousNode.getNextNode() === nextNode) && (nextNode.getPreviousNode() === previousNode)) {
            let newNode = new TSDoublyLinkedListNode(content, this, previousNode, nextNode);
            previousNode.setNextNode(newNode);
            nextNode.setPreviousNode(newNode);
            return newNode;
        }
        else
            throw new Error("Attempted to insert new content between two non-adjacent TSDoublyLinkedNodes.");
    }
    insertNodeBetween(node, previousNode, nextNode) {
        return undefined;
    }
    removeNode(node) {
        if (node.getParentList() === this) {
            let displaced = node;
            node.getPreviousNode().setNextNode(node.getNextNode());
            node.getNextNode().setPreviousNode(node.getPreviousNode());
            node.setPreviousNode(undefined);
            node.setNextNode(undefined);
            return displaced;
        }
        else
            throw new Error("Attempted to remove a TSDoublyLinkedListNode that did not appear in the given TSDoublyLinkedList.");
    }
    clear() {
        this.prologue.setNextNode(this.epilogue);
        this.epilogue.setPreviousNode(this.prologue);
    }
    sort(comparator, method) {
        if (comparator === undefined)
            comparator = new TSNaturalComparator();
        if (method === undefined)
            method = new TSBubbleSort(comparator);
        let sortedElements = method.sort(this.toArray());
        this.clear();
        this.addAll(sortedElements);
    }
    nodeIterator() {
        return new class extends TSAIterator {
            constructor(prologue, dll) {
                super();
                this.firstNode = prologue;
                this.currentNode = prologue;
                this.dll = dll;
            }
            hasNext() {
                return this.dll.hasNextNode(this.currentNode);
            }
            next() {
                return (this.currentNode = this.currentNode.getNextNode());
            }
            remove() {
                let removedNode = this.currentNode;
                this.dll.removeNode(this.currentNode);
                return removedNode;
            }
            reset() {
                this.currentNode = this.firstNode;
            }
        }(this.prologue, this);
    }
    shuffle(iterations = 1) {
        for (let count = 0; count < iterations; count++) {
            let elements = this.toArray();
            this.clear();
            while (elements.length !== 0) {
                let random = Math.floor(Math.random() * elements.length);
                let element = elements.removeIndex(random);
                this.add(element);
            }
        }
    }
}
export default TSDoublyLinkedList;
//# sourceMappingURL=ts-doubly-linked-list.js.map