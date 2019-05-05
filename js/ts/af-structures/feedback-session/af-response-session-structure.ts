/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:15 AM -- March 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFCustomerStructure from "./af-customer-structure.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFResponseSessionStructure {

	startTimestamp: number;
	
	endTimestamp: number;
	
	lat?: number;
	
	lng?: number;
	
	customer?: AFCustomerStructure;
	
	responses: Array<{
		
		startTimestamp: number,
		
		endTimestamp: number,
		
		questionId: string,
		
		answer: any
		
	}>;

}

export default AFResponseSessionStructure;