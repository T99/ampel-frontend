/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:21 PM -- February 09th, 2019.
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
class AFAPIFolderAccessor {
    static getBase(sessionToken, folderID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/folder")
                .withToken(sessionToken)
                .withRequestBody({ id: folderID })
                .build());
        });
    }
    static getQuestions(sessionToken, folderID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/folder/questions")
                .withToken(sessionToken)
                .withRequestBody({ id: folderID })
                .build());
        });
    }
    static createForOrganization(sessionToken, name, shuffled, questionIDs = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.POST)
                .withEndpointPath("/folder")
                .withToken(sessionToken)
                .withRequestBody({
                name,
                shuffled,
                questionIds: questionIDs
            })
                .build());
        });
    }
    static updateName(sessionToken, folderID, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.PUT)
                .withEndpointPath("/folder/name")
                .withToken(sessionToken)
                .withRequestBody({
                id: folderID,
                name
            })
                .build());
        });
    }
    static updateShuffled(sessionToken, folderID, shuffled) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.PUT)
                .withEndpointPath("/folder/shuffled")
                .withToken(sessionToken)
                .withRequestBody({
                id: folderID,
                shuffled
            })
                .build());
        });
    }
    static updateQuestions(sessionToken, folderID, questions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.PUT)
                .withEndpointPath("/folder/questions")
                .withToken(sessionToken)
                .withRequestBody({
                id: folderID,
                questions
            })
                .build());
        });
    }
}
export default AFAPIFolderAccessor;
//# sourceMappingURL=af-api-folder-accessor.js.map