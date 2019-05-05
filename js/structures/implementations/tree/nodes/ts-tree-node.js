/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:30 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * The most basic form of a node within a tree data structure.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTreeNode {
    constructor(parent, content) {
        this.childrenNodes = [];
        this.parent = parent;
        this.content = content;
    }
    getContent() {
        return this.content;
    }
    hasParentNode() {
        return (this.parent !== null);
    }
    getParentNode() {
        if (this.hasParentNode())
            return this.parent;
        else
            throw new Error("Attempted to retrieve a non-existent parent node.");
    }
    setParentNode(parent) {
        if (this.hasParentNode()) {
            let displacedNode = this.getParentNode();
            this.parent = parent;
            return displacedNode;
        }
        else {
            this.parent = parent;
            return undefined;
        }
    }
    getAllChildren() {
        return this.childrenNodes;
    }
}
export default TSTreeNode;
//# sourceMappingURL=ts-tree-node.js.map