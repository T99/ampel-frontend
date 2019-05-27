/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:06 AM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFResponseObjectType from "../af-response-object-type.js";
import TSType from "../../../util/type-checking/types/ts-type.js";
import TSStandardType from "../../../util/type-checking/types/ts-standard-type.js";
import TSSpecialType from "../../../util/type-checking/types/ts-special-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFConfigResponseStructureType extends AFResponseObjectType {
	
	public readonly organizationId: TSType = TSStandardType.STRING;
	
	public readonly data: TSType = TSSpecialType.ANY;
	
}

export default AFConfigResponseStructureType;