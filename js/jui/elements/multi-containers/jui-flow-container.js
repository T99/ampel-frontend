/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:57 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIMultiContainer from "../jui-multi-container.js";
import JUIFlexWrappingRule from "../../descriptors/jui-flex-wrapping-rule.js";
/**
 * A {@link JUIMultiContainer} in which content flows in accordance to a given direction, alignment, and wrapping style.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIFlowContainer extends JUIMultiContainer {
    // DOC-ME [12/17/18 @ 1:06 AM] - Documentation required!
    constructor(direction, alignment, wrappingRule, containerType) {
        super(containerType);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-flow-container";
        this.setDirection(direction);
        this.setAlignment(alignment);
        this.wrappingRule = (wrappingRule ? wrappingRule : JUIFlexWrappingRule.NO_WRAP);
        // TODO [1/22/19 @ 9:49 PM] - Confirm that the wrappingRule parameter actually does something.
        this.addClasses(this.TYPE_IDENTITY, this.direction.toString(), this.alignment.toString(), this.wrappingRule.toString());
    }
    /**
     * Returns the direction that content flows inside this JUIFlowContainer as a {@link JUIDirection}.
     *
     * @returns {JUIDirection} The direction that content flows inside this JUIFlowContainer.
     */
    getDirection() {
        return this.direction;
    }
    /**
     * Attempts to set the content direction of this JUIFlowContainer to a given {@link JUIDirection}.
     *
     * @param {JUIDirection} direction The direction to set for this JUIFlowContainer.
     * @returns {boolean} true if the given direction was possible (and therefore applied).
     */
    setDirection(direction) {
        if (direction !== this.direction) {
            if (this.direction !== undefined)
                this.removeClasses(this.direction.toString());
            this.direction = direction;
            this.addClasses(this.direction.toString());
        }
    }
    /**
     * Returns the alignment of the contents of this JUIFlowContainer as a {@link JUIAlignment}.
     *
     * @returns {JUIAlignment} The alignment of the contents of this JUIFlowContainer.
     */
    getAlignment() {
        return this.alignment;
    }
    /**
     * Attempts to set the content alignment of this JUIFlowContainer to a given {@link JUIAlignment}.
     *
     * @param {JUIAlignment} alignment The alignment to set for this JUIFlowContainer.
     * @returns {boolean} true if the given alignment was possible (and therefore applied).
     */
    setAlignment(alignment) {
        if (alignment !== this.alignment) {
            if (this.alignment !== undefined)
                this.removeClasses(this.alignment.toString());
            this.alignment = alignment;
            this.addClasses(this.alignment.toString());
        }
    }
}
export default JUIFlowContainer;
//# sourceMappingURL=jui-flow-container.js.map