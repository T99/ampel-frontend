/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:31 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import JUIScrollContainer from "../../../../jui/elements/single-containers/jui-scroll-container.js";
import JUIFlowContainer from "../../../../jui/elements/multi-containers/jui-flow-container.js";
import AUITextLabel from "../../../global/aui-text-label.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import TSArrayList from "../../../../structures/implementations/list/ts-array-list.js";
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
class AUISATAQuestion extends AUIQuestion<JUIScrollContainer<JUIFlowContainer<AUITextLabel>>> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-sata-question";
	
	protected interactionTimeout: number = 3000;
	
	private verticalContainer: JUIFlowContainer<AUISelectableBox>;
	
	private currentlySelected: TSArrayList<string>;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIScrollContainer(true, false));
		
		this.verticalContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		
		this.currentlySelected = new TSArrayList<string>();
		
		this.element.setChild(this.verticalContainer);
		
		for (let option of question.getOptions().entries()) {
			
			let optionID: string = option[0];
			let optionText: string = option[1];
			
			let selectable: AUISelectableBox = new AUISelectableBox(optionText, optionID, AFQuestionType.SELECT_ALL_THAT_APPLY);
			
			selectable.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
				
				this.interact();
				
				selectable.setSelected(!selectable.isSelected());
				
				if (this.currentlySelected.contains(optionID)) {
					
					if (selectable.hasClass("selected")) selectable.removeClasses("selected");
					this.currentlySelected.remove(optionID);
					
				} else {
					
					if (!selectable.hasClass("selected")) selectable.addClasses("selected");
					this.currentlySelected.add(optionID);
					
				}
				
			});
			
			this.verticalContainer.addChild(selectable);
			
		}
		
		this.element.addClasses(this.TYPE_IDENTITY);
	
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.currentlySelected.toArray());
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
}

export default AUISATAQuestion;