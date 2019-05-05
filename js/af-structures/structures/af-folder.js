/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:58 PM -- February 06th, 2019.
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
import AFQuestionListing from "./listings/af-question-listing.js";
import AFAPIFolderAccessor from "../../net/accessors/af-api-folder-accessor.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFFolder extends AFStructure {
    constructor(organization, shouldMaintainChildren) {
        super(shouldMaintainChildren);
        this.organization = organization;
    }
    static createWithAPIResponse(organization, folderResponse, shouldMaintainChildren = true, questionResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let folder = new AFFolder(organization, shouldMaintainChildren);
            folder.id = folderResponse.id;
            folder.name = folderResponse.name;
            folder.shuffled = folderResponse.shuffled;
            if ((shouldMaintainChildren === true) && (questionResponses !== undefined)) {
                folder.questionListing = yield AFQuestionListing.createWithAPIResponse(folder, questionResponses);
            }
            return folder;
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield AFAPIFolderAccessor.getBase(this.getSession().getToken(), this.getID());
            this.name = response.name;
            this.shuffled = response.shuffled;
            return this;
        });
    }
    createQuestion(inquiry, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getOrganization().createQuestion(inquiry, type, this.getID());
        });
    }
    isSessionFolder() {
        return (this.getSession().hasFolder() && (this.getSession().getFolder().getID() === this.getID()));
    }
    isShuffled() {
        return this.shuffled;
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
    getQuestionListing() {
        return this.questionListing;
    }
    getChildrenStructures() {
        // TODO [2/6/19 @ 8:01 PM] - Finish the 'getChildrenStructures' method.
        return [this.questionListing];
    }
    log(recurse = true) {
        console.groupCollapsed("AFFolder: " + this.getName() + " [" + this.getID() + "]" + (this.isSessionFolder() ? " \u2605" : ""));
        console.info("ID:\t\t" + this.getID());
        console.info("Name:\t\t" + this.getName());
        console.info("Is Shuffled:\t" + this.isShuffled());
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (recurse)
            for (let childStructure of this.getChildrenStructures())
                childStructure.log();
        console.groupEnd();
    }
}
export default AFFolder;
//# sourceMappingURL=af-folder.js.map