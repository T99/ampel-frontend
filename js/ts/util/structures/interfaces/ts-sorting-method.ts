/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:35 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSComparator from "./ts-comparator.js";

/**
 * An abstract class representing sorting methods for array-based data structures.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class TSSortingMethod<E> {
	
	private comparator: TSComparator<E>;
	
	protected constructor(comparator: TSComparator<E>) {
		
		this.comparator = comparator;
		
	}
	
	public abstract sort(array: E[]): E[];
	
	protected getComparator(): TSComparator<E> {
		
		return this.comparator;
		
	}
	
	protected static swap<E>(array: E[], index1: number, index2: number): void {
		
		let temp: E = array[index1];
		array[index1] = array[index2];
		array[index2] = temp;
		
	}
	
}

export default TSSortingMethod;