/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:41 AM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFStructure from "../af-structure.js";
import AFIDObject from "../af-id-object.js";
import AFClientInformation from "../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../information-contexts/af-organization-information.js";
import AfLocationInformation from "../information-contexts/af-location-information.js";
import AFClient from "./af-client.js";
import AFOrganization from "./af-organization.js";
import AFLocation from "./af-location.js";
import AFDeviceResponseStructure from "../../net/response-structures/common/af-device-response-structure.js";
import AFAPIDeviceAccessor from "../../net/accessors/af-api-device-accessor.js";
import AFFolder from "./af-folder.js";
import AFSession from "../af-session.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFDevice extends AFStructure<AFDevice> implements AFIDObject, AFClientInformation, AFOrganizationInformation, AfLocationInformation {
	
	private id: string;
	
	private name: string;
	
	private defaultFolderID: string;
	
	private location: AFLocation;
	
	protected constructor(location: AFLocation) {
		
		super(false);
		
		this.location = location;
		
	}
	
	public static async createWithAPIResponse(location: AFLocation, deviceResponse: AFDeviceResponseStructure): Promise<AFDevice> {
		
		let device: AFDevice = new AFDevice(location);
		
		device.id = deviceResponse.id;
		device.name = deviceResponse.name;
		device.defaultFolderID = deviceResponse.folderId;
		
		return device;
		
	}
	
	public async refresh(): Promise<AFDevice> {
		
		let response: AFDeviceResponseStructure = await AFAPIDeviceAccessor.getBase(this.getSession().getToken(), this.getID());
		
		this.name = response.name;
		
		return this;
		
	}
	
	public async signIn(): Promise<AFDevice> {
	
		// TODO [4/21/19 @ 1:16 AM] - Finish the 'signIn' method.
		
		if (this.isSignedIn()) return this;
		else {
			
			// this.token = (await AFAPITokenAccessor.getDeviceToken(this.getSession().getToken(), this.getID())).token;
			
			return this;
			
		}
	
	}
	
	public async signOut(): Promise<void> {
	
		// TODO [4/21/19 @ 1:16 AM] - Finish the 'signOut' method.
	
	}
	
	public isSignedIn(): boolean {
		
		// TODO [4/21/19 @ 1:15 AM] - Finish the 'isSignedIn' method.
		return false;
		
	}
	
	public isSessionDevice(): boolean {
		
		return (this.getSession().hasDevice() && (this.getSession().getDevice().getID() === this.getID()));
		
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
		
		return this.getLocation().getOrganization();
		
	}
	
	public getLocation(): AFLocation {
		
		return this.location;
		
	}
	
	public getDefaultFolder(): AFFolder {
		
		return this.getOrganization().getFolderListing().getItemWithID(this.defaultFolderID);
		
	}
	
	protected getChildrenStructures(): Array<AFStructure<any>> {
		
		return [];
		
	}
	
	public log(): void {
		
		console.groupCollapsed("AFDevice: " + this.getName() + " [" + this.getID() + "]" + (this.isSessionDevice() ? " \u2605" : ""));
		
		console.info("ID:\t\t" + this.getID());
		console.info("Name:\t\t" + this.getName());
		console.info("Default Folder:\t" + this.getDefaultFolder().getName());
		
		console.groupCollapsed("Raw Object");
		console.info(this);
		console.groupEnd();
		
		// TODO [2/7/19 @ 9:53 PM] - Device token?
		
		console.groupEnd();
		
	}
	
}

export default AFDevice;