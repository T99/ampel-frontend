/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:47 AM -- February 07th, 2019.
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
import AFDevice from "../af-device.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import TSArrayList from "../../../structures/implementations/list/ts-array-list.js";
import AFAPILocationAccessor from "../../../net/accessors/af-api-location-accessor.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFDeviceListing extends AFConcreteStructureListing {
    constructor(location) {
        super();
        this.location = location;
        this.organization = this.getLocation().getOrganization();
        this.client = this.getOrganization().getClient();
        this.session = this.getClient().getSession();
    }
    static createWithAPIResponse(location, deviceResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceListing = new AFDeviceListing(location);
            yield deviceListing.refresh(deviceResponses);
            return deviceListing;
        });
    }
    refresh(deviceListing) {
        return __awaiter(this, void 0, void 0, function* () {
            let readOnlyDevices;
            if (deviceListing === undefined)
                readOnlyDevices = yield AFAPILocationAccessor.getDevices(this.getSession().getToken(), this.getLocation().getID());
            else
                readOnlyDevices = deviceListing;
            let serverDevices = new Map();
            let localDeviceIDs = new TSArrayList(...this.getAllIDs());
            for (let serverDevice of readOnlyDevices)
                serverDevices.set(serverDevice.id, serverDevice);
            for (let id of localDeviceIDs.iterator())
                if (!serverDevices.has(id))
                    this.removeMapping(id);
            for (let id of serverDevices.keys()) {
                if (!localDeviceIDs.contains(id)) {
                    this.addMapping(id, (yield AFDevice.createWithAPIResponse(this.getLocation(), serverDevices.get(id))));
                }
            }
            return this;
        });
    }
    getSession() {
        return this.session;
    }
    getClient() {
        return this.client;
    }
    getOrganization() {
        return this.organization;
    }
    getLocation() {
        return this.location;
    }
    log(recurse = true) {
        console.groupCollapsed("AFDeviceListing");
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (recurse)
            for (let childStructure of this.getAll())
                childStructure.log();
        console.groupEnd();
    }
}
export default AFDeviceListing;
//# sourceMappingURL=af-device-listing.js.map