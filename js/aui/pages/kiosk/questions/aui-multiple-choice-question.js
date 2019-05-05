/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:34 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIScrollContainer from "../../../../jui/elements/single-containers/jui-scroll-container.js";
import JUIFlowContainer from "../../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import AUISelectableBox from "../../kiosk-old/question-types/helper-elements/aui-selectable-box.js";
import AFQuestionType from "../../../../af-structures/descriptors/af-question-type.js";
import AUIQuestion from "./aui-question.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIMultipleChoiceQuestion extends AUIQuestion {
    constructor(question) {
        super(question, new JUIScrollContainer(true, false));
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-multiple-choice-question";
        this.interactionTimeout = 3000;
        this.verticalContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
        this.element.setChild(this.verticalContainer);
        for (let option of question.getOptions().entries()) {
            let optionID = option[0];
            let optionText = option[1];
            let selectable = new AUISelectableBox(optionText, optionID, AFQuestionType.MULTIPLE_CHOICE);
            selectable.setFocusability(true);
            selectable.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
                this.interact();
                for (let item of this.verticalContainer.getAllChildren())
                    item.setSelected(false);
                selectable.setSelected(true);
                this.currentlySelectedID = optionID;
                this.currentlySelectedElement = selectable;
                this.currentlySelectedElement.addClasses("selected");
            });
            this.verticalContainer.addChild(selectable);
        }
        this.element.addClasses(this.TYPE_IDENTITY);
    }
    getResponse() {
        return this.formResponse(this.currentlySelectedID);
    }
    getRelevantKioskButtons() {
        return [];
    }
}
export default AUIMultipleChoiceQuestion;
//# sourceMappingURL=aui-multiple-choice-question.js.map