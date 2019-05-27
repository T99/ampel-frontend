/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:59 PM -- May 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSType from "./ts-type.js";

type Validator = (input: any) => boolean;

/**
 * An enumeration of the standard types found in JavaScript.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSStandardType<E> extends TSType<E> {
	
	public static readonly NUMBER: TSStandardType<number> = new TSStandardType(
		"number",
		(input: any): boolean => {
			
			return ((typeof input === "number") && (!isNaN(input)));
			
		}
	);
	
	public static readonly BOOLEAN: TSStandardType<boolean> = new TSStandardType(
		"boolean",
		(input: any): boolean => {
			
			return (typeof input === "boolean");
			
		}
	);
	
	public static readonly STRING: TSStandardType<string> = new TSStandardType(
		"string",
		(input: any): boolean => {
			
			return (typeof input === "string");
			
		}
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

export default TSStandardType;