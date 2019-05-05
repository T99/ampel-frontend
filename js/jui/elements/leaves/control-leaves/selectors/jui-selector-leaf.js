/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:54 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIControlLeaf from "../../jui-control-leaf.js";
// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
class JUISelectorLeaf extends JUIControlLeaf {
    // DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
    constructor(type) {
        // TODO [12/14/18 @ 12:14 PM] - Make a proper type class.
        super(type);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-selector-leaf";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUISelectorLeaf;
//# sourceMappingURL=jui-selector-leaf.js.map