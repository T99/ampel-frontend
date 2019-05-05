/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:40 PM -- March 11th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIModule from "../../../jui/jui-module.js";
import JUIAlignmentContainer from "../../../jui/elements/single-containers/jui-alignment-container.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import JUINotifier from "../../../jui/action/jui-notifier.js";
/**
 * An interface representing the required functionality of an Ampel question type.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIQuestionElement extends JUIModule {
    constructor(element, question, parentFolderElement) {
        super(new JUIAlignmentContainer(JUIAlignment.CENTER));
        this.element.addClasses("aui-question-element");
        this.contentElement = element;
        this.parentFolderElement = parentFolderElement;
        this.element.setChild(this.contentElement);
        this.question = question;
        this.responseNotifier = new JUINotifier();
    }
    getQuestionElement() {
        return this.contentElement;
    }
    interact() {
        this.parentFolderElement.interact();
        if (this.timeoutID !== undefined)
            clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => {
            this.responseNotifier.notify(this.getResponse());
        }, this.interactionTimeout);
    }
    getResponseSubscription(handler) {
        return this.responseNotifier.subscribe(handler);
    }
}
export default AUIQuestionElement;
//# sourceMappingURL=aui-question-element.js.map