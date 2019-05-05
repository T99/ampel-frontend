/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:11 PM -- February 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSStructure<E = any> {
	
	size(): number;
	
	isEmpty(): boolean;
	
	contains(element: E): boolean;
	
	toArray(): E[];
	
}

export default TSStructure;