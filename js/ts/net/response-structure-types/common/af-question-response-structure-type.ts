/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:19 AM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSType from "../../../util/type-checking/types/ts-type.js";
import TSStandardType from "../../../util/type-checking/types/ts-standard-type.js";
import TSObjectTypeDefinition from "../../../util/type-checking/types/ts-object-type-definition.js";
import AFValueReadablePairType from "../af-value-readable-pair-type.js";
import AFResponseObjectType from "../af-response-object-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFQuestionResponseStructureType extends AFResponseObjectType {
	
	public readonly inquiry: TSType = TSStandardType.STRING;
	
	public readonly organizationId: TSType = TSStandardType.STRING;
	
	public readonly type: TSObjectTypeDefinition = new AFValueReadablePairType();
	
	// TODO [5/27/19 @ 12:22 AM] - Get optional system for type checking working.
	// Also need to provide support for the "[id: string]: string" syntax.
	// public readonly options?: { [id: string]: string };
	
}

export default AFQuestionResponseStructureType;