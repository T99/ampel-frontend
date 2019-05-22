/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:38 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
import TSComparator from "../../interfaces/ts-comparator.js";

/**
 * The bubble sort sorting algorithm.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSBubbleSort<E> extends TSSortingMethod<E> {
	
	public constructor(comparator: TSComparator<E>) {
		
		super(comparator);
		
	}
	
	public sort(array: E[]): E[] {
		
		let ensuredIndices: number = 0;
		
		while (ensuredIndices < (array.length - 1)) {
			
			for (let index: number = 0; index < (array.length - 1 - ensuredIndices); index++) {
				
				if (this.getComparator().isGreaterThan(array[index], array[index + 1])) TSSortingMethod.swap(array, index, index + 1);
				
			}
			
			ensuredIndices++;
			
		}
		
		return array;
		
	}
	
}

export default TSBubbleSort;