/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:30 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSITreeNode from "../../../interfaces/tree/nodes/ts-i-tree-node.js";

/**
 * The most basic form of a node within a tree data structure.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTreeNode<E> implements TSITreeNode<E> {
	
	protected parent: TSTreeNode<E> | null;
	
	protected content: E;
	
	protected childrenNodes: Array<TSTreeNode<E>> = [];
	
	public constructor(parent: TSTreeNode<E> | null, content: E) {
	
		this.parent = parent;
		this.content = content;
	
	}
	
	public getContent(): E {
		
		return this.content;
		
	}
	
	public hasParentNode(): boolean {
		
		return (this.parent !== null);
		
	}
	
	public getParentNode(): TSTreeNode<E> {
		
		if (this.hasParentNode()) return this.parent;
		else throw new Error("Attempted to retrieve a non-existent parent node.");
		
	}
	
	public setParentNode(parent: TSTreeNode<E>): TSTreeNode<E> {
		
		if (this.hasParentNode()) {
			
			let displacedNode: TSTreeNode<E> = this.getParentNode();
			
			this.parent = parent;
			
			return displacedNode;
			
		} else {
			
			this.parent = parent;
			
			return undefined;
			
		}
		
	}
	
	public getAllChildren(): Array<TSTreeNode<E>> {
		
		return this.childrenNodes;
		
	}
	
}

export default TSTreeNode;