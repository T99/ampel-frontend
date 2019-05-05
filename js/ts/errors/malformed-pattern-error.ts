/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:36 PM -- November 06th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * An error thrown when an attempt is made to initialize a new {@link AlphanumericalGenerator} with a malformed pattern.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class MalformedPatternError extends Error {
	
	/**
	 * Initializes a new MalformedPatternError.
	 */
	public constructor(message: string) {
		
		super(message);
		
	}
	
}

export default MalformedPatternError;