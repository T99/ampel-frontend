/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:49 AM -- February 07th, 2019.
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
import AFLocation from "../af-location.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import TSObjectIterator from "../../../structures/implementations/iterate/ts-object-iterator.js";
import AFAPIOrganizationAccessor from "../../../net/accessors/af-api-organization-accessor.js";
import TSArrayList from "../../../structures/implementations/list/ts-array-list.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFLocationListing extends AFConcreteStructureListing {
    constructor(organization) {
        super();
        this.organization = organization;
        this.client = this.getOrganization().getClient();
        this.session = this.getClient().getSession();
    }
    static createWithAPIResponse(organization, locationResponses, shouldChildrenMaintainChildren = false, deviceResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let locationListing = new AFLocationListing(organization);
            for (let locationResponse of locationResponses) {
                let applicableDeviceResponses = [];
                if (deviceResponses !== undefined) {
                    let iterator = new TSObjectIterator(deviceResponses);
                    while (iterator.hasNext()) {
                        let deviceResponse = iterator.next().value;
                        if (locationResponse.deviceIds.indexOf(deviceResponse.id) !== -1)
                            applicableDeviceResponses.push(deviceResponse);
                    }
                }
                let location = yield AFLocation.createWithAPIResponse(organization, locationResponse, shouldChildrenMaintainChildren, applicableDeviceResponses);
                locationListing.addMapping(location.getID(), location);
            }
            return locationListing;
        });
    }
    refresh(locationListing) {
        return __awaiter(this, void 0, void 0, function* () {
            let readOnlyLocations;
            if (locationListing === undefined)
                readOnlyLocations = yield AFAPIOrganizationAccessor.getLocations(this.getSession().getToken());
            else
                readOnlyLocations = locationListing;
            let serverLocations = new Map();
            let localLocationIDs = new TSArrayList(...this.getAllIDs());
            for (let serverLocation of readOnlyLocations)
                serverLocations.set(serverLocation.id, serverLocation);
            for (let id of localLocationIDs.iterator())
                if (!serverLocations.has(id))
                    this.removeMapping(id);
            for (let id of serverLocations.keys()) {
                if (!localLocationIDs.contains(id)) {
                    let location = yield AFLocation.createWithAPIResponse(this.getOrganization(), serverLocations.get(id));
                    this.addMapping(id, location);
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
    log(recurse = true) {
        console.groupCollapsed("AFLocationListing");
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (recurse)
            for (let childStructure of this.getAll())
                childStructure.log();
        console.groupEnd();
    }
}
export default AFLocationListing;
//# sourceMappingURL=af-location-listing.js.map