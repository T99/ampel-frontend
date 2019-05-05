/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:04 AM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFIDObject from "../af-id-object.js";
import AFClientInformation from "../information-contexts/af-client-information.js";
import AFClient from "./af-client.js";
import AFStructure from "../af-structure.js";
import AFOrganizationEverythingResponseStructure from "../../net/response-structures/organization/af-organization-everything-response-structure.js";
import AFClientListing from "./listings/af-client-listing.js";
import AFFolderListing from "./listings/af-folder-listing.js";
import AFLocationListing from "./listings/af-location-listing.js";
import AFQuestionCollectiveListing from "./listings/af-question-collective-listing.js";
import AFDeviceCollectiveListing from "./listings/af-device-collective-listing.js";
import AFOrganizationResponseStructure from "../../net/response-structures/common/af-organization-response-structure.js";
import AFAPIOrganizationAccessor from "../../net/accessors/af-api-organization-accessor.js";
import AFFolder from "./af-folder.js";
import AFLocation from "./af-location.js";
import AFQuestion from "./af-question.js";
import AFQuestionType from "../descriptors/af-question-type.js";
import AFQuestionResponseStructure from "../../net/response-structures/common/af-question-response-structure.js";
import AFSession from "../af-session.js";
import AFSessionInformation from "../information-contexts/af-session-information.js";
import AFFolderResponseStructure from "../../net/response-structures/common/af-folder-response-structure.js";
import AFAPIFolderAccessor from "../../net/accessors/af-api-folder-accessor.js";
import AFAPIQuestionAccessor from "../../net/accessors/af-api-question-accessor.js";
import AFUnplacedQuestionListing from "./listings/af-unplaced-question-listing.js";

/**
 * A organization registered with Ampel.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFOrganization extends AFStructure<AFOrganization>
	implements AFIDObject, AFSessionInformation, AFClientInformation {
	
	private id: string;
	
	private name: string;
	
	private exitSecurityCode: string;
	
	private clientListing: AFClientListing;
	
	private locationListing: AFLocationListing;
	
	private deviceListing: AFDeviceCollectiveListing;
	
	private folderListing: AFFolderListing;
	
	private questionListing: AFQuestionCollectiveListing;
	
	private unplacedQuestionListing: AFUnplacedQuestionListing;
	
	private client: AFClient;
	
	/**
	 * Initializes a new AFOrganization with a given {@link AFClient}.
	 *
	 * @param {AFClient} client The client to whom this AFOrganization's information 'belongs'.
	 * @param {boolean} shouldMaintainChildren Whether or not this {@link AFStructure} should maintain children.
	 */
	protected constructor(client: AFClient, shouldMaintainChildren: boolean) {
		
		super(shouldMaintainChildren);
		
		this.client = client;
		
	}
	
	public static async createWithAPIResponse(client: AFClient,
											  response: AFOrganizationResponseStructure,
											  shouldMaintainChildren: boolean = true): Promise<AFOrganization> {
		
		let organization: AFOrganization = new AFOrganization(client, shouldMaintainChildren);
		
		await organization.refresh(response);
		
		return organization;
		
	}
	
	public async refresh(organizationResponse?: AFOrganizationResponseStructure): Promise<AFOrganization> {
		
		let response: AFOrganizationResponseStructure;
		
		if (organizationResponse === undefined) {
			
			response = await AFAPIOrganizationAccessor.getBaseByID(this.getSession().getToken(), this.getID());
			
		} else response = organizationResponse;
		
		this.id = response.id;
		this.name = response.name;
		this.exitSecurityCode = response.securityCode;
		
		return this;
		
	}
	
	public isSignedIn(): boolean {
		
		return (
			(this.clientListing !== undefined) &&
			(this.locationListing !== undefined) &&
			(this.deviceListing !== undefined) &&
			(this.folderListing !== undefined) &&
			(this.questionListing !== undefined)
		);
		
	}
	
	public async signIn(): Promise<AFOrganization> {
		
		if (this.isSignedIn()) return this;
		
		let response: AFOrganizationEverythingResponseStructure = await AFAPIOrganizationAccessor.getEverything(this.getSession().getToken());
		
		this.clientListing = await AFClientListing.createWithAPIResponse(this, response.clients);
		
		this.locationListing = await AFLocationListing.createWithAPIResponse(this, response.locations, true, response.devices);
		
		this.deviceListing = await AFDeviceCollectiveListing.createWithOrganization(this);
		
		this.folderListing = await AFFolderListing.createWithAPIResponse(this, response.folders, true, response.questions);
		
		this.questionListing = await AFQuestionCollectiveListing.createWithOrganization(this);
		
		this.unplacedQuestionListing = await AFUnplacedQuestionListing.createWithAPIResponse(this, response.questions);
		
		this.locationListing.getAll().forEach((location: AFLocation): any => {
			
			location.getDeviceListing().setParentListing(this.deviceListing);
			
		});
		
		this.folderListing.getAll().forEach((folder: AFFolder): any => {
			
			folder.getQuestionListing().setParentListing(this.questionListing);
			
		});
		
		this.unplacedQuestionListing.setParentListing(this.questionListing);
		
		return this;
		
	}
	
	public async signOut(): Promise<void> {
		
		this.clientListing = undefined;
		this.locationListing = undefined;
		this.deviceListing = undefined;
		this.folderListing = undefined;
		this.questionListing = undefined;
		
	}
	
	public async createLocation(name: string): Promise<AFLocation> {
		
		// TODO [4/24/19 @ 5:39 PM] - Finish the 'createLocation' method.
		return null;
		
	}
	
	public async createFolder(folderName: string, isShuffled: boolean, questions?: string[] | AFQuestion[]): Promise<AFFolder> {
		
		let questionIDs: string[] = [];
		
		if (questions !== undefined) {
			
			for (let element of questions) {
				
				if (typeof element === "string") questionIDs.push(element);
				else questionIDs.push(element.getID());
				
			}
			
		}
		
		let folderResponse: AFFolderResponseStructure =
			await AFAPIFolderAccessor.createForOrganization(
				this.getSession().getToken(),
				folderName,
				isShuffled,
				questionIDs
			);
		
		await this.getFolderListing().refresh();
		
		if (this.getFolderListing().hasItemWithID(folderResponse.id)) return this.getFolderListing().getItemWithID(folderResponse.id);
		else {
			
			throw new Error("ERR | Folder creation failed...");
			
		}
		
	}
	
	public async createQuestion(inquiry: string, type: number | AFQuestionType, folder?: string | AFFolder): Promise<AFQuestion> {
		
		let typeNumber: number;
		let folderID: string;
		
		if (typeof type === "number") {
			
			let typeResult: AFQuestionType = AFQuestionType.getQuestionTypeForTypeNumber(type);
			
			if (typeResult === undefined) throw new Error("ERR | Attempted to create a question with an invalid type number.");
			else typeNumber = type;
			
		} else typeNumber = type.getTypeNumber();
		
		if (folder === undefined) folderID = undefined;
		else if (typeof folder === "string") {
			
			if (this.getFolderListing().hasItemWithID(folder)) folderID = folder;
			else throw new Error("ERR | Attempted to create a question with an invalid folder ID.");
			
		} else folderID = folder.getID();
		
		let questionResponse: AFQuestionResponseStructure =
			await AFAPIQuestionAccessor.createForOrganization(
				this.getSession().getToken(),
				inquiry,
				typeNumber,
				folderID
			);
		
		await this.questionListing.refresh();
		
		if (this.getQuestionListing().hasItemWithID(questionResponse.id)) return this.getQuestionListing().getItemWithID(questionResponse.id);
		else throw new Error("ERR | Question creation failed...");
		
		// if (folderID !== undefined) {
		//
		// 	if (this.getFolderListing().hasItemWithID(folderID)) {
		//
		// 		return await this.getFolderListing().getItemWithID(folderID).createQuestion(inquiry, type);
		//
		// 	} else throw new Error("Attempted to create a question for a folder that does not exist for the given Organization.");
		//
		// } else {
		//
		// 	let questionResponse: AFQuestionResponseStructure =
		// 		await AFAPIOrganizationAccessor.createQuestion(this.getSession().getToken(), inquiry, type.getTypeNumber());
		//
		// 	await this.getQuestionListing().deepRefresh();
		//
		// 	return this.getQuestionListing().getItemWithID(questionResponse.id);
		//
		// }
		
	}
	
	public isSessionOrganization(): boolean {
		
		return (this.getSession().hasOrganization() && (this.getSession().getOrganization().getID() === this.getID()));
		
	}
	
	public getID(): string {
		
		return this.id;
		
	}
	
	public getName(): string {
		
		return this.name;
		
	}
	
	public hasExitSecurityCode(): boolean {
		
		return (this.getExitSecurityCode() !== undefined);
		
	}
	
	public getExitSecurityCode(): string {
		
		return this.exitSecurityCode;
		
	}
	
	public getSession(): AFSession {
		
		return this.getClient().getSession();
		
	}
	
	public getClient(): AFClient {
		
		return this.client;
		
	}
	
	public getClientListing(): AFClientListing {
		
		return this.clientListing;
		
	}
	
	public getLocationListing(): AFLocationListing {
		
		return this.locationListing;
		
	}
	
	public getDeviceListing(): AFDeviceCollectiveListing {
		
		return this.deviceListing;
		
	}
	
	public getFolderListing(): AFFolderListing {
		
		return this.folderListing;
		
	}
	
	public getQuestionListing(): AFQuestionCollectiveListing {
		
		return this.questionListing;
		
	}
	
	protected getChildrenStructures(): Array<AFStructure<any>> {
		
		// TODO [2/3/19 @ 2:08 AM] - Finish the 'getChildrenStructures' method.
		return [ this.clientListing, this.locationListing, this.deviceListing, this.folderListing, this.questionListing ];
		
	}
	
	public log(recurse: boolean = true): void {
		
		console.groupCollapsed("AFOrganization: " + this.getName() + " [" + this.getID() + "]" + (this.isSessionOrganization() ? " \u2605" : ""));
		
		console.info("ID:\t\t\t\t" + this.getID());
		console.info("Name:\t\t\t\t" + this.getName());
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (this.isSignedIn() && recurse) for (let childStructure of this.getChildrenStructures()) childStructure.log();
		else if (!this.isSignedIn() && recurse) {
			
			console.groupCollapsed("Children Structures");
			console.warn("Not signed-in to this organization...");
			console.groupEnd();
			
		}
		
		console.groupEnd();
		
	}
	
}

export default AFOrganization;