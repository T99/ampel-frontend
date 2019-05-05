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
    constructor() { }
    static uri(testString) {
        return JUIValidator.uriRegex.test(testString);
    }
    static ensureKeys(object, keysToEnsure) {
        for (let key of keysToEnsure)
            if (!(object[key]))
                return false;
        return true;
    }
}
JUIValidator.uriRegex = /^https?:\/\/([a-z]|[A-Z]|[0-9]|[-])+\.[a-z]+\/?(\S+?\/?)*$/;
export default JUIValidator;
//# sourceMappingURL=jui-validator.js.map