/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:34 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import JUIScrollContainer from "../../../../jui/elements/containers/single-containers/jui-scroll-container.js";
import JUIFlowContainer from "../../../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import AUISelectableBox from "../../kiosk-old/question-types/helper-elements/aui-selectable-box.js";
import AFQuestionType from "../../../../af-structures/descriptors/af-question-type.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
import { AUIQuestion } from "./aui-question.js";
import JUINotifier from "../../../../jui/action/jui-notifier.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AUIMultipleChoiceQuestion extends AUIQuestion<JUIScrollContainer<JUIFlowContainer<AUISelectableBox>>> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-multiple-choice-question";
	
	protected interactionTimeout: number = 3000;
	
	private verticalContainer: JUIFlowContainer<AUISelectableBox>;
	
	private currentlySelectedElement: AUISelectableBox;
	
	private currentlySelectedID: string;
	
	protected readonly events: AUIMultipleChoiceQuestion.AUIMultipleChoiceQuestionEvents;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIScrollContainer(true, false));
		
		this.verticalContainer = new JUIFlowContainer<AUISelectableBox>(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		this.events = new AUIMultipleChoiceQuestion.AUIMultipleChoiceQuestionEvents(this);
		
		this.getModuleElement().setChild(this.verticalContainer);
		
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
		
		this.getModuleElement().addClasses(this.TYPE_IDENTITY);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.currentlySelectedID);
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
	public getEventManager(): AUIMultipleChoiceQuestion.AUIMultipleChoiceQuestionEvents {
		
		return this.events;
		
	}
	
}

export namespace AUIMultipleChoiceQuestion {
	
	export class AUIMultipleChoiceQuestionEvents extends AUIQuestion.AUIQuestionEvents {
		
		public readonly QUESTION_FINALIZED: JUINotifier<void>;
		
		public readonly QUESTION_RESPONSE_READY: JUINotifier<AFResponse>;
		
		public constructor(element: AUIMultipleChoiceQuestion) {
			
			super(element);
			
		}
		
	}
	
}