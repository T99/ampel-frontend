/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:17 PM -- April 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIFlowContainer from "../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIPage from "../../../jui/jui-page.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../../../jui/elements/single-containers/jui-alignment-container.js";
import AUIKioskTextLabel from "../kiosk-old/aui-kiosk-text-label.js";
import AUIKioskButton from "../kiosk-old/context-buttons/aui-kiosk-button.js";
import JUITextLeafType from "../../../jui/types/leaves/content-leaves/jui-text-leaf-type.js";
import AUISideScroller from "../../global/aui-side-scroller.js";
import AUIQuestion from "./questions/aui-question.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.2.0
 * @since v0.2.0
 */
class AUIKioskPage extends JUIPage {
	
	public readonly TYPE_IDENTITY: string = "aui-kiosk-page";
	
	private mainFlowContainer: JUIFlowContainer;
	
	private inquiryTextWrapper: JUIAlignmentContainer<AUIKioskTextLabel>;
	
	private inquiryText: AUIKioskTextLabel;
	
	private questionContainer: AUISideScroller;
	
	private buttonContainer: JUIFlowContainer<AUIKioskButton>;
	
	private currentButtons: Map<string, AUIKioskButton>;
	
	public constructor(initialQuestion: AUIQuestion<any>) {
		
		super();
		
		this.addClasses(this.TYPE_IDENTITY);
		
		this.mainFlowContainer	= new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		this.inquiryTextWrapper	= new JUIAlignmentContainer<AUIKioskTextLabel>(JUIAlignment.CENTER);
		this.inquiryText		= new AUIKioskTextLabel("", JUITextLeafType.H4);
		this.questionContainer	= new AUISideScroller(initialQuestion);
		this.buttonContainer	= new JUIFlowContainer<AUIKioskButton>(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		
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
	
	public setInquiryText(inquiry: string): void {
		
		let originalSize: number = 3.5;
		let htmlElement: HTMLElement = this.inquiryText.getHTMLElement();
		
		this.inquiryText.setText(inquiry);
		htmlElement.style.fontSize = "3.5em";
		
		while (htmlElement.clientHeight > htmlElement.clientHeight) {
			
			htmlElement.style.fontSize = (originalSize -= 0.1) + "em";
			
		}
		
	}
	
	public async nextQuestion(question: AUIQuestion<any>): Promise<void> {
		
		await this.questionContainer.transitionToRight(question);
		this.setInquiryText(question.getInquiryText());
	
	}
	
	public async previousQuestion(question: AUIQuestion<any>): Promise<void> {
	
		await this.questionContainer.transitionToLeft(question);
		this.setInquiryText(question.getInquiryText());
	
	}
	
	protected hasButton(button: AUIKioskButton): boolean {
		
		return this.currentButtons.has(button.getText());
		
	}
	
	protected addButton(button: AUIKioskButton): void {
	
		// TODO [4/30/19 @ 9:05 PM] - Finish the 'addButton' method.
	
	}
	
	protected removeButton(button: AUIKioskButton): void {
	
		// TODO [4/30/19 @ 9:05 PM] - Finish the 'removeButton' method.
	
	}
	
}

export default AUIKioskPage;