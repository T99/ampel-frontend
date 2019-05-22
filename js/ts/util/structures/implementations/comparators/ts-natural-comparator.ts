/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:52 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSComparator from "../../interfaces/ts-comparator.js";
import TSNumericComparator from "./ts-numeric-comparator.js";
import TSAlphanumericComparator from "./ts-alphanumeric-comparator.js";

/**
 * A comparator that attempts to order any element .
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSNaturalComparator extends TSComparator<any> {
	
	public constructor(reverseOrder?: boolean) {
		
		super(reverseOrder);
		
	}
	
	protected internalComparison(element1: any, element2: any): number {
		
		if ((typeof element1 === "number") && (typeof element2 === "number")) {
			
			return (new TSNumericComparator(this.isReverseOrder())).compare(element1, element2);
			
		} else if ((typeof element1 === "string") && (typeof element2 === "string")) {
			
			return (new TSAlphanumericComparator(this.isReverseOrder())).compare(element1, element2);
			
		} else if (((typeof element1 === "number") && (typeof element2 === "string")) ||
					((typeof element1 === "string") && (typeof element2 === "number"))) {
			
			return (new TSAlphanumericComparator(this.isReverseOrder())).compare(element1.toString(), element2.toString());
			
		} else return 0;
		
	}
	
}

export default TSNaturalComparator;