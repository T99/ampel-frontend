/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:39 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUISingleSelectorLeaf from "./jui-single-selector-leaf.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIRadioSingleSelectorLeaf extends JUISingleSelectorLeaf {
    constructor(startSelected = false) {
        super(startSelected);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-radio-single-selector-leaf";
        this.addClasses(this.TYPE_IDENTITY);
        this.getHTMLElement().setAttribute("type", "radio");
    }
    isSelected() {
        return this.getHTMLElement().checked;
    }
    setSelected(isSelected) {
        let displaced = this.isSelected();
        this.getHTMLElement().checked = isSelected;
        return displaced;
    }
}
export default JUIRadioSingleSelectorLeaf;
//# sourceMappingURL=jui-radio-single-selector-leaf.js.map