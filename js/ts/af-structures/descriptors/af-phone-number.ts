/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:19 PM -- March 17th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import InvalidArgumentsError from "../../errors/invalid-arguments-error.js";

/**
 * Describes a phone number.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFPhoneNumber {
	
	private phone: number;
	
	private constructor(phone: number) {
	
		this.phone = phone;
	
	}
	
	public static fromNumber(phone: number): AFPhoneNumber {
		
		if (AFPhoneNumber.validateNumber(phone)) return new AFPhoneNumber(phone);
		else throw new InvalidArgumentsError("Attempted to initialize an AFPhoneNumber with an impossible number.");
	
	}
	
	public static fromString(phone: string): AFPhoneNumber {
		
		let parsed: number = parseInt(phone);
		let isParsable: boolean = ((parsed !== undefined) && !isNaN(parsed));
		
		if (isParsable) return AFPhoneNumber.fromNumber(parsed);
		else throw new InvalidArgumentsError("Attempted to initialize an AFPhoneNumber with a non-parsable string.");
	
	}
	
	/**
	 * Returns true if a given phone number COULD potentially be valid.
	 *
	 * @param {number} phone The phone number to check.
	 * @returns {boolean} true if a given phone number COULD potentially be valid.
	 */
	public static validateNumber(phone: number): boolean {
		
		let phoneString: string = phone.toString();
		
		if (phoneString.length > 15) return false;
		if (phoneString.length < 10) return false;
		
		return true;
		
	}
	
	public getCountryCode(): number | undefined {
		
		let phoneString: string = this.phone.toString();
		
		if (phoneString.length > 10) return parseInt(phoneString.substring(0, phoneString.length - 10));
		else return undefined;
		
	}
	
	public getAreaCode(): number {
		
		let phoneString: string = this.phone.toString();
		
		return parseInt(phoneString.substring(phoneString.length - 10, phoneString.length - 7));
		
	}
	
	public getBaseNumber(): number {
		
		let phoneString: string = this.phone.toString();
		
		return parseInt(phoneString.substring(phoneString.length - 7));
		
	}
	
	public toString(): string {
	
		let phoneString: string = this.phone.toString();
		let result: string = "";
		
		result += phoneString.substring(phoneString.length - 4);
		result = " - " + result;
		result = phoneString.substring(phoneString.length - 7, phoneString.length - 4) + result;
		result = ") " + result;
		result = phoneString.substring(phoneString.length - 10, phoneString.length - 7) + result;
		result = "(" + result;
		
		if (phoneString.length >= 11) {
			
			result = " " + result;
			result = phoneString.substring(0, phoneString.length - 10) + result;
			result = "+" + result;
			
		}
		
		return result;
	
	}
	
	public toNumber(): number {
	
		return this.phone;
	
	}
	
}

export default AFPhoneNumber;