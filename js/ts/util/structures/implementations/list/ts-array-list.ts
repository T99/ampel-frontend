/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:14 PM -- February 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSIList from "../../interfaces/list/ts-i-list.js";
import TSComparator from "../../interfaces/ts-comparator.js";
import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
import TSNaturalComparator from "../comparators/ts-natural-comparator.js";
import TSBubbleSort from "../sorting-methods/ts-bubble-sort.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSArrayList<E = any> implements TSIList<E> {
	
	protected internalArray: E[] = [];
	
	protected cursor: number = 0;
	
	public constructor(...elements: E[]) {
		
		this.addAll(elements);
		
	}
	
	public add(element: E, index?: number): void {
		
		if (index === undefined) this.internalArray[this.cursor++] = element;
		else {
			
			if (index > this.cursor) throw new Error("ERR | Index out of bounds (size: " + this.cursor + ") (accessed index: " + index + ").");
			else {
				
				for (let i: number = this.cursor; i > index; i--) {
					
					this.internalArray[i] = this.internalArray[i - 1];
					
				}
				
				this.internalArray[index] = element;
				
			}
			
		}
	}
	
	public addAll(elements: E[]): void {
		
		for (let element of elements) this.add(element);
		
	}
	
	public get(index: number): E {
		
		if ((index >= 0) && (index < this.internalArray.length)) return this.internalArray[index];
		else throw new Error("Attempted to retrieve an out-of-bounds index from this TSArrayList.");
		
	}
	
	public remove(removed: E): E  {
		
		if (this.contains(removed)) {
			
			let indexRemoved: number = this.internalArray.removeElement(removed);
			
			this.cursor--;
			
			for (let index: number = indexRemoved; index < this.cursor; index++) {
				
				this.internalArray[index] = this.internalArray[index + 1];
				
			}
			
			this.internalArray[this.cursor] = undefined;
			
			return removed;
			
		} else return undefined;
		
	}
	
	public removeIndex(index: number): E {
		
		return this.internalArray.removeIndex(index);
		
	}
	
	public clear(): void {
		
		this.internalArray = [];
		this.cursor = 0;
		
	}
	
	public sort(comparator?: TSComparator<E>, method?: TSSortingMethod<E>): void {
		
		if (comparator === undefined) comparator = new TSNaturalComparator();
		if (method === undefined) method = new TSBubbleSort(comparator);
		
		method.sort(this.internalArray);
		
	}
	
	public iterator(): TSAIterator<E> {
		
		return new class extends TSAIterator<E> {
			
			private list: TSArrayList<E>;
			
			private index: number;
			
			public constructor(list: TSArrayList<E>) {
				
				super();
				
				this.list = list;
				this.index = 0;
				
			}
			
			public hasNext(): boolean {
				
				return (this.index < this.list.size());
				
			}
			
			public next(): E {
				
				return this.list.get(this.index++);
				
			}
			
			public remove(): E {
				
				if (this.index > 0) return this.list.removeIndex(--this.index);
				else return undefined;
				
			}
			
			public reset(): void {
				
				this.index = 0;
				
			}
			
		}(this);
		
	}
	
	public shuffle(iterations: number = 1): void {
		
		for (let count: number = 0; count < iterations; count++) {
			
			let elements: E[] = this.toArray();
			this.clear();
			
			while (elements.length !== 0) {
				
				let random: number = Math.floor(Math.random() * elements.length);
				let element: E = elements.removeIndex(random);
				this.add(element);
				
			}
			
		}
		
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
	
	public toArray(): E[] {
		
		return this.internalArray;
		
	}
	
}

export default TSArrayList;