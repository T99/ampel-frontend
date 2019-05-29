/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:19 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSComparator from "../../structures/interfaces/ts-comparator.js";

/**
 * A class that can relatively order numeric values.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSNumericComparator extends TSComparator<number> {
	
	public constructor(reverseOrder?: boolean) {
		
		super(reverseOrder);
		
	}
	
	protected internalComparison(element1: number, element2: number): number {
		
		return (element1 - element2);
		
	}
	
}

export default TSNumericComparator;