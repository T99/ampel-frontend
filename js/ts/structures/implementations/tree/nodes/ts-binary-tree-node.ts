/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:34 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSTreeNode from "./ts-tree-node.js";

/**
 * A node in a binary tree, potentially having a right and left child.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSBinaryTreeNode<E> extends TSTreeNode<E> {
	
	protected leftChild: TSBinaryTreeNode<E>;
	
	protected rightChild: TSBinaryTreeNode<E>;
	
	public constructor(parent: TSTreeNode<E> | null, content: E) {
		
		super(parent, content);
		
	}
	
	public hasLeftChild(): boolean {
		
		return (this.leftChild !== null);
		
	}
	
	public getLeftChild(): TSBinaryTreeNode<E> {
		
		if (this.hasLeftChild()) return this.leftChild;
		else throw new Error("Attempted to retrieve a non-existent left child node.");
		
	}
	
	public setLeftChild(leftChild: TSBinaryTreeNode<E>): TSBinaryTreeNode<E> {
		
		if (this.hasLeftChild()) {
			
			let displacedNode: TSBinaryTreeNode<E> = this.getLeftChild();
			
			this.leftChild = leftChild;
			
			return displacedNode;
			
		} else {
			
			this.leftChild = leftChild;
			
			return undefined;
			
		}
		
	}
	
	public hasRightChild(): boolean {
		
		return (this.rightChild !== null);
		
	}
	
	public getRightChild(): TSBinaryTreeNode<E> {
		
		if (this.hasRightChild()) return this.rightChild;
		else throw new Error("Attempted to retrieve a non-existent right child node.");
		
	}
	
	public setRightChild(rightChild: TSBinaryTreeNode<E>): TSBinaryTreeNode<E> {
		
		if (this.hasRightChild()) {
			
			let displacedNode: TSBinaryTreeNode<E> = this.getRightChild();
			
			this.rightChild = rightChild;
			
			return displacedNode;
			
		} else {
			
			this.rightChild = rightChild;
			
			return undefined;
			
		}
		
	}
	
}

export default TSBinaryTreeNode;