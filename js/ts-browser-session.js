/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:32 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSDate from "./descriptors/time/ts-date.js";
import AFSession from "./af-structures/af-session.js";
import TSLogger from "./logging/ts-logger.js";
/**
 * Holds a number of managers and misc. objects related to a singular session.
 *
 * Used in place of errant singleton patterns.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSBrowserSession {
    constructor(developerMode = false) {
        this.developerMode = developerMode;
        this.startTime = TSDate.fromNow();
        this.ampelSession = new AFSession(developerMode);
        this.logger = new TSLogger(developerMode);
    }
    getStartTime() {
        return this.startTime;
    }
    hasAmpelSession() {
        return (this.ampelSession !== undefined);
    }
    getAmpelSession() {
        return this.ampelSession;
    }
    getLogger() {
        return this.logger;
    }
}
export default TSBrowserSession;
//# sourceMappingURL=ts-browser-session.js.map