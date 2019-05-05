/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:10 AM -- March 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFQuestion from "../structures/af-question.js";
import TSDate from "../../descriptors/time/ts-date.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFResponse {

	private question: AFQuestion;
	
	private response: any;
	
	private submittedAt: TSDate;
	
	public constructor(question: AFQuestion, response: any, submittedAt: TSDate) {
		
		this.question = question;
		this.response = response;
		this.submittedAt = submittedAt;
		
	}
	
	public getQuestion(): AFQuestion {
		
		return this.question;
		
	}
	
	public getResponse(): any {
		
		return this.response;
		
	}
	
	public getSubmittedAtTime(): TSDate {
		
		return this.submittedAt;
		
	}

}

export default AFResponse;