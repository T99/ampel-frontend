/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:31 PM -- February 09th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFDeviceResponseStructure from "../response-structures/common/af-device-response-structure.js";
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
class AFAPIDeviceAccessor {
	
	public static async getBase(sessionToken: string, deviceID: string): Promise<AFDeviceResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.GET)
				.withEndpointPath("/device")
				.withToken(sessionToken)
				.withRequestBody({ id: deviceID })
				.build()
		);
		
	}
	
	public static async createForOrganization(sessionToken: string, name: string, locationID: string,
											  folderID: string): Promise<AFDeviceResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.POST)
				.withEndpointPath("/device")
				.withToken(sessionToken)
				.withRequestBody({
					name,
					locationId: locationID,
					folderId: folderID
				})
				.build()
		);
		
	}
	
	public static async updateName(sessionToken: string, deviceID: string, name: string): Promise<AFDeviceResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.PUT)
				.withEndpointPath("/device/name")
				.withToken(sessionToken)
				.withRequestBody({
					id: deviceID,
					name
				})
				.build()
		);
		
	}
	
	public static async updateFolder(sessionToken: string, deviceID: string, folderID: string): Promise<AFDeviceResponseStructure> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.PUT)
				.withEndpointPath("/device/folder")
				.withToken(sessionToken)
				.withRequestBody({
					id: deviceID,
					folderId: folderID
				})
				.build()
		);
		
	}
	
	public static async delete(sessionToken: string, deviceID: string): Promise<void> {
		
		return await AFAPI.makeRequest(
			(new AFEndpointRequestBuilder())
				.withHTTPMethod(HTTPMethod.DELETE)
				.withEndpointPath("/device")
				.withToken(sessionToken)
				.withRequestBody({ id: deviceID })
				.build()
		);
		
	}
	
}

export default AFAPIDeviceAccessor;