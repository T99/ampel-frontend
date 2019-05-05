/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:30 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import JUISliderLeaf from "../../../../jui/elements/leaves/control-leaves/jui-slider-leaf.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIStackContainer from "../../../../jui/elements/multi-containers/jui-stack-container.js";
import JUIImageLeaf from "../../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
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
class AUISliderQuestion extends AUIQuestion<JUIStackContainer> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-slider-question";
	
	private static readonly DEFAULT_VALUE: number = 5;
	
	private slider: JUISliderLeaf;
	
	private currentValue: number = AUISliderQuestion.DEFAULT_VALUE;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIStackContainer(JUIAlignment.CENTER));
		
		this.slider = new JUISliderLeaf(1, 10, AUISliderQuestion.DEFAULT_VALUE, 0);
		
		this.element.addStackedChild(new JUIImageLeaf("img/question-types/slider/slider-rasterized.png"));
		this.element.addStackedChild(this.slider);
		
		this.slider.getHTMLElement().addEventListener("input", (event: any): void => {
			
			this.interact();
			
			let newValue: number = Math.round(this.slider.getValue());
			
			if (newValue !== this.currentValue) this.currentValue = newValue;
			
		});
		
		// Safari polyfill
		if (TSBrowserIdentifier.isSafari()) {
			
			this.slider.getHTMLElement().addEventListener("click", (event: any): void => {
				
				this.interact();
				
				console.log("Enacting Safari click-to-change polyfill.");
				
				let bodyHeight: number = document.body.clientHeight;
				let sliderHeight: number = this.slider.getHTMLElement().clientWidth;
				let clickY: number = event.clientY;
				
				let sliderY: number = (clickY - ((bodyHeight - sliderHeight) / 2));
				let percentage: number = ((sliderHeight - sliderY) / sliderHeight);
				let adjustedValue: number = ((percentage * (this.slider.getMaximumValue() - this.slider.getMinimumValue())) + this.slider.getMinimumValue());
				
				this.slider.setValue(adjustedValue);
				
				let newValue: number = Math.round(this.slider.getValue());
				
				if (newValue !== this.currentValue) this.currentValue = newValue;
				
			});
			
		}
		
		this.element.addClasses(this.TYPE_IDENTITY);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.currentValue);
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
}

export default AUISliderQuestion;