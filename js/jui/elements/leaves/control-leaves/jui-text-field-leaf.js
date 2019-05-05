/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:53 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIControlLeaf from "../jui-control-leaf.js";
import JUITextFieldLeafType from "../../../types/leaves/control-leaves/jui-text-field-leaf-type.js";
import AlphanumericalGenerator from "../../../../helpers/alphanumerical-generator.js";
// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
class JUITextFieldLeaf extends JUIControlLeaf {
    // DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
    constructor(isTextHidden) {
        super(JUITextFieldLeafType.INPUT.toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-text-field-leaf";
        this.isTextHidden = false;
        this.verifiers = new Map();
        this.addClasses(this.TYPE_IDENTITY);
        if (isTextHidden)
            this.setIsTextHidden(isTextHidden);
    }
    getContent() {
        return this.element.value;
    }
    setContent(content) {
        let displaced = this.getContent();
        this.element.value = content;
        return displaced;
    }
    /**
     * Sets the textual hint for this JUITextFieldLeaf.
     *
     * @param {string} hint The textual hint for this JUITextFieldLeaf.
     */
    setHint(hint) {
        this.getHTMLElement().placeholder = hint;
    }
    /**
     * Used to change whether the content of a JUITextField is readable (not hidden), or obscured (hidden, shown as '*'
     * or bullets depending on the browser).
     *
     * @param {boolean} isTextHidden If true, content will be hidden, else content will be shown.
     */
    setIsTextHidden(isTextHidden) {
        if (this.isTextHidden !== isTextHidden) {
            this.isTextHidden = isTextHidden;
            if (this.isTextHidden)
                this.getHTMLElement().type = "password";
            else
                this.getHTMLElement().type = "text";
        }
    }
    getIsTextHidden() {
        return this.isTextHidden;
    }
    checkValidity() {
        for (let verification of this.verifiers.values()) {
            if (!verification.test(this.getContent()))
                return false;
        }
        return true;
    }
    addVerification(test, failureMessage, description) {
        let id = AlphanumericalGenerator.getIdFromOrderedPattern("6a");
        this.verifiers.set(id, {
            id,
            description,
            failureMessage,
            test
        });
        return id;
    }
    getComponentValue() {
        return this.getContent();
    }
    validateComponent() {
        return this.checkValidity();
    }
}
export default JUITextFieldLeaf;
//# sourceMappingURL=jui-text-field-leaf.js.map