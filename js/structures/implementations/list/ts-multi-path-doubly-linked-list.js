/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:11 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSMultiPathDoublyLinkedListNode from "./nodes/ts-multi-path-doubly-linked-list-node.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";
/**
 * A doubly linked list that allows for linear-time traversal over pre-identified sub-lists as well as linear time
 * traversal of the entire list by insertion order.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSMultiPathDoublyLinkedList {
    constructor() {
        this.prologueMap = new Map();
        this.epilogueMap = new Map();
        this.prologueMap.set(null, new TSMultiPathDoublyLinkedListNode(undefined, this));
        this.epilogueMap.set(null, new TSMultiPathDoublyLinkedListNode(undefined, this));
        this.prologueMap.get(null).setNextNode(null, this.epilogueMap.get(null));
        this.epilogueMap.get(null).setPreviousNode(null, this.prologueMap.get(null));
    }
    areNodesAdjacent(node1, node2) {
        return ((node1.getNextNode() === node2) ||
            (node2.getPreviousNode() === node1));
    }
    insertBetween(element, previousNode, nextNode, tractID = null) {
        if ((previousNode.getParentList() !== this) || (nextNode.getParentList() !== this)) {
            throw new Error("Attempted to insert a node between nodes that did not appear in the given " +
                "TSMultiPathDoublyLinkedList.");
        }
        else if (!this.areNodesAdjacent(previousNode, nextNode)) {
            throw new Error("Attempted to insert a node between non-neighboring nodes.");
        }
        else {
            // if (!this.prologueMap.has(tractID)) this.prologueMap.set(tractID, new TSMultiPathDoublyLinkedListNode<T, E>(undefined, this));
            // if (!this.epilogueMap.has(tractID)) this.epilogueMap.set(tractID, new TSMultiPathDoublyLinkedListNode<T, E>(undefined, this));
            let newNode = new TSMultiPathDoublyLinkedListNode(element, this);
            for (let { tract, node } of nextNode.previousNodesIterator()) {
                node.setNextNode(tractID, newNode);
                newNode.setPreviousNode(tract, node);
            }
            for (let { tract, node } of previousNode.nextNodesIterator()) {
                node.setPreviousNode(tractID, newNode);
                newNode.setNextNode(tract, node);
            }
            previousNode.setNextNode(null, newNode);
            nextNode.setPreviousNode(null, newNode);
            newNode.setNextNode(null, nextNode);
            newNode.setPreviousNode(null, previousNode);
            return newNode;
        }
    }
    insertNodeBetween(node, previousNode, nextNode, tractID = null) {
        // TODO [4/10/19 @ 7:42 PM] - Finish the 'insertNodeBetween' method.
        return null;
    }
    get(index, tractID = null) {
        if (!this.hasTract(tractID)) {
            throw new Error("Attempted to get an element from a non-existent TSMultiPathDoublyLinkedList tract.");
        }
        else if (this.isEmpty(tractID)) {
            throw new Error("Attempted to get an element from an empty TSMultiPathDoublyLinkedList tract.");
        }
        else {
            let currentNode = this.getFirstNode(tractID);
            while (index > 0) {
                if (this.hasNextNode(currentNode, tractID)) {
                    currentNode = this.getNextNode(currentNode, tractID);
                    index--;
                }
                else {
                    throw new Error("Attempted to get an out-of-bounds index from this TSMultiPathDoublyLinkedList " +
                        "tract.");
                }
            }
            return currentNode.getElement();
        }
    }
    add(element, tractID = null) {
        this.initializeTract(tractID);
        this.insertLast(element, tractID);
    }
    addAll(elements, tractID = null) {
        this.initializeTract(tractID);
        for (let element of elements)
            this.add(element, tractID);
    }
    removeNode(node, tractID = null) {
        // TODO [4/10/19 @ 7:43 PM] - Finish the 'removeNode' method.
        return null;
    }
    getFirst(tractID = null) {
        return this.getFirstNode(tractID).getElement();
    }
    getFirstNode(tractID = null) {
        if (!this.hasTract(tractID)) {
            throw new Error("Attempted to get the first node of a non-existent TSMultiPathDoublyLinkedList tract.");
        }
        else if (this.isEmpty(tractID)) {
            throw new Error("Attempted to get the first node of an empty TSMultiPathDoublyLinkedList tract.");
        }
        else
            return this.prologueMap.get(null).getNextNode(tractID);
    }
    getLast(tractID = null) {
        return this.getLastNode(tractID).getElement();
    }
    getLastNode(tractID = null) {
        if (!this.hasTract(tractID)) {
            throw new Error("Attempted to get the last node of a non-existent TSMultiPathDoublyLinkedList tract.");
        }
        else if (this.isEmpty(tractID)) {
            throw new Error("Attempted to get the last node of an empty TSMultiPathDoublyLinkedList tract.");
        }
        else
            return this.epilogueMap.get(null).getPreviousNode(tractID);
    }
    hasNextNode(node, tractID = null) {
        if (this.hasTract(tractID)) {
            if (node.getParentList() === this) {
                if (this.isEmpty(tractID))
                    return false;
                else {
                    // Returns true if the provided node is not the last node or the epilogue node for the provided tract.
                    return ((node !== this.getLastNode(tractID)) && (node !== this.epilogueMap.get(tractID)));
                }
            }
            else {
                throw new Error("Attempted to check the next node of a TSMultiPathDoublyLinkedList that did not appear in" +
                    " the given TSMultiPathDoublyLinkedList.");
            }
        }
        else
            return false;
    }
    getNextNode(node, tractID = null) {
        if (this.hasTract(tractID)) {
            if (this.hasNextNode(node, tractID))
                return node.getNextNode(tractID);
            else {
                throw new Error("Attempted to get the next node of a node that did not have a succeeding sibling in the " +
                    "given tract.");
            }
        }
        else {
            throw new Error("Attempted to get the next node of a node from a non-existent tract.");
        }
    }
    hasPreviousNode(node, tractID = null) {
        if (this.hasTract(tractID)) {
            if (node.getParentList() === this) {
                if (this.isEmpty(tractID))
                    return false;
                else {
                    // Returns true if the provided node is not the first node or the prologue node for the provided tract.
                    return ((node !== this.getFirstNode(tractID)) && (node !== this.prologueMap.get(tractID)));
                }
            }
            else {
                throw new Error("Attempted to check the previous node of a TSMultiPathDoublyLinkedList that did not " +
                    "appear in the given TSMultiPathDoublyLinkedList.");
            }
        }
        else
            return false;
    }
    getPreviousNode(node, tractID = null) {
        if (this.hasTract(tractID)) {
            if (this.hasPreviousNode(node, tractID))
                return node.getPreviousNode(tractID);
            else {
                throw new Error("Attempted to get the previous node of a node that did not have a preceding sibling in " +
                    "the given tract.");
            }
        }
        else {
            throw new Error("Attempted to get the previous node of a node from a non-existent tract.");
        }
    }
    insertAfter(element, node, tractID = null) {
        if (node.getParentList() !== this) {
            throw new Error("Attempted to insert an element after a node that does not occur in this " +
                "TSMultiPathDoublyLinkedList.");
        }
        else if (node === this.epilogueMap.get(null)) {
            throw new Error("Attempted to insert an element after the epilogue node of a TSMultiPathDoublyLinkedList " +
                "tract.");
        }
        else {
            this.initializeTract(tractID);
            return this.insertBetween(element, node, node.getNextNode(), tractID);
        }
    }
    insertNodeAfter(node, afterNode, tractID = null) {
        if (afterNode.getParentList() !== this) {
            throw new Error("Attempted to insert a node after a node that does not occur in this " +
                "TSMultiPathDoublyLinkedList.");
        }
        else if (afterNode === this.epilogueMap.get(null)) {
            throw new Error("Attempted to insert a node after the epilogue node of a TSMultiPathDoublyLinkedList " +
                "tract.");
        }
        else {
            this.initializeTract(tractID);
            return this.insertNodeBetween(node, afterNode, afterNode.getNextNode(), tractID);
        }
    }
    insertBefore(element, node, tractID = null) {
        if (node.getParentList() !== this) {
            throw new Error("Attempted to insert an element before a node that does not occur in this " +
                "TSMultiPathDoublyLinkedList.");
        }
        else if (node === this.prologueMap.get(null)) {
            throw new Error("Attempted to insert an element before the prologue node of a TSMultiPathDoublyLinkedList" +
                " tract.");
        }
        else {
            this.initializeTract(tractID);
            return this.insertBetween(element, node.getPreviousNode(), node, tractID);
        }
    }
    insertNodeBefore(node, beforeNode, tractID = null) {
        if (beforeNode.getParentList() !== this) {
            throw new Error("Attempted to insert a node before a node that does not occur in this " +
                "TSMultiPathDoublyLinkedList.");
        }
        else if (beforeNode === this.prologueMap.get(null)) {
            throw new Error("Attempted to insert a node before the prologue node of a TSMultiPathDoublyLinkedList " +
                "tract.");
        }
        else {
            this.initializeTract(tractID);
            return this.insertNodeBetween(node, beforeNode.getPreviousNode(), beforeNode, tractID);
        }
    }
    insertFirst(element, tractID = null) {
        this.initializeTract(tractID);
        return this.insertAfter(element, this.prologueMap.get(null), tractID);
    }
    insertNodeFirst(node, tractID = null) {
        this.initializeTract(tractID);
        return this.insertNodeAfter(node, this.prologueMap.get(null), tractID);
    }
    insertLast(element, tractID = null) {
        this.initializeTract(tractID);
        return this.insertBefore(element, this.epilogueMap.get(null), tractID);
    }
    insertNodeLast(node, tractID = null) {
        this.initializeTract(tractID);
        return this.insertNodeBefore(node, this.epilogueMap.get(null), tractID);
    }
    remove(element, tractID = null) {
        for (let node of this.nodeIterator(tractID)) {
            if (node.getElement() === element)
                return this.removeNode(node, tractID).getElement();
        }
        return undefined;
    }
    removeFirst(tractID = null) {
        if (this.hasTract(tractID))
            return this.removeFirstNode(tractID).getElement();
        else
            return undefined;
    }
    removeFirstNode(tractID = null) {
        if (this.isEmpty(tractID)) {
            throw new Error("Attempted to remove the first node of an empty TSMultiPathDoublyLinkedList tract.");
        }
        else {
            if (this.hasTract(tractID))
                return this.removeNode(this.getFirstNode(tractID), tractID);
            else
                return undefined;
        }
    }
    removeLast(tractID = null) {
        if (this.hasTract(tractID))
            return this.removeLastNode(tractID).getElement();
        else
            return undefined;
    }
    removeLastNode(tractID = null) {
        if (this.isEmpty(tractID)) {
            throw new Error("Attempted to remove the last node of an empty TSMultiPathDoublyLinkedList tract.");
        }
        else {
            if (this.hasTract(tractID))
                return this.removeNode(this.getLastNode(tractID), tractID);
            else
                return undefined;
        }
    }
    initializeTract(tractID) {
        if (!this.hasTract(tractID)) {
            let newPrologueNode = new TSMultiPathDoublyLinkedListNode(undefined, this);
            let newEpilogueNode = new TSMultiPathDoublyLinkedListNode(undefined, this);
            this.prologueMap.set(tractID, newPrologueNode);
            this.epilogueMap.set(tractID, newEpilogueNode);
            newPrologueNode.setNextNode(null, this.prologueMap.get(null).getNextNode(null));
            newEpilogueNode.setPreviousNode(null, this.epilogueMap.get(null).getPreviousNode(null));
            newPrologueNode.setNextNode(tractID, newEpilogueNode);
            newEpilogueNode.setPreviousNode(tractID, newPrologueNode);
        }
    }
    hasTract(tractID) {
        return this.prologueMap.has(tractID);
    }
    size(tractID = null) {
        if (this.hasTract(tractID)) {
            let size = 0;
            for (let element of this.iterator(tractID))
                size++;
            return size;
        }
        else
            throw new Error("Attempted to get check the size of a non-existent TSMultiPathDoublyLinkedList tract.");
    }
    isEmpty(tractID = null) {
        if (this.hasTract(tractID)) {
            return ((this.prologueMap.get(tractID).getNextNode(tractID) === this.epilogueMap.get(tractID)) &&
                (this.epilogueMap.get(tractID).getPreviousNode(tractID) === this.prologueMap.get(tractID)));
        }
        else
            return true;
    }
    contains(element, tractID = null) {
        if (this.hasTract(tractID)) {
            for (let item of this.iterator(tractID))
                if (item === element)
                    return true;
            return false;
        }
        else
            return false;
    }
    clear(tractID = null) {
        // TODO [4/14/19 @ 2:07 AM] - Finish the 'clear' method.
    }
    sort(comparator, method) {
        // TODO [4/10/19 @ 7:41 PM] - Finish the 'sort' method.
    }
    iterator(tractID = null) {
        return new class extends TSAIterator {
            constructor(mpdll) {
                super();
                this.nodeIterator = mpdll.nodeIterator(tractID);
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
    nodeIterator(tractID = null) {
        return new class extends TSAIterator {
            constructor(mpdll) {
                super();
                this.mpdll = mpdll;
                this.currentNode = mpdll.prologueMap.get(tractID);
            }
            hasNext() {
                return this.mpdll.hasNextNode(this.currentNode, tractID);
            }
            next() {
                if (this.hasNext()) {
                    this.currentNode = this.mpdll.getNextNode(this.currentNode, tractID);
                    return this.currentNode;
                }
                else
                    return undefined;
            }
            remove() {
                if ((this.currentNode === this.mpdll.epilogueMap.get(tractID)) || (this.currentNode === this.mpdll.epilogueMap.get(tractID))) {
                    return undefined;
                }
                else if (this.currentNode.hasPreviousNode(tractID)) {
                    this.currentNode = this.mpdll.getPreviousNode(this.currentNode, tractID);
                    return this.mpdll.removeNode(this.currentNode.getNextNode(tractID), tractID);
                }
                else
                    return undefined;
            }
            reset() {
                this.currentNode = this.mpdll.prologueMap.get(tractID);
            }
        }(this);
    }
    toArray(tractID = null) {
        if (this.hasTract(tractID)) {
            let array = [];
            this.iterator(tractID).forEachRemaining((element) => { array.push(element); });
            return array;
        }
        else
            return [];
    }
}
export default TSMultiPathDoublyLinkedList;
//# sourceMappingURL=ts-multi-path-doubly-linked-list.js.map