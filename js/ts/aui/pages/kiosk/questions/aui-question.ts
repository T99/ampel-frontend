/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:00 AM -- May 01st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIModule } from "../../../../jui/jui-module.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import AFQuestionType from "../../../../af-structures/descriptors/af-question-type.js";
import JUINotifier from "../../../../jui/action/jui-notifier.js";
import { JUIElement } from "../../../../jui/elements/jui-element.js";
import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
import TSDate from "../../../../descriptors/time/ts-date.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export abstract class AUIQuestion<T extends JUIElement = JUIElement> extends JUIModule<T> {
	
	public readonly TYPE_IDENTITY: string = "aui-question";
	
	private readonly question: AFQuestion;
	
	private timeoutID: number;
	
	protected constructor(question: AFQuestion, element: T) {
		
		super(element);
		
		this.getModuleElement().addClasses(this.TYPE_IDENTITY);
		
		this.question = question;
		
	}
	
	public static createForQuestion(question: AFQuestion): AUIQuestion {
		
		return AFQuestionType.createQuestionElementFromQuestion(question);
		
	}
	
	public getInquiryText(): string {
		
		return this.question.getInquiry();
		
	}
	
	public getQuestionType(): AFQuestionType {
		
		return this.question.getType();
		
	}
	
	public abstract getResponse(): AFResponse;
	
	public abstract getRelevantKioskButtons(): AUIKioskButton[];
	
	protected interact(): void {
		
		this.getEventManager().QUESTION_INTERACTION_OCCURRED.notify();
		
		if (this.timeoutID !== undefined) clearTimeout(this.timeoutID);
		
		this.timeoutID = setTimeout((): void => {
			
			console.log("Question timeout has occurred.");
			// TODO [5/27/19 @ 3:39 AM] - We do actually need to respond...
			this.getEventManager().QUESTION_INTERACTION_TIMED_OUT.notify();
			// this.getEventManager().QUESTION_RESPONSE_READY.notify(this.getResponse());
			
		}, this.getQuestionType().getTimeout());
		
	}
	
	protected formResponse(response: any): AFResponse {
		
		return new AFResponse(this.question, response, TSDate.fromNow());
		
	}
	
	public abstract getEventManager(): AUIQuestion.AUIQuestionEvents;
	
}

export namespace AUIQuestion {
	
	export abstract class AUIQuestionEvents extends JUIModule.JUIModuleEvents {
		
		public abstract readonly QUESTION_FINALIZED: JUINotifier<void>;
		
		public abstract readonly QUESTION_RESPONSE_READY: JUINotifier<AFResponse>;
		
		public readonly QUESTION_INTERACTION_OCCURRED: JUINotifier<void>;
		
		public readonly QUESTION_INTERACTION_TIMED_OUT: JUINotifier<void>;
		
		protected constructor(element: AUIQuestion) {
			
			super(element);
			
			this.QUESTION_INTERACTION_OCCURRED = new JUINotifier<void>();
			this.QUESTION_INTERACTION_TIMED_OUT = new JUINotifier<void>();
			
		}
		
	}
	
}