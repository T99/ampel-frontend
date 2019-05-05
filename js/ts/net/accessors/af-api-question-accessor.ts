/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:46 PM -- February 09th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

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
class AFAPIQuestionAccessor {
	
	public static async getBase(sessionToken: string, questionID: string): Promise<AFQuestionResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.GET)
				.withEndpointPath("/question")
				.withToken(sessionToken)
				.withRequestBody({ id: questionID })
				.build()
		);
		
	}
	
	public static async createForOrganization(sessionToken: string, inquiry: string, type: number,
											  folderID?: string): Promise<AFQuestionResponseStructure> {
		
		if (folderID === undefined) {
			
			return await AFAPI.makeRequest(
				(new AFEndpointRequestBuilder())
					.withHTTPMethod(HTTPMethod.POST)
					.withEndpointPath("/question")
					.withToken(sessionToken)
					.withRequestBody({
						inquiry,
						type
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
					type,
					folderId: folderID
				})
				.build()
			);
			
		}
		
	}
	
	public static async updateInquiry(sessionToken: string, questionID: string, inquiry: string): Promise<AFQuestionResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.PUT)
				.withEndpointPath("/question/inquiry")
				.withToken(sessionToken)
				.withRequestBody({
					id: questionID,
					inquiry
				})
				.build()
		);
		
	}
	
	public static async updateConfig(sessionToken: string, questionID: string): Promise<AFQuestionResponseStructure> {
		
		// TODO [2/9/19 @ 4:24 PM] - Finish the 'updateConfig' method. This method is missing parameters.
		return null;
		
	}
	
	public static async delete(sessionToken: string, questionID: string): Promise<void> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.DELETE)
				.withEndpointPath("/question")
				.withToken(sessionToken)
				.withRequestBody({ id: questionID })
				.build()
		);
		
	}
	
}

export default AFAPIQuestionAccessor;