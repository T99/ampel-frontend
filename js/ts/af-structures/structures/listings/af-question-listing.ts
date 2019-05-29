/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:02 AM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClientInformation from "../../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../../information-contexts/af-organization-information.js";
import AFQuestion from "../af-question.js";
import AFClient from "../af-client.js";
import AFOrganization from "../af-organization.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AFQuestionResponseStructure from "../../../net/response-structures/common/af-question-response-structure.js";
import TSArrayList from "../../../util/structures/implementations/list/ts-array-list.js";
import AFAPIFolderAccessor from "../../../net/accessors/af-api-folder-accessor.js";
import AFFolder from "../af-folder.js";
import AFSession from "../../af-session.js";
import AFSessionInformation from "../../information-contexts/af-session-information.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFQuestionListing extends AFConcreteStructureListing<AFQuestionListing, AFQuestion>
	implements AFSessionInformation, AFClientInformation, AFOrganizationInformation {
	
	private folder: AFFolder;
	
	protected constructor(folder: AFFolder) {
		
		super();
		
		this.folder = folder;
		
	}
	
	public static async createWithAPIResponse(folder: AFFolder,
											  questionResponses: ReadonlyArray<AFQuestionResponseStructure>): Promise<AFQuestionListing> {
		
		let questionListing: AFQuestionListing = new AFQuestionListing(folder);
		
		for (let questionResponse of questionResponses) {
			
			let question: AFQuestion = await AFQuestion.createWithAPIResponse(folder.getOrganization(), questionResponse);
			questionListing.addMapping(question.getID(), question);
			
		}
		
		return questionListing;
		
	}
	
	public async refresh(questionResponses?: ReadonlyArray<AFQuestionResponseStructure>): Promise<AFQuestionListing> {
		
		let readOnlyQuestions: ReadonlyArray<AFQuestionResponseStructure>;
		
		if (questionResponses === undefined) readOnlyQuestions = (await AFAPIFolderAccessor.getQuestions(this.getSession().getToken(), this.getFolder().getID()));
		else readOnlyQuestions = questionResponses;
		
		let serverDevices: Map<string, AFQuestionResponseStructure> = new Map();
		let localDeviceIDs: TSArrayList<string> = new TSArrayList<string>(...this.getAllIDs());
		
		for (let serverDevice of readOnlyQuestions) serverDevices.set(serverDevice.id, serverDevice);
		
		for (let id of localDeviceIDs.iterator()) if (!serverDevices.has(id)) this.removeMapping(id);
		for (let id of serverDevices.keys()) {
			
			if (!localDeviceIDs.contains(id)) {
				
				this.addMapping(id, (await AFQuestion.createWithAPIResponse(this.getOrganization(), serverDevices.get(id))));
				
			}
			
		}
		
		return this;
		
	}
	
	public getSession(): AFSession {
		
		return this.getClient().getSession();
		
	}
	
	public getClient(): AFClient {
		
		return this.getOrganization().getClient();
		
	}
	
	public getOrganization(): AFOrganization {
		
		return this.getFolder().getOrganization();
		
	}
	
	public getFolder(): AFFolder {
		
		return this.folder;
		
	}
	
	public log(recurse: boolean = true): void {
		
		console.groupCollapsed("AFQuestionListing");
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getAll()) childStructure.log();
		
		console.groupEnd();
		
	}
	
}

export default AFQuestionListing;