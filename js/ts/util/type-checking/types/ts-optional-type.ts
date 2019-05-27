/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:23 AM -- May 27th, 2019.
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
class TSOptionalType<T extends TSType<E>, E = any> extends TSType<E> {
	
	private optionalType: TSType<E>;
	
	public constructor(optionalType: TSType<E>) {
	
		super();
		
		this.optionalType = optionalType;
	
	}
	
	public getTypeName(): string {
		
		return "optional " + this.optionalType.getTypeName();
		
	}
	
	public checkConformity(input: any): boolean {
		
		return false;
		
	}
	
	public exhaustivelyCheckConformity(input: any): boolean {
		
		return false;
		
	}
	
}

export default TSOptionalType;