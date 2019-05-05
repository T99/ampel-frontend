/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:54 PM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIValidator from "../helpers/jui-validator.js";
import MalformedJSONError from "../errors/malformed-json-error.js";
/**
 * An error originating from the Ampel API.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIError extends Error {
    constructor(status, statusText, body) {
        if (!JUIValidator.ensureKeys(body, AFAPIError.EXPECTED_KEYS)) {
            throw new MalformedJSONError("AFAPIError Response Body", body, AFAPIError.EXPECTED_KEYS);
        }
        if (!JUIValidator.ensureKeys(body["origin"], AFAPIError.EXPECTED_NESTED_KEYS)) {
            throw new MalformedJSONError("AFAPIError Response Body ('origin' key)", body, AFAPIError.EXPECTED_NESTED_KEYS);
        }
        if (!JUIValidator.ensureKeys(body["type"], AFAPIError.EXPECTED_NESTED_KEYS)) {
            throw new MalformedJSONError("AFAPIError Response Body ('type' key)", body, AFAPIError.EXPECTED_NESTED_KEYS);
        }
        super("An error occurred with the Ampel API resulting in a " + status + " code (" + statusText + "): " +
            body["error"]);
        this.apiErrorMessage = body["error"];
        this.originMessage = body["origin"]["readable"];
        this.originValue = body["origin"]["value"];
        this.typeMessage = body["type"]["readable"];
        this.typeValue = body["type"]["value"];
        this.timestamp = new Date(body["timeStamp"]);
    }
    getAPIErrorMessage() {
        return this.apiErrorMessage;
    }
    getOriginMessage() {
        return this.originMessage;
    }
    getOriginValue() {
        return this.originValue;
    }
    getTypeMessage() {
        return this.typeMessage;
    }
    getTypeValue() {
        return this.typeValue;
    }
    toString() {
        return "Hello!";
    }
}
AFAPIError.EXPECTED_KEYS = ["error", "origin", "timeStamp", "type"];
AFAPIError.EXPECTED_NESTED_KEYS = ["readable", "value"];
export default AFAPIError;
//# sourceMappingURL=af-api-error.js.map