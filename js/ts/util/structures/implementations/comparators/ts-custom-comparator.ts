/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:49 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSComparator from "../../interfaces/ts-comparator.js";

/**
 * A custom comparator defined by whatever function is passed to the constructor.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSCustomComparator<E> extends TSComparator<E> {
	
	private readonly comparatorFunction: (element1: E, element2: E) => number;
	
	public constructor(comparatorFunction: (element1: E, element2: E) => number, reverseOrder?: boolean) {
		
		super(reverseOrder);
		
		this.comparatorFunction = comparatorFunction;
		
	}
	
	protected internalComparison(element1: E, element2: E): number {
		
		return this.comparatorFunction(element1, element2);
		
	}
	
}

export default TSCustomComparator;