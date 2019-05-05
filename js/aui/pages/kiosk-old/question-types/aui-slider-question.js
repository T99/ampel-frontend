/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:30 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import AUIQuestionElement from "./aui-question-element.js";
import JUISliderLeaf from "../../../../jui/elements/leaves/control-leaves/jui-slider-leaf.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIStackContainer from "../../../../jui/elements/multi-containers/jui-stack-container.js";
import JUIImageLeaf from "../../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import TSDate from "../../../../descriptors/time/ts-date.js";
import TSBrowserIdentifier from "../../../../helpers/ts-browser-identifier.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISliderQuestion extends AUIQuestionElement {
    constructor(question, parentFolderElement) {
        super(new JUIStackContainer(JUIAlignment.CENTER), question, parentFolderElement);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-slider-question";
        this.interactionTimeout = 2500;
        this.currentValue = AUISliderQuestion.DEFAULT_VALUE;
        this.slider = new JUISliderLeaf(1, 10, AUISliderQuestion.DEFAULT_VALUE, 0);
        this.getQuestionElement().addStackedChild(new JUIImageLeaf("img/question-types/slider/slider-rasterized.png"));
        this.getQuestionElement().addStackedChild(this.slider);
        this.slider.getHTMLElement().addEventListener("input", (event) => {
            this.interact();
            let newValue = Math.round(this.slider.getValue());
            if (newValue !== this.currentValue)
                this.currentValue = newValue;
        });
        // Safari polyfill
        if (TSBrowserIdentifier.isSafari()) {
            this.slider.getHTMLElement().addEventListener("click", (event) => {
                this.interact();
                console.log("Enacting Safari click-to-change polyfill.");
                let bodyHeight = document.body.clientHeight;
                let sliderHeight = this.slider.getHTMLElement().clientWidth;
                let clickY = event.clientY;
                let sliderY = (clickY - ((bodyHeight - sliderHeight) / 2));
                let percentage = ((sliderHeight - sliderY) / sliderHeight);
                let adjustedValue = ((percentage * (this.slider.getMaximumValue() - this.slider.getMinimumValue())) + this.slider.getMinimumValue());
                this.slider.setValue(adjustedValue);
                let newValue = Math.round(this.slider.getValue());
                if (newValue !== this.currentValue)
                    this.currentValue = newValue;
            });
        }
        this.element.addClasses(this.TYPE_IDENTITY);
    }
    getResponse() {
        return new AFResponse(this.question, this.currentValue, TSDate.fromNow());
    }
    getRelevantKioskButtons() {
        return [];
    }
}
AUISliderQuestion.DEFAULT_VALUE = 5;
export default AUISliderQuestion;
//# sourceMappingURL=aui-slider-question.js.map