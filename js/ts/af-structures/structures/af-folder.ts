/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:58 PM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFStructure from "../af-structure.js";
import AFIDObject from "../af-id-object.js";
import AFClientInformation from "../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../information-contexts/af-organization-information.js";
import AFClient from "./af-client.js";
import AFOrganization from "./af-organization.js";
import AFFolderResponseStructure from "../../net/response-structures/common/af-folder-response-structure.js";
import AFQuestionListing from "./listings/af-question-listing.js";
import AFQuestionResponseStructure from "../../net/response-structures/common/af-question-response-structure.js";
import AFAPIFolderAccessor from "../../net/accessors/af-api-folder-accessor.js";
import AFQuestionType from "../descriptors/af-question-type.js";
import AFQuestion from "./af-question.js";
import AFSession from "../af-session.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFFolder extends AFStructure<AFFolder> implements AFIDObject, AFClientInformation, AFOrganizationInformation {
	
	private id: string;
	
	private name: string;
	
	private shuffled: boolean;
	
	private questionListing: AFQuestionListing;
	
	private organization: AFOrganization;
	
	protected constructor(organization: AFOrganization, shouldMaintainChildren: boolean) {
		
		super(shouldMaintainChildren);
		
		this.organization = organization;
		
	}
	
	public static async createWithAPIResponse(organization: AFOrganization,
											  folderResponse: AFFolderResponseStructure,
											  shouldMaintainChildren: boolean = true,
											  questionResponses?: ReadonlyArray<AFQuestionResponseStructure>): Promise<AFFolder> {
		
		let folder: AFFolder = new AFFolder(organization, shouldMaintainChildren);
		
		folder.id = folderResponse.id;
		folder.name = folderResponse.name;
		folder.shuffled = folderResponse.shuffled;
		
		if ((shouldMaintainChildren === true) && (questionResponses !== undefined)) {
			
			folder.questionListing = await AFQuestionListing.createWithAPIResponse(folder, questionResponses);
			
		}
		
		return folder;
		
	}
	
	public async refresh(): Promise<AFFolder> {
		
		let response: AFFolderResponseStructure = await AFAPIFolderAccessor.getBase(this.getSession().getToken(), this.getID());
		
		this.name = response.name;
		this.shuffled = response.shuffled;
		
		return this;
		
	}
	
	public async createQuestion(inquiry: string, type: number | AFQuestionType): Promise<AFQuestion> {
		
		return this.getOrganization().createQuestion(inquiry, type, this.getID());
		
	}
	
	public isSessionFolder(): boolean {
		
		return (this.getSession().hasFolder() && (this.getSession().getFolder().getID() === this.getID()));
		
	}
	
	public isShuffled(): boolean {
		
		return this.shuffled;
		
	}
	
	public getID(): string {
		
		return this.id;
		
	}
	
	public getName(): string {
		
		return this.name;
		
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
	
	public getQuestionListing(): AFQuestionListing {
		
		return this.questionListing;
		
	}
	
	protected getChildrenStructures(): Array<AFStructure<AFQuestionListing>> {
		
		// TODO [2/6/19 @ 8:01 PM] - Finish the 'getChildrenStructures' method.
		return [ this.questionListing ];
		
	}
	
	public log(recurse: boolean = true): void {
		
		console.groupCollapsed("AFFolder: " + this.getName() + " [" + this.getID() + "]" + (this.isSessionFolder() ? " \u2605" : ""));
		
		console.info("ID:\t\t" + this.getID());
		console.info("Name:\t\t" + this.getName());
		console.info("Is Shuffled:\t" + this.isShuffled());
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getChildrenStructures()) childStructure.log();
		
		console.groupEnd();
		
	}
	
}

export default AFFolder;