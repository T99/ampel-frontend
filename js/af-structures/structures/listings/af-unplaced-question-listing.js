/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:54 PM -- March 23rd, 2019.
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
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AFAPIOrganizationAccessor from "../../../net/accessors/af-api-organization-accessor.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFUnplacedQuestionListing extends AFConcreteStructureListing {
    constructor(organization) {
        super();
        this.organization = organization;
    }
    static createWithAPIResponse(organization, questionResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            let questionListing = new AFUnplacedQuestionListing(organization);
            for (let response of questionResponses) {
                // TODO [4/24/19 @ 6:11 PM] - Finish the 'createWithAPIResponse' method.
            }
            return questionListing;
        });
    }
    refresh(questionResponses) {
        return __awaiter(this, void 0, void 0, function* () {
            if (questionResponses === undefined) {
                questionResponses = yield AFAPIOrganizationAccessor.getQuestions(this.getSession().getToken());
            }
            for (let response of questionResponses) {
                // TODO [4/24/19 @ 6:11 PM] - Finish the 'refresh' method.
            }
            return undefined;
        });
    }
    getClient() {
        return this.getOrganization().getClient();
    }
    getOrganization() {
        return this.organization;
    }
    getSession() {
        return this.getClient().getSession();
    }
    log(recurse) {
    }
}
export default AFUnplacedQuestionListing;
//# sourceMappingURL=af-unplaced-question-listing.js.map