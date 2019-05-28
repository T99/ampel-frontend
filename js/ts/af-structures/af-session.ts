/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:31 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClient from "./structures/af-client.js";
import AFOrganization from "./structures/af-organization.js";
import AFFolder from "./structures/af-folder.js";
import AFQuestion from "./structures/af-question.js";
import AFDevice from "./structures/af-device.js";
import AFStructure from "./af-structure.js";
import AFSessionResponseStructure from "../net/response-structures/common/af-session-response-structure.js";
import AFAPISessionAccessor from "../net/accessors/af-api-session-accessor.js";
import AFLocation from "./structures/af-location.js";

/**
 * An over-arching handler for Ampel session information.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFSession extends AFStructure<AFSession> {
	
	private developerMode: boolean;
	
	private sessionToken: string;
	
	private isAdmin: boolean;
	
	private client: AFClient;
	
	private organization: AFOrganization;
	
	private location: AFLocation;
	
	private device: AFDevice;
	
	private folder: AFFolder;
	
	private question: AFQuestion;
	
	public constructor(developerMode: boolean = false) {
		
		super(true);
		
		this.developerMode = developerMode;
		this.isAdmin = false;
		
		if (this.developerMode) console.log("Operating in developer mode...");
		
	}
	
	public async refresh(): Promise<AFSession> {
		
		return undefined;
		
	}
	
	public isSessionLive(): boolean {
		
		return (this.sessionToken !== undefined);
		
	}
	
	public async initializeSession(email: string, password: string): Promise<AFSession> {
		
		if (this.isSessionLive()) {
			
			if (this.getClient().getEmail() === email) return this;
			else {
				
				throw new Error("ERR | Attempted to initialize the Ampel session even though it has already been " +
					"initialized.");
				
			}
			
		} else {
			
			let sessionResponse: AFSessionResponseStructure = await AFAPISessionAccessor.createSession(email, password);
			
			if (sessionResponse.isLive === false) {
				
				throw new Error("ERR | Somehow received a dead session upon sign-in...");
				
			} else {
				
				this.updateSession(sessionResponse);
				
				this.client = await AFClient.createAsSessionOwner(this, sessionResponse.clientId);
				
				return this;
				
			}
			
		}
		
	}
	
	protected updateSession(response: AFSessionResponseStructure): void {
		
		if (response.isLive === false) {
			
			throw new Error("ERR | Session has died or expired...");
			
		} else {
			
			this.sessionToken = response.id;
			
			if (response.isAdmin !== undefined) this.isAdmin = response.isAdmin;
			
		}
		
	}
	
	public getToken(): string {
		
		return this.sessionToken;
		
	}
	
	public hasClient(): boolean {
		
		return (this.client !== undefined);
		
	}
	
	public getClient(): AFClient {
		
		return this.client;
		
	}
	
	public hasOrganization(): boolean {
		
		return (this.organization !== undefined);
		
	}
	
	public getOrganization(): AFOrganization {
		
		if (this.hasOrganization()) return this.organization;
		else return undefined;
		
	}
	
	public async setOrganization(organizationID: string): Promise<AFOrganization> {
		
		if (this.hasOrganization() && this.getOrganization().getID() !== organizationID) await this.getOrganization().signOut();
		
		if (organizationID === undefined) this.organization = undefined;
		
		if (this.hasOrganization() && this.getOrganization().getID() === organizationID) return this.getOrganization();
		
		if (this.hasClient()) {
			
			if (this.getClient().getOrganizationListing().hasItemWithID(organizationID)) {
				
				this.updateSession(await AFAPISessionAccessor.setSessionOrganization(this.getToken(), organizationID));
				
				this.organization = this.getClient().getOrganizationListing().getItemWithID(organizationID);
				
				await this.getOrganization().signIn();
				
				if (this.hasExitSecurityCode()) {
					
					// Notify the iOS browser that we have a valid security code.
					if (window["webkit"]) window["webkit"]["messageHandlers"]["receivedSecurityCode"]["postMessage"]({ code: this.getExitSecurityCode() });
					
				}
				
			} else {
				
				throw new Error("ERR | Attempted to sign-in to an organization that the current user does not have " +
					"access to.");
				
			}
			
		} else {
			
			throw new Error("ERR | Attempted to set the organization of the Ampel session while the session did not " +
				"have a client.");
			
		}
		
		return this.getOrganization();
		
	}
	
	public hasLocation(): boolean {
		
		return (this.location !== undefined);
		
	}
	
	public getLocation(): AFLocation {
		
		return this.location;
		
	}
	
	public async setLocation(locationID: string): Promise<AFLocation> {
		
		if (this.hasOrganization()) {
		
			if (this.getOrganization().getLocationListing().hasItemWithID(locationID)) {
				
				this.location = this.getOrganization().getLocationListing().getItemWithID(locationID);
				return this.getLocation();
				
			} else {
				
				throw new Error("ERR | Attempted to set the session's current location to a location that does not " +
					"exist for the current organization.");
				
			}
		
		} else {
			
			throw new Error("ERR | Attempted to set the location of the Ampel session while the session did not " +
				"have an organization.");
			
		}
		
	}
	
	public hasDevice(): boolean {
		
		return (this.device !== undefined);
		
	}
	
	public getDevice(): AFDevice {
		
		return this.device;
		
	}
	
	public async setDevice(deviceID: string): Promise<AFDevice> {
		
		if (this.hasLocation()) {
			
			if (this.getLocation().getDeviceListing().hasItemWithID(deviceID)) {
				
				this.updateSession(await AFAPISessionAccessor.setSessionDevice(this.getToken(), deviceID));
				this.device = this.location.getDeviceListing().getItemWithID(deviceID);
				
				return this.getDevice();
			
			} else {
				
				throw new Error("ERR | Attempted to set the session's current device to a device that does not exist " +
					"for the current location.");
				
			}
			
		} else {
			
			throw new Error("ERR | Attempted to set the device of the Ampel session while the session did not have " +
				"a location.");
			
		}
		
	}
	
	public hasFolder(): boolean {
		
		return (this.folder !== undefined);
		
	}
	
	public getFolder(): AFFolder {
		
		return this.folder;
		
	}
	
	public async setFolder(folderID: string): Promise<AFFolder> {
		
		if (this.hasOrganization()) {
			
			if (this.getOrganization().getFolderListing().hasItemWithID(folderID)) {
				
				this.folder = this.getOrganization().getFolderListing().getItemWithID(folderID);
				return this.getFolder();
				
			} else {
				
				throw new Error("ERR | Attempted to set the session's current folder to a folder that does not " +
					"exist for the current organization.");
				
			}
			
		} else {
			
			throw new Error("ERR | Attempted to set the folder of the Ampel session while the session did not " +
				"have an organization.");
			
		}
		
	}
	
	public hasQuestion(): boolean {
		
		return (this.question !== undefined);
		
	}
	
	public getQuestion(): AFQuestion {
		
		return this.question;
		
	}
	
	public async setQuestion(questionID: string): Promise<AFQuestion> {
		
		if (this.hasFolder()) {
			
			if (this.getFolder().getQuestionListing().hasItemWithID(questionID)) {
				
				this.question = this.getFolder().getQuestionListing().getItemWithID(questionID);
				return this.getQuestion();
				
			} else {
				
				throw new Error("ERR | Attempted to set the session's current question to a question that does not " +
					"exist for the current folder.");
				
			}
			
		} else {
			
			throw new Error("ERR | Attempted to set the question of the Ampel session while the session did not " +
				"have a folder.");
			
		}
		
	}
	
	public isAdminSession(): boolean {
		
		return this.isAdmin;
		
	}
	
	public hasExitSecurityCode(): boolean {
		
		return (this.hasOrganization() && this.getOrganization().hasExitSecurityCode());
		
	}
	
	public getExitSecurityCode(): string {
		
		if (this.hasExitSecurityCode()) return this.getOrganization().getExitSecurityCode();
		else return undefined;
		
	}
	
	protected getChildrenStructures(): Array<AFStructure<any>> {
		
		return [ this.getClient() ];
		
	}
	
	public log(recurse?: boolean): void {
	
		console.groupCollapsed("AFSession");
		
		if (this.isSessionLive()) console.info("Session Token:\t" + this.getToken());
		else console.info("Session Token:\t%cSession is not yet active...", "font-style: italic");
		
		if (this.hasClient()) this.getClient().log();
		else console.info("%cNo active client...", "font-style: italic");
		
		if (this.hasOrganization()) this.getOrganization().log();
		else console.info("%cNo active organization...", "font-style: italic");
		
		if (this.hasLocation()) this.getLocation().log();
		else console.info("%cNo active location...", "font-style: italic");
		
		if (this.hasDevice()) this.getDevice().log();
		else console.info("%cNo active device...", "font-style: italic");
		
		if (this.hasFolder()) this.getFolder().log();
		else console.info("%cNo active folder...", "font-style: italic");
		
		if (this.hasQuestion()) this.getQuestion().log();
		else console.info("%cNo active question...", "font-style: italic");
		
		console.groupEnd();
	
	}
	
}

export default AFSession;