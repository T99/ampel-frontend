/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:53 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIContainerType from "../types/jui-container-type.js";
import JUIElement from "./jui-element.js";
import JUIMasterIdentityMap from "../../helpers/jui-master-identity-map.js";
import JUIContainerDichotomyError from "../errors/jui-container-dichotomy-error.js";
/**
 * Defines the most basic form of a container for {@link JUIElement}s. Provides protected methods for operating on the
 * JUIContainer's DOM object. JUIContainers are optionally typed, with the least-specific type being an JUIElement - but
 * if a more specific type of element
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIContainer extends JUIElement {
    /**
     * A pass-through constructor that 'casts' the provided {@link JUIContainerType} to an {@link JUIElementType} and
     * passes the appropriate classes through to the super.
     *
     * Removes a {@link JUIElement} with a given ID from this JUIContainer's DOM object as well as its
     *
     * @param {JUIContainerType} containerType The JUIContainerType of this JUIContainer.
     */
    constructor(containerType) {
        super((containerType ? containerType : JUIContainerType.DIV).toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-container";
        /**
         * Describes the {@link AlphanumericalGenerator} pattern that JUIIdentityContainers will use to generate new IDs for
         * this JUIContainer.
         */
        this.CONTENT_PATTERN = "3l3n";
        this.addClasses(this.TYPE_IDENTITY);
        if (this.hasContainer())
            this.children = this.getContainer().children.getChildMap(this);
        else
            this.children = JUIMasterIdentityMap.getInstance().getChildMap(this);
    }
    /**
     * Appends a child to this JUIContainer's DOM object as well as its {@link JUIIdentityMap}.
     *
     * @param element The {@link JUIElement} to append to this JUIContainer.
     * @param beforeElement The JUIElement before which to append the previously specified element.
     * @returns {string} The ID of the newly created T.
     */
    adoptChild(element, beforeElement) {
        if (element.hasContainer(this))
            return element.getID();
        else if (element.hasContainer())
            throw new JUIContainerDichotomyError();
        else {
            if (beforeElement === undefined)
                this.getHTMLElement().appendChild(element.getHTMLElement());
            else
                this.getHTMLElement().insertBefore(element.getHTMLElement(), beforeElement.getHTMLElement());
            element.setContainer(this);
            return this.children.add(element);
        }
    }
    /**
     * Removes a {@link JUIElement} with a given ID from this JUIContainer's DOM object as well as its
     * {@link JUIIdentityMap}.
     *
     * @param {string} id The ID of the {@link JUIElement} to orphan.
     * @returns A child of of this JUIContainer with the given ID if it exists, otherwise null.
     */
    orphanChild(id) {
        if (this.hasChild(id)) {
            let result = this.children.remove(id);
            result.orphan();
            return result;
        }
        else
            return null;
    }
    /**
     * Removes all of the children of this JUIContainer, returning true if any children were actually removed.
     *
     * @returns {boolean} A boolean indicating whether or not any children were actually removed.
     */
    orphanAllChildren() {
        let element = this.getHTMLElement();
        if (element.hasChildNodes()) {
            while (element.firstChild)
                element.removeChild(element.firstChild);
            return true;
        }
        else
            return false;
    }
    /**
     * Returns true if this JUIContainer has a JUIElement with the provided ID.
     *
     * @param {string} id The to check for inside this JUIContainer.
     * @returns {boolean} true if this JUIContainer has a JUIElement with the provided ID.
     */
    hasChild(id) {
        return this.children.contains(id);
    }
    /**
     * Returns true if this JUIContainer has no children.
     *
     * @returns {boolean} true if this JUIContainer has no children.
     */
    isEmpty() {
        return this.children.isEmpty();
    }
}
export default JUIContainer;
//# sourceMappingURL=jui-container.js.map