/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:17 PM -- February 07th, 2019.
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
import HTTPMethod from "../../descriptors/http-method.js";
import AFEndpointRequestBuilder from "../af-endpoint-request-builder.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIOrganizationAccessor {
    static getBaseByID(sessionToken, organizationID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/organization/from-client")
                .withToken(sessionToken)
                .withRequestBody({ id: organizationID })
                .build());
        });
    }
    static getBasesForSession(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/client/self/organizations")
                .withToken(sessionToken)
                .build());
        });
    }
    static getEverything(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/organization/self/with-all")
                .withToken(sessionToken)
                .build());
        });
    }
    static getClients(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/organization/clients")
                .withToken(sessionToken)
                .build());
        });
    }
    static getLocations(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/organization/locations")
                .withToken(sessionToken)
                .build());
        });
    }
    static getDevices(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/organization/devices")
                .withToken(sessionToken)
                .build());
        });
    }
    static getFolders(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/organization/folders")
                .withToken(sessionToken)
                .build());
        });
    }
    static getQuestions(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/organization/questions")
                .withToken(sessionToken)
                .build());
        });
    }
    static createQuestion(sessionToken, inquiry, questionType, folderID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (folderID !== undefined) {
                return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                    .withHTTPMethod(HTTPMethod.POST)
                    .withEndpointPath("/question")
                    .withToken(sessionToken)
                    .withRequestBody({
                    inquiry,
                    type: questionType,
                    folderId: folderID
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
                    type: questionType
                })
                    .build());
            }
        });
    }
}
export default AFAPIOrganizationAccessor;
//# sourceMappingURL=af-api-organization-accessor.js.map