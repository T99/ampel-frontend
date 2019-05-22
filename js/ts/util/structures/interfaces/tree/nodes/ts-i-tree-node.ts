/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:26 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSITreeNode<E> {
	
	getContent(): E;
	
	hasParentNode(): boolean;
	
	getParentNode(): TSITreeNode<E>;
	
}

export default TSITreeNode;