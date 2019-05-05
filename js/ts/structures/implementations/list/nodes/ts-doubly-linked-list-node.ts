/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:54 PM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSDoublyLinkedList from "../ts-doubly-linked-list.js";
import TSIDoublyLinkedListNode from "../../../interfaces/node/ts-i-doubly-linked-list-node.js";
import TSIDoublyLinkedList from "../../../interfaces/list/ts-i-doubly-linked-list.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSDoublyLinkedListNode<E> implements TSIDoublyLinkedListNode<E, TSDoublyLinkedListNode<E>> {
	
	private previous: TSDoublyLinkedListNode<E>;
	
	private next: TSDoublyLinkedListNode<E>;
	
	private parentList: TSDoublyLinkedList<E>;
	
	private content: E;
	
	public constructor(content: E, parentList: TSDoublyLinkedList<E>, previousNode?: TSDoublyLinkedListNode<E>, nextNode?: TSDoublyLinkedListNode<E>) {
		
		this.content = content;
		this.parentList = parentList;
		this.previous = previousNode;
		this.next = nextNode;
		
	}
	
	public getElement(): E {
		
		return this.content;
		
	}
	
	public getParentList(): TSIDoublyLinkedList<E, TSDoublyLinkedListNode<E>> {
		
		return this.parentList;
		
	}
	
	public hasPreviousNode(): boolean {
		
		return (this.previous !== undefined);
		
	}
	
	public getPreviousNode(): TSDoublyLinkedListNode<E> {
		
		return this.previous;
		
	}
	
	public setPreviousNode(previousNode: TSDoublyLinkedListNode<E>): TSDoublyLinkedListNode<E> {
		
		let displaced: TSDoublyLinkedListNode<E> = this.previous;
		this.previous = previousNode;
		return displaced;
		
	}
	
	public hasNextNode(): boolean {
		
		return (this.next !== undefined);
		
	}
	
	public getNextNode(): TSDoublyLinkedListNode<E> {
		
		return this.next;
		
	}
	
	public setNextNode(nextNode: TSDoublyLinkedListNode<E>): TSDoublyLinkedListNode<E> {
		
		let displaced: TSDoublyLinkedListNode<E> = this.next;
		this.next = nextNode;
		return displaced;
		
	}
	
}

export default TSDoublyLinkedListNode;