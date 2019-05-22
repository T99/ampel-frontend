/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:12 AM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
import TSComparator from "../../interfaces/ts-comparator.js";

/**
 * The selection sort sorting algorithm.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSSelectionSort<E> extends TSSortingMethod<E> {
	
	public constructor(comparator: TSComparator<E>) {
		
		super(comparator);
		
	}
	
	public sort(array: E[]): E[] {
		
		let ensuredIndices: number = 0;
		
		while (ensuredIndices < array.length) {
			
			let leastElementIndex: number = ensuredIndices;
			
			for (let index: number = ensuredIndices; index < array.length; index++) {
				
				if (this.getComparator().isLessThan(array[index], array[leastElementIndex])) leastElementIndex = index;
				
			}
			
			if (leastElementIndex !== ensuredIndices) TSSortingMethod.swap(array, ensuredIndices, leastElementIndex);
			
			ensuredIndices++;
			
		}
		
		return array;
		
	}
	
}

export default TSSelectionSort;