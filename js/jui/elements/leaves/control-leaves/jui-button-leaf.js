/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:49 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIControlLeaf from "../jui-control-leaf.js";
import JUIControlLeafType from "../../../types/leaves/jui-control-leaf-type.js";
// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
class JUIButtonLeaf extends JUIControlLeaf {
    // DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
    constructor(buttonText) {
        super(JUIControlLeafType.INPUT);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-button-leaf";
        this.addClasses(this.TYPE_IDENTITY);
        this.getHTMLElement().setAttribute("type", "button");
        this.setText(buttonText);
    }
    // DOC-ME [12/22/18 @ 4:07 PM] - Documentation required!
    setText(buttonText) {
        this.buttonText = buttonText;
        this.getHTMLElement().value = buttonText;
    }
    // DOC-ME [12/22/18 @ 4:08 PM] - Documentation required!
    getText() {
        return this.buttonText;
    }
}
export default JUIButtonLeaf;
//# sourceMappingURL=jui-button-leaf.js.map