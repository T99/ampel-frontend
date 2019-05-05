/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:02 AM -- February 07th, 2019.
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
import AFQuestion from "../af-question.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import TSArrayList from "../../../structures/implementations/list/ts-array-list.js";
import AFAPIFolderAccessor from "../../../net/accessors/af-api-folder-accessor.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFQuestionListing extends AFConcreteStructureListing {
    constructor(folder) {
        super();
        this.folder = folder;
    }
    static createWithAPIResponse(folder, questionResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let questionListing = new AFQuestionListing(folder);
            for (let questionResponse of questionResponses) {
                let question = yield AFQuestion.createWithAPIResponse(folder.getOrganization(), questionResponse);
                questionListing.addMapping(question.getID(), question);
            }
            return questionListing;
        });
    }
    refresh(questionResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let readOnlyQuestions;
            if (questionResponses === undefined)
                readOnlyQuestions = (yield AFAPIFolderAccessor.getQuestions(this.getSession().getToken(), this.getFolder().getID()));
            else
                readOnlyQuestions = questionResponses;
            let serverDevices = new Map();
            let localDeviceIDs = new TSArrayList(...this.getAllIDs());
            for (let serverDevice of readOnlyQuestions)
                serverDevices.set(serverDevice.id, serverDevice);
            for (let id of localDeviceIDs.iterator())
                if (!serverDevices.has(id))
                    this.removeMapping(id);
            for (let id of serverDevices.keys()) {
                if (!localDeviceIDs.contains(id)) {
                    this.addMapping(id, (yield AFQuestion.createWithAPIResponse(this.getOrganization(), serverDevices.get(id))));
                }
            }
            return this;
        });
    }
    getSession() {
        return this.getClient().getSession();
    }
    getClient() {
        return this.getOrganization().getClient();
    }
    getOrganization() {
        return this.getFolder().getOrganization();
    }
    getFolder() {
        return this.folder;
    }
    log(recurse = true) {
        console.groupCollapsed("AFQuestionListing");
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (recurse)
            for (let childStructure of this.getAll())
                childStructure.log();
        console.groupEnd();
    }
}
export default AFQuestionListing;
//# sourceMappingURL=af-question-listing.js.map