/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:34 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIQuestionElement from "../../kiosk-old/question-types/aui-question-element.js";
import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import JUIScrollContainer from "../../../../jui/elements/single-containers/jui-scroll-container.js";
import AUITextLabel from "../../../global/aui-text-label.js";
import JUIFlowContainer from "../../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import TSDate from "../../../../descriptors/time/ts-date.js";
import AUIKioskFolderElement from "../../kiosk-old/aui-kiosk-folder-element.js";
import AUISelectableBox from "../../kiosk-old/question-types/helper-elements/aui-selectable-box.js";
import AFQuestionType from "../../../../af-structures/descriptors/af-question-type.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
import AUIQuestion from "./aui-question.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIMultipleChoiceQuestion extends AUIQuestion<JUIScrollContainer<JUIFlowContainer<AUITextLabel>>> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-multiple-choice-question";
	
	protected interactionTimeout: number = 3000;
	
	private verticalContainer: JUIFlowContainer<AUISelectableBox>;
	
	private currentlySelectedElement: AUITextLabel;
	
	private currentlySelectedID: string;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIScrollContainer(true, false));
		
		this.verticalContainer = new JUIFlowContainer<AUISelectableBox>(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		
		this.element.setChild(this.verticalContainer);
		
		for (let option of question.getOptions().entries()) {
			
			let optionID: string = option[0];
			let optionText: string = option[1];
			
			let selectable: AUISelectableBox = new AUISelectableBox(optionText, optionID, AFQuestionType.MULTIPLE_CHOICE);
			
			selectable.setFocusability(true);
			
			selectable.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
				
				this.interact();
				
				for (let item of this.verticalContainer.getAllChildren()) item.setSelected(false);
				
				selectable.setSelected(true);
				
				this.currentlySelectedID = optionID;
				this.currentlySelectedElement = selectable;
				
				this.currentlySelectedElement.addClasses("selected");
				
			});
			
			this.verticalContainer.addChild(selectable);
			
		}
		
		this.element.addClasses(this.TYPE_IDENTITY);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.currentlySelectedID);
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
}

export default AUIMultipleChoiceQuestion;