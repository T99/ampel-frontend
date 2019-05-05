/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:02 PM -- April 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFResponseObject from "../af-response-object.js";

/**
 * The response sent by the API after a successful sign-in.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFSessionResponseStructure extends AFResponseObject {

	readonly clientId: string;
	
	readonly organizationId: string;
	
	readonly deviceId: string;
	
	readonly isLive: boolean;
	
	readonly ip: string;
	
	readonly isAdmin: boolean;

}

export default AFSessionResponseStructure;