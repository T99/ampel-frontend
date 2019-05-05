/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:20 AM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
/**
 * The insertion sort sorting algorithm.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSInsertionSort extends TSSortingMethod {
    constructor(comparator) {
        super(comparator);
    }
    sort(array) {
        let nextUnsortedIndex = 1;
        let comparisonIndex = 1;
        while (nextUnsortedIndex < array.length) {
            if (this.getComparator().isLessThan(array[comparisonIndex], array[nextUnsortedIndex])) { /* dunno */ }
            // TODO [3/13/19 @ 11:58 AM] - Finish the 'sort' method.
        }
        return array;
    }
}
export default TSInsertionSort;
//# sourceMappingURL=ts-insertion-sort.js.map