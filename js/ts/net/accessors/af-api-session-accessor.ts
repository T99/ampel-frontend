/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:03 AM -- April 17th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFSessionResponseStructure from "../response-structures/common/af-session-response-structure.js";
import AFAPI from "../af-api.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
import HTTPMethod from "../../descriptors/http-method.js";

/**
 * Various API accessor methods for session sign-in.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPISessionAccessor {
	
	public static async createSession(email: string, password: string): Promise<AFSessionResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.POST)
			.withEndpointPath("/client/sign-in")
			.withRequestBody({
				email,
				password
			}).build()
		);
	
	}
	
	public static async setSessionOrganization(sessionToken: string, organizationID: string): Promise<AFSessionResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.POST)
			.withEndpointPath("/client/sign-in/organization")
			.withToken(sessionToken)
			.withRequestBody({
				id: organizationID
			}).build()
		);
		
	}
	
	public static async setSessionDevice(sessionToken: string, deviceID: string): Promise<AFSessionResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.POST)
			.withEndpointPath("/kiosk/register")
			.withToken(sessionToken)
			.withRequestBody({
				deviceId: deviceID
			}).build()
		);
		
	}
	
}

export default AFAPISessionAccessor;