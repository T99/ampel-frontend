/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:49 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSStructure from "../ts-structure.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSISet<E = any> extends TSStructure<E> {
	
	add(element: E): void;
	
	addAll(elements: E[]): void;
	
	remove(element: E): E;
	
	clear(): void;
	
	iterator(): TSAIterator<E>;
	
}

export default TSISet;