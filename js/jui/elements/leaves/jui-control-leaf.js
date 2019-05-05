/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:50 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUILeaf from "../jui-leaf.js";
// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
class JUIControlLeaf extends JUILeaf {
    // DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
    constructor(controlLeafType) {
        super(controlLeafType.toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-control-leaf";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUIControlLeaf;
//# sourceMappingURL=jui-control-leaf.js.map