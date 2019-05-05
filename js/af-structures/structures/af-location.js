/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:07 PM -- February 02nd, 2019.
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
import AFDeviceListing from "./listings/af-device-listing.js";
import AFAPILocationAccessor from "../../net/accessors/af-api-location-accessor.js";
import AFAPIDeviceAccessor from "../../net/accessors/af-api-device-accessor.js";
/**
 * A organization location registered with Ampel.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFLocation extends AFStructure {
    constructor(organization, shouldMaintainChildren) {
        super(shouldMaintainChildren);
        this.organization = organization;
    }
    static createWithAPIResponse(organization, locationResponse, shouldMaintainChildren = true, deviceResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let location = new AFLocation(organization, shouldMaintainChildren);
            location.id = locationResponse.id;
            location.name = locationResponse.name;
            if ((shouldMaintainChildren === true) && (deviceResponses !== undefined)) {
                location.deviceListing = yield AFDeviceListing.createWithAPIResponse(location, deviceResponses);
            }
            return location;
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield AFAPILocationAccessor.getBase(this.getSession().getToken(), this.getID());
            this.name = response.name;
            return this;
        });
    }
    createDevice(deviceName, folder, isShuffled = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let folderObject;
            if (typeof folder === "string")
                folderObject = yield this.getOrganization().createFolder(folder, isShuffled);
            else
                folderObject = folder;
            let deviceResponse = yield AFAPIDeviceAccessor.createForOrganization(this.getSession().getToken(), deviceName, this.getID(), folderObject.getID());
            yield this.getDeviceListing().refresh();
            if (this.getDeviceListing().hasItemWithID(deviceResponse.id))
                return this.getDeviceListing().getItemWithID(deviceResponse.id);
            else
                throw new Error("ERR | Device creation failed...");
        });
    }
    isSessionLocation() {
        return (this.getSession().hasLocation() && (this.getSession().getLocation().getID() === this.getID()));
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
        return this.organization;
    }
    getDeviceListing() {
        return this.deviceListing;
    }
    getChildrenStructures() {
        return [this.deviceListing];
    }
    log(recurse = true) {
        console.groupCollapsed("AFLocation: " + this.getName() + " [" + this.getID() + "]" + (this.isSessionLocation() ? " \u2605" : ""));
        console.info("ID:\t" + this.getID());
        console.info("Name:\t" + this.getName());
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (recurse)
            for (let childStructure of this.getChildrenStructures())
                childStructure.log();
        console.groupEnd();
    }
}
export default AFLocation;
//# sourceMappingURL=af-location.js.map