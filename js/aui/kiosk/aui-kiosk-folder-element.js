/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:49 PM -- March 12th, 2019.
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
import JUIModule from "../../jui/jui-module.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import TSArrayList from "../../structures/implementations/list/ts-array-list.js";
import AUIKioskButton from "./context-buttons/aui-kiosk-button.js";
import AFQuestionType from "../../af-structures/descriptors/af-question-type.js";
import JUITransition from "../../jui/animations/jui-transition.js";
import JUINamedTransitionFunction from "../../jui/animations/transition-functions/jui-named-transition-function.js";
import JUINotifier from "../../jui/action/jui-notifier.js";
import TSDate from "../../descriptors/time/ts-date.js";
import JUIWorld from "../../jui/jui-world.js";
import AUIKioskThankYouPage from "./aui-kiosk-thank-you-page.js";
import AFAPIResponseAccessor from "../../net/accessors/af-api-response-accessor.js";
import AFFeedbackSession from "../../af-structures/feedback-session/af-feedback-session.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskFolderElement extends JUIModule {
    constructor(page, folder) {
        super(new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER));
        this.questionIndex = 0;
        this.finalized = false;
        this.element.addClasses("aui-kiosk-folder-element");
        this.parentPage = page;
        this.folder = folder;
        this.questionList = new TSArrayList(...folder.getQuestionListing().getAll());
        if (this.folder.isShuffled())
            this.questionList.shuffle();
        this.currentQuestionElement = AFQuestionType.createQuestionElementFromQuestion(this.getCurrentQuestion(), this);
        this.feedbackSession = new AFFeedbackSession(folder, TSDate.fromNow());
        this.currentResponseSubscription = this.currentQuestionElement.getResponseSubscription((notification) => {
            this.feedbackSession.addResponse(notification);
            this.next();
        });
        this.backButton = new AUIKioskButton("Back");
        this.skipButton = new AUIKioskButton("Skip");
        this.doneButton = new AUIKioskButton("Done");
        this.questionChangeNotifier = new JUINotifier();
        this.backButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.back());
        this.skipButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.next());
        this.doneButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.next());
        this.element.addChildren(this.currentQuestionElement);
    }
    subscribeToQuestionChangeNotifier(handler) {
        return this.questionChangeNotifier.subscribe(handler);
    }
    getCurrentQuestion() {
        return this.questionList.get(this.questionIndex);
    }
    interact() {
        if (this.timeoutID !== undefined)
            clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => {
            this.finalizeSession();
        }, AUIKioskFolderElement.TIMEOUT);
    }
    finalizeSession() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.finalized) {
                this.finalized = true;
                if (this.feedbackSession.hasResponses()) {
                    let apiResponse = yield AFAPIResponseAccessor.submit(this.feedbackSession.toJSON(), session.getAmpelSession().getToken());
                    console.log(apiResponse);
                }
                yield JUIWorld.getInstance().goToPageRight(new AUIKioskThankYouPage(this.folder));
            }
        });
    }
    getRelevantKioskButtons() {
        let relevantButtons = [];
        if (this.questionIndex > 0)
            relevantButtons.push(this.backButton);
        relevantButtons.push(...this.currentQuestionElement.getRelevantKioskButtons());
        relevantButtons.push(this.skipButton);
        relevantButtons.push(this.doneButton);
        return relevantButtons;
    }
    next() {
        if (this.questionList.size() > (this.questionIndex + 1)) {
            let oldQuestionElement = this.currentQuestionElement;
            this.currentQuestionElement = AFQuestionType.createQuestionElementFromQuestion(this.questionList.get(++this.questionIndex), this);
            this.currentResponseSubscription.unsubscribe();
            let transition = new JUITransition(2000, JUINamedTransitionFunction.EASE_IN_OUT, (progress) => {
                this.element.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
            }, [this.element], 0, -100);
            transition.addPreAction(() => {
                this.questionChangeNotifier.notify(this.getCurrentQuestion());
                this.element.setAlignment(JUIAlignment.LEFT);
                this.element.addChildren(this.currentQuestionElement);
                this.currentResponseSubscription = this.currentQuestionElement.getResponseSubscription((notification) => {
                    this.feedbackSession.addResponse(notification);
                    this.next();
                    this.currentResponseSubscription.unsubscribe();
                });
            });
            transition.addPostAction(() => {
                this.element.setAlignment(JUIAlignment.RIGHT);
                this.element.removeChild(oldQuestionElement.getID());
                this.element.setAlignment(JUIAlignment.CENTER);
                this.element.getHTMLElement().style.transform = "";
                this.interact();
            });
            transition.play();
        }
        else
            this.finalizeSession();
    }
    back() {
        if (0 <= (this.questionIndex - 1)) {
            let oldQuestionElement = this.currentQuestionElement;
            this.currentQuestionElement = AFQuestionType.createQuestionElementFromQuestion(this.questionList.get(--this.questionIndex), this);
            this.currentResponseSubscription.unsubscribe();
            let transition = new JUITransition(2000, JUINamedTransitionFunction.EASE_IN_OUT, (progress) => {
                this.element.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
            }, [this.element], 0, 100);
            transition.addPreAction(() => {
                this.questionChangeNotifier.notify(this.getCurrentQuestion());
                this.element.setAlignment(JUIAlignment.RIGHT);
                this.element.addBefore(this.currentQuestionElement, oldQuestionElement);
                this.feedbackSession.undoResponse();
                this.currentResponseSubscription = this.currentQuestionElement.getResponseSubscription((notification) => {
                    this.feedbackSession.addResponse(notification);
                    this.next();
                    this.currentResponseSubscription.unsubscribe();
                });
            });
            transition.addPostAction(() => {
                this.element.setAlignment(JUIAlignment.LEFT);
                this.element.removeChild(oldQuestionElement.getID());
                this.element.setAlignment(JUIAlignment.CENTER);
                this.element.getHTMLElement().style.transform = "";
                this.interact();
            });
            transition.play();
        }
    }
}
AUIKioskFolderElement.TIMEOUT = 7000;
export default AUIKioskFolderElement;
//# sourceMappingURL=aui-kiosk-folder-element.js.map