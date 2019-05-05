/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:30 PM -- January 24th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

interface Array<T> {
	
	/**
	 * Returns true if this array contains the specified element. Optionally provide a starting and/or ending index to
	 * check if the provided element only exists in or after the provided starting index and/or before the provided
	 * ending index.
	 *
	 * @param {T} element The element to look for.
	 * @param {number} startingIndex The index to start looking for the element at (inclusive).
	 * @param {number} endingIndex The index to stop looking for the element at (exclusive).
	 * @returns {boolean} true if this array contains the specified element.
	 */
	includes(element: T, startingIndex?: number, endingIndex?: number): boolean;
	
	/**
	 * Returns true if this array contains all of the specified elements.
	 *
	 * @param {T[]} elements A list of elements to check for.
	 * @returns {boolean} true if this array contains all of the specified elements.
	 */
	includesAll(...elements: T[]): boolean;
	
	/**
	 * Removes the element at a given index
	 *
	 * @param {number} index The index for which
	 * @returns {T} The element that was removed.
	 */
	removeIndex(index: number): T;
	
	/**
	 * Removes all instances of a given element from an array, returning the number of instances removed.
	 *
	 * @param {T} element The element to remove from the array.
	 * @returns {T} The number of instances removed.
	 */
	removeElement(element: T): number;
	
}