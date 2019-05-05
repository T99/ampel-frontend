/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:17 PM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFOrganizationResponseStructure from "../response-structures/common/af-organization-response-structure.js";
import AFAPI from "../af-api.js";
import HTTPMethod from "../../descriptors/http-method.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
import AFLocationResponseStructure from "../response-structures/common/af-location-response-structure.js";
import AFClientResponseStructure from "../response-structures/common/af-client-response-structure.js";
import AFDeviceResponseStructure from "../response-structures/common/af-device-response-structure.js";
import AFFolderResponseStructure from "../response-structures/common/af-folder-response-structure.js";
import AFQuestionResponseStructure from "../response-structures/common/af-question-response-structure.js";
import AFOrganizationEverythingResponseStructure from "../response-structures/organization/af-organization-everything-response-structure.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIOrganizationAccessor {
	
	public static async getBaseByID(sessionToken: string, organizationID: string): Promise<AFOrganizationResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/organization/from-client")
			.withToken(sessionToken)
			.withRequestBody({ id: organizationID })
			.build()
		);
		
	}
	
	public static async getBasesForSession(sessionToken: string): Promise<ReadonlyArray<AFOrganizationResponseStructure>> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/client/self/organizations")
			.withToken(sessionToken)
			.build()
		);
		
	}
	
	public static async getEverything(sessionToken: string): Promise<AFOrganizationEverythingResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.GET)
				.withEndpointPath("/organization/self/with-all")
				.withToken(sessionToken)
				.build()
		);
		
	}
	
	public static async getClients(sessionToken: string): Promise<ReadonlyArray<AFClientResponseStructure>> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/organization/clients")
			.withToken(sessionToken)
			.build()
		);
		
	}
	
	public static async getLocations(sessionToken: string): Promise<ReadonlyArray<AFLocationResponseStructure>> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.GET)
				.withEndpointPath("/organization/locations")
				.withToken(sessionToken)
				.build()
		);
		
	}
	
	public static async getDevices(sessionToken: string): Promise<ReadonlyArray<AFDeviceResponseStructure>> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/organization/devices")
			.withToken(sessionToken)
			.build()
		);
		
	}
	
	public static async getFolders(sessionToken: string): Promise<ReadonlyArray<AFFolderResponseStructure>> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/organization/folders")
			.withToken(sessionToken)
			.build()
		);
		
	}
	
	public static async getQuestions(sessionToken: string): Promise<ReadonlyArray<AFQuestionResponseStructure>> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/organization/questions")
			.withToken(sessionToken)
			.build()
		);
		
	}
	
	public static async createQuestion(sessionToken: string, inquiry: string, questionType: number, folderID?: string):
		Promise<AFQuestionResponseStructure> {
		
		if (folderID !== undefined) {
			
			return await AFAPI.makeRequest(
				(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.POST)
				.withEndpointPath("/question")
				.withToken(sessionToken)
				.withRequestBody({
					inquiry,
					type: questionType,
					folderId: folderID
				})
				.build()
			);
			
		} else {
			
			return await AFAPI.makeRequest(
				(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.POST)
				.withEndpointPath("/question")
				.withToken(sessionToken)
				.withRequestBody({
					inquiry,
					type: questionType
				})
				.build()
			);
			
		}
		
	}
	
}

export default AFAPIOrganizationAccessor;