/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:10 AM -- March 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFResponse {
    constructor(question, response, submittedAt) {
        this.question = question;
        this.response = response;
        this.submittedAt = submittedAt;
    }
    getQuestion() {
        return this.question;
    }
    getResponse() {
        return this.response;
    }
    getSubmittedAtTime() {
        return this.submittedAt;
    }
}
export default AFResponse;
//# sourceMappingURL=af-response.js.map