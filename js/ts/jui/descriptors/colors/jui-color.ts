/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:52 AM -- December 13th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Allows helper methods for 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUIColor {
	
	// TODO [12/13/18 @ 2:36 AM] - Make colors bind to their use-locations (have set methods that effect use cases).
	
	/**
	 * Returns a valid CSS color value-string.
	 */
	public abstract getCSSString(): string;
	
	/**
	 * Checks that a provided variable is within a given range (specified with non-inclusive lower and upper bounds),
	 * throwing a formatted message if the range requirement was not met.
	 * 
	 * @param {string} name The name of the variable being checked.
	 * @param {number} check The number being checked.
	 * @param {number} lowerBound The non-inclusive lower bound.
	 * @param {number} upperBound The non-inclusive upper bound.
	 */
	protected static rangeCheck(name: string, check: number, lowerBound: number, upperBound: number): void {
		
		if (check < lowerBound) {
			
			throw new RangeError(`${name} was below its defined range (lower bound: ${lowerBound}, actual: ${check})`);
			
		} else if (check > upperBound) {
			
			throw new RangeError(`${name} was above its defined range (upper bound: ${lowerBound}, actual: ${check})`);
			
		}
		
	}
	
}

export default JUIColor;