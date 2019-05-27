/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:23 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIPage from "../../../jui/jui-page.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import AUIKioskTextLabel from "./aui-kiosk-text-label.js";
import JUIFlowContainer from "../../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import AFFolder from "../../../af-structures/structures/af-folder.js";
import AUIKioskFolderElement from "./aui-kiosk-folder-element.js";
import AUIKioskButton from "./context-buttons/aui-kiosk-button.js";
import AFQuestion from "../../../af-structures/structures/af-question.js";
import JUIAlignmentContainer from "../../../jui/elements/containers/single-containers/jui-alignment-container.js";
import JUITextLeafType from "../../../jui/types/element-types/content-leaves/jui-text-leaf-type.js";

/**
 * The page shown while in 'kiosk' mode.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskPageOld extends JUIPage {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-kiosk-page-old";
	
	private flowContainer: JUIFlowContainer;
	
	private textElementWrapper: JUIAlignmentContainer<AUIKioskTextLabel>;
	
	private textElement: AUIKioskTextLabel;
	
	private folderElement: AUIKioskFolderElement;
	
	private buttonContainer: JUIFlowContainer;
	
	private currentButtons: AUIKioskButton[] = [];
	
	public constructor(folder: AFFolder) {
		
		super(JUIAlignment.CENTER);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.flowContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		
		this.folderElement = new AUIKioskFolderElement(this, folder);
		
		this.textElementWrapper = new JUIAlignmentContainer(JUIAlignment.CENTER);
		
		this.textElement = new AUIKioskTextLabel("", JUITextLeafType.H4);
		
		this.textElementWrapper.setChild(this.textElement);
		
		this.buttonContainer = new JUIFlowContainer<AUIKioskButton>(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		
		this.buttonContainer.addClasses("kiosk-button-container");
		
		this.refreshButtons();
		
		this.folderElement.subscribeToQuestionChangeNotifier((question: AFQuestion): void => {
			
			this.refreshButtons();
			this.setInquiryText(question.getInquiry());
			
		});
		
		// TODO [3/29/19 @ 1:26 PM] - Use EventManagers for this.
		window.addEventListener("resize", (): void => {
			
			console.log("Firing onresize");
			this.setInquiryText(this.folderElement.getCurrentQuestion().getInquiry());
			
		});
		
		this.flowContainer.addChildren(this.textElementWrapper, this.folderElement, this.buttonContainer);
		
		this.setChild(this.flowContainer);
		
		// ugh
		setTimeout(() => {
			
			this.setInquiryText(this.folderElement.getCurrentQuestion().getInquiry());
			
		}, 500);
		
	}
	
	private setInquiryText(inquiry: string): void {
		
		let originalSize: number = 3.5;
		
		this.textElement.setText(inquiry);
		this.textElement.getElement().style.fontSize = "3.5em";
		
		while (this.textElement.getElement().clientHeight > this.textElementWrapper.getElement().clientHeight) {
			
			this.textElement.getElement().style.fontSize = (originalSize -= 0.1) + "em";
			
		}
		
	}
	
	private refreshButtons(): void {
		
		let relevantButtons: AUIKioskButton[] = this.folderElement.getRelevantKioskButtons();
		
		let currentButtons: AUIKioskButton[] = this.currentButtons;
		
		let fewer: AUIKioskButton[] = currentButtons.filter((button: AUIKioskButton) => !relevantButtons.includes(button));
		let more: AUIKioskButton[] = relevantButtons.filter((button: AUIKioskButton) => !currentButtons.includes(button));
		
		fewer.forEach((element: AUIKioskButton): void => {
			
			this.buttonContainer.removeChild(element.getID());
			this.currentButtons.removeElement(element);
		
		});
		
		more.forEach((element: AUIKioskButton): void => {
			
			let nextElement: AUIKioskButton = relevantButtons[relevantButtons.indexOf(element) + 1];
			
			if ((nextElement !== undefined) && (this.buttonContainer.hasChild(nextElement.getID()))) {

				this.buttonContainer.addBefore(element, nextElement);

			} else this.buttonContainer.addChild(element);
			
			this.currentButtons.push(element);
		
		});
		
	}
	
}

export default AUIKioskPageOld;