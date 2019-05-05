/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:02 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
// DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
class ActionQueue {
    // DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
    constructor(...actions) {
        this.actions = [];
        actions.forEach((action) => this.add(action));
    }
    // DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
    add(action) {
        this.actions.push(action);
    }
    // DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
    execute() {
        if (this.actions.length > 0)
            (this.actions.shift())();
        else
            throw new RangeError("Attempted to execute the next action of an empty ActionQueue.");
    }
    // DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
    skip() {
        if (this.actions.length > 0)
            this.actions.shift();
        else
            throw new RangeError("Attempted to skip the next action of an empty ActionQueue.");
    }
    // DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
    get length() {
        return this.actions.length;
    }
}
export default ActionQueue;
//# sourceMappingURL=action-queue.js.map