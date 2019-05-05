/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:51 PM -- November 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIContainer from "./jui-container.js";
/**
 * A {@link JUIContainer} that can hold multiple {@link JUIElement}s.
 *
 * @see JUISingleContainer
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMultiContainer extends JUIContainer {
    /**
     * Initializes a new JUIMultiContainer with a given {@link JUIContainerType}.
     *
     * @param {JUIContainerType} containerType
     */
    constructor(containerType) {
        super(containerType);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-multi-container";
        this.addClasses(this.TYPE_IDENTITY);
    }
    /**
     * Adds a child {@link JUIElement} to this JUIMultiContainer.
     *
     * @param child The child to add to this JUIMultiContainer.
     * @returns {string} The ID of the newly added child.
     */
    addChild(child) {
        return this.adoptChild(child);
    }
    /**
     * Adds children {@link JUIElement}s to this JUIMultiContainer in bulk.
     *
     * @param children The children to add to this JUIMultiContainer.
     * @returns {string[]} The IDs of the newly added children in insertion order.
     */
    addChildren(...children) {
        let ids = [];
        for (let child of children)
            ids.push(this.addChild(child));
        return ids;
    }
    // DOC-ME [3/14/19 @ 3:19 PM] - Documentation required!
    addBefore(child, before) {
        return this.adoptChild(child, before);
    }
    /**
     * Returns a child of of this JUIMultiContainer with the given ID if it exists, otherwise this method returns null.
     *
     * @param {string} id The ID of the {@link JUIElement} to retrieve.
     * @returns A child of of this JUIMultiContainer with the given ID if it exists, otherwise null.
     */
    getChild(id) {
        return this.children.get(id);
    }
    /**
     * Returns an array of all of the children of this JUIMultiContainer.
     *
     * @returns {T[]} An array of all of the children of this JUIMultiContainer.
     */
    getAllChildren() {
        return this.children.valueSet();
    }
    /**
     * Removes and returns a child of of this JUIMultiContainer with the given ID if it exists, otherwise this method
     * returns null.
     *
     * @param {string} id The ID of the {@link JUIElement} to remove.
     * @returns A child of of this JUIMultiContainer with the given ID if it exists, otherwise null.
     */
    removeChild(id) {
        return this.orphanChild(id);
    }
    /**
     * Removes all of this JUIMultiContainer's children.
     */
    removeAllChildren() {
        for (let element of this.getAllChildren())
            element.orphan();
    }
}
export default JUIMultiContainer;
//# sourceMappingURL=jui-multi-container.js.map