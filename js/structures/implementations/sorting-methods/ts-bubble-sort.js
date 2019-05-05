/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:38 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
/**
 * The bubble sort sorting algorithm.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSBubbleSort extends TSSortingMethod {
    constructor(comparator) {
        super(comparator);
    }
    sort(array) {
        let ensuredIndices = 0;
        while (ensuredIndices < (array.length - 1)) {
            for (let index = 0; index < (array.length - 1 - ensuredIndices); index++) {
                if (this.getComparator().isGreaterThan(array[index], array[index + 1]))
                    TSSortingMethod.swap(array, index, index + 1);
            }
            ensuredIndices++;
        }
        return array;
    }
}
export default TSBubbleSort;
//# sourceMappingURL=ts-bubble-sort.js.map