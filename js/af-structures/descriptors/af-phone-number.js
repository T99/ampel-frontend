/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:19 PM -- March 17th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import InvalidArgumentsError from "../../errors/invalid-arguments-error.js";
/**
 * Describes a phone number.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFPhoneNumber {
    constructor(phone) {
        this.phone = phone;
    }
    static fromNumber(phone) {
        if (AFPhoneNumber.validateNumber(phone))
            return new AFPhoneNumber(phone);
        else
            throw new InvalidArgumentsError("Attempted to initialize an AFPhoneNumber with an impossible number.");
    }
    static fromString(phone) {
        let parsed = parseInt(phone);
        let isParsable = ((parsed !== undefined) && !isNaN(parsed));
        if (isParsable)
            return AFPhoneNumber.fromNumber(parsed);
        else
            throw new InvalidArgumentsError("Attempted to initialize an AFPhoneNumber with a non-parsable string.");
    }
    /**
     * Returns true if a given phone number COULD potentially be valid.
     *
     * @param {number} phone The phone number to check.
     * @returns {boolean} true if a given phone number COULD potentially be valid.
     */
    static validateNumber(phone) {
        let phoneString = phone.toString();
        if (phoneString.length > 15)
            return false;
        if (phoneString.length < 10)
            return false;
        return true;
    }
    getCountryCode() {
        let phoneString = this.phone.toString();
        if (phoneString.length > 10)
            return parseInt(phoneString.substring(0, phoneString.length - 10));
        else
            return undefined;
    }
    getAreaCode() {
        let phoneString = this.phone.toString();
        return parseInt(phoneString.substring(phoneString.length - 10, phoneString.length - 7));
    }
    getBaseNumber() {
        let phoneString = this.phone.toString();
        return parseInt(phoneString.substring(phoneString.length - 7));
    }
    toString() {
        let phoneString = this.phone.toString();
        let result = "";
        result += phoneString.substring(phoneString.length - 4);
        result = " - " + result;
        result = phoneString.substring(phoneString.length - 7, phoneString.length - 4) + result;
        result = ") " + result;
        result = phoneString.substring(phoneString.length - 10, phoneString.length - 7) + result;
        result = "(" + result;
        if (phoneString.length >= 11) {
            result = " " + result;
            result = phoneString.substring(0, phoneString.length - 10) + result;
            result = "+" + result;
        }
        return result;
    }
    toNumber() {
        return this.phone;
    }
}
export default AFPhoneNumber;
//# sourceMappingURL=af-phone-number.js.map