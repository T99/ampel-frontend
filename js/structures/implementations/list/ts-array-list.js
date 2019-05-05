/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:14 PM -- February 18th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSNaturalComparator from "../comparators/ts-natural-comparator.js";
import TSBubbleSort from "../sorting-methods/ts-bubble-sort.js";
import TSAIterator from "../../partials/iterate/ts-a-iterator.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSArrayList {
    constructor(...elements) {
        this.internalArray = [];
        this.cursor = 0;
        this.addAll(elements);
    }
    add(element, index) {
        if (index === undefined)
            this.internalArray[this.cursor++] = element;
        else {
            if (index > this.cursor)
                throw new Error("ERR | Index out of bounds (size: " + this.cursor + ") (accessed index: " + index + ").");
            else {
                for (let i = this.cursor; i > index; i--) {
                    this.internalArray[i] = this.internalArray[i - 1];
                }
                this.internalArray[index] = element;
            }
        }
    }
    addAll(elements) {
        for (let element of elements)
            this.add(element);
    }
    get(index) {
        if ((index >= 0) && (index < this.internalArray.length))
            return this.internalArray[index];
        else
            throw new Error("Attempted to retrieve an out-of-bounds index from this TSArrayList.");
    }
    remove(removed) {
        if (this.contains(removed)) {
            let indexRemoved = this.internalArray.removeElement(removed);
            this.cursor--;
            for (let index = indexRemoved; index < this.cursor; index++) {
                this.internalArray[index] = this.internalArray[index + 1];
            }
            this.internalArray[this.cursor] = undefined;
            return removed;
        }
        else
            return undefined;
    }
    removeIndex(index) {
        return this.internalArray.removeIndex(index);
    }
    clear() {
        this.internalArray = [];
        this.cursor = 0;
    }
    sort(comparator, method) {
        if (comparator === undefined)
            comparator = new TSNaturalComparator();
        if (method === undefined)
            method = new TSBubbleSort(comparator);
        method.sort(this.internalArray);
    }
    iterator() {
        return new class extends TSAIterator {
            constructor(list) {
                super();
                this.list = list;
                this.index = 0;
            }
            hasNext() {
                return (this.index < this.list.size());
            }
            next() {
                return this.list.get(this.index++);
            }
            remove() {
                if (this.index > 0)
                    return this.list.removeIndex(--this.index);
                else
                    return undefined;
            }
            reset() {
                this.index = 0;
            }
        }(this);
    }
    shuffle(iterations = 1) {
        for (let count = 0; count < iterations; count++) {
            let elements = this.toArray();
            this.clear();
            while (elements.length !== 0) {
                let random = Math.floor(Math.random() * elements.length);
                let element = elements.removeIndex(random);
                this.add(element);
            }
        }
    }
    size() {
        return this.internalArray.length;
    }
    isEmpty() {
        return (this.size() === 0);
    }
    contains(element) {
        return this.internalArray.includes(element);
    }
    toArray() {
        return this.internalArray;
    }
}
export default TSArrayList;
//# sourceMappingURL=ts-array-list.js.map