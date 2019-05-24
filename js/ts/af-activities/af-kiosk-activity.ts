/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:33 PM -- April 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskPage from "../aui/pages/kiosk/aui-kiosk-page.js";
import TSArrayList from "../util/structures/implementations/list/ts-array-list.js";
import AFFolder from "../af-structures/structures/af-folder.js";
import AFQuestion from "../af-structures/structures/af-question.js";
import AUIQuestion from "../aui/pages/kiosk/questions/aui-question.js";
import JUIWorld from "../jui/jui-world.js";
import AUIKioskThankYouPage from "../aui/pages/thank-you/aui-kiosk-thank-you-page.js";
import AUIContactCapturePage from "../aui/pages/contact-capture/aui-contact-capture-page.js";

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
		
		let kioskPage: AUIKioskPage = new AUIKioskPage(
			AUIQuestion.createForQuestion(activity.questionList.get(0)),
			activity.questionList.size()
		);
		
		kioskPage.subscribeToBackButton((): void => console.log("Back button clicked."));
		kioskPage.subscribeToSkipButton((): void => console.log("Skip button clicked."));
		kioskPage.subscribeToDoneButton((): void => console.log("Done button clicked."));
		
		kioskPage.subscribeToDoneButton((): void => {
			
			if (activity.questionList.size() - 1 > activity.currentQuestionIndex) {
				
				kioskPage.nextQuestion(
					AUIQuestion.createForQuestion(activity.questionList.get(++activity.currentQuestionIndex)),
					activity.currentQuestionIndex + 1
				);
				
			} else {
				
				// JUIWorld.getInstance().goToPageRight(new AUIContactCapturePage());
				
				AUIKioskThankYouPage.sayThankYou().then(() => {

					activity.renew();

				});
				
			}
			
		});
		
		kioskPage.subscribeToBackButton((): void => {
			
			if (activity.currentQuestionIndex > 0) {
				
				kioskPage.previousQuestion(
					AUIQuestion.createForQuestion(activity.questionList.get(--activity.currentQuestionIndex)),
					activity.currentQuestionIndex + 1
				);
				
			}
			
		});
		
		return kioskPage;
		
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