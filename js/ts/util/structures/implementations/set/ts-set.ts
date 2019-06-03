/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:37 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSISet from "../../interfaces/set/ts-i-set.js";
import TSArrayList from "../list/ts-array-list.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";

/**
 * A set of elements. This {@link TSStructure} serves as an representative model for mathematical sets.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSSet<E = any> implements TSISet<E> {
	
	private internalStructure: TSArrayList<E>;
	
	public constructor(...elements: E[]) {
	
		this.internalStructure = new TSArrayList<E>();
		
		this.addAll(elements);
	
	}
	
	public add(element: E): void {
	
		if (!this.internalStructure.contains(element)) this.internalStructure.add(element);
	
	}
	
	public addAll(elements: E[]): void {
		
		for (let element of elements) this.add(element);
		
	}
	
	public clear(): void {
		
		this.internalStructure.clear();
		
	}
	
	public contains(element: E): boolean {
		
		return this.internalStructure.contains(element);
		
	}
	
	public isEmpty(): boolean {
		
		return this.internalStructure.isEmpty();
		
	}
	
	public iterator(): TSAIterator<E> {
		
		return this.internalStructure.iterator();
		
	}
	
	public remove(element: E): E {
		
		this.internalStructure.remove(element);
		return element;
		
	}
	
	public size(): number {
		
		return this.internalStructure.size();
		
	}
	
	public toArray(): E[] {
		
		return this.internalStructure.toArray();
		
	}
	
}

export default TSSet;