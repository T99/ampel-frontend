/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:00 PM -- February 09th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFLocationResponseStructure from "../response-structures/common/af-location-response-structure.js";
import HTTPMethod from "../../descriptors/http-method.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
import AFAPI from "../af-api.js";
import AFDeviceResponseStructure from "../response-structures/common/af-device-response-structure.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPILocationAccessor {
	
	public static async getBase(sessionToken: string, locationID: string): Promise<AFLocationResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.GET)
				.withEndpointPath("/location")
				.withToken(sessionToken)
				.withRequestBody({ id: locationID })
				.build()
		);
		
	}
	
	public static async getDevices(sessionToken: string, locationID: string): Promise<ReadonlyArray<AFDeviceResponseStructure>> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
			.withHTTPMethod(HTTPMethod.GET)
			.withEndpointPath("/location/devices")
			.withToken(sessionToken)
			.withRequestBody({ id: locationID })
			.build()
		);
		
	}
	
	public static async createForOrganization(sessionToken: string, name: string): Promise<AFLocationResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.POST)
				.withEndpointPath("/location")
				.withToken(sessionToken)
				.withRequestBody({ name })
				.build()
		);
		
	}
	
	public static async updateName(sessionToken: string, locationID: string, name: string): Promise<AFLocationResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.PUT)
				.withEndpointPath("/location/name")
				.withToken(sessionToken)
				.withRequestBody({
					id: locationID,
					name
				})
				.build()
		);
		
	}
	
	public static async delete(sessionToken: string, locationID: string): Promise<void> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.DELETE)
				.withEndpointPath("/location")
				.withToken(sessionToken)
				.withRequestBody({ id: locationID })
				.build()
		);
		
	}
	
}

export default AFAPILocationAccessor;