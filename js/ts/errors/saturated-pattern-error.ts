/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:22 PM -- November 06th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * An error thrown when the pattern of a {@link AlphanumericalGenerator} is saturated with content to the point at which
 * no more entries can be found in the pattern. This does not necessarily mean that the pattern-space is entirely full,
 * but rather that the time to find a new matching string within the pattern is too great, and that the pattern-space
 * should be expanded (the pattern should be made longer/more complex).
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class SaturatedPatternError extends Error {
	
	/**
	 * Initializes a new SaturatedPatternError.
	 */
	public constructor(message: string) {
		
		super(message);
		
	}
	
}

export default SaturatedPatternError;