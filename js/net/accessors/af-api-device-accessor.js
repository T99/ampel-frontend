/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:31 PM -- February 09th, 2019.
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
class AFAPIDeviceAccessor {
    static getBase(sessionToken, deviceID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.GET)
                .withEndpointPath("/device")
                .withToken(sessionToken)
                .withRequestBody({ id: deviceID })
                .build());
        });
    }
    static createForOrganization(sessionToken, name, locationID, folderID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.POST)
                .withEndpointPath("/device")
                .withToken(sessionToken)
                .withRequestBody({
                name,
                locationId: locationID,
                folderId: folderID
            })
                .build());
        });
    }
    static updateName(sessionToken, deviceID, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.PUT)
                .withEndpointPath("/device/name")
                .withToken(sessionToken)
                .withRequestBody({
                id: deviceID,
                name
            })
                .build());
        });
    }
    static updateFolder(sessionToken, deviceID, folderID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.PUT)
                .withEndpointPath("/device/folder")
                .withToken(sessionToken)
                .withRequestBody({
                id: deviceID,
                folderId: folderID
            })
                .build());
        });
    }
    static delete(sessionToken, deviceID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AFAPI.makeRequest((new AFEndpointRequestBuilder())
                .withHTTPMethod(HTTPMethod.DELETE)
                .withEndpointPath("/device")
                .withToken(sessionToken)
                .withRequestBody({ id: deviceID })
                .build());
        });
    }
}
export default AFAPIDeviceAccessor;
//# sourceMappingURL=af-api-device-accessor.js.map