/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:40 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIControlLeaf from "../../../jui-control-leaf.js";
import JUIControlLeafType from "../../../../../types/leaves/jui-control-leaf-type.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISingleSelectorLeaf extends JUIControlLeaf {
    constructor(startSelected) {
        super(JUIControlLeafType.INPUT);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-single-selector-leaf";
        this.addClasses(this.TYPE_IDENTITY);
        this.setSelected(startSelected);
    }
}
export default JUISingleSelectorLeaf;
//# sourceMappingURL=jui-single-selector-leaf.js.map