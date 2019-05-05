/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:32 AM -- February 05th, 2019.
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
import AFQuestionType from "../descriptors/af-question-type.js";
import AFStructure from "../af-structure.js";
import AFAPIQuestionAccessor from "../../net/accessors/af-api-question-accessor.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFQuestion extends AFStructure {
    constructor(organization) {
        super(false);
        this.organization = organization;
        this.options = new Map();
    }
    static createWithAPIResponse(organization, questionResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let question = new AFQuestion(organization);
            question.id = questionResponse.id;
            yield question.refresh(questionResponse);
            return question;
        });
    }
    refresh(questionResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (questionResponse === undefined)
                response = yield AFAPIQuestionAccessor.getBase(this.getSession().getToken(), this.getID());
            else
                response = questionResponse;
            this.inquiry = response.inquiry;
            this.type = AFQuestionType.getQuestionTypeForTypeNumber(response.type.value);
            if ((this.getType() === AFQuestionType.MULTIPLE_CHOICE) || (this.getType() === AFQuestionType.SELECT_ALL_THAT_APPLY)) {
                for (let id in response.options) {
                    if (!this.options.has(id))
                        this.options.set(id, response.options[id]);
                }
                for (let id of this.options.values()) {
                    if (response.options[id] === undefined)
                        this.options.delete(id);
                }
            }
            return this;
        });
    }
    getInquiry() {
        return this.inquiry;
    }
    getOptions() {
        return this.options;
    }
    getType() {
        return this.type;
    }
    isSessionQuestion() {
        return (this.getSession().hasQuestion() && (this.getSession().getQuestion().getID() === this.getID()));
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.inquiry;
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
    getChildrenStructures() {
        return [];
    }
    log() {
        console.groupCollapsed("AFQuestion (" + this.getType().getTypeString() + ") [" + this.getID() + "]" + (this.isSessionQuestion() ? " \u2605" : ""));
        console.info("ID:\t\t" + this.getID());
        console.info("Inquiry:\t" + this.getInquiry());
        console.info("Type:\t\t" + this.getType().getTypeString());
        if ((this.type === AFQuestionType.MULTIPLE_CHOICE) || (this.type === AFQuestionType.SELECT_ALL_THAT_APPLY)) {
            console.groupCollapsed("Options");
            for (let id of this.getOptions().keys())
                console.info(id + ": '" + this.getOptions().get(id) + "'");
            console.groupEnd();
        }
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        console.groupEnd();
    }
}
export default AFQuestion;
//# sourceMappingURL=af-question.js.map