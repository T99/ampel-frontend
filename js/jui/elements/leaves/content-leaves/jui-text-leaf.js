/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIContentLeaf from "../jui-content-leaf.js";
import JUITextLeafType from "../../../types/leaves/content-leaves/jui-text-leaf-type.js";
/**
 * A {@link JUIElement} that displays text.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITextLeaf extends JUIContentLeaf {
    // DOC-ME [12/14/18 @ 9:52 AM] - Documentation required!
    constructor(content, textType) {
        super((textType ? textType : JUITextLeafType.P).toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-text-leaf";
        this.addClasses(this.TYPE_IDENTITY);
        this.setText(content);
    }
    // DOC-ME [12/14/18 @ 9:52 AM] - Documentation required!
    setText(content) {
        let displaced = this.getText();
        this.getHTMLElement().innerText = content;
        return displaced;
    }
    // DOC-ME [12/22/18 @ 4:07 PM] - Documentation required!
    getText() {
        return this.getHTMLElement().innerText;
    }
}
export default JUITextLeaf;
//# sourceMappingURL=jui-text-leaf.js.map