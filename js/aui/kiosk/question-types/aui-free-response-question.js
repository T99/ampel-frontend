/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:34 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import AUIQuestionElement from "./aui-question-element.js";
import JUIFlowContainer from "../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import AUITextLabel from "../../global/aui-text-label.js";
import TSDate from "../../../descriptors/time/ts-date.js";
import JUITextAreaLeaf from "../../../jui/elements/leaves/control-leaves/jui-text-area-leaf.js";
import JUIDrawingCanvasLeaf from "../../../jui/elements/leaves/control-leaves/jui-drawing-canvas-leaf.js";
import JUINamedColor from "../../../jui/descriptors/colors/jui-named-color.js";
import AFResponse from "../../../af-structures/feedback-session/af-response.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIFreeResponseQuestion extends AUIQuestionElement {
    constructor(question, parentFolderElement) {
        super(new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER), question, parentFolderElement);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-free-response-question";
        this.interactionTimeout = 4000;
        this.typingModeIsActive = true;
        this.element.addClasses(this.TYPE_IDENTITY);
        this.textDrawSelector = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
        let drawSelector = new AUITextLabel("Draw");
        let textSelector = new AUITextLabel("Type");
        textSelector.addClasses("selected");
        drawSelector.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
            if (this.typingModeIsActive) {
                this.typingModeIsActive = false;
                textSelector.removeClasses("selected");
                drawSelector.addClasses("selected");
                if (this.getQuestionElement().hasChild(this.textArea.getID()))
                    this.getQuestionElement().removeChild(this.textArea.getID());
                this.getQuestionElement().addChild(this.canvas);
                this.canvas.correctSizing();
            }
        });
        textSelector.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
            if (!this.typingModeIsActive) {
                this.typingModeIsActive = true;
                drawSelector.removeClasses("selected");
                textSelector.addClasses("selected");
                if (this.getQuestionElement().hasChild(this.canvas.getID()))
                    this.getQuestionElement().removeChild(this.canvas.getID());
                this.getQuestionElement().addChild(this.textArea);
            }
        });
        this.textDrawSelector.addChildren(textSelector, drawSelector);
        this.textArea = new JUITextAreaLeaf();
        this.canvas = new JUIDrawingCanvasLeaf(JUINamedColor.RED);
        this.textArea.getHTMLElement().addEventListener("input", () => this.interact());
        this.canvas.getEventManager().ELEMENT_MOUSE_MOVE.subscribe(() => this.interact());
        this.getQuestionElement().addChildren(/*this.textDrawSelector, */ this.textArea);
    }
    getResponse() {
        return new AFResponse(this.question, this.textArea.getContent(), TSDate.fromNow());
    }
    getRelevantKioskButtons() {
        return [];
    }
}
export default AUIFreeResponseQuestion;
//# sourceMappingURL=aui-free-response-question.js.map