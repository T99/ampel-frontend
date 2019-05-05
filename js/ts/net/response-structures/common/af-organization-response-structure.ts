/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:37 PM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFResponseObject from "../af-response-object.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFOrganizationResponseStructure extends AFResponseObject {
	
	readonly name: string;
	
	readonly securityCode: string;
	
}

export default AFOrganizationResponseStructure;