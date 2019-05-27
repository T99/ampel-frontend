/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:54 PM -- May 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSObjectTypeDefinition from "../../util/type-checking/types/ts-object-type-definition.js";
import TSStandardType from "../../util/type-checking/types/ts-standard-type.js";
import TSType from "../../util/type-checking/types/ts-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFValueReadablePairType implements TSObjectTypeDefinition {
	
	public readonly value: TSType = TSStandardType.NUMBER;
	
	public readonly readable: TSType = TSStandardType.STRING;
	
	readonly [property: string]: TSType | TSObjectTypeDefinition;
	
}

export default AFValueReadablePairType;