/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:42 AM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClientInformation from "../../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../../information-contexts/af-organization-information.js";
import AFClient from "../af-client.js";
import AFOrganization from "../af-organization.js";
import AFFolder from "../af-folder.js";
import AFFolderResponseStructure from "../../../net/response-structures/common/af-folder-response-structure.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AFQuestionResponseStructure from "../../../net/response-structures/common/af-question-response-structure.js";
import TSObjectIterator from "../../../structures/implementations/iterate/ts-object-iterator.js";
import AFAPIOrganizationAccessor from "../../../net/accessors/af-api-organization-accessor.js";
import TSArrayList from "../../../structures/implementations/list/ts-array-list.js";
import AFSession from "../../af-session.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFFolderListing extends AFConcreteStructureListing<AFFolderListing, AFFolder> implements AFClientInformation, AFOrganizationInformation {
	
	private session: AFSession;
	
	private client: AFClient;
	
	private organization: AFOrganization;
	
	protected constructor(organization: AFOrganization) {
		
		super();
		
		this.organization = organization;
		this.client = this.getOrganization().getClient();
		this.session = this.getClient().getSession();
		
	}
	
	public static async createWithAPIResponse(organization: AFOrganization,
											  folderResponses: ReadonlyArray<AFFolderResponseStructure>,
											  shouldChildrenMaintainChildren: boolean = true,
											  questionResponses?: ReadonlyArray<AFQuestionResponseStructure>): Promise<AFFolderListing> {
		
		let folderListing: AFFolderListing = new AFFolderListing(organization);
		
		for (let folderResponse of folderResponses) {
			
			let applicableQuestionResponses: AFQuestionResponseStructure[] = [];
			
			if (questionResponses !== undefined) {
				
				for (let questionResponse of (new TSObjectIterator<AFQuestionResponseStructure>(questionResponses))) {
					
					if (folderResponse.questionIds.indexOf(questionResponse.value.id) !== -1) applicableQuestionResponses.push(questionResponse.value);
					
				}
				
			}
			
			let folder: AFFolder = await AFFolder.createWithAPIResponse(
				organization,
				folderResponse,
				shouldChildrenMaintainChildren,
				(applicableQuestionResponses.length > 0 ? applicableQuestionResponses : undefined)
			);
			
			folderListing.addMapping(folder.getID(), folder);
			
		}
		
		return folderListing;
		
	}
	
	public async refresh(folderListing?: ReadonlyArray<AFFolderResponseStructure>): Promise<AFFolderListing> {
		
		let readOnlyFolders: ReadonlyArray<AFFolderResponseStructure>;
		
		if (folderListing === undefined) readOnlyFolders = await AFAPIOrganizationAccessor.getFolders(this.getSession().getToken());
		else readOnlyFolders = folderListing;
		
		let serverFolders: Map<string, AFFolderResponseStructure> = new Map();
		let localFolderIDs: TSArrayList<string> = new TSArrayList<string>(...this.getAllIDs());
		
		for (let serverFolder of readOnlyFolders) serverFolders.set(serverFolder.id, serverFolder);
		
		for (let id of localFolderIDs.iterator()) if (!serverFolders.has(id)) this.removeMapping(id);
		for (let id of serverFolders.keys()) {
			
			if (!localFolderIDs.contains(id)) {
				
				let folder: AFFolder = await AFFolder.createWithAPIResponse(
					this.getOrganization(),
					serverFolders.get(id)
				);
				
				this.addMapping(id, folder);
				
			}
			
		}
		
		return this;
		
	}
	
	public getSession(): AFSession {
		
		return this.session;
		
	}
	
	public getClient(): AFClient {
		
		return this.client;
		
	}
	
	public getOrganization(): AFOrganization {
		
		return this.organization;
		
	}
	
	public log(recurse: boolean = true): void {
		
		console.groupCollapsed("AFFolderListing");
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getAll()) childStructure.log();
		
		console.groupEnd();
		
	}
	
}

export default AFFolderListing;