/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:33 PM -- January 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIButtonLeaf from "../../../../../jui/elements/leaves/control-leaves/jui-button-leaf.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskButton extends JUIButtonLeaf {
    constructor(buttonText) {
        super(buttonText);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-kiosk-button";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default AUIKioskButton;
//# sourceMappingURL=aui-kiosk-button.js.map