/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:37 AM -- February 07th, 2019.
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
import AFClient from "../af-client.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AFAPIOrganizationAccessor from "../../../net/accessors/af-api-organization-accessor.js";
import TSArrayList from "../../../structures/implementations/list/ts-array-list.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFClientListing extends AFConcreteStructureListing {
    constructor(client, organization) {
        super();
        // TODO [2/7/19 @ 5:06 AM] - Pretty up the following line:
        if (organization.getClient() !== client)
            throw new Error("Organization client mismatch.");
        this.client = client;
        this.session = this.getClient().getSession();
        this.organization = organization;
    }
    static createWithAPIResponse(organization, clientResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let clientListing = new AFClientListing(organization.getClient(), organization);
            yield clientListing.refresh(clientResponses);
            return clientListing;
        });
    }
    refresh(clientListing) {
        return __awaiter(this, void 0, void 0, function* () {
            let readOnlyClients;
            if (clientListing === undefined)
                readOnlyClients = yield AFAPIOrganizationAccessor.getClients(this.getSession().getToken());
            else
                readOnlyClients = clientListing;
            let serverClients = new Map();
            let localClientIDs = new TSArrayList(...this.getAllIDs());
            for (let serverClient of readOnlyClients)
                serverClients.set(serverClient.id, serverClient);
            for (let id of localClientIDs.iterator())
                if (!serverClients.has(id))
                    this.removeMapping(id);
            for (let id of serverClients.keys()) {
                if (!localClientIDs.contains(id)) {
                    let client;
                    if (id === session.getAmpelSession().getClient().getID())
                        client = session.getAmpelSession().getClient();
                    else
                        client = yield AFClient.createAsOrganizationChild(this.getSession(), serverClients.get(id));
                    this.addMapping(id, client);
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
        console.groupCollapsed("AFClientListing");
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (recurse)
            for (let childStructure of this.getAll())
                childStructure.log(false);
        console.groupEnd();
    }
}
export default AFClientListing;
//# sourceMappingURL=af-client-listing.js.map