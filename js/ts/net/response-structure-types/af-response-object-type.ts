/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:53 PM -- May 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSObjectTypeDefinition from "../../util/type-checking/types/ts-object-type-definition.js";
import TSType from "../../util/type-checking/types/ts-type.js";
import TSStandardType from "../../util/type-checking/types/ts-standard-type.js";
import AFValueReadablePairType from "./af-value-readable-pair-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFResponseObjectType implements TSObjectTypeDefinition {
	
	public readonly id: TSType = TSStandardType.STRING;
	
	public readonly createdAt: TSObjectTypeDefinition = new AFValueReadablePairType();
	
	public readonly updatedAt: TSObjectTypeDefinition = new AFValueReadablePairType();
	
	readonly [property: string]: TSType | TSObjectTypeDefinition;
	
}

export default AFResponseObjectType;