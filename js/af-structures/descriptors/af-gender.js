/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:09 AM -- February 01st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Enumerates possible genders.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFGender {
    constructor(stringValue, numericalValue) {
        this.stringValue = stringValue;
        this.numericalValue = numericalValue;
        AFGender.addNumericalValueMapping(this.numericalValue, this);
    }
    static addNumericalValueMapping(numericalValue, gender) {
        if (AFGender.numericalValueMap === undefined)
            AFGender.numericalValueMap = new Map();
        AFGender.numericalValueMap.set(numericalValue, gender);
    }
    static fromNumericalValue(numericalValue) {
        return AFGender.numericalValueMap.get(numericalValue);
    }
    getStringValue() {
        return this.stringValue;
    }
    getNumericalValue() {
        return this.numericalValue;
    }
    equals(gender) {
        return (this.getNumericalValue() === gender.getNumericalValue());
    }
}
AFGender.UNSPECIFIED = new AFGender("Unspecified", 0);
AFGender.MALE = new AFGender("Male", 1);
AFGender.FEMALE = new AFGender("Female", 2);
export default AFGender;
//# sourceMappingURL=af-gender.js.map