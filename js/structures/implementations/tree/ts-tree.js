/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:23 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSTreeTraversalMethod from "./ts-tree-traversal-method.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";
/**
 * The most basic form of a tree data structure.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTree {
    constructor() {
        this.treeHeight = 0;
        this.treeSize = 0;
    }
    height() {
        return this.treeHeight;
    }
    getRootNode() {
        // TODO [3/13/19 @ 2:09 PM] - Finish the 'getRootNode' method.
        return this.sentinalNode;
    }
    contains(element) {
        return false;
    }
    isEmpty() {
        return (this.treeHeight === 0);
    }
    size() {
        return 0;
    }
    iterator(traversalMethod = TSTreeTraversalMethod.LEVEL_ORDER) {
        // TODO [3/13/19 @ 2:25 PM] - Finish the 'iterator' method.
        switch (traversalMethod) {
            case TSTreeTraversalMethod.INORDER: {
                return new class extends TSAIterator {
                    constructor(firstNode) {
                        super();
                        this.currentNode = firstNode;
                    }
                    hasNext() {
                        return false;
                    }
                    next() {
                        return undefined;
                    }
                    remove() {
                        return undefined;
                    }
                    reset() {
                        this.currentNode = this.firstNode;
                    }
                }(this.getRootNode());
            }
            case TSTreeTraversalMethod.PREORDER: {
                return new class extends TSAIterator {
                    constructor(firstNode) {
                        super();
                        this.currentNode = firstNode;
                    }
                    hasNext() {
                        return false;
                    }
                    next() {
                        return undefined;
                    }
                    remove() {
                        return undefined;
                    }
                    reset() {
                        this.currentNode = this.firstNode;
                    }
                }(this.getRootNode());
            }
            case TSTreeTraversalMethod.POSTORDER: {
                return new class extends TSAIterator {
                    constructor(firstNode) {
                        super();
                        this.currentNode = firstNode;
                    }
                    hasNext() {
                        return false;
                    }
                    next() {
                        return undefined;
                    }
                    remove() {
                        return undefined;
                    }
                    reset() {
                        this.currentNode = this.firstNode;
                    }
                }(this.getRootNode());
            }
            case TSTreeTraversalMethod.LEVEL_ORDER: {
                return new class extends TSAIterator {
                    constructor(firstNode) {
                        super();
                        this.currentNode = firstNode;
                    }
                    hasNext() {
                        return false;
                    }
                    next() {
                        return undefined;
                    }
                    remove() {
                        return undefined;
                    }
                    reset() {
                        this.currentNode = this.firstNode;
                    }
                }(this.getRootNode());
            }
        }
    }
    toArray(traversalMethod = TSTreeTraversalMethod.LEVEL_ORDER) {
        let result = [];
        this.iterator(traversalMethod).forEachRemaining((element) => { result.push(element); });
        return result;
    }
}
export default TSTree;
//# sourceMappingURL=ts-tree.js.map