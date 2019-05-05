/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:11 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSMultiPathDoublyLinkedListNode from "./nodes/ts-multi-path-doubly-linked-list-node.js";
import TSComparator from "../../interfaces/ts-comparator.js";
import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
import TSIDoublyLinkedList from "../../interfaces/list/ts-i-doubly-linked-list.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";

/**
 * A doubly linked list that allows for linear-time traversal over pre-identified sub-lists as well as linear time
 * traversal of the entire list by insertion order.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSMultiPathDoublyLinkedList<T, E> implements TSIDoublyLinkedList<E, TSMultiPathDoublyLinkedListNode<T, E>> {
	
	/**
	 * A map of the beginning/prologue nodes for each respective tract.
	 */
	private prologueMap: Map<T, TSMultiPathDoublyLinkedListNode<T, E>>;
	
	/**
	 * A map of the ending/epilogue nodes for each respective tract.
	 */
	private epilogueMap: Map<T, TSMultiPathDoublyLinkedListNode<T, E>>;
	
	public constructor() {
	
		this.prologueMap = new Map();
		this.epilogueMap = new Map();
		
		this.prologueMap.set(null, new TSMultiPathDoublyLinkedListNode<T, E>(undefined, this));
		this.epilogueMap.set(null, new TSMultiPathDoublyLinkedListNode<T, E>(undefined, this));
		
		this.prologueMap.get(null).setNextNode(null, this.epilogueMap.get(null));
		this.epilogueMap.get(null).setPreviousNode(null, this.prologueMap.get(null));
	
	}
	
	protected areNodesAdjacent(node1: TSMultiPathDoublyLinkedListNode<T, E>, node2: TSMultiPathDoublyLinkedListNode<T, E>): boolean {
		
		return (
			(node1.getNextNode() === node2) ||
			(node2.getPreviousNode() === node1)
		);
		
	}
	
	protected insertBetween(element: E,
							previousNode: TSMultiPathDoublyLinkedListNode<T, E>,
							nextNode: TSMultiPathDoublyLinkedListNode<T, E>,
							tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if ((previousNode.getParentList() !== this) || (nextNode.getParentList() !== this)) {
			
			throw new Error("Attempted to insert a node between nodes that did not appear in the given " +
				"TSMultiPathDoublyLinkedList.");
			
		} else if (!this.areNodesAdjacent(previousNode, nextNode)) {
			
			throw new Error("Attempted to insert a node between non-neighboring nodes.");
			
		} else {
			
			// if (!this.prologueMap.has(tractID)) this.prologueMap.set(tractID, new TSMultiPathDoublyLinkedListNode<T, E>(undefined, this));
			// if (!this.epilogueMap.has(tractID)) this.epilogueMap.set(tractID, new TSMultiPathDoublyLinkedListNode<T, E>(undefined, this));
		
			let newNode: TSMultiPathDoublyLinkedListNode<T, E> = new TSMultiPathDoublyLinkedListNode<T, E>(element, this);
			
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
	
	protected insertNodeBetween(node: TSMultiPathDoublyLinkedListNode<T, E>,
								previousNode: TSMultiPathDoublyLinkedListNode<T, E>,
								nextNode: TSMultiPathDoublyLinkedListNode<T, E>,
								tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		// TODO [4/10/19 @ 7:42 PM] - Finish the 'insertNodeBetween' method.
		return null;
		
	}
	
	public get(index: number, tractID: T = null): E {
		
		if (!this.hasTract(tractID)) {
			
			throw new Error("Attempted to get an element from a non-existent TSMultiPathDoublyLinkedList tract.");
			
		} else if (this.isEmpty(tractID)) {
			
			throw new Error("Attempted to get an element from an empty TSMultiPathDoublyLinkedList tract.");
			
		} else {
			
			let currentNode: TSMultiPathDoublyLinkedListNode<T, E> = this.getFirstNode(tractID);
			
			while (index > 0) {
				
				if (this.hasNextNode(currentNode, tractID)) {
					
					currentNode = this.getNextNode(currentNode, tractID);
					index--;
					
				} else {
					
					throw new Error("Attempted to get an out-of-bounds index from this TSMultiPathDoublyLinkedList " +
						"tract.");
				
				}
				
			}
			
			return currentNode.getElement();
			
		}
		
	}
	
	public add(element: E, tractID: T = null): void {
		
		this.initializeTract(tractID);
		this.insertLast(element, tractID);
		
	}
	
	public addAll(elements: E[], tractID: T = null): void {
		
		this.initializeTract(tractID);
		for (let element of elements) this.add(element, tractID);
		
	}
	
	public removeNode(node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		// TODO [4/10/19 @ 7:43 PM] - Finish the 'removeNode' method.
		return null;
		
	}
	
	public getFirst(tractID: T = null): E {
		
		return this.getFirstNode(tractID).getElement();
		
	}
	
	public getFirstNode(tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (!this.hasTract(tractID)) {
			
			throw new Error("Attempted to get the first node of a non-existent TSMultiPathDoublyLinkedList tract.");
			
		} else if (this.isEmpty(tractID)) {
			
			throw new Error("Attempted to get the first node of an empty TSMultiPathDoublyLinkedList tract.");
			
		} else return this.prologueMap.get(null).getNextNode(tractID);
		
	}
	
	public getLast(tractID: T = null): E {
		
		return this.getLastNode(tractID).getElement();
		
	}
	
	public getLastNode(tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (!this.hasTract(tractID)) {
			
			throw new Error("Attempted to get the last node of a non-existent TSMultiPathDoublyLinkedList tract.");
			
		} else if (this.isEmpty(tractID)) {
			
			throw new Error("Attempted to get the last node of an empty TSMultiPathDoublyLinkedList tract.");
			
		} else return this.epilogueMap.get(null).getPreviousNode(tractID);
		
	}
	
	public hasNextNode(node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): boolean {
		
		if (this.hasTract(tractID)) {
			
			if (node.getParentList() === this) {
				
				if (this.isEmpty(tractID)) return false;
				else {
					
					// Returns true if the provided node is not the last node or the epilogue node for the provided tract.
					return ((node !== this.getLastNode(tractID)) && (node !== this.epilogueMap.get(tractID)));
					
				}
				
			} else {
				
				throw new Error("Attempted to check the next node of a TSMultiPathDoublyLinkedList that did not appear in" +
					" the given TSMultiPathDoublyLinkedList.");
				
			}
			
		} else return false;
		
	}
	
	public getNextNode(node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (this.hasTract(tractID)) {
			
			if (this.hasNextNode(node, tractID)) return node.getNextNode(tractID);
			else {
				
				throw new Error("Attempted to get the next node of a node that did not have a succeeding sibling in the " +
					"given tract.");
				
			}
			
		} else {
			
			throw new Error("Attempted to get the next node of a node from a non-existent tract.");
			
		}
		
	}
	
	public hasPreviousNode(node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): boolean {
		
		if (this.hasTract(tractID)) {
			
			if (node.getParentList() === this) {
				
				if (this.isEmpty(tractID)) return false;
				else {
					
					// Returns true if the provided node is not the first node or the prologue node for the provided tract.
					return ((node !== this.getFirstNode(tractID)) && (node !== this.prologueMap.get(tractID)));
					
				}
				
			} else {
				
				throw new Error("Attempted to check the previous node of a TSMultiPathDoublyLinkedList that did not " +
					"appear in the given TSMultiPathDoublyLinkedList.");
				
			}
			
		} else return false;
		
	}
	
	public getPreviousNode(node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (this.hasTract(tractID)) {
			
			if (this.hasPreviousNode(node, tractID)) return node.getPreviousNode(tractID);
			else {
				
				throw new Error("Attempted to get the previous node of a node that did not have a preceding sibling in " +
					"the given tract.");
				
			}
			
		} else {
			
			throw new Error("Attempted to get the previous node of a node from a non-existent tract.");
			
		}
		
	}
	
	public insertAfter(element: E, node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to insert an element after a node that does not occur in this " +
				"TSMultiPathDoublyLinkedList.");
			
		} else if (node === this.epilogueMap.get(null)) {
			
			throw new Error("Attempted to insert an element after the epilogue node of a TSMultiPathDoublyLinkedList " +
				"tract.");
			
		} else {
			
			this.initializeTract(tractID);
			return this.insertBetween(element, node, node.getNextNode(), tractID);
			
		}
		
	}
	
	public insertNodeAfter(node: TSMultiPathDoublyLinkedListNode<T, E>, afterNode: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (afterNode.getParentList() !== this) {
			
			throw new Error("Attempted to insert a node after a node that does not occur in this " +
				"TSMultiPathDoublyLinkedList.");
			
		} else if (afterNode === this.epilogueMap.get(null)) {
			
			throw new Error("Attempted to insert a node after the epilogue node of a TSMultiPathDoublyLinkedList " +
				"tract.");
			
		} else {
			
			this.initializeTract(tractID);
			return this.insertNodeBetween(node, afterNode, afterNode.getNextNode(), tractID);
			
		}
		
	}
	
	public insertBefore(element: E, node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to insert an element before a node that does not occur in this " +
				"TSMultiPathDoublyLinkedList.");
			
		} else if (node === this.prologueMap.get(null)) {
			
			throw new Error("Attempted to insert an element before the prologue node of a TSMultiPathDoublyLinkedList" +
				" tract.");
			
		} else {
			
			this.initializeTract(tractID);
			return this.insertBetween(element, node.getPreviousNode(), node, tractID);
			
		}
		
	}
	
	public insertNodeBefore(node: TSMultiPathDoublyLinkedListNode<T, E>, beforeNode: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (beforeNode.getParentList() !== this) {
			
			throw new Error("Attempted to insert a node before a node that does not occur in this " +
				"TSMultiPathDoublyLinkedList.");
			
		} else if (beforeNode === this.prologueMap.get(null)) {
			
			throw new Error("Attempted to insert a node before the prologue node of a TSMultiPathDoublyLinkedList " +
				"tract.");
			
		} else {
			
			this.initializeTract(tractID);
			return this.insertNodeBetween(node, beforeNode.getPreviousNode(), beforeNode, tractID);
			
		}
		
	}
	
	public insertFirst(element: E, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		this.initializeTract(tractID);
		return this.insertAfter(element, this.prologueMap.get(null), tractID);
		
	}
	
	public insertNodeFirst(node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		this.initializeTract(tractID);
		return this.insertNodeAfter(node, this.prologueMap.get(null), tractID);
		
	}
	
	public insertLast(element: E, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		this.initializeTract(tractID);
		return this.insertBefore(element, this.epilogueMap.get(null), tractID);
		
	}
	
	public insertNodeLast(node: TSMultiPathDoublyLinkedListNode<T, E>, tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		this.initializeTract(tractID);
		return this.insertNodeBefore(node, this.epilogueMap.get(null), tractID);
		
	}
	
	public remove(element: E, tractID: T = null): E {
		
		for (let node of this.nodeIterator(tractID)) {
			
			if (node.getElement() === element) return this.removeNode(node, tractID).getElement();
			
		}
		
		return undefined;
		
	}
	
	public removeFirst(tractID: T = null): E {
		
		if (this.hasTract(tractID)) return this.removeFirstNode(tractID).getElement();
		else return undefined;
		
	}
	
	public removeFirstNode(tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (this.isEmpty(tractID)) {
			
			throw new Error("Attempted to remove the first node of an empty TSMultiPathDoublyLinkedList tract.");
			
		} else {
			
			if (this.hasTract(tractID)) return this.removeNode(this.getFirstNode(tractID), tractID);
			else return undefined;
			
		}
		
	}
	
	public removeLast(tractID: T = null): E {
		
		if (this.hasTract(tractID)) return this.removeLastNode(tractID).getElement();
		else return undefined;
		
	}
	
	public removeLastNode(tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		if (this.isEmpty(tractID)) {
			
			throw new Error("Attempted to remove the last node of an empty TSMultiPathDoublyLinkedList tract.");
			
		} else {
			
			if (this.hasTract(tractID)) return this.removeNode(this.getLastNode(tractID), tractID);
			else return undefined;
			
		}
		
	}
	
	public initializeTract(tractID: T): void {
		
		if (!this.hasTract(tractID)) {
			
			let newPrologueNode: TSMultiPathDoublyLinkedListNode<T, E> = new TSMultiPathDoublyLinkedListNode<T, E>(undefined, this);
			let newEpilogueNode: TSMultiPathDoublyLinkedListNode<T, E> = new TSMultiPathDoublyLinkedListNode<T, E>(undefined, this);
			
			this.prologueMap.set(tractID, newPrologueNode);
			this.epilogueMap.set(tractID, newEpilogueNode);
			
			newPrologueNode.setNextNode(null, this.prologueMap.get(null).getNextNode(null));
			newEpilogueNode.setPreviousNode(null, this.epilogueMap.get(null).getPreviousNode(null));
			
			newPrologueNode.setNextNode(tractID, newEpilogueNode);
			newEpilogueNode.setPreviousNode(tractID, newPrologueNode);
			
		}
		
	}
	
	protected hasTract(tractID: T): boolean {
		
		return this.prologueMap.has(tractID);
		
	}
	
	public size(tractID: T = null): number {
		
		if (this.hasTract(tractID)) {
			
			let size: number = 0;
			
			for (let element of this.iterator(tractID)) size++;
			
			return size;
			
		} else throw new Error("Attempted to get check the size of a non-existent TSMultiPathDoublyLinkedList tract.");
		
	}
	
	public isEmpty(tractID: T = null): boolean {
		
		if (this.hasTract(tractID)) {
			
			return (
				(this.prologueMap.get(tractID).getNextNode(tractID) === this.epilogueMap.get(tractID)) &&
				(this.epilogueMap.get(tractID).getPreviousNode(tractID) === this.prologueMap.get(tractID))
			);
			
		} else return true;
		
	}
	
	public contains(element: E, tractID: T = null): boolean {
		
		if (this.hasTract(tractID)) {
			
			for (let item of this.iterator(tractID)) if (item === element) return true;
			
			return false;
			
		} else return false;
		
	}
	
	public clear(tractID: T = null): void {
		
		// TODO [4/14/19 @ 2:07 AM] - Finish the 'clear' method.
		
	}
	
	public sort(comparator?: TSComparator<E>, method?: TSSortingMethod<E>): void {
		
		// TODO [4/10/19 @ 7:41 PM] - Finish the 'sort' method.
		
	}
	
	public iterator(tractID: T = null): TSAIterator<E> {
		
		return new class extends TSAIterator<E> {
			
			private nodeIterator: TSAIterator<TSMultiPathDoublyLinkedListNode<T, E>>;
			
			public constructor(mpdll: TSMultiPathDoublyLinkedList<T, E>) {
				
				super();
				
				this.nodeIterator = mpdll.nodeIterator(tractID);
				
			}
			
			public hasNext(): boolean {
				
				return this.nodeIterator.hasNext();
				
			}
			
			public next(): E {
				
				return this.nodeIterator.next().getElement();
				
			}
			
			public remove(): E {
				
				return this.nodeIterator.remove().getElement();
				
			}
			
			public reset(): void {
				
				this.nodeIterator.reset();
				
			}
			
		}(this);
		
	}
	
	public nodeIterator(tractID: T = null): TSAIterator<TSMultiPathDoublyLinkedListNode<T, E>> {
		
		return new class extends TSAIterator<TSMultiPathDoublyLinkedListNode<T, E>> {
			
			private mpdll: TSMultiPathDoublyLinkedList<T, E>;
			private currentNode: TSMultiPathDoublyLinkedListNode<T, E>;
			
			public constructor(mpdll: TSMultiPathDoublyLinkedList<T, E>) {
				
				super();
				
				this.mpdll = mpdll;
				this.currentNode = mpdll.prologueMap.get(tractID);
				
			}
			
			public hasNext(): boolean {
				
				return this.mpdll.hasNextNode(this.currentNode, tractID);
				
			}
			
			public next(): TSMultiPathDoublyLinkedListNode<T, E> {
				
				if (this.hasNext()) {
					
					this.currentNode = this.mpdll.getNextNode(this.currentNode, tractID);
					return this.currentNode;
					
				} else return undefined;
				
			}
			
			public remove(): TSMultiPathDoublyLinkedListNode<T, E> {
				
				if ((this.currentNode === this.mpdll.epilogueMap.get(tractID)) || (this.currentNode === this.mpdll.epilogueMap.get(tractID))) {
					
					return undefined;
					
				} else if (this.currentNode.hasPreviousNode(tractID)) {
					
					this.currentNode = this.mpdll.getPreviousNode(this.currentNode, tractID);
					return this.mpdll.removeNode(this.currentNode.getNextNode(tractID), tractID);
					
				} else return undefined;
				
			}
			
			public reset(): void {
				
				this.currentNode = this.mpdll.prologueMap.get(tractID);
				
			}
			
		}(this);
		
	}
	
	public toArray(tractID: T = null): E[] {
		
		if (this.hasTract(tractID)) {
			
			let array: E[] = [];
			
			this.iterator(tractID).forEachRemaining((element: E): void => { array.push(element); });
			
			return array;
			
		} else return [];
		
	}
	
}

export default TSMultiPathDoublyLinkedList;