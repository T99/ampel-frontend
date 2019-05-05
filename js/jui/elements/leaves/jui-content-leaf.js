/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:50 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUILeaf from "../jui-leaf.js";
// DOC-ME [12/8/18 @ 4:53 PM] - Documentation required!
class JUIContentLeaf extends JUILeaf {
    // DOC-ME [12/9/18 @ 3:07 AM] - Documentation required!
    constructor(contentLeafType) {
        super(contentLeafType.toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-content-leaf";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUIContentLeaf;
//# sourceMappingURL=jui-content-leaf.js.map