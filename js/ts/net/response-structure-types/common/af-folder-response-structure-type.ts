/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:14 AM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSType from "../../../util/type-checking/types/ts-type.js";
import TSStandardType from "../../../util/type-checking/types/ts-standard-type.js";
import TSArrayType from "../../../util/type-checking/types/ts-array-type.js";
import AFResponseObjectType from "../af-response-object-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFFolderResponseStructureType extends AFResponseObjectType {
	
	public readonly name: TSType = TSStandardType.STRING;
	
	public readonly organizationId: TSType = TSStandardType.STRING;
	
	public readonly shuffled: TSType = TSStandardType.BOOLEAN;
	
	public readonly questionIds: TSType = new TSArrayType(TSStandardType.STRING);
	
}

export default AFFolderResponseStructureType;