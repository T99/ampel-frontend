/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:32 AM -- February 05th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFQuestionType from "../descriptors/af-question-type.js";
import AFStructure from "../af-structure.js";
import AFIDObject from "../af-id-object.js";
import AFClientInformation from "../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../information-contexts/af-organization-information.js";
import AFClient from "./af-client.js";
import AFOrganization from "./af-organization.js";
import AFQuestionResponseStructure from "../../net/response-structures/common/af-question-response-structure.js";
import AFAPIQuestionAccessor from "../../net/accessors/af-api-question-accessor.js";
import AFSession from "../af-session.js";

type Option = {
	
	id: string;
	value: string;
	
};

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFQuestion extends AFStructure<AFQuestion> implements AFIDObject, AFClientInformation, AFOrganizationInformation {
	
	private id: string;
	
	private inquiry: string;
	
	private type: AFQuestionType;
	
	private options: Map<string, string>;
	
	private organization: AFOrganization;
	
	/**
	 * Counts the number of folders that this question resides in. Used to determine whether or not this question has
	 * been placed in any folder.
	 */
	private placed: number;
	
	protected constructor(organization: AFOrganization) {
		
		super(false);
		
		this.organization = organization;
		this.options = new Map();
		
	}
	
	public static async createWithAPIResponse(organization: AFOrganization, questionResponse: AFQuestionResponseStructure): Promise<AFQuestion> {
		
		let question: AFQuestion = new AFQuestion(organization);
		
		question.id = questionResponse.id;
		
		await question.refresh(questionResponse);
		
		return question;
		
	}
	
	public async refresh(questionResponse?: AFQuestionResponseStructure): Promise<AFQuestion> {
		
		let response: AFQuestionResponseStructure;
		if (questionResponse === undefined) response = await AFAPIQuestionAccessor.getBase(this.getSession().getToken(), this.getID());
		else response = questionResponse;
		
		this.inquiry = response.inquiry;
		this.type = AFQuestionType.getQuestionTypeForTypeNumber(response.type.value);
		
		if ((this.getType() === AFQuestionType.MULTIPLE_CHOICE) || (this.getType() === AFQuestionType.SELECT_ALL_THAT_APPLY)) {
			
			for (let id in response.options) {
				
				if (!this.options.has(id)) this.options.set(id, response.options[id]);
				
			}
			
			for (let id of this.options.values()) {
				
				if (response.options[id] === undefined) this.options.delete(id);
				
			}
			
		}
		
		return this;
		
	}
	
	public getInquiry(): string {
		
		return this.inquiry;
		
	}
	
	public getOptions(): ReadonlyMap<string, string> {
		
		return this.options;
		
	}
	
	public getType(): AFQuestionType {
		
		return this.type;
		
	}
	
	public isSessionQuestion(): boolean {
		
		return (this.getSession().hasQuestion() && (this.getSession().getQuestion().getID() === this.getID()));
		
	}
	
	public getID(): string {
		
		return this.id;
		
	}
	
	public getName(): string {
		
		return this.inquiry;
		
	}
	
	public getSession(): AFSession {
		
		return this.getClient().getSession();
		
	}
	
	public getClient(): AFClient {
		
		return this.getOrganization().getClient();
		
	}
	
	public getOrganization(): AFOrganization {
		
		return this.organization;
		
	}
	
	protected getChildrenStructures(): Array<AFStructure<any>> {
		
		return [];
		
	}
	
	public log(): void {
		
		console.groupCollapsed("AFQuestion (" + this.getType().getTypeString() + ") [" + this.getID() + "]" + (this.isSessionQuestion() ? " \u2605" : ""));
		
		console.info("ID:\t\t" + this.getID());
		console.info("Inquiry:\t" + this.getInquiry());
		console.info("Type:\t\t" + this.getType().getTypeString());
		
		if ((this.type === AFQuestionType.MULTIPLE_CHOICE) || (this.type === AFQuestionType.SELECT_ALL_THAT_APPLY)) {
			
			console.groupCollapsed("Options");
			for (let id of this.getOptions().keys()) console.info(id + ": '" + this.getOptions().get(id) + "'");
			console.groupEnd();
			
		}
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		console.groupEnd();
		
	}
	
}

export default AFQuestion;