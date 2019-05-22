/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:12 PM -- February 21st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSStructure from "../ts-structure.js";
import TSComparator from "../ts-comparator.js";
import TSSortingMethod from "../ts-sorting-method.js";
import TSIIterator from "../iterate/ts-i-iterator.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSIList<E = any> extends TSStructure<E> {
	
	add(element: E): void;
	
	addAll(elements: E[]): void;
	
	get(index: number): E;
	
	remove(element: E): void;
	
	clear(): void;
	
	sort(comparator?: TSComparator<E>, method?: TSSortingMethod<E>): void;
	
	iterator(): TSIIterator<E>;
	
}

export default TSIList;