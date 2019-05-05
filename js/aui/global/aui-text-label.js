/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:53 AM -- December 17th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUITextLeaf from "../../jui/elements/leaves/content-leaves/jui-text-leaf.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUITextLabel extends JUITextLeaf {
    constructor(content, textType) {
        super(content, textType);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-text-label";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default AUITextLabel;
//# sourceMappingURL=aui-text-label.js.map