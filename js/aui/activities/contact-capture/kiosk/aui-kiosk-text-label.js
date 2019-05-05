/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:23 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUITextLeaf from "../../../../jui/elements/leaves/content-leaves/jui-text-leaf.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskTextLabel extends JUITextLeaf {
    constructor(content, textType) {
        super(content, textType);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-kiosk-text-label";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default AUIKioskTextLabel;
//# sourceMappingURL=aui-kiosk-text-label.js.map