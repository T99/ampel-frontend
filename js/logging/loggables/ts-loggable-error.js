/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:58 PM -- April 17th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLoggableError {
    constructor(stringSource, objectSource, errorName, errorDescription) {
        this.source = { stringSource, objectSource };
        this.errorName = errorName;
        this.errorDescription = errorDescription;
    }
    getLoggableTitle() {
        return ("ERR: " + this.errorName);
    }
    getDescription() {
        return this.errorDescription;
    }
    getSource() {
        return this.source;
    }
    log(recurse) {
        let e = new Error("Error!");
        console.log(e);
    }
}
export default TSLoggableError;
//# sourceMappingURL=ts-loggable-error.js.map