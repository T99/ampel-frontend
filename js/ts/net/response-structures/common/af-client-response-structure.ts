/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:42 PM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFValueReadablePair from "../af-value-readable-pair.js";
import AFResponseObject from "../af-response-object.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFClientResponseStructure extends AFResponseObject {
	
	readonly firstName: string;
	
	readonly lastName: string;
	
	readonly email: string;
	
	readonly phone: number;
	
	readonly gender: AFValueReadablePair;
	
	readonly birthday: {
		
		readonly month: number;
		
		readonly day: number;
		
		readonly year: number;
		
		readonly value: string;
		
	};
	
}

export default AFClientResponseStructure;