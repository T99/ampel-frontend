/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:48 PM -- April 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";
/**
 * An empty iterator.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSEmptyIterator extends TSAIterator {
    hasNext() {
        return false;
    }
    next() {
        return undefined;
    }
    remove() {
        return undefined;
    }
    reset() {
        return;
    }
}
export default TSEmptyIterator;
//# sourceMappingURL=ts-empty-iterator.js.map