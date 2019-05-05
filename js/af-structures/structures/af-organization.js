/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:04 AM -- January 31st, 2019.
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
import AFClientListing from "./listings/af-client-listing.js";
import AFFolderListing from "./listings/af-folder-listing.js";
import AFLocationListing from "./listings/af-location-listing.js";
import AFQuestionCollectiveListing from "./listings/af-question-collective-listing.js";
import AFDeviceCollectiveListing from "./listings/af-device-collective-listing.js";
import AFAPIOrganizationAccessor from "../../net/accessors/af-api-organization-accessor.js";
import AFQuestionType from "../descriptors/af-question-type.js";
import AFAPIFolderAccessor from "../../net/accessors/af-api-folder-accessor.js";
import AFAPIQuestionAccessor from "../../net/accessors/af-api-question-accessor.js";
import AFUnplacedQuestionListing from "./listings/af-unplaced-question-listing.js";
/**
 * A organization registered with Ampel.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFOrganization extends AFStructure {
    /**
     * Initializes a new AFOrganization with a given {@link AFClient}.
     *
     * @param {AFClient} client The client to whom this AFOrganization's information 'belongs'.
     * @param {boolean} shouldMaintainChildren Whether or not this {@link AFStructure} should maintain children.
     */
    constructor(client, shouldMaintainChildren) {
        super(shouldMaintainChildren);
        this.client = client;
    }
    static createWithAPIResponse(client, response, shouldMaintainChildren = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let organization = new AFOrganization(client, shouldMaintainChildren);
            yield organization.refresh(response);
            return organization;
        });
    }
    refresh(organizationResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (organizationResponse === undefined) {
                response = yield AFAPIOrganizationAccessor.getBaseByID(this.getSession().getToken(), this.getID());
            }
            else
                response = organizationResponse;
            this.id = response.id;
            this.name = response.name;
            this.exitSecurityCode = response.securityCode;
            return this;
        });
    }
    isSignedIn() {
        return ((this.clientListing !== undefined) &&
            (this.locationListing !== undefined) &&
            (this.deviceListing !== undefined) &&
            (this.folderListing !== undefined) &&
            (this.questionListing !== undefined));
    }
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isSignedIn())
                return this;
            let response = yield AFAPIOrganizationAccessor.getEverything(this.getSession().getToken());
            this.clientListing = yield AFClientListing.createWithAPIResponse(this, response.clients);
            this.locationListing = yield AFLocationListing.createWithAPIResponse(this, response.locations, true, response.devices);
            this.deviceListing = yield AFDeviceCollectiveListing.createWithOrganization(this);
            this.folderListing = yield AFFolderListing.createWithAPIResponse(this, response.folders, true, response.questions);
            this.questionListing = yield AFQuestionCollectiveListing.createWithOrganization(this);
            this.unplacedQuestionListing = yield AFUnplacedQuestionListing.createWithAPIResponse(this, response.questions);
            this.locationListing.getAll().forEach((location) => {
                location.getDeviceListing().setParentListing(this.deviceListing);
            });
            this.folderListing.getAll().forEach((folder) => {
                folder.getQuestionListing().setParentListing(this.questionListing);
            });
            this.unplacedQuestionListing.setParentListing(this.questionListing);
            return this;
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clientListing = undefined;
            this.locationListing = undefined;
            this.deviceListing = undefined;
            this.folderListing = undefined;
            this.questionListing = undefined;
        });
    }
    createLocation(name) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO [4/24/19 @ 5:39 PM] - Finish the 'createLocation' method.
            return null;
        });
    }
    createFolder(folderName, isShuffled, questions) {
        return __awaiter(this, void 0, void 0, function* () {
            let questionIDs = [];
            if (questions !== undefined) {
                for (let element of questions) {
                    if (typeof element === "string")
                        questionIDs.push(element);
                    else
                        questionIDs.push(element.getID());
                }
            }
            let folderResponse = yield AFAPIFolderAccessor.createForOrganization(this.getSession().getToken(), folderName, isShuffled, questionIDs);
            yield this.getFolderListing().refresh();
            if (this.getFolderListing().hasItemWithID(folderResponse.id))
                return this.getFolderListing().getItemWithID(folderResponse.id);
            else {
                throw new Error("ERR | Folder creation failed...");
            }
        });
    }
    createQuestion(inquiry, type, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            let typeNumber;
            let folderID;
            if (typeof type === "number") {
                let typeResult = AFQuestionType.getQuestionTypeForTypeNumber(type);
                if (typeResult === undefined)
                    throw new Error("ERR | Attempted to create a question with an invalid type number.");
                else
                    typeNumber = type;
            }
            else
                typeNumber = type.getTypeNumber();
            if (folder === undefined)
                folderID = undefined;
            else if (typeof folder === "string") {
                if (this.getFolderListing().hasItemWithID(folder))
                    folderID = folder;
                else
                    throw new Error("ERR | Attempted to create a question with an invalid folder ID.");
            }
            else
                folderID = folder.getID();
            let questionResponse = yield AFAPIQuestionAccessor.createForOrganization(this.getSession().getToken(), inquiry, typeNumber, folderID);
            yield this.questionListing.refresh();
            if (this.getQuestionListing().hasItemWithID(questionResponse.id))
                return this.getQuestionListing().getItemWithID(questionResponse.id);
            else
                throw new Error("ERR | Question creation failed...");
            // if (folderID !== undefined) {
            //
            // 	if (this.getFolderListing().hasItemWithID(folderID)) {
            //
            // 		return await this.getFolderListing().getItemWithID(folderID).createQuestion(inquiry, type);
            //
            // 	} else throw new Error("Attempted to create a question for a folder that does not exist for the given Organization.");
            //
            // } else {
            //
            // 	let questionResponse: AFQuestionResponseStructure =
            // 		await AFAPIOrganizationAccessor.createQuestion(this.getSession().getToken(), inquiry, type.getTypeNumber());
            //
            // 	await this.getQuestionListing().deepRefresh();
            //
            // 	return this.getQuestionListing().getItemWithID(questionResponse.id);
            //
            // }
        });
    }
    isSessionOrganization() {
        return (this.getSession().hasOrganization() && (this.getSession().getOrganization().getID() === this.getID()));
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    hasExitSecurityCode() {
        return (this.getExitSecurityCode() !== undefined);
    }
    getExitSecurityCode() {
        return this.exitSecurityCode;
    }
    getSession() {
        return this.getClient().getSession();
    }
    getClient() {
        return this.client;
    }
    getClientListing() {
        return this.clientListing;
    }
    getLocationListing() {
        return this.locationListing;
    }
    getDeviceListing() {
        return this.deviceListing;
    }
    getFolderListing() {
        return this.folderListing;
    }
    getQuestionListing() {
        return this.questionListing;
    }
    getChildrenStructures() {
        // TODO [2/3/19 @ 2:08 AM] - Finish the 'getChildrenStructures' method.
        return [this.clientListing, this.locationListing, this.deviceListing, this.folderListing, this.questionListing];
    }
    log(recurse = true) {
        console.groupCollapsed("AFOrganization: " + this.getName() + " [" + this.getID() + "]" + (this.isSessionOrganization() ? " \u2605" : ""));
        console.info("ID:\t\t\t\t" + this.getID());
        console.info("Name:\t\t\t\t" + this.getName());
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (this.isSignedIn() && recurse)
            for (let childStructure of this.getChildrenStructures())
                childStructure.log();
        else if (!this.isSignedIn() && recurse) {
            console.groupCollapsed("Children Structures");
            console.warn("Not signed-in to this organization...");
            console.groupEnd();
        }
        console.groupEnd();
    }
}
export default AFOrganization;
//# sourceMappingURL=af-organization.js.map