/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:40 PM -- March 11th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIModule } from "../../../../jui/jui-module.js";
import JUISingleContainer from "../../../../jui/elements/containers/jui-single-container.js";
import { JUIElement } from "../../../../jui/elements/jui-element.js";
import JUIAlignmentContainer from "../../../../jui/elements/containers/single-containers/jui-alignment-container.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import AUIKioskButton from "../context-buttons/aui-kiosk-button.js";
import JUISubscription from "../../../../jui/action/jui-subscription.js";
import JUINotifier from "../../../../jui/action/jui-notifier.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import AUIKioskFolderElement from "../aui-kiosk-folder-element.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";

/**
 * An interface representing the required functionality of an Ampel question type.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class AUIQuestionElement<T extends JUIElement = JUIElement> extends JUIModule<JUISingleContainer<JUIElement>, HTMLElement> {
	
	protected readonly question: AFQuestion;
	
	private contentElement: T;
	
	private parentFolderElement: AUIKioskFolderElement;
	
	protected abstract interactionTimeout: number;
	
	private timeoutID: number;
	
	private responseNotifier: JUINotifier<AFResponse>;
	
	protected constructor(element: T, question: AFQuestion, parentFolderElement: AUIKioskFolderElement) {
		
		super(new JUIAlignmentContainer(JUIAlignment.CENTER));
		
		this.getModuleElement().addClasses("aui-question-element");
		
		this.contentElement = element;
		
		this.parentFolderElement = parentFolderElement;
		
		this.getModuleElement().setChild(this.contentElement);
		
		this.question = question;
		
		this.responseNotifier = new JUINotifier<AFResponse>();
		
	}
	
	protected getQuestionElement(): T {
		
		return this.contentElement;
		
	}
	
	public abstract getResponse(): AFResponse;
	
	public interact(): void {
		
		this.parentFolderElement.interact();
		
		if (this.timeoutID !== undefined) clearTimeout(this.timeoutID);
		
		this.timeoutID = setTimeout(() => {
			
			this.responseNotifier.notify(this.getResponse());
			
		}, this.interactionTimeout);
		
	}
	
	public getResponseSubscription(handler: (notification: AFResponse) => void): JUISubscription<AFResponse> {
		
		return this.responseNotifier.subscribe(handler);
		
	}
	
	public abstract getRelevantKioskButtons(): AUIKioskButton[];
	
}

export default AUIQuestionElement;