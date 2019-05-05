/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:16 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSStructure from "../ts-structure.js";

/**
 * A stack (last-in-first-out/LIFO) structure.
 *
 * This {@link TSStructure} functions similarly to the way a stack of items (i.e. books) works in real life. Each book
 * (element) is placed (pushed) onto the top of the stack, with each successive book (element) being placed (pushed) on
 * top of the last. In order to get to the book (element) at the bottom we have to take (pop) off the books (elements)
 * on top of it first.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSIStack<E = any> extends TSStructure<E> {
	
	push(element: E): void;
	
	pop(): E;
	
	peek(): E;
	
}

export default TSIStack;