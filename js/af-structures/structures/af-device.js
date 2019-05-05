/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:41 AM -- February 07th, 2019.
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
import AFStructure from "../af-structure.js";
import AFAPIDeviceAccessor from "../../net/accessors/af-api-device-accessor.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFDevice extends AFStructure {
    constructor(location) {
        super(false);
        this.location = location;
    }
    static createWithAPIResponse(location, deviceResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = new AFDevice(location);
            device.id = deviceResponse.id;
            device.name = deviceResponse.name;
            device.defaultFolderID = deviceResponse.folderId;
            return device;
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield AFAPIDeviceAccessor.getBase(this.getSession().getToken(), this.getID());
            this.name = response.name;
            return this;
        });
    }
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO [4/21/19 @ 1:16 AM] - Finish the 'signIn' method.
            if (this.isSignedIn())
                return this;
            else {
                // this.token = (await AFAPITokenAccessor.getDeviceToken(this.getSession().getToken(), this.getID())).token;
                return this;
            }
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO [4/21/19 @ 1:16 AM] - Finish the 'signOut' method.
        });
    }
    isSignedIn() {
        // TODO [4/21/19 @ 1:15 AM] - Finish the 'isSignedIn' method.
        return false;
    }
    isSessionDevice() {
        return (this.getSession().hasDevice() && (this.getSession().getDevice().getID() === this.getID()));
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSession() {
        return this.getClient().getSession();
    }
    getClient() {
        return this.getOrganization().getClient();
    }
    getOrganization() {
        return this.getLocation().getOrganization();
    }
    getLocation() {
        return this.location;
    }
    getDefaultFolder() {
        return this.getOrganization().getFolderListing().getItemWithID(this.defaultFolderID);
    }
    getChildrenStructures() {
        return [];
    }
    log() {
        console.groupCollapsed("AFDevice: " + this.getName() + " [" + this.getID() + "]" + (this.isSessionDevice() ? " \u2605" : ""));
        console.info("ID:\t\t" + this.getID());
        console.info("Name:\t\t" + this.getName());
        console.info("Default Folder:\t" + this.getDefaultFolder().getName());
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        // TODO [2/7/19 @ 9:53 PM] - Device token?
        console.groupEnd();
    }
}
export default AFDevice;
//# sourceMappingURL=af-device.js.map