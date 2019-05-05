/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:41 PM -- January 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIEvent {
    constructor(source, type, timestamp) {
        this.source = source;
        this.type = type;
        this.timestamp = timestamp;
    }
    getSource() {
        return this.source;
    }
    getType() {
        return this.type;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getEpochTime() {
        return this.timestamp.getTime();
    }
}
export default JUIEvent;
//# sourceMappingURL=jui-event.js.map