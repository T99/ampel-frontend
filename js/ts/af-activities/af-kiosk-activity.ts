/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:33 PM -- April 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskPage from "../aui/pages/kiosk/aui-kiosk-page.js";
import TSArrayList from "../util/structures/implementations/list/ts-array-list.js";
import AFFolder from "../af-structures/structures/af-folder.js";
import AFQuestion from "../af-structures/structures/af-question.js";
import JUIWorld from "../jui/jui-world.js";
import AUIKioskThankYouPage from "../aui/pages/thank-you/aui-kiosk-thank-you-page.js";
import { AUIQuestion } from "../aui/pages/kiosk/questions/aui-question.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFKioskActivity {
	
	private kioskPage: AUIKioskPage;
	
	private currentFolder: AFFolder;
	
	private upcomingFolder: AFFolder;
	
	private questionList: TSArrayList<AFQuestion>;
	
	private currentQuestionIndex: number;
	
	private timeoutID: number;
	
	private constructor(folder: AFFolder) {
		
		this.currentFolder = folder;
		this.questionList = new TSArrayList<AFQuestion>();
		this.currentQuestionIndex = 0;
		
	}
	
	public static async create(folder: AFFolder): Promise<AFKioskActivity> {
		
		if (folder.getQuestionListing().size() === 0) {
			
			throw new Error("ERR | Attempted to start the kiosk with an empty folder.");
			
		} else {
			
			let kioskActivity: AFKioskActivity = new AFKioskActivity(folder);
			
			await kioskActivity.renew();
			
			return kioskActivity;
			
		}
		
	}
	
	private static async setupKioskPage(activity: AFKioskActivity): Promise<AUIKioskPage> {
		
		let initialQuestion: AUIQuestion = AUIQuestion.createForQuestion(activity.questionList.get(0));
		
		let kioskPage: AUIKioskPage = new AUIKioskPage(
			initialQuestion,
			activity.questionList.size()
		);
		
		initialQuestion.getEventManager().QUESTION_INTERACTION_OCCURRED.subscribe(() => activity.interact());
		initialQuestion.getEventManager().QUESTION_INTERACTION_TIMED_OUT.subscribe(() => activity.goToNextQuestion());
		kioskPage.subscribeToDoneButton((): any => activity.goToNextQuestion());
		kioskPage.subscribeToBackButton((): any => activity.goToPreviousQuestion());
		
		return kioskPage;
		
	}
	
	private interact(): void {
		
		if (this.timeoutID !== undefined) clearTimeout(this.timeoutID);
		
		this.timeoutID = setTimeout((): void => {
			
			AUIKioskThankYouPage.sayThankYou().then(() => {
				
				this.renew();
				
			});
			
		}, 7000);
		
	}
	
	private async goToNextQuestion(): Promise<void> {
		
		if (this.questionList.size() - 1 > this.currentQuestionIndex) {
			
			let question: AUIQuestion = AUIQuestion.createForQuestion(this.questionList.get(++this.currentQuestionIndex));
			let folderProgress: number = this.currentQuestionIndex + 1;
			
			question.getEventManager().QUESTION_INTERACTION_OCCURRED.subscribe(() => this.interact());
			question.getEventManager().QUESTION_INTERACTION_TIMED_OUT.subscribe(() => this.goToNextQuestion());
			
			await this.kioskPage.nextQuestion(question, folderProgress);
			
		} else {
			
			// JUIWorld.getInstance().goToPageRight(new AUIContactCapturePage());
			
			AUIKioskThankYouPage.sayThankYou().then(() => {
				
				this.renew();
				
			});
			
		}
		
	}
	
	private async goToPreviousQuestion(): Promise<void> {
		
		if (this.currentQuestionIndex > 0) {
			
			await this.kioskPage.previousQuestion(
				AUIQuestion.createForQuestion(this.questionList.get(--this.currentQuestionIndex)),
				this.currentQuestionIndex + 1
			);
			
		}
		
	}
	
	private async renew(): Promise<void> {
		
		await this.reinitializeQuestionList();
		
		this.kioskPage = await AFKioskActivity.setupKioskPage(this);
		
		await JUIWorld.getInstance().goToPageRight(this.kioskPage);
		
		this.kioskPage.resizeInquiryText();
		
	}
	
	public queueFolderChange(folder: AFFolder): void {
		
		this.upcomingFolder = folder;
		
	}
	
	protected async reinitializeQuestionList(): Promise<void> {
		
		if (this.upcomingFolder !== undefined) {
			
			this.currentFolder = this.upcomingFolder;
			this.upcomingFolder = undefined;
			
		}
		
		await this.currentFolder.deepRefresh();
		
		this.questionList.clear();
		
		this.questionList.addAll(this.currentFolder.getQuestionListing().getAll());
		
		if (this.currentFolder.isShuffled()) this.questionList.shuffle();
		
	}
	
}

export default AFKioskActivity;