/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:33 PM -- February 07th, 2019.
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
import AFCollectiveStructureListing from "../../af-collective-structure-listing.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFDeviceCollectiveListing extends AFCollectiveStructureListing {
    constructor(client, organization) {
        super();
        // TODO [2/7/19 @ 4:34 PM] - Pretty up the following line:
        if (organization.getClient() !== client)
            throw new Error("Organization client mismatch.");
        this.client = client;
        this.organization = organization;
    }
    static createWithOrganization(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            return new AFDeviceCollectiveListing(organization.getClient(), organization);
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
        console.groupCollapsed("AFDeviceCollectiveListing");
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (recurse)
            for (let childStructure of this.getAll())
                childStructure.log();
        console.groupEnd();
    }
}
export default AFDeviceCollectiveListing;
//# sourceMappingURL=af-device-collective-listing.js.map