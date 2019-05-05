/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:33 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUISliderLeaf from "../../../../jui/elements/leaves/control-leaves/jui-slider-leaf.js";
import JUIStackContainer from "../../../../jui/elements/multi-containers/jui-stack-container.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIImageLeaf from "../../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import TSBrowserIdentifier from "../../../../helpers/ts-browser-identifier.js";
import AUIQuestion from "./aui-question.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUINPSQuestion extends AUIQuestion {
    constructor(question) {
        super(question, new JUIStackContainer(JUIAlignment.CENTER));
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-nps-question";
        this.interactionTimeout = 2500;
        this.currentValue = AUINPSQuestion.DEFAULT_VALUE;
        this.slider = new JUISliderLeaf(1, 10, AUINPSQuestion.DEFAULT_VALUE, 0);
        this.element.addStackedChild(new JUIImageLeaf("img/question-types/slider/slider-rasterized.png"));
        this.element.addStackedChild(this.slider);
        this.slider.getHTMLElement().addEventListener("input", (event) => {
            this.interact();
            let newValue = Math.round(this.slider.getValue());
            if (newValue !== this.currentValue)
                this.currentValue = newValue;
        });
        this.slider.getHTMLElement().addEventListener("click", (event) => {
            this.interact();
            // Safari polyfill
            if (TSBrowserIdentifier.isSafari()) {
                console.log("Enacting Safari click-to-change polyfill.");
                let bodyHeight = document.body.clientHeight;
                let sliderHeight = this.slider.getHTMLElement().clientWidth;
                let clickY = event.clientY;
                let sliderY = (clickY - ((bodyHeight - sliderHeight) / 2));
                let percentage = ((sliderHeight - sliderY) / sliderHeight);
                let adjustedValue = ((percentage * (this.slider.getMaximumValue() - this.slider.getMinimumValue())) + this.slider.getMinimumValue());
                // console.log("Max Val: " + this.slider.getMaximumValue());
                // console.log("Min Val: " + this.slider.getMinimumValue());
                // console.log("Percentage: " + percentage);
                // console.log("Adjusted Value: " + adjustedValue);
                this.slider.setValue(adjustedValue);
            }
            let newValue = Math.round(this.slider.getValue());
            if (newValue !== this.currentValue)
                this.currentValue = newValue;
        });
        this.element.addClasses(this.TYPE_IDENTITY);
    }
    getResponse() {
        return this.formResponse(this.currentValue);
    }
    getRelevantKioskButtons() {
        return [];
    }
}
AUINPSQuestion.DEFAULT_VALUE = 5;
export default AUINPSQuestion;
//# sourceMappingURL=aui-nps-question.js.map