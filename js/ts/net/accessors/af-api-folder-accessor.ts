/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:21 PM -- February 09th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFFolderResponseStructure from "../response-structures/common/af-folder-response-structure.js";
import HTTPMethod from "../../descriptors/http-method.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
import AFAPI from "../af-api.js";
import AFQuestionResponseStructure from "../response-structures/common/af-question-response-structure.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIFolderAccessor {
	
	public static async getBase(sessionToken: string, folderID: string): Promise<AFFolderResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.GET)
				.withEndpointPath("/folder")
				.withToken(sessionToken)
				.withRequestBody({ id: folderID })
				.build()
		);
		
	}
	
	public static async getQuestions(sessionToken: string, folderID: string): Promise<ReadonlyArray<AFQuestionResponseStructure>> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/folder/questions")
			.withToken(sessionToken)
			.withRequestBody({ id: folderID })
			.build()
		);
		
	}
	
	public static async createForOrganization(sessionToken: string,
											  name: string,
											  shuffled: boolean,
											  questionIDs: string[] = []): Promise<AFFolderResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.POST)
				.withEndpointPath("/folder")
				.withToken(sessionToken)
				.withRequestBody({
					name,
					shuffled,
					questionIds: questionIDs
				})
				.build()
		);
		
	}
	
	public static async updateName(sessionToken: string, folderID: string, name: string): Promise<AFFolderResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.PUT)
				.withEndpointPath("/folder/name")
				.withToken(sessionToken)
				.withRequestBody({
					id: folderID,
					name
				})
				.build()
		);
		
	}
	
	public static async updateShuffled(sessionToken: string, folderID: string, shuffled: boolean): Promise<AFFolderResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.PUT)
			.withEndpointPath("/folder/shuffled")
			.withToken(sessionToken)
			.withRequestBody({
				id: folderID,
				shuffled
			})
			.build()
		);
		
	}
	
	public static async updateQuestions(sessionToken: string, folderID: string, questions: string[]): Promise<AFFolderResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.PUT)
			.withEndpointPath("/folder/questions")
			.withToken(sessionToken)
			.withRequestBody({
				id: folderID,
				questions
			})
			.build()
		);
		
	}
	
}

export default AFAPIFolderAccessor;