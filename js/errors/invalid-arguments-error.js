/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:18 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * An error thrown when invalid/impossible arguments are passed to a function/method/constructor.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class InvalidArgumentsError extends Error {
    /**
     * Initializes a new InvalidArgumentsError.
     *
     * @param {string} message An optional message on the error.
     */
    constructor(message) {
        super(message);
    }
}
export default InvalidArgumentsError;
//# sourceMappingURL=invalid-arguments-error.js.map