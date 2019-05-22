/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:53 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSINode from "./ts-i-node.js";
import TSIDoublyLinkedList from "../list/ts-i-doubly-linked-list.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSIDoublyLinkedListNode<E, N extends TSIDoublyLinkedListNode<E, N>> extends TSINode<E> {
	
	getParentList(): TSIDoublyLinkedList<E, N>;
	
	hasPreviousNode(): boolean;

	getPreviousNode(): N;
	
	hasNextNode(): boolean;
	
	getNextNode(): N;

}

export default TSIDoublyLinkedListNode;