/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:49 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Enumerates possible tree traversal orders/methods.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
enum TSTreeTraversalMethod {

	INORDER,	// recursively: left, root, right
	PREORDER,	// recursively: root, left, right
	POSTORDER,	// recursively: left, right, root
	LEVEL_ORDER // level-by-level

}

export default TSTreeTraversalMethod;