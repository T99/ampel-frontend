/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:29 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * An error thrown when an attempt is made to initialize a new {@link JUIURI} with a malformed URI.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMalformedURIError extends Error {
	
	/**
	 * The error message shown when this error is thrown.
	 *
	 * @type {string}
	 */
	private static readonly ERROR_MESSAGE: string = "Attempted to initialize a new JUIURI with a malformed URI";
	
	/**
	 * Initializes a new JUIMalformedURIError.
	 */
	public constructor() {
		
		super(JUIMalformedURIError.ERROR_MESSAGE);
		
	}
	
}

export default JUIMalformedURIError;