/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:27 AM -- March 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIControlLeaf from "../jui-control-leaf.js";
import JUIControlLeafType from "../../../types/leaves/jui-control-leaf-type.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITextAreaLeaf extends JUIControlLeaf {
    constructor() {
        super(JUIControlLeafType.TEXTAREA);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-text-area-leaf";
        this.addClasses(this.TYPE_IDENTITY);
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
}
export default JUITextAreaLeaf;
//# sourceMappingURL=jui-text-area-leaf.js.map