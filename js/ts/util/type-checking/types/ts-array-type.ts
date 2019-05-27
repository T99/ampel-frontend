/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:14 PM -- May 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSType from "./ts-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSArrayType<E = any> extends TSType<E[]> {
	
	private arrayType: TSType;
	
	public constructor(arrayType: TSType<E>) {
	
		super();
		
		this.arrayType = arrayType;
	
	}
	
	public getTypeName(): string {
		
		return "Array<" + this.arrayType.getTypeName() + ">";
		
	}
	
	public checkConformity(input: any): boolean {
		
		if (!Array.isArray(input)) return false;
		else {
			
			let inputArray: any[] = input;
			
			for (let element of inputArray) {
				
				if (!this.arrayType.checkConformity(element)) return false;
				
			}
			
		}
		
		return true;
		
	}
	
	public exhaustivelyCheckConformity(input: any): boolean {
		
		return this.checkConformity(input);
		
	}
	
}

export default TSArrayType;