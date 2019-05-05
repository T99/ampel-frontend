/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:05 PM -- January 24th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Global changes made to various types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class GlobalModificationImplementations {
    constructor() { }
    static makeModifications() {
        // Modifications to Array<T>...
        this.implementArrayIncludes();
        this.implementArrayIncludesAll();
        this.implementArrayRemoveIndex();
        this.implementArrayRemoveElement();
    }
    static implementArrayIncludes() {
        Array.prototype.includes = function (element, startingIndex, endingIndex) {
            if (startingIndex && !endingIndex) {
                return this.indexOf(element, startingIndex) !== -1;
            }
            else if (startingIndex && endingIndex) {
                for (let index = startingIndex; startingIndex < endingIndex; index++) {
                    if (this[index] === element)
                        return true;
                }
                return false;
            }
            else
                return this.indexOf(element) !== -1;
        };
    }
    static implementArrayIncludesAll() {
        Array.prototype.includesAll = function (...elements) {
            for (let element of elements)
                if (!this.includes(element))
                    return false;
            return true;
        };
    }
    static implementArrayRemoveIndex() {
        Array.prototype.removeIndex = function (index) {
            if (index < this.length) {
                let removedElement = this[index];
                this.splice(index, 1);
                return removedElement;
            }
            else
                return undefined;
        };
    }
    static implementArrayRemoveElement() {
        Array.prototype.removeElement = function (element) {
            let numberRemoved = 0;
            while (this.includes(element)) {
                this.splice(this.indexOf(element), 1);
                numberRemoved--;
            }
            return numberRemoved;
        };
    }
}
export default GlobalModificationImplementations;
//# sourceMappingURL=global-modification-implementations.js.map