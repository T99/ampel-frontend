/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:57 PM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import InvalidArgumentsError from "./invalid-arguments-error.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class MalformedJSONError extends Error {
	
	/**
	 * Initializes a new MalformedJSONError.
	 */
	public constructor(name: string, json: any, expectedKeys: string[]) {
		
		let missingKeys: string[] = [];
		for (let key of expectedKeys) if (!(json[key])) missingKeys.push(key);
		
		if (missingKeys.length === 0) {
			
			throw new InvalidArgumentsError("Attempted to form a MalformedJSONError with non-malformed JSON. Keys " +
				"were specified as missing even though they were in fact present.");
			
		} else {
			
			let errorMessage: string = "JSON '" + name + "' was missing the following keys: ";
			
			for (let index: number = 0; index < missingKeys.length; index++) {
				
				errorMessage += "'" + missingKeys[index] + "'";
				
				if (index < missingKeys.length - 1) errorMessage += ", ";
				else errorMessage += ".";
				
			}
			
			super(errorMessage);
			
		}
		
	}
	
}

export default MalformedJSONError;