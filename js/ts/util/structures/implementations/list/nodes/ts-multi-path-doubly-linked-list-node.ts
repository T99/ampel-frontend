/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:13 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSMultiPathDoublyLinkedList from "../ts-multi-path-doubly-linked-list.js";
import TSIDoublyLinkedListNode from "../../../interfaces/node/ts-i-doubly-linked-list-node.js";
import TSArrayList from "../ts-array-list.js";
import TSAIterator from "../../../partials/iterate/ts-a-iterator.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSMultiPathDoublyLinkedListNode<T, E> implements TSIDoublyLinkedListNode<E, TSMultiPathDoublyLinkedListNode<T, E>> {
	
	private content: E;
	
	private parentList: TSMultiPathDoublyLinkedList<T, E>;
	
	private nextNodeMap: Map<T, TSMultiPathDoublyLinkedListNode<T, E>>;
	
	private previousNodeMap: Map<T, TSMultiPathDoublyLinkedListNode<T, E>>;
	
	public constructor(content: E, parentList: TSMultiPathDoublyLinkedList<T, E>) {
		
		this.content = content;
		this.parentList = parentList;
		this.previousNodeMap = new Map();
		this.nextNodeMap = new Map();
		
	}
	
	public getElement(): E {
		
		return this.content;
		
	}
	
	public getParentList(): TSMultiPathDoublyLinkedList<T, E> {
		
		return this.parentList;
		
	}
	
	public hasPreviousNode(tractID: T = null): boolean {
		
		return this.previousNodeMap.has(tractID);
		
	}
	
	public getPreviousNode(tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		return this.previousNodeMap.get(tractID);
		
	}
	
	public setPreviousNode(tractID: T, previousNode: TSMultiPathDoublyLinkedListNode<T, E>): TSMultiPathDoublyLinkedListNode<T, E> {
		
		let displaced: TSMultiPathDoublyLinkedListNode<T, E> = this.getPreviousNode(tractID);
		this.previousNodeMap.set(tractID, previousNode);
		return displaced;
		
	}
	
	public removePreviousNode(tractID: T): TSMultiPathDoublyLinkedListNode<T, E> {
		
		let displaced: TSMultiPathDoublyLinkedListNode<T, E> = this.getPreviousNode(tractID);
		this.previousNodeMap.delete(tractID);
		return displaced;
		
	}
	
	public hasNextNode(tractID: T = null): boolean {
		
		return this.nextNodeMap.has(tractID);
		
	}
	
	public getNextNode(tractID: T = null): TSMultiPathDoublyLinkedListNode<T, E> {
		
		return this.nextNodeMap.get(tractID);
		
	}
	
	public setNextNode(tractID: T, nextNode: TSMultiPathDoublyLinkedListNode<T, E>): TSMultiPathDoublyLinkedListNode<T, E> {
		
		let displaced: TSMultiPathDoublyLinkedListNode<T, E> = this.getNextNode(tractID);
		this.nextNodeMap.set(tractID, nextNode);
		return displaced;
		
	}
	
	public removeNextNode(tractID: T): TSMultiPathDoublyLinkedListNode<T, E> {
		
		let displaced: TSMultiPathDoublyLinkedListNode<T, E> = this.getNextNode(tractID);
		this.nextNodeMap.delete(tractID);
		return displaced;
		
	}
	
	public nextNodesIterator(): TSAIterator<{tract: T, node: TSMultiPathDoublyLinkedListNode<T, E>}> {
		
		return new class extends TSAIterator<{tract: T, node: TSMultiPathDoublyLinkedListNode<T, E>}> {
			
			private baseNode: TSMultiPathDoublyLinkedListNode<T, E>;
			private tractsIterator: TSAIterator<T>;
			
			public constructor(baseNode: TSMultiPathDoublyLinkedListNode<T, E>) {
				
				super();
				
				this.baseNode = baseNode;
				this.tractsIterator = (new TSArrayList<T>(...this.baseNode.nextNodeMap.keys())).iterator();
				
			}
			
			public hasNext(): boolean {
				
				return this.tractsIterator.hasNext();
				
			}
			
			public next(): { tract: T; node: TSMultiPathDoublyLinkedListNode<T, E> } {
				
				if (this.hasNext()) {
					
					let tract: T = this.tractsIterator.next();
					let node: TSMultiPathDoublyLinkedListNode<T, E> = this.baseNode.nextNodeMap.get(tract);
					
					return { tract, node };
					
				} else return undefined;
				
			}
			
			public remove(): { tract: T; node: TSMultiPathDoublyLinkedListNode<T, E> } {
				
				throw new Error("Unsupported operation on TSMultiPathDoublyLinkedListNode, '#remove()'.");
				
			}
			
			public reset(): void {
				
				this.tractsIterator.reset();
				
			}
			
		}(this);
		
	}
	
	public previousNodesIterator(): TSAIterator<{tract: T, node: TSMultiPathDoublyLinkedListNode<T, E>}> {
		
		return new class extends TSAIterator<{tract: T, node: TSMultiPathDoublyLinkedListNode<T, E>}> {
			
			private baseNode: TSMultiPathDoublyLinkedListNode<T, E>;
			private tractsIterator: TSAIterator<T>;
			
			public constructor(baseNode: TSMultiPathDoublyLinkedListNode<T, E>) {
				
				super();
				
				this.baseNode = baseNode;
				this.tractsIterator = (new TSArrayList<T>(...this.baseNode.previousNodeMap.keys())).iterator();
				
			}
			
			public hasNext(): boolean {
				
				return this.tractsIterator.hasNext();
				
			}
			
			public next(): { tract: T; node: TSMultiPathDoublyLinkedListNode<T, E> } {
				
				if (this.hasNext()) {
					
					let tract: T = this.tractsIterator.next();
					let node: TSMultiPathDoublyLinkedListNode<T, E> = this.baseNode.previousNodeMap.get(tract);
					
					return { tract, node };
					
				} else return undefined;
				
			}
			
			public remove(): { tract: T; node: TSMultiPathDoublyLinkedListNode<T, E> } {
				
				throw new Error("Unsupported operation on TSMultiPathDoublyLinkedListNode, '#remove()'.");
				
			}
			
			public reset(): void {
				
				this.tractsIterator.reset();
				
			}
			
		}(this);
		
	}
	
}

export default TSMultiPathDoublyLinkedListNode;