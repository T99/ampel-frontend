/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:40 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSIList from "./ts-i-list.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSIDoublyLinkedList<E, N> extends TSIList<E> {

	insertBefore(element: E, node: N): N;
	
	insertNodeBefore(node: N, beforeNode: N): N;
	
	insertAfter(element: E, node: N): N;
	
	insertNodeAfter(node: N, afterNode: N): N;
	
	insertFirst(element: E): N;
	
	insertNodeFirst(node: N): N;
	
	insertLast(element: E): N;
	
	insertNodeLast(node: N): N;
	
	getFirst(): E;
	
	getFirstNode(): N;
	
	getLast(): E;
	
	getLastNode(): N;
	
	hasNextNode(node: N): boolean;
	
	getNextNode(node: N): N;
	
	hasPreviousNode(node: N): boolean;
	
	getPreviousNode(node: N): N;
	
	removeNode(node: N): N;
	
	removeFirst(): E;
	
	removeFirstNode(): N;
	
	removeLast(): E;
	
	removeLastNode(): N;

}

export default TSIDoublyLinkedList;