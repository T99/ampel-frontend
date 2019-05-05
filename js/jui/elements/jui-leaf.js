/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:45 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIElement from "./jui-element.js";
// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
class JUILeaf extends JUIElement {
    // DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
    constructor(leafType) {
        super(leafType.toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-leaf";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUILeaf;
//# sourceMappingURL=jui-leaf.js.map