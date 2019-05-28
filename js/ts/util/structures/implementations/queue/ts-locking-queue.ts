/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:32 AM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSLock from "../ts-lock.js";
import TSStructure from "../../interfaces/ts-structure.js";
import TSDoublyLinkedList from "../list/ts-doubly-linked-list.js";
import TSDoublyLinkedListNode from "../list/nodes/ts-doubly-linked-list-node.js";
import TSLockingQueueNode from "./nodes/ts-locking-queue-node.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLockingQueue implements TSStructure<TSLockingQueueNode> {
	
	private dll: TSDoublyLinkedList<TSLockingQueueNode>;
	
	public constructor() {
	
		this.dll = new TSDoublyLinkedList<TSLockingQueueNode>();
	
	}
	
	public async getLock(): Promise<TSLock> {
		
		let lock: TSLock = new TSLock();
		
		let node: TSDoublyLinkedListNode<TSLockingQueueNode> = this.dll.insertLast(new TSLockingQueueNode());
		
		lock.subscribeToRelinquishNotifier(() => {
			
			if (this.dll.hasNextNode(node)) node.getNextNode().getElement().readyUp();
			this.dll.removeNode(node);
			
		});
		
		if (this.dll.hasPreviousNode(node)) await node.getElement().getReadyPromise();
		
		return lock;
		
	}
	
	public contains(element: TSLockingQueueNode): boolean {
		
		return this.dll.contains(element);
		
	}
	
	public isEmpty(): boolean {
		
		return this.dll.isEmpty();
		
	}
	
	public size(): number {
		
		return this.dll.size();
		
	}
	
	public toArray(): TSLockingQueueNode[] {
		
		return this.dll.toArray();
		
	}
	
}

export default TSLockingQueue;