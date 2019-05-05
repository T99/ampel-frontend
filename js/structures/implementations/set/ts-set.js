/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:37 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * A set of elements. This {@link TSStructure} serves as an representative model for mathematical sets.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSSet {
    constructor(...elements) {
    }
    contains(element) {
        return false;
    }
    isEmpty() {
        return false;
    }
    size() {
        return 0;
    }
    toArray() {
        return [];
    }
}
export default TSSet;
//# sourceMappingURL=ts-set.js.map