/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIVideoLeafType from "../../../types/leaves/content-leaves/jui-video-leaf-type.js";
import JUIContentLeaf from "../jui-content-leaf.js";
// DOC-ME [12/14/18 @ 11:53 AM] - Documentation required!
class JUIVideoLeaf extends JUIContentLeaf {
    // DOC-ME [12/14/18 @ 9:40 AM] - Documentation required!
    constructor( /* videoType: JUIVideoLeafType */) {
        super(JUIVideoLeafType.VIDEO.toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-video-leaf";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUIVideoLeaf;
//# sourceMappingURL=jui-video-leaf.js.map