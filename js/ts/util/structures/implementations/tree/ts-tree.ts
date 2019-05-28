/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:23 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSITree from "../../interfaces/tree/ts-i-tree.js";
import TSTreeNode from "./nodes/ts-tree-node.js";
import TSTreeTraversalMethod from "./ts-tree-traversal-method.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";

/**
 * The most basic form of a tree data structure.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTree<E> implements TSITree<E> {
	
	private treeHeight: number = 0;
	
	private treeSize: number = 0;
	
	private sentinalNode: TSTreeNode<E>;
	
	public constructor() { /* Do nothing. */ }
	
	public height(): number {
		
		return this.treeHeight;
		
	}
	
	public getRootNode(): TSTreeNode<E> {
		
		// TODO [3/13/19 @ 2:09 PM] - Finish the 'getRootNode' method.
		
		return this.sentinalNode;
		
	}
	
	public contains(element: E): boolean {
		
		return false;
		
	}
	
	public isEmpty(): boolean {
		
		return (this.treeHeight === 0);
		
	}
	
	public size(): number {
		
		return this.treeSize;
		
	}
	
	public iterator(traversalMethod: TSTreeTraversalMethod = TSTreeTraversalMethod.LEVEL_ORDER): TSAIterator<E> {
		
		// TODO [3/13/19 @ 2:25 PM] - Finish the 'iterator' method.
		
		return undefined;
		
		// switch (traversalMethod) {
		//
		// 	case TSTreeTraversalMethod.INORDER: {
		//
		// 		return new class extends TSAIterator<E> {
		//
		// 			private firstNode: TSTreeNode<E>;
		//
		// 			private currentNode: TSTreeNode<E>;
		//
		// 			public constructor(firstNode: TSTreeNode<E>) {
		//
		// 				super();
		//
		// 				this.currentNode = firstNode;
		//
		// 			}
		//
		// 			public hasNext(): boolean {
		//
		// 				return false;
		//
		// 			}
		//
		// 			public next(): E {
		//
		// 				return undefined;
		//
		// 			}
		//
		// 			public remove(): E {
		//
		// 				return undefined;
		//
		// 			}
		//
		// 			public reset(): void {
		//
		// 				this.currentNode = this.firstNode;
		//
		// 			}
		//
		// 		}(this.getRootNode());
		//
		// 	}
		//
		// 	case TSTreeTraversalMethod.PREORDER: {
		//
		// 		return new class extends TSAIterator<E> {
		//
		// 			private firstNode: TSTreeNode<E>;
		//
		// 			private currentNode: TSTreeNode<E>;
		//
		// 			public constructor(firstNode: TSTreeNode<E>) {
		//
		// 				super();
		//
		// 				this.currentNode = firstNode;
		//
		// 			}
		//
		// 			public hasNext(): boolean {
		//
		// 				return false;
		//
		// 			}
		//
		// 			public next(): E {
		//
		// 				return undefined;
		//
		// 			}
		//
		// 			public remove(): E {
		//
		// 				return undefined;
		//
		// 			}
		//
		// 			public reset(): void {
		//
		// 				this.currentNode = this.firstNode;
		//
		// 			}
		//
		// 		}(this.getRootNode());
		//
		// 	}
		//
		// 	case TSTreeTraversalMethod.POSTORDER: {
		//
		// 		return new class extends TSAIterator<E> {
		//
		// 			private firstNode: TSTreeNode<E>;
		//
		// 			private currentNode: TSTreeNode<E>;
		//
		// 			public constructor(firstNode: TSTreeNode<E>) {
		//
		// 				super();
		//
		// 				this.currentNode = firstNode;
		//
		// 			}
		//
		// 			public hasNext(): boolean {
		//
		// 				return false;
		//
		// 			}
		//
		// 			public next(): E {
		//
		// 				return undefined;
		//
		// 			}
		//
		// 			public remove(): E {
		//
		// 				return undefined;
		//
		// 			}
		//
		// 			public reset(): void {
		//
		// 				this.currentNode = this.firstNode;
		//
		// 			}
		//
		// 		}(this.getRootNode());
		//
		// 	}
		//
		// 	case TSTreeTraversalMethod.LEVEL_ORDER: {
		//
		// 		return new class extends TSAIterator<E> {
		//
		// 			private firstNode: TSTreeNode<E>;
		//
		// 			private currentNode: TSTreeNode<E>;
		//
		// 			public constructor(firstNode: TSTreeNode<E>) {
		//
		// 				super();
		//
		// 				this.currentNode = firstNode;
		//
		// 			}
		//
		// 			public hasNext(): boolean {
		//
		// 				return false;
		//
		// 			}
		//
		// 			public next(): E {
		//
		// 				return undefined;
		//
		// 			}
		//
		// 			public remove(): E {
		//
		// 				return undefined;
		//
		// 			}
		//
		// 			public reset(): void {
		//
		// 				this.currentNode = this.firstNode;
		//
		// 			}
		//
		// 		}(this.getRootNode());
		//
		// 	}
		//
		// }
		
	}
	
	public toArray(traversalMethod: TSTreeTraversalMethod = TSTreeTraversalMethod.LEVEL_ORDER): E[] {
		
		let result: E[] = [];
		
		this.iterator(traversalMethod).forEachRemaining((element: E): void => { result.push(element); });
		
		return result;
		
	}
	
}

export default TSTree;