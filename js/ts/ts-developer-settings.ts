/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:06 PM -- May 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSDeveloperSettings {
	
	private shouldQuestionsAutoDone: boolean;
	
	private shouldContactCaptureAutoDone: boolean;
	
	private shouldFeedbackSessionsAutoDone: boolean;
	
	public constructor(developerMode: boolean) {
		
		this.shouldQuestionsAutoDone = true;
		this.shouldContactCaptureAutoDone = true;
		this.shouldFeedbackSessionsAutoDone = true;
		
	}
	
	public setQuestionAutoDoneBehavior(shouldQuestionsAutoDone: boolean): void {
		
		this.shouldQuestionsAutoDone = shouldQuestionsAutoDone;
		
	}
	
	public getQuestionAutoDoneBehavior(): boolean {
		
		return this.shouldQuestionsAutoDone;
		
	}
	
	public setContactCaptureAutoDoneBehavior(shouldContactCaptureAutoDone: boolean): void {
		
		this.shouldContactCaptureAutoDone = shouldContactCaptureAutoDone;
		
	}
	
	public getContactCaptureAutoDoneBehavior(): boolean {
		
		return this.shouldContactCaptureAutoDone;
		
	}
	
	public setFeedbackSessionAutoDoneBehavior(shouldFeedbackSessionsAutoDone: boolean): void {
		
		this.shouldFeedbackSessionsAutoDone = shouldFeedbackSessionsAutoDone;
		
	}
	
	public getFeedbackSessionAutoDoneBehavior(): boolean {
		
		return this.shouldFeedbackSessionsAutoDone;
		
	}
	
}

export default TSDeveloperSettings;