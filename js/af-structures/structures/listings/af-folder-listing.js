/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:42 AM -- February 07th, 2019.
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
import AFFolder from "../af-folder.js";
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
class AFFolderListing extends AFConcreteStructureListing {
    constructor(organization) {
        super();
        this.organization = organization;
        this.client = this.getOrganization().getClient();
        this.session = this.getClient().getSession();
    }
    static createWithAPIResponse(organization, folderResponses, shouldChildrenMaintainChildren = true, questionResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let folderListing = new AFFolderListing(organization);
            for (let folderResponse of folderResponses) {
                let applicableQuestionResponses = [];
                if (questionResponses !== undefined) {
                    for (let questionResponse of (new TSObjectIterator(questionResponses))) {
                        if (folderResponse.questionIds.indexOf(questionResponse.value.id) !== -1)
                            applicableQuestionResponses.push(questionResponse.value);
                    }
                }
                let folder = yield AFFolder.createWithAPIResponse(organization, folderResponse, shouldChildrenMaintainChildren, (applicableQuestionResponses.length > 0 ? applicableQuestionResponses : undefined));
                folderListing.addMapping(folder.getID(), folder);
            }
            return folderListing;
        });
    }
    refresh(folderListing) {
        return __awaiter(this, void 0, void 0, function* () {
            let readOnlyFolders;
            if (folderListing === undefined)
                readOnlyFolders = yield AFAPIOrganizationAccessor.getFolders(this.getSession().getToken());
            else
                readOnlyFolders = folderListing;
            let serverFolders = new Map();
            let localFolderIDs = new TSArrayList(...this.getAllIDs());
            for (let serverFolder of readOnlyFolders)
                serverFolders.set(serverFolder.id, serverFolder);
            for (let id of localFolderIDs.iterator())
                if (!serverFolders.has(id))
                    this.removeMapping(id);
            for (let id of serverFolders.keys()) {
                if (!localFolderIDs.contains(id)) {
                    let folder = yield AFFolder.createWithAPIResponse(this.getOrganization(), serverFolders.get(id));
                    this.addMapping(id, folder);
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
        console.groupCollapsed("AFFolderListing");
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (recurse)
            for (let childStructure of this.getAll())
                childStructure.log();
        console.groupEnd();
    }
}
export default AFFolderListing;
//# sourceMappingURL=af-folder-listing.js.map