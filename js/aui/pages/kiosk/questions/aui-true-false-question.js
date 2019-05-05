/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:53 PM -- February 22nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIImageLeaf from "../../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import JUIFlowContainer from "../../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIRotationShakeAnimation from "../../../../jui/animations/animations/jui-rotation-shake-animation.js";
import AUIQuestion from "./aui-question.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUITrueFalseQuestion extends AUIQuestion {
    constructor(question) {
        super(question, new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER));
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-true-false-question";
        this.element.addClasses(this.TYPE_IDENTITY);
        let yesImage = new JUIImageLeaf("/img/question-types/true-false/yes-rasterized-cropped.png");
        let noImage = new JUIImageLeaf("/img/question-types/true-false/no-rasterized-cropped.png");
        yesImage.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
            this.interact();
            this.currentResponse = true;
            (new JUIRotationShakeAnimation(yesImage)).play();
        });
        noImage.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
            this.interact();
            this.currentResponse = false;
            (new JUIRotationShakeAnimation(noImage)).play();
        });
        this.element.addChildren(yesImage, noImage);
    }
    getResponse() {
        return this.formResponse(this.currentResponse);
    }
    getRelevantKioskButtons() {
        return [];
    }
}
export default AUITrueFalseQuestion;
//# sourceMappingURL=aui-true-false-question.js.map