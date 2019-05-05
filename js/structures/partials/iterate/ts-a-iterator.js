/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:21 AM -- December 07th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * A generic iterator very similar to the pattern used in Java.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSAIterator {
    /**
     * Performs the specified action for all of the remaining elements in this TSAIterator.
     *
     * @param {(element: T) => void} callback The action to perform on the remaining elements of this TSAIterator.
     */
    forEachRemaining(callback) {
        while (this.hasNext())
            callback(this.next());
    }
    [Symbol.iterator]() {
        return new class {
            constructor(iterator) {
                this.iterator = iterator;
            }
            [Symbol.iterator]() {
                return this;
            }
            next() {
                return {
                    done: !this.iterator.hasNext(),
                    value: (this.iterator.hasNext() ? this.iterator.next() : undefined)
                };
            }
        }(this);
    }
}
export default TSAIterator;
//# sourceMappingURL=ts-a-iterator.js.map