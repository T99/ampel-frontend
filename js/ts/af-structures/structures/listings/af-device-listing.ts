/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:47 AM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClientInformation from "../../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../../information-contexts/af-organization-information.js";
import AFDevice from "../af-device.js";
import AFClient from "../af-client.js";
import AFOrganization from "../af-organization.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AfLocationInformation from "../../information-contexts/af-location-information.js";
import AFLocation from "../af-location.js";
import AFDeviceResponseStructure from "../../../net/response-structures/common/af-device-response-structure.js";
import TSArrayList from "../../../structures/implementations/list/ts-array-list.js";
import AFAPILocationAccessor from "../../../net/accessors/af-api-location-accessor.js";
import AFSession from "../../af-session.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFDeviceListing extends AFConcreteStructureListing<AFDeviceListing, AFDevice> implements AFClientInformation,
	AFOrganizationInformation, AfLocationInformation {
	
	private session: AFSession;
	
	private client: AFClient;
	
	private organization: AFOrganization;
	
	private location: AFLocation;
	
	protected constructor(location: AFLocation) {
		
		super();
		
		this.location = location;
		this.organization = this.getLocation().getOrganization();
		this.client = this.getOrganization().getClient();
		this.session = this.getClient().getSession();
		
	}
	
	public static async createWithAPIResponse(location: AFLocation,
											  deviceResponses: ReadonlyArray<AFDeviceResponseStructure>): Promise<AFDeviceListing> {
		
		let deviceListing: AFDeviceListing = new AFDeviceListing(location);
		
		await deviceListing.refresh(deviceResponses);
		
		return deviceListing;
		
	}
	
	public async refresh(deviceListing?: ReadonlyArray<AFDeviceResponseStructure>): Promise<AFDeviceListing> {
		
		let readOnlyDevices: ReadonlyArray<AFDeviceResponseStructure>;
		
		if (deviceListing === undefined) readOnlyDevices = await AFAPILocationAccessor.getDevices(this.getSession().getToken(), this.getLocation().getID());
		else readOnlyDevices = deviceListing;
		
		let serverDevices: Map<string, AFDeviceResponseStructure> = new Map();
		let localDeviceIDs: TSArrayList<string> = new TSArrayList<string>(...this.getAllIDs());
		
		for (let serverDevice of readOnlyDevices) serverDevices.set(serverDevice.id, serverDevice);
		
		for (let id of localDeviceIDs.iterator()) if (!serverDevices.has(id)) this.removeMapping(id);
		for (let id of serverDevices.keys()) {
			
			if (!localDeviceIDs.contains(id)) {
				
				this.addMapping(id, (await AFDevice.createWithAPIResponse(this.getLocation(), serverDevices.get(id))));
				
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
	
	public getLocation(): AFLocation {
		
		return this.location;
		
	}
	
	public log(recurse: boolean = true): void {
		
		console.groupCollapsed("AFDeviceListing");
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getAll()) childStructure.log();
		
		console.groupEnd();
		
	}
	
}

export default AFDeviceListing;