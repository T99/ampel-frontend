/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:50 AM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFOrganization from "../af-organization.js";
import AFClientInformation from "../../information-contexts/af-client-information.js";
import AFClient from "../af-client.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AFOrganizationResponseStructure from "../../../net/response-structures/common/af-organization-response-structure.js";
import AFAPIClientAccessor from "../../../net/accessors/af-api-client-accessor.js";
import TSArrayList from "../../../structures/implementations/list/ts-array-list.js";
import AFSession from "../../af-session.js";
import AFAPIOrganizationAccessor from "../../../net/accessors/af-api-organization-accessor.js";

/**
 * A structure for holding and accessing the various organizations that a given {@link AFClient} has.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFOrganizationListing extends AFConcreteStructureListing<AFOrganizationListing, AFOrganization> implements AFClientInformation {
	
	private session: AFSession;
	
	/**
	 * The {@link AFClient} to whom this AFOrganizationListing belongs.
	 *
	 * @type {AFClient}
	 */
	private readonly client: AFClient;
	
	/**
	 * Initializes a new AFOrganizationListing for a given {@link AFClient}.
	 *
	 * @param {AFClient} client The AFClient to whom this AFOrganizationListing belongs.
	 */
	protected constructor(client: AFClient) {
		
		super();
		
		this.client = client;
		this.session = this.getClient().getSession();
		
	}
	
	/**
	 * Initializes a new AFOrganizationListing for a given {@link AFClient}.
	 *
	 * @param {AFClient} client The AFClient to whom this AFOrganizationListing belongs.
	 * @param {boolean} skipInitializationRefresh Whether or not to skip the initialization call to
	 * {@link #deepRefresh}. Do not set this if you do not fully understand what it does.
	 * @returns {Promise<AFOrganizationListing>} A Promise that resolves once this AFOrganizationListing has been fully
	 * initialized.
	 */
	public static async createForClient(client: AFClient, skipInitializationRefresh: boolean = false): Promise<AFOrganizationListing> {
		
		let organizationListing: AFOrganizationListing = new AFOrganizationListing(client);
		
		if (!skipInitializationRefresh) {
			
			let organizationResponses: ReadonlyArray<AFOrganizationResponseStructure> =
				await AFAPIOrganizationAccessor.getBasesForSession(organizationListing.getSession().getToken());
			
			for (let organizationResponse of organizationResponses) {
				
				// TODO [2/7/19 @ 6:01 PM] - AFOrganization.createWithAPIResponse() takes another arg, 'shouldMaintainChildren'...?
				
				let organization: AFOrganization = await AFOrganization.createWithAPIResponse(organizationListing.getClient(), organizationResponse);
				
				organizationListing.addMapping(organizationResponse.id, organization);
				
			}
			
		}
		
		return organizationListing;
		
	}
	
	// protected async initializeDirectChildrenStructures(): Promise<void> {
	//
	// 	let organizationResponses: ReadonlyArray<AFOrganizationResponseStructure> = await AFAPIClientAccessor.getAllOrganizations(this.getClient().getToken());
	//
	// 	for (let organizationResponse of organizationResponses) {
	//
	// 		// TODO [2/7/19 @ 6:01 PM] - AFOrganization.createWithAPIResponse() takes another arg, 'shouldMaintainChildren'...?
	// 		this.addMapping(organizationResponse.id, await AFOrganization.createWithAPIResponse(this.getClient(), organizationResponse));
	//
	// 	}
	//
	// }
	
	public async refresh(): Promise<AFOrganizationListing> {
		
		let readOnlyOrganizations: ReadonlyArray<AFOrganizationResponseStructure> =
			await AFAPIOrganizationAccessor.getBasesForSession(this.getSession().getToken());
		
		let serverOrganizations: Map<string, AFOrganizationResponseStructure> = new Map();
		let localOrganizationIDs: TSArrayList<string> = new TSArrayList<string>(...this.getAllIDs());
		
		for (let serverOrganization of readOnlyOrganizations) serverOrganizations.set(serverOrganization.id, serverOrganization);
		
		for (let id of localOrganizationIDs.iterator()) if (!serverOrganizations.has(id)) this.removeMapping(id);
		for (let id of serverOrganizations.keys()) {
			
			if (!localOrganizationIDs.contains(id)) {
				
				let organization: AFOrganization = await AFOrganization.createWithAPIResponse(
					this.getClient(),
					serverOrganizations.get(id)
				);
				
				this.addMapping(id, organization);
				
			}
			
		}
		
		return this;
		
		// let response: ReadonlyArray<AFOrganizationResponseStructure> = await AFAPIClientAccessor.getBasesForSession(this.getClient().getToken());
		//
		// let iterator: TSObjectIterator<{ id: string, name: string }> = new TSObjectIterator<{ id: string, name: string }>(response);
		//
		// /*
		//  * This array is going to be used as a sort of 'check list' to ensure that we get rid of any
		//  * organization for whom we did not receive an ID from the API call.
		//  *
		//  * It is important that we actually do this 'delta' operation rather than just wiping the slate and
		//  * starting over so that we can preserve any information stored in any underlying AFStructure such as
		//  * session tokens or even just general data about a location (AFLocation) or device (AFDevice).
		//  */
		// let currentlyHeldIDs: string[] = this.getAllIDs();
		//
		// while (iterator.hasNext()) {
		//
		// 	let value: { id: string, name: string } = iterator.next().value;
		// 	let id: string = value.id;
		// 	let name: string = value.name;
		//
		// 	// If we already have an organization with that ID, then 'check it off the list'.
		// 	if (currentlyHeldIDs.includes(id)) currentlyHeldIDs.removeElement(id);
		//
		// 	// Otherwise, add it because it must be new.
		// 	else this.addMapping(id, await AFOrganization.createWithClientAndOrganizationID(this.getClient(), id));
		//
		// }
		//
		// /*
		//  * If there are any IDs remaining in the array, then they must not have been supplied by the API call
		//  * and should therefore be removed from this AFOrganizationListing as the owning-user evidently no
		//  * longer belongs to the organization.
		//  */
		// for (let id of currentlyHeldIDs) this.removeMapping(id);
		//
		// return this;
		
	}
	
	public getAllSignedInOrganizations(): AFOrganization[] {
		
		let allOrgs: AFOrganization[] = this.getAll();
		
		return allOrgs.filter((organization: AFOrganization): boolean => organization.isSignedIn());
		
	}
	
	public getSession(): AFSession {
		
		return this.session;
		
	}
	
	/**
	 * Returns the {@link AFClient} to whom this AFOrganizationListing belongs.
	 *
	 * @returns {AFClient} The AFClient to whom this AFOrganizationListing belongs.
	 */
	public getClient(): AFClient {
		
		return this.client;
		
	}
	
	public log(recurse: boolean = true): void {
		
		console.groupCollapsed("AFOrganizationListing");
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getAll()) childStructure.log();
		
		console.groupEnd();
		
	}
	
}

export default AFOrganizationListing;