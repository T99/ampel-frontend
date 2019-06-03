/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:49 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIModule } from "../../../jui/jui-module.js";
import JUIFlowContainer from "../../../jui/elements/containers/multi-containers/jui-flow-container.js";
import AUIQuestionElement from "./question-types/aui-question-element.js";
import AFFolder from "../../../af-structures/structures/af-folder.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import TSArrayList from "../../../util/structures/implementations/list/ts-array-list.js";
import AFQuestion from "../../../af-structures/structures/af-question.js";
import AUIKioskButton from "./context-buttons/aui-kiosk-button.js";
import JUITransition from "../../../jui/animations/jui-transition.js";
import JUINamedTransitionFunction from "../../../jui/animations/transition-functions/jui-named-transition-function.js";
import JUINotifier from "../../../jui/action/jui-notifier.js";
import JUISubscription from "../../../jui/action/jui-subscription.js";
import TSDate from "../../../descriptors/time/ts-date.js";
import AFAPIResponseAccessor from "../../../net/accessors/af-api-response-accessor.js";
import AUIKioskPageOld from "./aui-kiosk-page-old.js";
import AFFeedbackSession from "../../../af-structures/feedback-session/af-feedback-session.js";
import AFResponse from "../../../af-structures/feedback-session/af-response.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskFolderElement extends JUIModule<JUIFlowContainer<AUIQuestionElement>> {
	
	private static readonly TIMEOUT: number = 7000;
	
	private folder: AFFolder;
	
	private questionList: TSArrayList<AFQuestion>;
	
	private questionIndex: number = 0;
	
	private currentQuestionElement: AUIQuestionElement;
	
	private feedbackSession: AFFeedbackSession;
	
	private backButton: AUIKioskButton;
	
	private skipButton: AUIKioskButton;
	
	private doneButton: AUIKioskButton;
	
	private questionChangeNotifier: JUINotifier<AFQuestion>;
	
	private timeoutID: number;
	
	private finalized: boolean = false;
	
	private currentResponseSubscription: JUISubscription<AFResponse>;
	
	// private parentPage: AUIKioskPageOld;
	
	public constructor(page: AUIKioskPageOld, folder: AFFolder) {
		
		super(new JUIFlowContainer<AUIQuestionElement>(JUIDirection.TO_RIGHT, JUIAlignment.CENTER));
		
		this.getModuleElement().addClasses("aui-kiosk-folder-element");
		
		// this.parentPage = page;
		this.folder = folder;
		this.questionList = new TSArrayList<AFQuestion>(...folder.getQuestionListing().getAll());
		if (this.folder.isShuffled()) this.questionList.shuffle();
		
		// this.currentQuestionElement = AFQuestionTypes.createQuestionElementFromQuestion(this.getCurrentQuestion());
		
		this.feedbackSession = new AFFeedbackSession(folder, TSDate.fromNow());
		
		this.currentResponseSubscription = this.currentQuestionElement.getResponseSubscription((notification: AFResponse) => {
			
			this.feedbackSession.addResponse(notification);
			this.next();
			
		});
		
		this.backButton = new AUIKioskButton("Back");
		this.skipButton = new AUIKioskButton("Skip");
		this.doneButton = new AUIKioskButton("Done");
		
		this.questionChangeNotifier = new JUINotifier<AFQuestion>();
		
		this.backButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.back());
		this.skipButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.next());
		this.doneButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.next());
		
		this.getModuleElement().addChildren(this.currentQuestionElement);
		
	}
	
	public subscribeToQuestionChangeNotifier(handler: (question: AFQuestion) => void): JUISubscription<AFQuestion> {
		
		return this.questionChangeNotifier.subscribe(handler);
		
	}
	
	public getCurrentQuestion(): AFQuestion {
		
		return this.questionList.get(this.questionIndex);
		
	}
	
	public interact(): void {
		
		if (this.timeoutID !== undefined) clearTimeout(this.timeoutID);
		
		this.timeoutID = setTimeout((): void => {
			
			this.finalizeSession();
			
		}, AUIKioskFolderElement.TIMEOUT);
		
	}
	
	protected async finalizeSession(): Promise<any> {
		
		if (!this.finalized) {
			
			this.finalized = true;
			
			if (this.feedbackSession.hasResponses()) {
				
				let apiResponse: any = await AFAPIResponseAccessor.submit(
					this.feedbackSession.toJSON(), session.getAmpelSession().getToken()
				);
				
				console.log(apiResponse);
				
			}
			
			// await JUIWorld.getInstance().goToPageRight(new AUIKioskThankYouPage(this.folder));
			
		}
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		let relevantButtons: AUIKioskButton[] = [];
		
		if (this.questionIndex > 0) relevantButtons.push(this.backButton);
		
		relevantButtons.push(...this.currentQuestionElement.getRelevantKioskButtons());
		
		relevantButtons.push(this.skipButton);
		relevantButtons.push(this.doneButton);
		
		return relevantButtons;
		
	}
	
	public next(): void {
		
		if (this.questionList.size() > (this.questionIndex + 1)) {
			
			let oldQuestionElement: AUIQuestionElement = this.currentQuestionElement;
			// this.currentQuestionElement = AFQuestionTypes.createQuestionElementFromQuestion(this.questionList.get(++this.questionIndex), this);
			this.currentResponseSubscription.unsubscribe();
			
			let transition: JUITransition = new JUITransition(
				2000,
				JUINamedTransitionFunction.EASE_IN_OUT,
				(progress: number): void => {
					
					this.getModuleElement().getElement().style.transform = "translateX(" + progress + "vw)";
					
				},
				[this.getModuleElement()],
				0,
				-100
			);
			
			transition.addPreAction(() => {
				
				this.questionChangeNotifier.notify(this.getCurrentQuestion());
				
				this.getModuleElement().setAlignment(JUIAlignment.LEFT);
				this.getModuleElement().addChildren(this.currentQuestionElement);
				
				this.currentResponseSubscription = this.currentQuestionElement.getResponseSubscription((notification: AFResponse) => {
					
					this.feedbackSession.addResponse(notification);
					this.next();
					this.currentResponseSubscription.unsubscribe();
					
				});
				
			});
			
			transition.addPostAction(() => {
				
				this.getModuleElement().setAlignment(JUIAlignment.RIGHT);
				this.getModuleElement().removeChild(oldQuestionElement.getID());
				this.getModuleElement().setAlignment(JUIAlignment.CENTER);
				this.getModuleElement().getElement().style.transform = "";
				this.interact();
				
			});
			
			transition.play();
			
		} else this.finalizeSession();
		
	}
	
	public back(): void {
		
		if (0 <= (this.questionIndex - 1)) {
			
			let oldQuestionElement: AUIQuestionElement = this.currentQuestionElement;
			// this.currentQuestionElement = AFQuestionTypes.createQuestionElementFromQuestion(this.questionList.get(--this.questionIndex), this);
			this.currentResponseSubscription.unsubscribe();
			
			let transition: JUITransition = new JUITransition(
				2000,
				JUINamedTransitionFunction.EASE_IN_OUT,
				(progress: number): void => {
					
					this.getModuleElement().getElement().style.transform = "translateX(" + progress + "vw)";
					
				},
				[this.getModuleElement()],
				0,
				100
			);
			
			transition.addPreAction(() => {
				
				this.questionChangeNotifier.notify(this.getCurrentQuestion());
				
				this.getModuleElement().setAlignment(JUIAlignment.RIGHT);
				this.getModuleElement().addBefore(this.currentQuestionElement, oldQuestionElement);
				
				this.feedbackSession.undoResponse();
				
				this.currentResponseSubscription = this.currentQuestionElement.getResponseSubscription((notification: AFResponse) => {
					
					this.feedbackSession.addResponse(notification);
					this.next();
					this.currentResponseSubscription.unsubscribe();
					
				});
				
			});
			
			transition.addPostAction(() => {
				
				this.getModuleElement().setAlignment(JUIAlignment.LEFT);
				this.getModuleElement().removeChild(oldQuestionElement.getID());
				this.getModuleElement().setAlignment(JUIAlignment.CENTER);
				this.getModuleElement().getElement().style.transform = "";
				this.interact();
				
			});
			
			transition.play();
			
		}
		
	}
	
}

export default AUIKioskFolderElement;