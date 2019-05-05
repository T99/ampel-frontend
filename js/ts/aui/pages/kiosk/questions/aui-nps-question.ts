/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:33 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import AUIQuestionElement from "../../kiosk-old/question-types/aui-question-element.js";
import JUISliderLeaf from "../../../../jui/elements/leaves/control-leaves/jui-slider-leaf.js";
import JUIStackContainer from "../../../../jui/elements/multi-containers/jui-stack-container.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIImageLeaf from "../../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import TSDate from "../../../../descriptors/time/ts-date.js";
import AUIKioskFolderElement from "../../kiosk-old/aui-kiosk-folder-element.js";
import TSBrowserIdentifier from "../../../../helpers/ts-browser-identifier.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
import AUIQuestion from "./aui-question.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUINPSQuestion extends AUIQuestion<JUIStackContainer> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-nps-question";
	
	private static readonly DEFAULT_VALUE: number = 5;
	
	protected interactionTimeout: number = 2500;
	
	private slider: JUISliderLeaf;
	
	private currentValue: number = AUINPSQuestion.DEFAULT_VALUE;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIStackContainer(JUIAlignment.CENTER));
		
		this.slider = new JUISliderLeaf(1, 10, AUINPSQuestion.DEFAULT_VALUE, 0);
		
		this.element.addStackedChild(new JUIImageLeaf("img/question-types/slider/slider-rasterized.png"));
		this.element.addStackedChild(this.slider);
		
		this.slider.getHTMLElement().addEventListener("input", (event: any): void => {
			
			this.interact();
			
			let newValue: number = Math.round(this.slider.getValue());
			
			if (newValue !== this.currentValue) this.currentValue = newValue;
		
		});
		
		this.slider.getHTMLElement().addEventListener("click", (event: any): void => {
			
			this.interact();
			
			// Safari polyfill
			if (TSBrowserIdentifier.isSafari()) {
				
				console.log("Enacting Safari click-to-change polyfill.");
				
				let bodyHeight: number = document.body.clientHeight;
				let sliderHeight: number = this.slider.getHTMLElement().clientWidth;
				let clickY: number = event.clientY;
				
				let sliderY: number = (clickY - ((bodyHeight - sliderHeight) / 2));
				let percentage: number = ((sliderHeight - sliderY) / sliderHeight);
				let adjustedValue: number = ((percentage * (this.slider.getMaximumValue() - this.slider.getMinimumValue())) + this.slider.getMinimumValue());
				
				// console.log("Max Val: " + this.slider.getMaximumValue());
				// console.log("Min Val: " + this.slider.getMinimumValue());
				// console.log("Percentage: " + percentage);
				// console.log("Adjusted Value: " + adjustedValue);
				
				this.slider.setValue(adjustedValue);
				
			}
			
			let newValue: number = Math.round(this.slider.getValue());
			
			if (newValue !== this.currentValue) this.currentValue = newValue;
			
		});
		
		this.element.addClasses(this.TYPE_IDENTITY);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.currentValue);
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
}

export default AUINPSQuestion;