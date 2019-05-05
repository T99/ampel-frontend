/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:15 PM -- March 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFQuestionResponseStructure from "../response-structures/common/af-question-response-structure.js";
import AFAPI from "../af-api.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
import HTTPMethod from "../../descriptors/http-method.js";
import AFResponseSessionStructure from "../../af-structures/feedback-session/af-response-session-structure.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIResponseAccessor {
	
	public static async submit(response: AFResponseSessionStructure, sessionToken: string): Promise<AFQuestionResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.POST)
			.withEndpointPath("/kiosk/response")
			.withToken(sessionToken)
			.withRequestBody(response)
			.build()
		);
		
	}
	
}

export default AFAPIResponseAccessor;