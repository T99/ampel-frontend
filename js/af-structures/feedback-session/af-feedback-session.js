/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:00 PM -- February 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSDoublyLinkedList from "../../structures/implementations/list/ts-doubly-linked-list.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFFeedbackSession {
    constructor(folder, startTime) {
        this.folder = folder;
        this.initialStartTime = startTime;
        this.responseDLL = new TSDoublyLinkedList();
    }
    addLocation(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    addCustomer(firstName, lastName, phone, email) {
        this.customer = {
            firstName,
            lastName,
            phone: phone.toNumber(),
            email
        };
    }
    addResponse(response) {
        this.responseDLL.insertLast(response);
        console.log(this.toJSON());
    }
    undoResponse() {
        if (!this.responseDLL.isEmpty())
            this.responseDLL.removeLast();
        else
            throw new Error("Attempted to undo a response from an already empty response list.");
    }
    hasResponses() {
        return !this.responseDLL.isEmpty();
    }
    toJSON() {
        if (this.responseDLL.isEmpty())
            throw new Error("Attempted to build an empty session response object.");
        let response = {
            startTimestamp: this.initialStartTime.getAdjustedEpochTime(),
            endTimestamp: this.responseDLL.getLastNode().getElement().getSubmittedAtTime().getAdjustedEpochTime(),
            responses: []
        };
        if ((this.longitude !== undefined) && (this.latitude !== undefined)) {
            response.lat = this.latitude;
            response.lng = this.longitude;
        }
        if (this.customer !== undefined)
            response.customer = this.customer;
        let previousStartTime = this.initialStartTime;
        for (let individualResponse of this.responseDLL.iterator()) {
            response.responses.push({
                startTimestamp: previousStartTime.getAdjustedEpochTime(),
                endTimestamp: individualResponse.getSubmittedAtTime().getAdjustedEpochTime(),
                questionId: individualResponse.getQuestion().getID(),
                answer: individualResponse.getResponse()
            });
            previousStartTime = individualResponse.getSubmittedAtTime();
        }
        return response;
    }
}
export default AFFeedbackSession;
//# sourceMappingURL=af-feedback-session.js.map