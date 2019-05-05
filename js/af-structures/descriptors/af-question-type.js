/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:34 AM -- February 05th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import AUIStoplightQuestion from "../../aui/pages/kiosk-old/question-types/aui-stoplight-question.js";
import AUISliderQuestion from "../../aui/pages/kiosk-old/question-types/aui-slider-question.js";
import AUINPSQuestion from "../../aui/pages/kiosk-old/question-types/aui-nps-question.js";
import AUITrueFalseQuestion from "../../aui/pages/kiosk/questions/aui-true-false-question.js";
import AUISATAQuestion from "../../aui/pages/kiosk-old/question-types/aui-sata-question.js";
import AUIMultipleChoiceQuestion from "../../aui/pages/kiosk-old/question-types/aui-multiple-choice-question.js";
import AUIFreeResponseQuestion from "../../aui/pages/kiosk-old/question-types/aui-free-response-question.js";
/**
 * Enumerates the possible Ampel question types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFQuestionType {
    constructor(typeNumber, typeString, constructorProxy, validator) {
        this.typeNumber = typeNumber;
        this.typeString = typeString;
        this.constructorProxy = constructorProxy;
        this.validator = validator;
        AFQuestionType.addTypeNumberMapping(typeNumber, this);
        AFQuestionType.addTypeStringMapping(typeString, this);
    }
    static addTypeNumberMapping(typeNumber, questionType) {
        if (AFQuestionType.typeNumberMap === undefined)
            AFQuestionType.typeNumberMap = new Map();
        AFQuestionType.typeNumberMap.set(typeNumber, questionType);
    }
    static addTypeStringMapping(typeString, questionType) {
        if (AFQuestionType.typeStringMap === undefined)
            AFQuestionType.typeStringMap = new Map();
        AFQuestionType.typeStringMap.set(typeString, questionType);
    }
    static getQuestionTypeForTypeNumber(typeNumber) {
        return AFQuestionType.typeNumberMap.get(typeNumber);
    }
    static getQuestionTypeForTypeString(typeString) {
        return AFQuestionType.typeStringMap.get(typeString);
    }
    static createQuestionElementFromQuestion(question, parentFolderElement) {
        return question.getType().constructorProxy(question, parentFolderElement);
    }
    validateResponse(response) {
        return this.validator(response);
    }
    getTypeNumber() {
        return this.typeNumber;
    }
    getTypeString() {
        return this.typeString;
    }
}
AFQuestionType.STOPLIGHT = new AFQuestionType(0, "StopLight", (question, parentFolderElement) => new AUIStoplightQuestion(question, parentFolderElement), (response) => {
    /*
     * The response must be either 0 (green), 1 (yellow), or 2 (red).
     */
    return ((response === 0) || /* <-- Green	*/
        (response === 1) || /* <-- Yellow	*/
        (response === 2) /* <-- Red		*/);
});
AFQuestionType.SLIDER = new AFQuestionType(1, "Slider", (question, parentFolderElement) => new AUISliderQuestion(question, parentFolderElement), (response) => {
    /*
     * The response must be between 1 and 10 (1 <= x <= 10).
     */
    return ((response >= 1) &&
        (response <= 10));
});
AFQuestionType.NPS = new AFQuestionType(2, "NPS", (question, parentFolderElement) => new AUINPSQuestion(question, parentFolderElement), (response) => {
    /*
     * The response must be between 1 and 10 (1 <= x <= 10).
     */
    return ((response >= 1) &&
        (response <= 10));
});
AFQuestionType.TRUE_FALSE = new AFQuestionType(3, "TrueFalse", (question, parentFolderElement) => new AUITrueFalseQuestion(question, parentFolderElement), (response) => {
    /*
     * The response must be either 'true' or 'false'.
     */
    return (typeof response === "boolean");
});
AFQuestionType.SELECT_ALL_THAT_APPLY = new AFQuestionType(4, "SelectAllThatApply", (question, parentFolderElement) => new AUISATAQuestion(question, parentFolderElement), (response) => {
    /*
     * The response must be an array of strings.
     */
    return ((response instanceof Array) &&
        (response.every((value) => typeof value === "string")));
});
AFQuestionType.MULTIPLE_CHOICE = new AFQuestionType(5, "MultipleChoice", (question, parentFolderElement) => new AUIMultipleChoiceQuestion(question, parentFolderElement), (response) => {
    /*
     * The response must be a string, representing the ID of the chosen option.
     */
    return (typeof response === "string");
});
AFQuestionType.FREE_RESPONSE = new AFQuestionType(6, "FreeResponse", (question, parentFolderElement) => new AUIFreeResponseQuestion(question, parentFolderElement), (response) => {
    /*
     * The response must be a string, either representing the textual response or the ID of the response canvas
     * file.
     */
    return (typeof response === "string");
});
export default AFQuestionType;
//# sourceMappingURL=af-question-type.js.map