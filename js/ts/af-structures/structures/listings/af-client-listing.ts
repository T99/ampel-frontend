/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:37 AM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClientInformation from "../../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../../information-contexts/af-organization-information.js";
import AFClient from "../af-client.js";
import AFOrganization from "../af-organization.js";
import AFClientResponseStructure from "../../../net/response-structures/common/af-client-response-structure.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AFAPIOrganizationAccessor from "../../../net/accessors/af-api-organization-accessor.js";
import TSArrayList from "../../../util/structures/implementations/list/ts-array-list.js";
import AFSession from "../../af-session.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFClientListing extends AFConcreteStructureListing<AFClientListing, AFClient> implements AFClientInformation, AFOrganizationInformation {
	
	private session: AFSession;
	
	private client: AFClient;
	
	private organization: AFOrganization;
	
	protected constructor(client: AFClient, organization: AFOrganization) {
		
		super();
		
		// TODO [2/7/19 @ 5:06 AM] - Pretty up the following line:
		if (organization.getClient() !== client) throw new Error("Organization client mismatch.");
		
		this.client = client;
		this.session = this.getClient().getSession();
		this.organization = organization;
		
	}
	
	public static async createWithAPIResponse(organization: AFOrganization,
											  clientResponses: ReadonlyArray<AFClientResponseStructure>): Promise<AFClientListing> {
		
		let clientListing: AFClientListing = new AFClientListing(organization.getClient(), organization);
		
		await clientListing.refresh(clientResponses);
		
		return clientListing;
		
	}
	
	public async refresh(clientListing?: ReadonlyArray<AFClientResponseStructure>): Promise<AFClientListing> {
		
		let readOnlyClients: ReadonlyArray<AFClientResponseStructure>;
		
		if (clientListing === undefined) readOnlyClients = await AFAPIOrganizationAccessor.getClients(this.getSession().getToken());
		else readOnlyClients = clientListing;
		
		let serverClients: Map<string, AFClientResponseStructure> = new Map();
		let localClientIDs: TSArrayList<string> = new TSArrayList<string>(...this.getAllIDs());
		
		for (let serverClient of readOnlyClients) serverClients.set(serverClient.id, serverClient);
		
		for (let id of localClientIDs.iterator()) if (!serverClients.has(id)) this.removeMapping(id);
		
		for (let id of serverClients.keys()) {
			
			if (!localClientIDs.contains(id)) {
				
				let client: AFClient;
				
				if (id === session.getAmpelSession().getClient().getID()) client = session.getAmpelSession().getClient();
				else client = await AFClient.createAsOrganizationChild(this.getSession(), serverClients.get(id));
				
				this.addMapping(id, client);
				
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
		
		console.groupCollapsed("AFClientListing");
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getAll()) childStructure.log(false);
		
		console.groupEnd();
		
	}
	
}

export default AFClientListing;