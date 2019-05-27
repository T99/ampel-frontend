/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:56 PM -- May 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSType from "./types/ts-type.js";

/**
 * Validates that inputs match certain types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTypechecker {
	
	public constructor() {
	
	
	
	}
	
	public static validateType(input: any, type: TSType): boolean {
	
		return type.checkConformity(input);
	
	}
	
}

export default TSTypechecker;