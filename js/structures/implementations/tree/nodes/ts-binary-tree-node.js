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
class TSBinaryTreeNode extends TSTreeNode {
    constructor(parent, content) {
        super(parent, content);
    }
    hasLeftChild() {
        return (this.leftChild !== null);
    }
    getLeftChild() {
        if (this.hasLeftChild())
            return this.leftChild;
        else
            throw new Error("Attempted to retrieve a non-existent left child node.");
    }
    setLeftChild(leftChild) {
        if (this.hasLeftChild()) {
            let displacedNode = this.getLeftChild();
            this.leftChild = leftChild;
            return displacedNode;
        }
        else {
            this.leftChild = leftChild;
            return undefined;
        }
    }
    hasRightChild() {
        return (this.rightChild !== null);
    }
    getRightChild() {
        if (this.hasRightChild())
            return this.rightChild;
        else
            throw new Error("Attempted to retrieve a non-existent right child node.");
    }
    setRightChild(rightChild) {
        if (this.hasRightChild()) {
            let displacedNode = this.getRightChild();
            this.rightChild = rightChild;
            return displacedNode;
        }
        else {
            this.rightChild = rightChild;
            return undefined;
        }
    }
}
export default TSBinaryTreeNode;
//# sourceMappingURL=ts-binary-tree-node.js.map