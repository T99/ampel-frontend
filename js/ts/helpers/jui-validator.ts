/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:13 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Validates various information.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIValidator {
	
	public static readonly uriRegex: RegExp = /^https?:\/\/([a-z]|[A-Z]|[0-9]|[-])+\.[a-z]+\/?(\S+?\/?)*$/;
	
	private constructor() { /* Do nothing. */ }
	
	public static uri(testString: string): boolean {
		
		return JUIValidator.uriRegex.test(testString);
		
	}
	
	public static ensureKeys(object: any, keysToEnsure: string[]): boolean {
		
		for (let key of keysToEnsure) if (!(object[key])) return false;
		
		return true;
		
	}
}

export default JUIValidator;