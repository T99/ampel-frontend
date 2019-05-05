/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:00 PM -- February 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSDate from "../../descriptors/time/ts-date.js";
import TSDoublyLinkedList from "../../structures/implementations/list/ts-doubly-linked-list.js";
import AFResponse from "./af-response.js";
import AFResponseSessionStructure from "./af-response-session-structure.js";
import AFCustomerStructure from "./af-customer-structure.js";
import AFPhoneNumber from "../descriptors/af-phone-number.js";
import AFFolder from "../structures/af-folder.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFFeedbackSession {
	
	private folder: AFFolder;
	
	private initialStartTime: TSDate;
	
	private latitude: number;
	
	private longitude: number;
	
	private customer: AFCustomerStructure;
	
	private responseDLL: TSDoublyLinkedList<AFResponse>;
	
	public constructor(folder: AFFolder, startTime: TSDate) {
		
		this.folder = folder;
		this.initialStartTime = startTime;
		
		this.responseDLL = new TSDoublyLinkedList<AFResponse>();
		
	}
	
	public addLocation(latitude: number, longitude: number): void {
		
		this.latitude = latitude;
		this.longitude = longitude;
		
	}
	
	public addCustomer(firstName: string, lastName: string, phone: AFPhoneNumber, email: string): void {
		
		this.customer = {
			
			firstName,
			lastName,
			phone: phone.toNumber(),
			email
			
		};
		
	}
	
	public addResponse(response: AFResponse): void {
	
		this.responseDLL.insertLast(response);
		
		console.log(this.toJSON());
	
	}
	
	public undoResponse(): void {
		
		if (!this.responseDLL.isEmpty()) this.responseDLL.removeLast();
		else throw new Error("Attempted to undo a response from an already empty response list.");
		
	}
	
	public hasResponses(): boolean {
		
		return !this.responseDLL.isEmpty();
		
	}
	
	public toJSON(): AFResponseSessionStructure {
		
		if (this.responseDLL.isEmpty()) throw new Error("Attempted to build an empty session response object.");
		
		let response: AFResponseSessionStructure = {
			
			startTimestamp: this.initialStartTime.getAdjustedEpochTime(),
			endTimestamp: this.responseDLL.getLastNode().getElement().getSubmittedAtTime().getAdjustedEpochTime(),
			responses: []
			
		};
		
		if ((this.longitude !== undefined) && (this.latitude !== undefined)) {
			
			response.lat = this.latitude;
			response.lng = this.longitude;
			
		}
		
		if (this.customer !== undefined) response.customer = this.customer;
		
		let previousStartTime: TSDate = this.initialStartTime;
		
		for (let individualResponse of this.responseDLL.iterator()) {
			
			response.responses.push({
				
				startTimestamp: previousStartTime.getAdjustedEpochTime(),
				endTimestamp: individualResponse.getSubmittedAtTime().getAdjustedEpochTime(),
				questionId: individualResponse.getQuestion().getID(),
				answer: individualResponse.getResponse()
				
			});
			
			previousStartTime = individualResponse.getSubmittedAtTime();
			
		}
		
		return response;
		
	}
	
}

export default AFFeedbackSession;