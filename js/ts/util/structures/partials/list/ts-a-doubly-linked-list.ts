/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:48 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSIDoublyLinkedList from "../../interfaces/list/ts-i-doubly-linked-list.js";
import TSIDoublyLinkedListNode from "../../interfaces/node/ts-i-doubly-linked-list-node.js";
import TSComparator from "../../interfaces/ts-comparator.js";
import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
import TSAIterator from "../iterate/ts-a-iterator.js";
import TSIIterator from "../../interfaces/iterate/ts-i-iterator.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class TSADoublyLinkedList<E, N extends TSIDoublyLinkedListNode<E, N>> implements TSIDoublyLinkedList<E, N> {
	
	public get(index: number): E {
		
		let iterator: TSAIterator<E> = this.iterator();
		
		while (index > 0) {
			
			if (iterator.hasNext()) {
				
				index--;
				iterator.next();
				
			} else {
				
				throw new Error("Index out of bounds: Attempted to access an index that was out of bounds in a " +
					"TSADoublyLinkedList");
				
			}
			
		}
		
		return iterator.next();
		
	}
	
	public add(element: E): void {
		
		this.insertLast(element);
		
	}
	
	public addAll(elements: E[]): void {
		
		for (let element of elements) this.add(element);
		
	}
	
	public contains(element: E): boolean {
		
		for (let item of this.iterator()) if (item === element) return true;
		
		return false;
		
	}
	
	public size(): number {
		
		let size: number = 0;
		
		for (let element of this.iterator()) size++;
		
		return size;
		
	}
	
	public isEmpty(): boolean {
		
		return (
			(this.getPrologueNode().getNextNode() === this.getEpilogueNode()) &&
			(this.getEpilogueNode().getPreviousNode() === this.getPrologueNode())
		);
		
	}
	
	public iterator(): TSAIterator<E> {
		
		return new class extends TSAIterator<E> {
			
			private nodeIterator: TSAIterator<N>;
			
			public constructor(dll: TSADoublyLinkedList<E, N>) {
				
				super();
				
				this.nodeIterator = dll.nodeIterator();
				
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
	
	public toArray(): E[] {
		
		let array: E[] = [];
		
		this.iterator().forEachRemaining((element: E): void => { array.push(element); });
		
		return array;
		
	}
	
	public abstract clear(): void;
	
	public abstract sort(comparator?: TSComparator<E>, method?: TSSortingMethod<E>): void;
	
	protected abstract getPrologueNode(): N;
	
	protected abstract getEpilogueNode(): N;
	
	protected abstract insertBetween(element: E, previousNode: N, nextNode: N): N;
	
	protected abstract insertNodeBetween(node: N, previousNode: N, nextNode: N): N;
	
	public abstract removeNode(node: N): N;
	
	public abstract nodeIterator(): TSIIterator<N>;
	
	public getFirst(): E {
		
		return this.getFirstNode().getElement();
		
	}
	
	public getFirstNode(): N {
		
		if (this.isEmpty()) throw new Error("Attempted to access the first node of an empty TSADoublyLinkedList");
		else return this.getPrologueNode().getNextNode();
		
	}
	
	public getLast(): E {
		
		return this.getLastNode().getElement();
		
	}
	
	public getLastNode(): N {
		
		if (this.isEmpty()) throw new Error("Attempted to access the last node of an empty TSADoublyLinkedList");
		else return this.getEpilogueNode().getPreviousNode();
		
	}
	
	public hasNextNode(node: N): boolean {
		
		if (node.getParentList() === this) {
			
			if (this.isEmpty()) return false;
			else return ((node !== this.getLastNode()) && (node !== this.getEpilogueNode()));
			
		} else {
			
			throw new Error("Attempted to check the next node of a TSADoublyLinkedListNode that did not appear in the" +
				" given TSADoublyLinkedList.");
			
		}
		
	}
	
	public getNextNode(node: N): N {
		
		if (this.hasNextNode(node)) return node.getNextNode();
		else throw new Error("Attempted to get the next node of a node that did not have a succeeding sibling.");
		
	}
	
	public hasPreviousNode(node: N): boolean {
		
		if (node.getParentList() === this) {
			
			if (this.isEmpty()) return false;
			else return ((node !== this.getFirstNode()) && (node !== this.getPrologueNode()));
			
		} else {
			
			throw new Error("Attempted to check the next node of a TSADoublyLinkedListNode that did not appear in the" +
				" given TSADoublyLinkedList.");
			
		}
		
	}
	
	public getPreviousNode(node: N): N {
		
		if (this.hasPreviousNode(node)) return node.getPreviousNode();
		else throw new Error("Attempted to get the previous node of a node that did not have a preceding sibling.");
		
	}
	
	public insertAfter(element: E, node: N): N {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to insert an element after a node that does not occur in this " +
				"TSADoublyLinkedList.");
			
		} else if (node === this.getEpilogueNode()) {
			
			throw new Error("Attempted to insert an element after the prologue node of a TSADoublyLinkedList.");
			
		} else return this.insertBetween(element, node, node.getNextNode());
		
	}
	
	public insertNodeAfter(node: N, afterNode: N): N {
		
		if (afterNode.getParentList() !== this) {
			
			throw new Error("Attempted to insert a node after a node that does not occur in this " +
				"TSADoublyLinkedList.");
			
		} else if (afterNode === this.getPrologueNode()) {
			
			throw new Error("Attempted to insert a node after the prologue node of a TSADoublyLinkedList.");
			
		} else return this.insertNodeBetween(node, afterNode, afterNode.getNextNode());
		
	}
	
	public insertBefore(element: E, node: N): N {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to insert an element before a node that does not occur in this " +
				"TSADoublyLinkedList.");
			
		} else if (node === this.getPrologueNode()) {
			
			throw new Error("Attempted to insert an element before the epilogue node of a TSADoublyLinkedList.");
			
		} else return this.insertBetween(element, node.getPreviousNode(), node);
		
	}
	
	public insertNodeBefore(node: N, beforeNode: N): N {
		
		if (beforeNode.getParentList() !== this) {
			
			throw new Error("Attempted to insert a node before a node that does not occur in this " +
				"TSADoublyLinkedList.");
			
		} else if (beforeNode === this.getEpilogueNode()) {
			
			throw new Error("Attempted to insert a node before the epilogue node of a TSADoublyLinkedList.");
			
		} else return this.insertNodeBetween(node, beforeNode.getPreviousNode(), beforeNode);
		
	}
	
	public insertFirst(element: E): N {
		
		return this.insertAfter(element, this.getPrologueNode());
		
	}
	
	public insertNodeFirst(node: N): N {
		
		return this.insertNodeAfter(node, this.getPrologueNode());
		
	}
	
	public insertLast(element: E): N {
		
		return this.insertBefore(element, this.getEpilogueNode());
		
	}
	
	public insertNodeLast(node: N): N {
		
		return this.insertNodeBefore(node, this.getEpilogueNode());
		
	}
	
	public remove(element: E): E {
		
		for (let node of this.nodeIterator()) {
			
			if (node.getElement() === element) {
				
				this.removeNode(node);
				return node.getElement();
				
			}
			
		}
	}
	
	public removeFirst(): E {
		
		return this.removeFirstNode().getElement();
		
	}
	
	public removeFirstNode(): N {
		
		if (this.isEmpty()) throw new Error("Attempted to remove the first node of an empty TSADoublyLinkedList.");
		else return this.removeNode(this.getFirstNode());
		
	}
	
	public removeLast(): E {
		
		return this.removeLastNode().getElement();
		
	}
	
	public removeLastNode(): N {
		
		if (this.isEmpty()) throw new Error("Attempted to remove the last node of an empty TSADoublyLinkedList.");
		else return this.removeNode(this.getLastNode());
		
	}
	
}

export default TSADoublyLinkedList;