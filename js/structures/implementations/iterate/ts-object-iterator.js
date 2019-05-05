/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:45 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";
/**
 * A TSAIterator that iterates over the keys of an object.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSObjectIterator extends TSAIterator {
    constructor(content) {
        super();
        this.index = 0;
        this.content = content;
        if ((this.content !== null) && (this.content !== undefined)) {
            this.keys = Object.keys(this.content);
        }
        else
            this.keys = [];
    }
    hasNext() {
        return (this.index < this.keys.length);
    }
    next() {
        return {
            key: this.keys[this.index],
            value: this.content[this.keys[this.index++]]
        };
    }
    remove() {
        throw new Error("Unsupported operation.");
        // TODO [3/17/19 @ 9:40 PM] - Can this be done?
    }
    reset() {
        this.index = 0;
    }
}
export default TSObjectIterator;
//# sourceMappingURL=ts-object-iterator.js.map