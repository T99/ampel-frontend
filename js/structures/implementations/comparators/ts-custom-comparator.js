/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:49 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSComparator from "../../interfaces/ts-comparator.js";
/**
 * A custom comparator defined by whatever function is passed to the constructor.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSCustomComparator extends TSComparator {
    constructor(comparatorFunction, reverseOrder) {
        super(reverseOrder);
        this.comparatorFunction = comparatorFunction;
    }
    internalComparison(element1, element2) {
        return this.comparatorFunction(element1, element2);
    }
}
export default TSCustomComparator;
//# sourceMappingURL=ts-custom-comparator.js.map