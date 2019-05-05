/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:17 PM -- April 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JUIFlowContainer from "../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIPage from "../../../jui/jui-page.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../../../jui/elements/single-containers/jui-alignment-container.js";
import AUIKioskTextLabel from "../kiosk-old/aui-kiosk-text-label.js";
import JUITextLeafType from "../../../jui/types/leaves/content-leaves/jui-text-leaf-type.js";
import AUISideScroller from "../../global/aui-side-scroller.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.2.0
 * @since v0.2.0
 */
class AUIKioskPage extends JUIPage {
    constructor(initialQuestion) {
        super();
        this.TYPE_IDENTITY = "aui-kiosk-page";
        this.addClasses(this.TYPE_IDENTITY);
        this.mainFlowContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
        this.inquiryTextWrapper = new JUIAlignmentContainer(JUIAlignment.CENTER);
        this.inquiryText = new AUIKioskTextLabel("", JUITextLeafType.H4);
        this.questionContainer = new AUISideScroller(initialQuestion);
        this.buttonContainer = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
        this.inquiryTextWrapper.addClasses("inquiry-text-container");
        this.questionContainer.addClasses("question-container");
        this.buttonContainer.addClasses("button-container");
        this.inquiryTextWrapper.setChild(this.inquiryText);
        this.mainFlowContainer.addChildren(this.inquiryTextWrapper, this.questionContainer, this.buttonContainer);
        this.setChild(this.mainFlowContainer);
        // ugh
        setTimeout(() => {
            this.setInquiryText(initialQuestion.getInquiryText());
        }, 500);
    }
    setInquiryText(inquiry) {
        let originalSize = 3.5;
        let htmlElement = this.inquiryText.getHTMLElement();
        this.inquiryText.setText(inquiry);
        htmlElement.style.fontSize = "3.5em";
        while (htmlElement.clientHeight > htmlElement.clientHeight) {
            htmlElement.style.fontSize = (originalSize -= 0.1) + "em";
        }
    }
    nextQuestion(question) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.questionContainer.transitionToRight(question);
            this.setInquiryText(question.getInquiryText());
        });
    }
    previousQuestion(question) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.questionContainer.transitionToLeft(question);
            this.setInquiryText(question.getInquiryText());
        });
    }
    hasButton(button) {
        return this.currentButtons.has(button.getText());
    }
    addButton(button) {
        // TODO [4/30/19 @ 9:05 PM] - Finish the 'addButton' method.
    }
    removeButton(button) {
        // TODO [4/30/19 @ 9:05 PM] - Finish the 'removeButton' method.
    }
}
export default AUIKioskPage;
//# sourceMappingURL=aui-kiosk-page.js.map