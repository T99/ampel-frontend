/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:11 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSStructure from "../ts-structure.js";
import TSITreeNode from "./nodes/ts-i-tree-node.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSITree<E = any> extends TSStructure<E> {
	
	height(): number;
	
	getRootNode(): TSITreeNode<E>;
	
}

export default TSITree;