/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:35 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * An immutable
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIModule {
    constructor(element) {
        // TODO [4/28/19 @ 3:28 PM] - JUIModules are now the exact same thing as JUIElements. Remove this class in favor of the other.
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-module";
        this.element = element;
        element.addClasses(this.TYPE_IDENTITY);
    }
    // DOC-ME [12/18/18 @ 7:00 PM] - Documentation required!
    getHTMLElement() {
        return this.element.getHTMLElement();
    }
    /**
     * Adds classes to this JUIModule's DOM element.
     *
     * @param {string[]} classNames The names of the classes to add to this JUIModule's DOM element.
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
     * Removes classes from this JUIModule's DOM element.
     *
     * @param {string[]} classNames The names of the classes to remove from this JUIModule's DOM element.
     */
    removeClasses(...classNames) {
        for (let className of classNames) {
            if (this.hasClass(className))
                this.getHTMLElement().classList.remove(className);
        }
    }
    /**
     * Returns true if this JUIModule's DOM element has the provided class.
     *
     * @param {string} className The name of the class to check for on this JUIModule's DOM element.
     * @returns {boolean} true if this JUIModule's DOM element has the provided class.
     */
    hasClass(className) {
        return this.getHTMLElement().classList.contains(className);
    }
    /**
     * Returns a string array of all of the classes on this JUIModule's DOM element.
     *
     * @returns {string[]} A string array of all of the classes on this JUIModule's DOM element.
     */
    allClasses() {
        return Array.from(this.getHTMLElement().classList);
    }
    // DOC-ME [12/18/18 @ 6:46 PM] - Documentation required!
    getID() {
        return this.element.getID();
    }
    // DOC-ME [12/18/18 @ 6:45 PM] - Documentation required!
    setID(id) {
        this.element.setID(id);
    }
    // DOC-ME [12/18/18 @ 6:45 PM] - Documentation required!
    hasContainer(container) {
        return this.element.hasContainer(container);
    }
    // DOC-ME [12/18/18 @ 6:46 PM] - Documentation required!
    getContainer() {
        return this.element.getContainer();
    }
    // DOC-ME [12/18/18 @ 6:45 PM] - Documentation required!
    setContainer(container) {
        this.element.setContainer(container);
    }
    getTransitionLock() {
        return this.element.getTransitionLock();
    }
    // DOC-ME [12/18/18 @ 6:45 PM] - Documentation required!
    orphan() {
        this.element.orphan();
    }
}
export default JUIModule;
//# sourceMappingURL=jui-module.js.map