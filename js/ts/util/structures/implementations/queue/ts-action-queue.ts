/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:39 PM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSIQueue from "../../interfaces/queue/ts-i-queue.js";
import TSQueue from "./ts-queue.js";

type Action<E> = () => E;

/**
 * A queue of actions/lambdas.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSActionQueue<E = any> implements TSIQueue<Action<E>> {
	
	private internalQueue: TSQueue<Action<E>>;
	
	public constructor(...actions: Array<Action<E>>) {
		
		this.internalQueue = new TSQueue<Action<E>>(...actions);
		
	}
	
	public execute(): E {
		
		return this.dequeue()();
		
	}
	
	public executeAll(): E[] {
		
		let results: E[] = [];
		
		while (!this.isEmpty()) results.push(this.execute());
		
		return results;
		
	}
	
	public contains(element: Action<E>): boolean {
		
		return this.internalQueue.contains(element);
		
	}
	
	public dequeue(): Action<E> {
		
		return this.internalQueue.dequeue();
		
	}
	
	public enqueue(element: Action<E>): void {
		
		this.internalQueue.enqueue(element);
		
	}
	
	public isEmpty(): boolean {
		
		return this.internalQueue.isEmpty();
		
	}
	
	public peek(): Action<E> {
		
		return this.internalQueue.peek();
		
	}
	
	public size(): number {
		
		return this.internalQueue.size();
		
	}
	
	public toArray(): Array<Action<E>> {
		
		return this.internalQueue.toArray();
		
	}
	
}

export default TSActionQueue;