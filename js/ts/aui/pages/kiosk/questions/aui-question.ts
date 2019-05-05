/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:00 AM -- May 01st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIModule from "../../../../jui/jui-module.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import AFQuestionType from "../../../../af-structures/descriptors/af-question-type.js";
import JUISubscription from "../../../../jui/action/jui-subscription.js";
import JUINotifier from "../../../../jui/action/jui-notifier.js";
import JUIElement from "../../../../jui/elements/jui-element.js";
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
abstract class AUIQuestion<T extends JUIElement> extends JUIModule<T> {
	
	private readonly question: AFQuestion;
	
	private responseNotifier: JUINotifier<any>;
	
	private interactionNotifier: JUINotifier<void>;
	
	private timeoutID: number;
	
	protected constructor(question: AFQuestion, element: T) {
		
		super(element);
		
		this.question = question;
		this.responseNotifier = new JUINotifier<any>();
		this.interactionNotifier = new JUINotifier<void>();
		
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
		
		if (this.timeoutID !== undefined) clearTimeout(this.timeoutID);
		
		this.timeoutID = setTimeout((): void => {
			
			this.responseNotifier.notify(this.getResponse());
			
		}, this.getQuestionType().getTimeout());
		
	}
	
	protected formResponse(response: any): AFResponse {
		
		return new AFResponse(this.question, response, TSDate.fromNow());
		
	}
	
	public subscribeToResponse(handler: (response: any) => any): JUISubscription<any> {
		
		return this.responseNotifier.subscribe(handler);
		
	}
	
	public subscribeToInteraction(handler: () => any): JUISubscription<void> {
		
		return this.interactionNotifier.subscribe(handler);
		
	}
	
}

export default AUIQuestion;