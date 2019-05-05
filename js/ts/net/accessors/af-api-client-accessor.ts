/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:15 AM -- February 08th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClientResponseStructure from "../response-structures/common/af-client-response-structure.js";
import HTTPMethod from "../../descriptors/http-method.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
import AFAPI from "../af-api.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIClientAccessor {
	
	public static async getBaseForSession(sessionToken: string): Promise<AFClientResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.GET)
				.withEndpointPath("/client/self")
				.withToken(sessionToken)
				.build()
		);
		
	}
	
	public static async getBaseForID(sessionToken: string, clientID: string): Promise<AFClientResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/client")
			.withToken(sessionToken)
			.withRequestBody({ id: clientID })
			.build()
		);
		
	}
	
}

export default AFAPIClientAccessor;