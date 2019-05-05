/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:33 PM -- April 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskPage from "../aui/pages/kiosk/aui-kiosk-page.js";
import TSArrayList from "../structures/implementations/list/ts-array-list.js";
import AFFolder from "../af-structures/structures/af-folder.js";

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
	
	private questionList: TSArrayList;
	
	private constructor(folder: AFFolder) {
		
		this.currentFolder = folder;
		
	}
	
	public async create(folder: AFFolder): Promise<AFKioskActivity> {
		
		if (folder.getQuestionListing().size() === 0) {
			
			throw new Error("ERR | Attempted to start the kiosk with an empty folder.");
			
		} else {
			
			let kioskActivity: AFKioskActivity = new AFKioskActivity(folder);
			
			await kioskActivity.reinitializeQuestionList();
			
			kioskActivity.kioskPage = new AUIKioskPage(this.questionList.get(0));
			
			return kioskActivity;
			
		}
		
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