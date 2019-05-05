/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:46 PM -- February 09th, 2019.
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
class AFAPIQuestionAccessor {
    static getBase(sessionToken, questionID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/question")
                .withToken(sessionToken)
                .withRequestBody({ id: questionID })
                .build());
        });
    }
    static createForOrganization(sessionToken, inquiry, type, folderID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (folderID === undefined) {
                return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                    .withHTTPMethod(HTTPMethod.POST)
                    .withEndpointPath("/question")
                    .withToken(sessionToken)
                    .withRequestBody({
                    inquiry,
                    type
                })
                    .build());
            }
            else {
                return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                    .withHTTPMethod(HTTPMethod.POST)
                    .withEndpointPath("/question")
                    .withToken(sessionToken)
                    .withRequestBody({
                    inquiry,
                    type,
                    folderId: folderID
                })
                    .build());
            }
        });
    }
    static updateInquiry(sessionToken, questionID, inquiry) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.PUT)
                .withEndpointPath("/question/inquiry")
                .withToken(sessionToken)
                .withRequestBody({
                id: questionID,
                inquiry
            })
                .build());
        });
    }
    static updateConfig(sessionToken, questionID) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO [2/9/19 @ 4:24 PM] - Finish the 'updateConfig' method. This method is missing parameters.
            return null;
        });
    }
    static delete(sessionToken, questionID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.DELETE)
                .withEndpointPath("/question")
                .withToken(sessionToken)
                .withRequestBody({ id: questionID })
                .build());
        });
    }
}
export default AFAPIQuestionAccessor;
//# sourceMappingURL=af-api-question-accessor.js.map