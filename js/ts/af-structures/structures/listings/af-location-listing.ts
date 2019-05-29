/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:49 AM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClientInformation from "../../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../../information-contexts/af-organization-information.js";
import AFLocation from "../af-location.js";
import AFClient from "../af-client.js";
import AFOrganization from "../af-organization.js";
import AFLocationResponseStructure from "../../../net/response-structures/common/af-location-response-structure.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AFDeviceResponseStructure from "../../../net/response-structures/common/af-device-response-structure.js";
import TSObjectIterator from "../../../util/misc/iterate/ts-object-iterator.js";
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
class AFLocationListing extends AFConcreteStructureListing<AFLocationListing, AFLocation> implements AFClientInformation, AFOrganizationInformation {
	
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
											  locationResponses: ReadonlyArray<AFLocationResponseStructure>,
											  shouldChildrenMaintainChildren: boolean = false,
											  deviceResponses?: ReadonlyArray<AFDeviceResponseStructure>): Promise<AFLocationListing> {
		
		let locationListing: AFLocationListing = new AFLocationListing(organization);
		
		for (let locationResponse of locationResponses) {
			
			let applicableDeviceResponses: AFDeviceResponseStructure[] = [];
			
			if (deviceResponses !== undefined) {
				
				let iterator: TSObjectIterator<AFDeviceResponseStructure> = new TSObjectIterator<AFDeviceResponseStructure>(deviceResponses);
				
				while (iterator.hasNext()) {
					
					let deviceResponse: AFDeviceResponseStructure = iterator.next().value;
					
					if (locationResponse.deviceIds.indexOf(deviceResponse.id) !== -1) applicableDeviceResponses.push(deviceResponse);
					
				}
				
			}
			
			let location: AFLocation = await AFLocation.createWithAPIResponse(
				organization,
				locationResponse,
				shouldChildrenMaintainChildren,
				applicableDeviceResponses
			);
			
			locationListing.addMapping(location.getID(), location);
			
		}
		
		return locationListing;
		
	}
	
	public async refresh(locationListing?: ReadonlyArray<AFLocationResponseStructure>): Promise<AFLocationListing> {
		
		let readOnlyLocations: ReadonlyArray<AFLocationResponseStructure>;
		
		if (locationListing === undefined) readOnlyLocations = await AFAPIOrganizationAccessor.getLocations(this.getSession().getToken());
		else readOnlyLocations = locationListing;
		
		let serverLocations: Map<string, AFLocationResponseStructure> = new Map();
		let localLocationIDs: TSArrayList<string> = new TSArrayList<string>(...this.getAllIDs());
		
		for (let serverLocation of readOnlyLocations) serverLocations.set(serverLocation.id, serverLocation);
		
		for (let id of localLocationIDs.iterator()) if (!serverLocations.has(id)) this.removeMapping(id);
		for (let id of serverLocations.keys()) {
			
			if (!localLocationIDs.contains(id)) {
				
				let location: AFLocation = await AFLocation.createWithAPIResponse(
					this.getOrganization(),
					serverLocations.get(id)
				);
				
				this.addMapping(id, location);
				
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
		
		console.groupCollapsed("AFLocationListing");
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getAll()) childStructure.log();
		
		console.groupEnd();
		
	}
	
}

export default AFLocationListing;