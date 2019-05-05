/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:15 PM -- March 25th, 2019.
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
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIResponseAccessor {
    static submit(response, sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.POST)
                .withEndpointPath("/kiosk/response")
                .withToken(sessionToken)
                .withRequestBody(response)
                .build());
        });
    }
}
export default AFAPIResponseAccessor;
//# sourceMappingURL=af-api-response-accessor.js.map