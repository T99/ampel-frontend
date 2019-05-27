/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:00 AM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFResponseObjectType from "../af-response-object-type.js";
import TSType from "../../../util/type-checking/types/ts-type.js";
import TSStandardType from "../../../util/type-checking/types/ts-standard-type.js";
import AFValueReadablePairType from "../af-value-readable-pair-type.js";
import TSObjectTypeDefinition from "../../../util/type-checking/types/ts-object-type-definition.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFClientResponseStructureType extends AFResponseObjectType {
	
	public readonly firstName: TSType = TSStandardType.STRING;
	
	public readonly lastName: TSType = TSStandardType.STRING;
	
	public readonly email: TSType = TSStandardType.STRING;
	
	public readonly phone: TSType = TSStandardType.NUMBER;
	
	public readonly gender: TSObjectTypeDefinition = new AFValueReadablePairType();
	
	public readonly birthday: TSObjectTypeDefinition = new class implements TSObjectTypeDefinition {
		
		public readonly month: TSType = TSStandardType.NUMBER;
		
		public readonly day: TSType = TSStandardType.NUMBER;
		
		public readonly year: TSType = TSStandardType.NUMBER;
		
		public readonly value: TSType = TSStandardType.STRING;
		
		readonly [property: string]: TSType | TSObjectTypeDefinition;
		
	};
	
}

export default AFClientResponseStructureType;