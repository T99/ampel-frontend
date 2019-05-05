/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:54 PM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSDoublyLinkedListNode from "./nodes/ts-doubly-linked-list-node.js";
import TSIList from "../../interfaces/list/ts-i-list.js";
import TSComparator from "../../interfaces/ts-comparator.js";
import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
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
class TSDoublyLinkedList<E = any> extends TSADoublyLinkedList<E, TSDoublyLinkedListNode<E>> {
	
	private prologue: TSDoublyLinkedListNode<E>;
	
	private epilogue: TSDoublyLinkedListNode<E>;
	
	public constructor(...elements: E[]) {
		
		super();
		
		this.prologue = new TSDoublyLinkedListNode<E>(null, this, undefined, undefined);
		this.epilogue = new TSDoublyLinkedListNode<E>(null, this, this.prologue, undefined);
		this.prologue.setNextNode(this.epilogue);
		
		this.addAll(elements);
	
	}
	
	protected getEpilogueNode(): TSDoublyLinkedListNode<E> {
		
		return this.epilogue;
		
	}
	
	protected getPrologueNode(): TSDoublyLinkedListNode<E> {
		
		return this.prologue;
		
	}
	
	protected insertBetween(content: E, previousNode: TSDoublyLinkedListNode<E>, nextNode: TSDoublyLinkedListNode<E>): TSDoublyLinkedListNode<E> {
		
		// Ensure that the provided nodes are neighbors.
		if ((previousNode.getNextNode() === nextNode) && (nextNode.getPreviousNode() === previousNode)) {
			
			let newNode: TSDoublyLinkedListNode<E> = new TSDoublyLinkedListNode<E>(content, this, previousNode, nextNode);
			previousNode.setNextNode(newNode);
			nextNode.setPreviousNode(newNode);
			
			return newNode;
			
		} else throw new Error("Attempted to insert new content between two non-adjacent TSDoublyLinkedNodes.");
		
	}
	
	protected insertNodeBetween(node: TSDoublyLinkedListNode<E>,
								previousNode: TSDoublyLinkedListNode<E>,
								nextNode: TSDoublyLinkedListNode<E>): TSDoublyLinkedListNode<E> {
		
		return undefined;
		
	}
	
	public removeNode(node: TSDoublyLinkedListNode<E>): TSDoublyLinkedListNode<E> {
		
		if (node.getParentList() === this) {
			
			let displaced: TSDoublyLinkedListNode<E> = node;
			
			node.getPreviousNode().setNextNode(node.getNextNode());
			node.getNextNode().setPreviousNode(node.getPreviousNode());
			
			node.setPreviousNode(undefined);
			node.setNextNode(undefined);
			
			return displaced;
			
		} else throw new Error("Attempted to remove a TSDoublyLinkedListNode that did not appear in the given TSDoublyLinkedList.");
		
	}
	
	public clear(): void {
		
		this.prologue.setNextNode(this.epilogue);
		this.epilogue.setPreviousNode(this.prologue);
		
	}
	
	public sort(comparator?: TSComparator<E>, method?: TSSortingMethod<E>): void {
		
		if (comparator === undefined) comparator = new TSNaturalComparator();
		if (method === undefined) method = new TSBubbleSort(comparator);
		
		let sortedElements: E[] = method.sort(this.toArray());
		
		this.clear();
		this.addAll(sortedElements);
		
	}
	
	public nodeIterator(): TSAIterator<TSDoublyLinkedListNode<E>> {
		
		return new class extends TSAIterator<TSDoublyLinkedListNode<E>> {

			private firstNode: TSDoublyLinkedListNode<E>;
			
			private currentNode: TSDoublyLinkedListNode<E>;

			private dll: TSDoublyLinkedList<E>;

			public constructor(prologue: TSDoublyLinkedListNode<E>, dll: TSDoublyLinkedList<E>) {

				super();
				
				this.firstNode = prologue;
				this.currentNode = prologue;
				this.dll = dll;

			}

			public hasNext(): boolean {

				return this.dll.hasNextNode(this.currentNode);

			}

			public next(): TSDoublyLinkedListNode<E> {

				return (this.currentNode = this.currentNode.getNextNode());

			}

			public remove(): TSDoublyLinkedListNode<E> {

				let removedNode: TSDoublyLinkedListNode<E> = this.currentNode;

				this.dll.removeNode(this.currentNode);

				return removedNode;

			}
			
			public reset(): void {
				
				this.currentNode = this.firstNode;
				
			}

		}(this.prologue, this);
		
	}
	
	public shuffle(iterations: number = 1): void {
		
		for (let count: number = 0; count < iterations; count++) {
			
			let elements: E[] = this.toArray();
			this.clear();
			
			while (elements.length !== 0) {
				
				let random: number = Math.floor(Math.random() * elements.length);
				let element: E = elements.removeIndex(random);
				this.add(element);
				
			}
			
		}
		
	}
	
}

export default TSDoublyLinkedList;