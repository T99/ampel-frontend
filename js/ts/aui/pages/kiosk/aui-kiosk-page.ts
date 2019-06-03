/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:17 PM -- April 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIFlowContainer from "../../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIPage from "../../../jui/jui-page.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../../../jui/elements/containers/single-containers/jui-alignment-container.js";
import AUIKioskTextLabel from "../kiosk-old/aui-kiosk-text-label.js";
import AUIKioskButton from "../kiosk-old/context-buttons/aui-kiosk-button.js";
import AUISideScroller from "../../global/aui-side-scroller.js";
import { AUIQuestion } from "./questions/aui-question.js";
import JUIProgressLeaf from "../../../jui/elements/leaves/content-leaves/jui-progress-leaf.js";
import { JUIContainerable } from "../../../jui/jui-containerable.js";
import JUISubscription from "../../../jui/action/jui-subscription.js";
import JUIStackContainer from "../../../jui/elements/containers/multi-containers/jui-stack-container.js";
import JUITextLeafType from "../../../jui/types/element-types/content-leaves/jui-text-leaf-type.js";

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
	
	private inquiryTextContainer: JUIAlignmentContainer<JUIAlignmentContainer<AUIKioskTextLabel>>;
	
	private inquiryTextWrapper: JUIAlignmentContainer<AUIKioskTextLabel>;
	
	private inquiryText: AUIKioskTextLabel;
	
	private questionContainer: AUISideScroller<AUIQuestion>;
	
	private progressBar: JUIProgressLeaf;
	
	private progressBarText: AUIKioskTextLabel;
	
	private buttonContainer: JUIFlowContainer;
	
	private backButtonWrapper: JUIAlignmentContainer<AUIKioskButton>;
	
	private skipButtonWrapper: JUIAlignmentContainer<AUIKioskButton>;
	
	private progressBarWrapper: JUIAlignmentContainer<JUIStackContainer>;
	
	private doneButtonWrapper: JUIAlignmentContainer<AUIKioskButton>;
	
	private expectedFolderSize: number;
	
	private currentButtons: Map<string, AUIKioskButton>;
	
	public constructor(initialQuestion: AUIQuestion, expectedFolderSize: number) {
		
		super();
		
		this.addClasses(this.TYPE_IDENTITY);
		
		this.expectedFolderSize = expectedFolderSize;
		
		this.mainFlowContainer		= new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		this.inquiryTextContainer	= new JUIAlignmentContainer<JUIAlignmentContainer<AUIKioskTextLabel>>(JUIAlignment.CENTER);
		this.inquiryTextWrapper		= new JUIAlignmentContainer<AUIKioskTextLabel>(JUIAlignment.CENTER);
		this.inquiryText			= new AUIKioskTextLabel("", JUITextLeafType.H4);
		this.questionContainer		= new AUISideScroller(initialQuestion);
		this.progressBar			= new JUIProgressLeaf(expectedFolderSize, 1);
		this.progressBarText		= new AUIKioskTextLabel(1 + " of " + expectedFolderSize);
		this.buttonContainer		= new JUIFlowContainer<AUIKioskButton>(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		this.backButtonWrapper		= this.wrapElement<AUIKioskButton>(new AUIKioskButton("Back"));
		this.skipButtonWrapper		= this.wrapElement<AUIKioskButton>(new AUIKioskButton("Skip"));
		this.progressBarWrapper		= this.wrapElement<JUIStackContainer>(new JUIStackContainer(JUIAlignment.CENTER));
		this.doneButtonWrapper		= this.wrapElement<AUIKioskButton>(new AUIKioskButton("Done"));
		
		this.inquiryTextContainer.addClasses("inquiry-text-container");
		this.inquiryTextWrapper.addClasses("inquiry-text-wrapper");
		this.questionContainer.addClasses("question-container");
		this.buttonContainer.addClasses("button-container");
		this.backButtonWrapper.addClasses("back-button-wrapper");
		this.skipButtonWrapper.addClasses("skip-button-wrapper");
		this.progressBarWrapper.addClasses("progress-bar-wrapper");
		this.doneButtonWrapper.addClasses("done-button-wrapper");
		
		this.backButtonWrapper.getChild().setIsGreyedOut(true);
		
		this.progressBarWrapper.getChild().addStackedChild(this.progressBar);
		this.progressBarWrapper.getChild().addStackedChild(this.progressBarText);
		this.buttonContainer.addChildren(this.backButtonWrapper, this.skipButtonWrapper, this.progressBarWrapper, this.doneButtonWrapper);
		this.inquiryTextWrapper.setChild(this.inquiryText);
		this.inquiryTextContainer.setChild(this.inquiryTextWrapper);
		this.mainFlowContainer.addChildren(this.inquiryTextContainer, this.questionContainer, this.buttonContainer);
		this.setChild(this.mainFlowContainer);
		
		this.inquiryText.getEventManager().ELEMENT_ADDED_TO_PAGE.subscribe(() => this.setInquiryText(initialQuestion.getInquiryText()));
		window.addEventListener("resize", () => {
			
			console.log("window resize fired");
			this.resizeInquiryText();
			
		});
		
	}
	
	private wrapElement<T extends JUIContainerable>(element: T): JUIAlignmentContainer<T> {
		
		let container: JUIAlignmentContainer<T> = new JUIAlignmentContainer<T>(JUIAlignment.CENTER);
		container.setChild(element);
		return container;
		
	}
	
	public setInquiryText(inquiry: string): void {
		
		this.inquiryText.setText(inquiry);
		this.resizeInquiryText();
		
	}
	
	public resizeInquiryText(): void {
		
		let originalSize: number = 3.5;
		let textElement: HTMLElement = this.inquiryText.getElement();
		let textWrapper: HTMLElement = this.inquiryTextWrapper.getElement();
		let textContainer: HTMLElement = this.inquiryTextContainer.getElement();
		
		textElement.style.fontSize = "3.5em";
		
		while (textWrapper.scrollHeight > textContainer.clientHeight) {

			textElement.style.fontSize = (originalSize -= 0.1) + "em";

		}
		
	}
	
	public async nextQuestion(question: AUIQuestion, folderProgress: number): Promise<void> {
		
		if (folderProgress > 1) this.backButtonWrapper.getChild().setIsGreyedOut(false);
		this.setInquiryText(question.getInquiryText());
		this.progressBar.animateToValue(folderProgress, 4000);
		this.progressBarText.setText(folderProgress + " of " + this.expectedFolderSize);
		await this.questionContainer.transitionToRight(question);
	
	}
	
	public async previousQuestion(question: AUIQuestion, folderProgress: number): Promise<void> {
	
		if (folderProgress <= 1) this.backButtonWrapper.getChild().setIsGreyedOut(true);
		this.setInquiryText(question.getInquiryText());
		this.progressBar.animateToValue(folderProgress, 4000);
		this.progressBarText.setText(folderProgress + " of " + this.expectedFolderSize);
		await this.questionContainer.transitionToLeft(question);
	
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
	
	public subscribeToBackButton(handler: () => any): JUISubscription<any> {
		
		return this.backButtonWrapper.getChild().getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(handler);
		
	}
	
	public subscribeToSkipButton(handler: () => any): JUISubscription<any> {
		
		return this.skipButtonWrapper.getChild().getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(handler);
		
	}
	
	public subscribeToDoneButton(handler: () => any): JUISubscription<any> {
		
		return this.doneButtonWrapper.getChild().getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(handler);
		
	}
	
}

export default AUIKioskPage;