/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:05 PM -- January 24th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Global changes made to various types.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class GlobalModificationImplementations {

	private constructor() { /* Do nothing. */ }

	public static makeModifications(): void {

		// Modifications to Array<T>...
		this.implementArrayIncludes();
		this.implementArrayIncludesAll();
		this.implementArrayRemoveIndex();
		this.implementArrayRemoveElement();
		
	}

	private static implementArrayIncludes(): void {
		
		Array.prototype.includes = function<T>(element: T, startingIndex?: number, endingIndex?: number): boolean {
			
			if (startingIndex && !endingIndex) {
				
				return this.indexOf(element, startingIndex) !== -1;
				
			} else if (startingIndex && endingIndex) {
				
				for (let index: number = startingIndex; startingIndex < endingIndex; index++) {
					
					if (this[index] === element) return true;
					
				}
				
				return false;
				
			} else return this.indexOf(element) !== -1;
			
		};
		
	}
	
	private static implementArrayIncludesAll(): void {
		
		Array.prototype.includesAll = function<T>(...elements: T[]): boolean {
			
			for (let element of elements) if (!this.includes(element)) return false;
			return true;
			
		};
		
	}
	
	private static implementArrayRemoveIndex(): void {
		
		Array.prototype.removeIndex = function<T>(index: number): T {
			
			if (index < this.length) {
				
				let removedElement: T = this[index];
				this.splice(index, 1);
				return removedElement;
				
			} else return undefined;
			
		};
		
	}
	
	private static implementArrayRemoveElement(): void {
		
		Array.prototype.removeElement = function<T>(element: T): number {
			
			let numberRemoved: number = 0;
			
			while (this.includes(element)) {
				
				this.splice(this.indexOf(element), 1);
				numberRemoved--;
				
			}
			
			return numberRemoved;
			
		};
		
	}

}

export default GlobalModificationImplementations;