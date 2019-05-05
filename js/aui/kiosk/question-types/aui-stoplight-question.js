/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:53 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUISVGLeaf from "../../../jui/elements/leaves/content-leaves/jui-svg-leaf.js";
import JUINamedColor from "../../../jui/descriptors/colors/jui-named-color.js";
import JUISVGCircleBuilder from "../../../jui/elements/leaves/content-leaves/svg-element-leaves/builders/jui-svg-circle-builder.js";
import AUIQuestionElement from "./aui-question-element.js";
import TSDate from "../../../descriptors/time/ts-date.js";
import AFResponse from "../../../af-structures/feedback-session/af-response.js";
/**
 * One complete event-ready stoplight for the Ampel kiosk.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIStoplightQuestion extends AUIQuestionElement {
    constructor(question, parentFolderElement) {
        super(new JUISVGLeaf("img/question-types/stoplight/stoplight-vectorized.svg"), question, parentFolderElement);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-stoplight-question";
        this.interactionTimeout = 2000;
        let builder = new JUISVGCircleBuilder();
        builder
            .withDiameter(117)
            .withXOrigin(155)
            .withFillColor(JUINamedColor.TRANSPARENT)
            .withStrokeWidth(3);
        this.redSelectionRing = builder
            .withYOrigin(144)
            .withStrokeColor(JUINamedColor.TRANSPARENT)
            .build();
        this.yellowSelectionRing = builder
            .withYOrigin(261)
            .withStrokeColor(JUINamedColor.TRANSPARENT)
            .build();
        this.greenSelectionRing = builder
            .withYOrigin(378)
            .withStrokeColor(JUINamedColor.TRANSPARENT)
            .build();
        this.getQuestionElement().addGeometry(this.redSelectionRing, this.yellowSelectionRing, this.greenSelectionRing);
        this.greenSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
            this.interact();
            this.currentlySelected = 0;
        });
        this.yellowSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
            this.interact();
            this.currentlySelected = 1;
        });
        this.redSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
            this.interact();
            this.currentlySelected = 2;
        });
        this.element.addClasses(this.TYPE_IDENTITY);
    }
    getResponse() {
        return new AFResponse(this.question, this.currentlySelected, TSDate.fromNow());
    }
    getRelevantKioskButtons() {
        return [];
    }
    setGreenLightGlow(glowing) {
        let svg = this.getQuestionElement();
        return;
    }
}
export default AUIStoplightQuestion;
//# sourceMappingURL=aui-stoplight-question.js.map