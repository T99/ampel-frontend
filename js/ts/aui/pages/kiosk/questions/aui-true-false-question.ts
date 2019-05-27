/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:53 PM -- February 22nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIImageLeaf from "../../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import JUIFlowContainer from "../../../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIRotationShakeAnimation from "../../../../jui/animations/animations/jui-rotation-shake-animation.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
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
export class AUITrueFalseQuestion extends AUIQuestion<JUIFlowContainer> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-true-false-question";
	
	private currentResponse: boolean;
	
	protected readonly events: AUITrueFalseQuestion.AUITrueFalseQuestionEvents;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER));
		
		this.getModuleElement().addClasses(this.TYPE_IDENTITY);
		
		let yesImage: JUIImageLeaf = new JUIImageLeaf("/img/question-types/true-false/yes-rasterized-cropped.png");
		let noImage: JUIImageLeaf = new JUIImageLeaf("/img/question-types/true-false/no-rasterized-cropped.png");
		this.events = new AUITrueFalseQuestion.AUITrueFalseQuestionEvents(this);
		
		yesImage.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
		
			this.interact();
			this.currentResponse = true;
			(new JUIRotationShakeAnimation(yesImage)).play();
		
		});
		
		noImage.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			this.interact();
			this.currentResponse = false;
			(new JUIRotationShakeAnimation(noImage)).play();
			
		});
		
		this.getModuleElement().addChildren(yesImage, noImage);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.currentResponse);
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
	public getEventManager(): AUITrueFalseQuestion.AUITrueFalseQuestionEvents {
		
		return this.events;
		
	}
	
}

export namespace AUITrueFalseQuestion {
	
	export class AUITrueFalseQuestionEvents extends AUIQuestion.AUIQuestionEvents {
		
		public readonly QUESTION_FINALIZED: JUINotifier<void>;
		
		public readonly QUESTION_RESPONSE_READY: JUINotifier<AFResponse>;
		
		public constructor(element: AUITrueFalseQuestion) {
			
			super(element);
			
		}
		
	}
	
}