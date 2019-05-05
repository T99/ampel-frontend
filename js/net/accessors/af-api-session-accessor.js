/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:03 AM -- April 17th, 2019.
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
import AFAPI from "../af-api.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
import HTTPMethod from "../../descriptors/http-method.js";
/**
 * Various API accessor methods for session sign-in.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPISessionAccessor {
    static createSession(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.POST)
                .withEndpointPath("/client/sign-in")
                .withRequestBody({
                email,
                password
            }).build());
        });
    }
    static setSessionOrganization(sessionToken, organizationID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.POST)
                .withEndpointPath("/client/sign-in/organization")
                .withToken(sessionToken)
                .withRequestBody({
                id: organizationID
            }).build());
        });
    }
    static setSessionDevice(sessionToken, deviceID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.POST)
                .withEndpointPath("/kiosk/register")
                .withToken(sessionToken)
                .withRequestBody({
                deviceId: deviceID
            }).build());
        });
    }
}
export default AFAPISessionAccessor;
//# sourceMappingURL=af-api-session-accessor.js.map