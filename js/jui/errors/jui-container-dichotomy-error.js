/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:36 PM -- December 11th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * An error thrown when an element that is already present in a {@link JUIContainer} has an attempt made to add said
 * element to a second JUIContainer.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIContainerDichotomyError extends Error {
    /**
     * Initializes a new JUIContainerDichotomyError.
     */
    constructor() {
        super(JUIContainerDichotomyError.ERROR_MESSAGE);
    }
}
/**
 * The error message shown when this error is thrown.
 *
 * @type {string}
 */
JUIContainerDichotomyError.ERROR_MESSAGE = "Attempted to add a already-containered element to a second " +
    "JUIContainer.";
export default JUIContainerDichotomyError;
//# sourceMappingURL=jui-container-dichotomy-error.js.map