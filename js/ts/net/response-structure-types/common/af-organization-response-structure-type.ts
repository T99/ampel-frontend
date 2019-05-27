/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:17 AM -- May 27th, 2019.
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
class AFOrganizationResponseStructureType extends AFResponseObjectType {
	
	public readonly name: TSType = TSStandardType.STRING;
	
	public readonly configId: TSType = TSStandardType.STRING;
	
	public readonly mailchimpConfigId: TSType = TSStandardType.STRING;
	
	public readonly securityCode: TSType = TSStandardType.STRING;
	
}

export default AFOrganizationResponseStructureType;