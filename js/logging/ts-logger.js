/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:31 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * An overarching handler for logged messages, errors, warns, exceptions, etc.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLogger {
    constructor(developerMode = false) {
        this.developerMode = developerMode;
    }
    logToChannel(channel, loggable) {
        console.log("Logging to: '" + channel + "'...");
        if (typeof loggable === "string")
            console.info(loggable);
        else
            loggable.log(true);
    }
}
export default TSLogger;
//# sourceMappingURL=ts-logger.js.map