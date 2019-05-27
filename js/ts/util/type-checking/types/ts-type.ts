/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:59 PM -- May 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * An interface for classes that check for conformity to a given type at runtime.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class TSType<E = any> {

	public abstract getTypeName(): string;
	
	public abstract checkConformity(input: any): boolean;
	
	public abstract exhaustivelyCheckConformity(input: any): boolean;
	
	public sanitize(input: any): E {
		
		if (this.checkConformity(input)) return input as E;
		else {
			
			throw new Error("ERR | Attempted to sanitize content that did not match the desired type signature. " +
				"Type of " + input.toString() + "was not '" + this.getTypeName() + "'");
			
		}
		
	}

}

export default TSType;