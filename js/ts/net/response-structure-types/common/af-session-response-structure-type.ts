/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:31 AM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFResponseObjectType from "../af-response-object-type.js";
import TSType from "../../../util/type-checking/types/ts-type.js";
import TSStandardType from "../../../util/type-checking/types/ts-standard-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFSessionResponseStructureType extends AFResponseObjectType {
	
	public readonly clientId: TSType = TSStandardType.STRING;
	
	public readonly organizationId: TSType = TSStandardType.STRING;
	
	public readonly deviceId: TSType = TSStandardType.STRING;
	
	public readonly isLive: TSType = TSStandardType.BOOLEAN;
	
	public readonly ip: TSType = TSStandardType.STRING;
	
	public readonly isAdmin: TSType = TSStandardType.BOOLEAN;
	
}

export default AFSessionResponseStructureType;