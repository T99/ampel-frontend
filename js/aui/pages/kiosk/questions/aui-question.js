/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:00 AM -- May 01st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIModule from "../../../../jui/jui-module.js";
import JUINotifier from "../../../../jui/action/jui-notifier.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
import TSDate from "../../../../descriptors/time/ts-date.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIQuestion extends JUIModule {
    constructor(question, element) {
        super(element);
        this.question = question;
        this.responseNotifier = new JUINotifier();
        this.interactionNotifier = new JUINotifier();
    }
    getInquiryText() {
        return this.question.getInquiry();
    }
    getQuestionType() {
        return this.question.getType();
    }
    interact() {
        if (this.timeoutID !== undefined)
            clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => {
            this.responseNotifier.notify(this.getResponse());
        }, this.getQuestionType().getTimeout());
    }
    formResponse(response) {
        return new AFResponse(this.question, response, TSDate.fromNow());
    }
    subscribeToResponse(handler) {
        return this.responseNotifier.subscribe(handler);
    }
    subscribeToInteraction(handler) {
        return this.interactionNotifier.subscribe(handler);
    }
}
export default AUIQuestion;
//# sourceMappingURL=aui-question.js.map