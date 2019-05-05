/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:18 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * A interface describing a class that can compare two given elements and return a 'greater than', 'less than', or 'equal to' response.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSComparator {
    constructor(reverseOrder) {
        this.reverseOrder = false;
        if (this.reverseOrder !== undefined)
            this.reverseOrder = reverseOrder;
    }
    compare(element1, element2) {
        if (this.isReverseOrder())
            return (this.internalComparison(element1, element2) * -1);
        else
            return this.internalComparison(element1, element2);
    }
    isEqual(element1, element2) {
        return (this.compare(element1, element2) === 0);
    }
    isGreaterThan(element1, element2) {
        return (this.compare(element1, element2) > 0);
    }
    isGreaterThanOrEqual(element1, element2) {
        return (this.compare(element1, element2) >= 0);
    }
    isLessThan(element1, element2) {
        return (this.compare(element1, element2) < 0);
    }
    isLessThanOrEqual(element1, element2) {
        return (this.compare(element1, element2) <= 0);
    }
    isReverseOrder() {
        return this.reverseOrder;
    }
    reverse(reverseOrder) {
        if (reverseOrder !== undefined)
            this.reverseOrder = reverseOrder;
        else
            this.reverseOrder = !this.reverseOrder;
        return this.isReverseOrder();
    }
}
export default TSComparator;
//# sourceMappingURL=ts-comparator.js.map