/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:48 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSAIterator from "../iterate/ts-a-iterator.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSADoublyLinkedList {
    get(index) {
        let iterator = this.iterator();
        while (index > 0) {
            if (iterator.hasNext()) {
                index--;
                iterator.next();
            }
            else {
                throw new Error("Index out of bounds: Attempted to access an index that was out of bounds in a " +
                    "TSADoublyLinkedList");
            }
        }
        return iterator.next();
    }
    add(element) {
        this.insertLast(element);
    }
    addAll(elements) {
        for (let element of elements)
            this.add(element);
    }
    contains(element) {
        for (let item of this.iterator())
            if (item === element)
                return true;
        return false;
    }
    size() {
        let size = 0;
        for (let element of this.iterator())
            size++;
        return size;
    }
    isEmpty() {
        return ((this.getPrologueNode().getNextNode() === this.getEpilogueNode()) &&
            (this.getEpilogueNode().getPreviousNode() === this.getPrologueNode()));
    }
    iterator() {
        return new class extends TSAIterator {
            constructor(dll) {
                super();
                this.nodeIterator = dll.nodeIterator();
            }
            hasNext() {
                return this.nodeIterator.hasNext();
            }
            next() {
                return this.nodeIterator.next().getElement();
            }
            remove() {
                return this.nodeIterator.remove().getElement();
            }
            reset() {
                this.nodeIterator.reset();
            }
        }(this);
    }
    toArray() {
        let array = [];
        this.iterator().forEachRemaining((element) => { array.push(element); });
        return array;
    }
    getFirst() {
        return this.getFirstNode().getElement();
    }
    getFirstNode() {
        if (this.isEmpty())
            throw new Error("Attempted to access the first node of an empty TSADoublyLinkedList");
        else
            return this.getPrologueNode().getNextNode();
    }
    getLast() {
        return this.getLastNode().getElement();
    }
    getLastNode() {
        if (this.isEmpty())
            throw new Error("Attempted to access the last node of an empty TSADoublyLinkedList");
        else
            return this.getEpilogueNode().getPreviousNode();
    }
    hasNextNode(node) {
        if (node.getParentList() === this) {
            if (this.isEmpty())
                return false;
            else
                return ((node !== this.getLastNode()) && (node !== this.getEpilogueNode()));
        }
        else {
            throw new Error("Attempted to check the next node of a TSADoublyLinkedListNode that did not appear in the" +
                " given TSADoublyLinkedList.");
        }
    }
    getNextNode(node) {
        if (this.hasNextNode(node))
            return node.getNextNode();
        else
            throw new Error("Attempted to get the next node of a node that did not have a succeeding sibling.");
    }
    hasPreviousNode(node) {
        if (node.getParentList() === this) {
            if (this.isEmpty())
                return false;
            else
                return ((node !== this.getFirstNode()) && (node !== this.getPrologueNode()));
        }
        else {
            throw new Error("Attempted to check the next node of a TSADoublyLinkedListNode that did not appear in the" +
                " given TSADoublyLinkedList.");
        }
    }
    getPreviousNode(node) {
        if (this.hasPreviousNode(node))
            return node.getPreviousNode();
        else
            throw new Error("Attempted to get the previous node of a node that did not have a preceding sibling.");
    }
    insertAfter(element, node) {
        if (node.getParentList() !== this) {
            throw new Error("Attempted to insert an element after a node that does not occur in this " +
                "TSADoublyLinkedList.");
        }
        else if (node === this.getEpilogueNode()) {
            throw new Error("Attempted to insert an element after the prologue node of a TSADoublyLinkedList.");
        }
        else
            return this.insertBetween(element, node, node.getNextNode());
    }
    insertNodeAfter(node, afterNode) {
        if (afterNode.getParentList() !== this) {
            throw new Error("Attempted to insert a node after a node that does not occur in this " +
                "TSADoublyLinkedList.");
        }
        else if (afterNode === this.getPrologueNode()) {
            throw new Error("Attempted to insert a node after the prologue node of a TSADoublyLinkedList.");
        }
        else
            return this.insertNodeBetween(node, afterNode, afterNode.getNextNode());
    }
    insertBefore(element, node) {
        if (node.getParentList() !== this) {
            throw new Error("Attempted to insert an element before a node that does not occur in this " +
                "TSADoublyLinkedList.");
        }
        else if (node === this.getPrologueNode()) {
            throw new Error("Attempted to insert an element before the epilogue node of a TSADoublyLinkedList.");
        }
        else
            return this.insertBetween(element, node.getPreviousNode(), node);
    }
    insertNodeBefore(node, beforeNode) {
        if (beforeNode.getParentList() !== this) {
            throw new Error("Attempted to insert a node before a node that does not occur in this " +
                "TSADoublyLinkedList.");
        }
        else if (beforeNode === this.getEpilogueNode()) {
            throw new Error("Attempted to insert a node before the epilogue node of a TSADoublyLinkedList.");
        }
        else
            return this.insertNodeBetween(node, beforeNode.getPreviousNode(), beforeNode);
    }
    insertFirst(element) {
        return this.insertAfter(element, this.getPrologueNode());
    }
    insertNodeFirst(node) {
        return this.insertNodeAfter(node, this.getPrologueNode());
    }
    insertLast(element) {
        return this.insertBefore(element, this.getEpilogueNode());
    }
    insertNodeLast(node) {
        return this.insertNodeBefore(node, this.getEpilogueNode());
    }
    remove(element) {
        for (let node of this.nodeIterator()) {
            if (node.getElement() === element) {
                this.removeNode(node);
                return node.getElement();
            }
        }
    }
    removeFirst() {
        return this.removeFirstNode().getElement();
    }
    removeFirstNode() {
        if (this.isEmpty())
            throw new Error("Attempted to remove the first node of an empty TSADoublyLinkedList.");
        else
            return this.removeNode(this.getFirstNode());
    }
    removeLast() {
        return this.removeLastNode().getElement();
    }
    removeLastNode() {
        if (this.isEmpty())
            throw new Error("Attempted to remove the last node of an empty TSADoublyLinkedList.");
        else
            return this.removeNode(this.getLastNode());
    }
}
export default TSADoublyLinkedList;
//# sourceMappingURL=ts-a-doubly-linked-list.js.map