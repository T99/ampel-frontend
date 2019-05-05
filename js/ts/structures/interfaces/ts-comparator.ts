/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:18 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A interface describing a class that can compare two given elements and return a 'greater than', 'less than', or 'equal to' response.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class TSComparator<E> {
	
	private reverseOrder: boolean = false;
	
	protected constructor(reverseOrder?: boolean) {
		
		if (this.reverseOrder !== undefined) this.reverseOrder = reverseOrder;
		
	}
	
	protected abstract internalComparison(element1: E, element2: E): number;
	
	public compare(element1: E, element2: E): number {
		
		if (this.isReverseOrder()) return (this.internalComparison(element1, element2) * -1);
		else return this.internalComparison(element1, element2);
		
	}
	
	public isEqual(element1: E, element2: E): boolean {
		
		return (this.compare(element1, element2) === 0);
		
	}
	
	public isGreaterThan(element1: E, element2: E): boolean {
		
		return (this.compare(element1, element2) > 0);
		
	}
	
	public isGreaterThanOrEqual(element1: E, element2: E): boolean {
		
		return (this.compare(element1, element2) >= 0);
		
	}
	
	public isLessThan(element1: E, element2: E): boolean {
		
		return (this.compare(element1, element2) < 0);
		
	}
	
	public isLessThanOrEqual(element1: E, element2: E): boolean {
		
		return (this.compare(element1, element2) <= 0);
		
	}
	
	public isReverseOrder(): boolean {
		
		return this.reverseOrder;
		
	}
	
	public reverse(reverseOrder?: boolean): boolean {
		
		if (reverseOrder !== undefined) this.reverseOrder = reverseOrder;
		else this.reverseOrder = !this.reverseOrder;
		
		return this.isReverseOrder();
		
	}
	
}

export default TSComparator;