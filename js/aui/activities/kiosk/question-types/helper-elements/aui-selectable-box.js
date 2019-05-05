/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:28 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import AFQuestionType from "../../../../../af-structures/descriptors/af-question-type.js";
import JUIFlowContainer from "../../../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../../jui/descriptors/jui-alignment.js";
import JUIFlexWrappingRule from "../../../../../jui/descriptors/jui-flex-wrapping-rule.js";
import JUICheckboxSingleSelectorLeaf from "../../../../../jui/elements/leaves/control-leaves/selectors/single-selectors/jui-checkbox-single-selector-leaf.js";
import JUIRadioSingleSelectorLeaf from "../../../../../jui/elements/leaves/control-leaves/selectors/single-selectors/jui-radio-single-selector-leaf.js";
import AUITextLabel from "../../../../global/aui-text-label.js";
/**
 * A checkbox or radio button box containing a piece of text.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISelectableBox extends JUIFlowContainer {
    constructor(text, responseID, type) {
        super(JUIDirection.TO_RIGHT, JUIAlignment.CENTER, JUIFlexWrappingRule.NO_WRAP);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-selectable-box";
        this.addClasses(this.TYPE_IDENTITY);
        this.setFocusability(true);
        this.responseID = responseID;
        this.textElement = new AUITextLabel(text);
        if (type === AFQuestionType.SELECT_ALL_THAT_APPLY)
            this.selectable = new JUICheckboxSingleSelectorLeaf();
        else if (type === AFQuestionType.MULTIPLE_CHOICE)
            this.selectable = new JUIRadioSingleSelectorLeaf();
        else
            throw new TypeError("Attempted to create an AUISelectableBox for a invalid question type.");
        this.addChildren(this.textElement, this.selectable);
    }
    getResponseID() {
        return this.responseID;
    }
    getText() {
        return this.textElement.getText();
    }
    setText(text) {
        return this.textElement.setText(text);
    }
    isSelected() {
        return this.selectable.isSelected();
    }
    setSelected(isSelected) {
        return this.selectable.setSelected(isSelected);
    }
}
export default AUISelectableBox;
//# sourceMappingURL=aui-selectable-box.js.map