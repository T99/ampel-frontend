/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:37 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSStructure from "../../interfaces/ts-structure.js";
import TSISet from "../../interfaces/set/ts-i-set.js";

/**
 * A set of elements. This {@link TSStructure} serves as an representative model for mathematical sets.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSSet<E = any> implements TSISet<E> {
	
	public constructor(...elements: E[]) {
	
	
	
	}
	
	public contains(element: E): boolean {
		
		return false;
		
	}
	
	public isEmpty(): boolean {
		
		return false;
		
	}
	
	public size(): number {
		
		return 0;
		
	}
	
	public toArray(): E[] {
		
		return [];
		
	}
	
}

export default TSSet;