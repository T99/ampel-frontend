/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:19 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSComparator from "../../interfaces/ts-comparator.js";
/**
 * A class that can relatively order numeric values.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSNumericComparator extends TSComparator {
    constructor(reverseOrder) {
        super(reverseOrder);
    }
    internalComparison(element1, element2) {
        return (element1 - element2);
    }
}
export default TSNumericComparator;
//# sourceMappingURL=ts-numeric-comparator.js.map