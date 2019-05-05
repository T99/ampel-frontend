/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:35 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * An abstract class representing sorting methods for array-based data structures.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSSortingMethod {
    constructor(comparator) {
        this.comparator = comparator;
    }
    getComparator() {
        return this.comparator;
    }
    static swap(array, index1, index2) {
        let temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }
}
export default TSSortingMethod;
//# sourceMappingURL=ts-sorting-method.js.map