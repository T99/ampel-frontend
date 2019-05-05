/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:34 AM -- November 03rd, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIElementType from "../types/jui-element-type.js";
import JUIStyleCollection from "../styles/jui-style-collection.js";
import JUIElementEventManager from "../action/managers/jui-element-event-manager.js";
import TSLockingQueue from "../../structures/implementations/queue/ts-locking-queue.js";
/**
 * The most basic form of an element, JUIElement serves as the base-most abstract implementation of an item that can
 * exist on the page.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIElement {
    // DOC-ME [12/8/18 @ 4:35 PM] - Documentation required!
    constructor(elementType) {
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-element";
        this.transitionLockManager = new TSLockingQueue();
        this.styleCollection = new JUIStyleCollection(this);
        switch (elementType) {
            case JUIElementType.SVG:
            case JUIElementType.CIRCLE:
            case JUIElementType.LINE:
            case JUIElementType.PATH:
            case JUIElementType.POLYGON:
            case JUIElementType.RECT:
            case JUIElementType.TEXT:
            case JUIElementType.TEXTPATH: {
                this.element = document.createElementNS("http://www.w3.org/2000/svg", elementType.toString());
                break;
            }
            default: {
                this.element = document.createElement(elementType.toString());
                break;
            }
        }
        this.eventManager = new JUIElementEventManager(this);
        this.getHTMLElement()["jui"] = this;
        this.addClasses(this.TYPE_IDENTITY);
    }
    // TODO [2/4/19 @ 11:52 PM] - Override this element to return the proper type on all subtypes.
    /**
     * Returns the DOM element that constitutes this JUIElement.
     *
     * @returns {HTMLElement} The DOM element that constitutes this JUIElement.
     */
    getHTMLElement() {
        return this.element;
    }
    // DOC-ME [12/18/18 @ 6:39 PM] - Documentation required!
    setContainer(container) {
        if (this.hasContainer(container))
            return;
        else
            this.container = container;
    }
    /**
     * Returns the {@link JUIContainer} to which this JUIElement belongs, or undefined if this element is not in a
     * container.
     *
     * @returns {JUIContainer} The JUIContainer to which this JUIElement belongs, or undefined if this element
     * is not in a container.
     */
    getContainer() {
        return this.container;
    }
    /**
     * If a valid {@link JUIContainer} is passed, this method returns true if that container contains this JUIElement,
     * otherwise returns true if this JUIElement has a container at all.
     *
     * @param {JUIContainer} container
     * @returns {boolean}
     */
    hasContainer(container) {
        if (container)
            return (this.container === container);
        else
            return (this.container !== undefined && this.container !== null);
    }
    /**
     * Sets the DOM ID of this JUIElement.
     *
     * @param {string} id The string to set as this JUIElement's DOM ID.
     */
    setID(id) {
        this.getHTMLElement().id = id;
    }
    /**
     * Returns the ID of this T. This ID serves as both the identifier within the JUI framework as well as the
     * actual HTML/DOM ID of the HTMLElement.
     *
     * @returns {string} The ID of this T.
     */
    getID() {
        return this.getHTMLElement().id;
    }
    /**
     * Adds classes to this JUIElement's DOM element.
     *
     * @param {string[]} classNames The names of the classes to add to this JUIElement's DOM element.
     */
    addClasses(...classNames) {
        for (let className of classNames) {
            if (this.hasClass(className))
                return;
            else
                this.getHTMLElement().classList.add(className);
        }
    }
    /**
     * Removes classes from this JUIElement's DOM element.
     *
     * @param {string[]} classNames The names of the classes to remove from this JUIElement's DOM element.
     */
    removeClasses(...classNames) {
        for (let className of classNames) {
            if (this.hasClass(className))
                this.getHTMLElement().classList.remove(className);
        }
    }
    /**
     * Returns true if this JUIElement's DOM element has the provided class.
     *
     * @param {string} className The name of the class to check for on this JUIElement's DOM element.
     * @returns {boolean} true if this JUIElement's DOM element has the provided class.
     */
    hasClass(className) {
        return this.getHTMLElement().classList.contains(className);
    }
    /**
     * Returns a string array of all of the classes on this JUIElement's DOM element.
     *
     * @returns {string[]} A string array of all of the classes on this JUIElement's DOM element.
     */
    allClasses() {
        return Array.from(this.getHTMLElement().classList);
    }
    setFocusability(focusability) {
        this.getHTMLElement()["tabIndex"] = (focusability ? 0 : -1);
    }
    /**
     * The feature is not yet fully implemented.
     *
     * @returns {JUIStyleCollection}
     */
    getStyleCollection() {
        return this.styleCollection;
    }
    /**
     * Returns the {@link JUIEventManager} for this JUIElement.
     *
     * @returns {JUIElementEventManager} The JUIEventManager for this JUIElement.
     */
    getEventManager() {
        return this.eventManager;
    }
    getTransitionLock() {
        return this.transitionLockManager.getLock();
    }
    /**
     * Removes this JUIElement from it's container if it is in one, returning the {@link Element} that was removed.
     *
     * @returns {E} The Element that was removed.
     */
    orphan() {
        if (this.hasContainer()) {
            let container = this.container;
            this.container = undefined;
            return container.getHTMLElement().removeChild(this.element);
        }
        else
            return undefined;
    }
}
export default JUIElement;
//# sourceMappingURL=jui-element.js.map