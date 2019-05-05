/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:07 PM -- February 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClient from "./af-client.js";
import AFOrganization from "./af-organization.js";
import AFIDObject from "../af-id-object.js";
import AFClientInformation from "../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../information-contexts/af-organization-information.js";
import AFStructure from "../af-structure.js";
import AFLocationResponseStructure from "../../net/response-structures/common/af-location-response-structure.js";
import AFDeviceListing from "./listings/af-device-listing.js";
import AFQuestionResponseStructure from "../../net/response-structures/common/af-question-response-structure.js";
import AFQuestionListing from "./listings/af-question-listing.js";
import AFDeviceResponseStructure from "../../net/response-structures/common/af-device-response-structure.js";
import AFAPILocationAccessor from "../../net/accessors/af-api-location-accessor.js";
import AFDevice from "./af-device.js";
import AFSession from "../af-session.js";
import AFFolder from "./af-folder.js";
import AFAPIDeviceAccessor from "../../net/accessors/af-api-device-accessor.js";

/**
 * A organization location registered with Ampel.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFLocation extends AFStructure<AFLocation> implements AFIDObject, AFClientInformation, AFOrganizationInformation {
	
	private id: string;
	
	private name: string;
	
	private deviceListing: AFDeviceListing;
	
	private organization: AFOrganization;
	
	protected constructor(organization: AFOrganization, shouldMaintainChildren: boolean) {
		
		super(shouldMaintainChildren);
		
		this.organization = organization;
		
	}
	
	public static async createWithAPIResponse(organization: AFOrganization,
											  locationResponse: AFLocationResponseStructure,
											  shouldMaintainChildren: boolean = true,
											  deviceResponses?: ReadonlyArray<AFDeviceResponseStructure>): Promise<AFLocation> {
		
		let location: AFLocation = new AFLocation(organization, shouldMaintainChildren);
		
		location.id = locationResponse.id;
		location.name = locationResponse.name;
		
		if ((shouldMaintainChildren === true) && (deviceResponses !== undefined)) {
			
			location.deviceListing = await AFDeviceListing.createWithAPIResponse(location, deviceResponses);
			
		}
		
		return location;
		
	}
	
	public async refresh(): Promise<AFLocation> {
		
		let response: AFLocationResponseStructure = await AFAPILocationAccessor.getBase(this.getSession().getToken(), this.getID());
		
		this.name = response.name;
		
		return this;
		
	}
	
	public async createDevice(deviceName: string, folder: string | AFFolder, isShuffled: boolean = false): Promise<AFDevice> {
	
		let folderObject: AFFolder;
		
		if (typeof folder === "string") folderObject = await this.getOrganization().createFolder(folder, isShuffled);
		else folderObject = folder;
		
		let deviceResponse: AFDeviceResponseStructure =
			await AFAPIDeviceAccessor.createForOrganization(
				this.getSession().getToken(),
				deviceName,
				this.getID(),
				folderObject.getID()
			);
		
		await this.getDeviceListing().refresh();
		
		if (this.getDeviceListing().hasItemWithID(deviceResponse.id)) return this.getDeviceListing().getItemWithID(deviceResponse.id);
		else throw new Error("ERR | Device creation failed...");
	
	}
	
	public isSessionLocation(): boolean {
		
		return (this.getSession().hasLocation() && (this.getSession().getLocation().getID() === this.getID()));
		
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
	
	public getDeviceListing(): AFDeviceListing {
		
		return this.deviceListing;
		
	}
	
	protected getChildrenStructures(): Array<AFStructure<any>> {
		
		return [ this.deviceListing ];
		
	}
	
	public log(recurse: boolean = true): void {
		
		console.groupCollapsed("AFLocation: " + this.getName() + " [" + this.getID() + "]" + (this.isSessionLocation() ? " \u2605" : ""));
		
		console.info("ID:\t" + this.getID());
		console.info("Name:\t" + this.getName());
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		if (recurse) for (let childStructure of this.getChildrenStructures()) childStructure.log();
		
		console.groupEnd();
		
	}
	
}

export default AFLocation;