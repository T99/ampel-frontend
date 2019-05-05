/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:12 AM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSSortingMethod from "../../interfaces/ts-sorting-method.js";
/**
 * The selection sort sorting algorithm.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSSelectionSort extends TSSortingMethod {
    constructor(comparator) {
        super(comparator);
    }
    sort(array) {
        let ensuredIndices = 0;
        while (ensuredIndices < array.length) {
            let leastElementIndex = ensuredIndices;
            for (let index = ensuredIndices; index < array.length; index++) {
                if (this.getComparator().isLessThan(array[index], array[leastElementIndex]))
                    leastElementIndex = index;
            }
            if (leastElementIndex !== ensuredIndices)
                TSSortingMethod.swap(array, ensuredIndices, leastElementIndex);
            ensuredIndices++;
        }
        return array;
    }
}
export default TSSelectionSort;
//# sourceMappingURL=ts-selection-sort.js.map