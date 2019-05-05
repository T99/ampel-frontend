/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:04 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSStructure from "../ts-structure.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSIPriorityQueue<V = any, E = any> extends TSStructure<E> {
	
	enqueue(value: V, element: E): void;
	
	dequeue(): E;
	
	peek(): E;
	
}

export default TSIPriorityQueue;