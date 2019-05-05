/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:09 PM -- March 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIControlLeaf from "../jui-control-leaf.js";
import JUIControlLeafType from "../../../types/leaves/jui-control-leaf-type.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISliderLeaf extends JUIControlLeaf {
    // DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
    constructor(minimumValue, maximumValue, defaultValue, stepValue) {
        super(JUIControlLeafType.INPUT);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-slider-leaf";
        this.addClasses(this.TYPE_IDENTITY);
        this.getHTMLElement().setAttribute("type", "range");
        this.setMinimumValue(minimumValue);
        this.setMaximumValue(maximumValue);
        if (defaultValue !== undefined)
            this.setValue(defaultValue);
        if (stepValue !== undefined)
            this.setStepValue(stepValue);
    }
    // DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
    setMinimumValue(minimumValue) {
        let displaced = this.getMinimumValue();
        this.getHTMLElement().min = minimumValue.toString();
        return displaced;
    }
    // DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
    getMinimumValue() {
        return parseInt(this.getHTMLElement().min);
    }
    // DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
    setMaximumValue(maximumValue) {
        let displaced = this.getMaximumValue();
        this.getHTMLElement().max = maximumValue.toString();
        return displaced;
    }
    // DOC-ME [3/23/19 @ 7:37 PM] - Documentation required!
    getMaximumValue() {
        return parseInt(this.getHTMLElement().max);
    }
    // DOC-ME [3/24/19 @ 2:27 PM] - Documentation required!
    setStepValue(stepValue) {
        let displaced = this.getStepValue();
        this.getHTMLElement().step = (stepValue === 0 ? "any" : stepValue.toString());
        return displaced;
    }
    // DOC-ME [3/24/19 @ 2:33 PM] - Documentation required!
    getStepValue() {
        let displacedString = this.getHTMLElement().step;
        return (displacedString === "any" ? 0 : parseInt(displacedString));
    }
    // DOC-ME [3/23/19 @ 7:36 PM] - Documentation required!
    setValue(value) {
        let displaced = parseInt(this.getHTMLElement().value);
        this.getHTMLElement().value = value.toString();
        return displaced;
    }
    // DOC-ME [3/23/19 @ 7:36 PM] - Documentation required!
    getValue() {
        return parseFloat(this.getHTMLElement().value);
    }
}
export default JUISliderLeaf;
//# sourceMappingURL=jui-slider-leaf.js.map