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
var TSTreeTraversalMethod;
(function (TSTreeTraversalMethod) {
    TSTreeTraversalMethod[TSTreeTraversalMethod["INORDER"] = 0] = "INORDER";
    TSTreeTraversalMethod[TSTreeTraversalMethod["PREORDER"] = 1] = "PREORDER";
    TSTreeTraversalMethod[TSTreeTraversalMethod["POSTORDER"] = 2] = "POSTORDER";
    TSTreeTraversalMethod[TSTreeTraversalMethod["LEVEL_ORDER"] = 3] = "LEVEL_ORDER"; // level-by-level
})(TSTreeTraversalMethod || (TSTreeTraversalMethod = {}));
export default TSTreeTraversalMethod;
//# sourceMappingURL=ts-tree-traversal-method.js.map