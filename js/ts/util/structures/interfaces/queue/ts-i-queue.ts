/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:51 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSStructure from "../ts-structure.js";

/**
 * A queue (first-in-first-out/FIFO) structure.
 * 
 * This {@link TSStructure} functions similarly to the way a waiting line works in real life. A person (element) enters
 * (enqueues at) the end of the line (queue) and as people (elements) leave the front of the line (queue) one-by-one,
 * the person approaches the beginning of the line (queue) until it is their turn to leave (dequeue).
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSIQueue<E = any> extends TSStructure<E> {
	
	enqueue(element: E): void;
	
	dequeue(): E;
	
	peek(): E;
	
}

export default TSIQueue;