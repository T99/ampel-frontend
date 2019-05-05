/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:00 PM -- February 09th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import HTTPMethod from "../../descriptors/http-method.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
import AFAPI from "../af-api.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPILocationAccessor {
    static getBase(sessionToken, locationID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/location")
                .withToken(sessionToken)
                .withRequestBody({ id: locationID })
                .build());
        });
    }
    static getDevices(sessionToken, locationID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/location/devices")
                .withToken(sessionToken)
                .withRequestBody({ id: locationID })
                .build());
        });
    }
    static createForOrganization(sessionToken, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.POST)
                .withEndpointPath("/location")
                .withToken(sessionToken)
                .withRequestBody({ name })
                .build());
        });
    }
    static updateName(sessionToken, locationID, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.PUT)
                .withEndpointPath("/location/name")
                .withToken(sessionToken)
                .withRequestBody({
                id: locationID,
                name
            })
                .build());
        });
    }
    static delete(sessionToken, locationID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.DELETE)
                .withEndpointPath("/location")
                .withToken(sessionToken)
                .withRequestBody({ id: locationID })
                .build());
        });
    }
}
export default AFAPILocationAccessor;
//# sourceMappingURL=af-api-location-accessor.js.map