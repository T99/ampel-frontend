/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:10 PM -- February 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSStructure from "../../interfaces/ts-structure.js";
import TSIQueue from "../../interfaces/queue/ts-i-queue.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSQueue<E = any> implements TSIQueue<E> {
	
	private internalArray: E[] = [];
	
	public constructor(...elements: E[]) {
		
		this.enqueue(...elements);
		
	}
	
	public enqueue(...elements: E[]): void {
		
		this.internalArray.push(...elements);
		
	}
	
	public dequeue(): E {
		
		return this.internalArray.shift();
		
	}
	
	public peek(): E {
		
		return this.internalArray[0];
		
	}
	
	public size(): number {
		
		return this.internalArray.length;
		
	}
	
	public isEmpty(): boolean {
		
		return (this.size() === 0);
		
	}
	
	public contains(element: E): boolean {
		
		return this.internalArray.includes(element);
		
	}
	
	public clear(): void {
		
		this.internalArray = [];
		
	}
	
	public toArray(): E[] {
		
		return this.internalArray;
		
	}
	
}

export default TSQueue;