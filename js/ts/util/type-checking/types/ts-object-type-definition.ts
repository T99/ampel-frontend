/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:55 PM -- May 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSType from "./ts-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSObjectTypeDefinition {
	
	readonly [property: string]: TSType | TSObjectTypeDefinition;

}

export default TSObjectTypeDefinition;