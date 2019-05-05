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
     * Initializes a new JUIMalformedURIError.
     */
    constructor() {
        super(JUIMalformedURIError.ERROR_MESSAGE);
    }
}
/**
 * The error message shown when this error is thrown.
 *
 * @type {string}
 */
JUIMalformedURIError.ERROR_MESSAGE = "Attempted to initialize a new JUIURI with a malformed URI";
export default JUIMalformedURIError;
//# sourceMappingURL=malformed-uri-error.js.map