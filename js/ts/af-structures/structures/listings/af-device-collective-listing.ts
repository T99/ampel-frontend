/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:33 PM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFCollectiveStructureListing from "../../af-collective-structure-listing.js";
import AFClientInformation from "../../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../../information-contexts/af-organization-information.js";
import AFDevice from "../af-device.js";
import AFClient from "../af-client.js";
import AFOrganization from "../af-organization.js";
import AFSession from "../../af-session.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFDeviceCollectiveListing extends AFCollectiveStructureListing<AFDeviceCollectiveListing, AFDevice> implements AFClientInformation, AFOrganizationInformation {
	
	private session: AFSession;
	
	private client: AFClient;
	
	private organization: AFOrganization;
	
	protected constructor(client: AFClient, organization: AFOrganization) {
		
		super();
		
		// TODO [2/7/19 @ 4:34 PM] - Pretty up the following line:
		if (organization.getClient() !== client) throw new Error("Organization client mismatch.");
		
		this.client = client;
		this.organization = organization;
		
	}
	
	public static async createWithOrganization(organization: AFOrganization): Promise<AFDeviceCollectiveListing> {
		
		return new AFDeviceCollectiveListing(organization.getClient(), organization);
		
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
		
		console.groupCollapsed("AFDeviceCollectiveListing");
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getAll()) childStructure.log();
		
		console.groupEnd();
		
	}
	
}

export default AFDeviceCollectiveListing;