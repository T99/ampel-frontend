/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:02 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIContentLeaf from "../jui-content-leaf.js";
import JUIContentLeafType from "../../../types/leaves/jui-content-leaf-type.js";
/**
 * A progress bar.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIProgressLeaf extends JUIContentLeaf {
    constructor(maximumValue, currentValue = 0) {
        super(JUIContentLeafType.PROGRESS);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-progress-leaf";
        this.addClasses(this.TYPE_IDENTITY);
    }
    getMaximumValue() {
        return this.getHTMLElement().max;
    }
    setMaximumValue(maximumValue) {
        let displaced = this.getMaximumValue();
        this.getHTMLElement().max = maximumValue;
        return displaced;
    }
    getCurrentValue() {
        return this.getHTMLElement().value;
    }
    setCurrentValue(currentValue) {
        let displaced = this.getCurrentValue();
        this.getHTMLElement().value = currentValue;
        return displaced;
    }
}
export default JUIProgressLeaf;
//# sourceMappingURL=jui-progress-leaf.js.map