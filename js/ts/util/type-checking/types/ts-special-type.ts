/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:08 AM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSType from "./ts-type.js";

type Validator = (input: any) => boolean;

/**
 * An enumeration of certain special types found in JavaScript.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSSpecialType<E> extends TSType<E> {
	
	public static readonly ANY: TSSpecialType<any> = new TSSpecialType(
		"any",
		(input: any): boolean => true
	);
	
	public static readonly VOID: TSSpecialType<void> = new TSSpecialType(
		"void",
		(input: any): boolean => false
	);
	
	public static readonly UNDEFINED: TSSpecialType<undefined> = new TSSpecialType(
		"undefined",
		(input: any): boolean => input === undefined
	);
	
	public static readonly NULL: TSSpecialType<null> = new TSSpecialType(
		"null",
		(input: any): boolean => input === null
	);
	
	private name: string;
	
	private validator: Validator;
	
	protected constructor(name: string, validator: Validator) {
		
		super();
		
		this.name = name;
		this.validator = validator;
		
	}
	
	public getTypeName(): string {
		
		return this.name;
		
	}
	
	public checkConformity(input: any): boolean {
		
		return this.validator(input);
		
	}
	
	public exhaustivelyCheckConformity(input: any): boolean {
		
		return this.checkConformity(input);
		
	}
	
}

export default TSSpecialType;