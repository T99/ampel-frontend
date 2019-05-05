/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:10 PM -- April 30th, 2019.
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
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIModule from "../../jui/jui-module.js";
import JUITransition from "../../jui/animations/jui-transition.js";
import JUINamedTransitionFunction from "../../jui/animations/transition-functions/jui-named-transition-function.js";
/**
 * A container that automatically transitions left and right by a full page width to it's children elements.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISideScroller extends JUIModule {
    constructor(startingElement) {
        super(new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER));
        this.TYPE_IDENTITY = "aui-side-scroller";
        this.element.addChildren(startingElement);
    }
    getCurrentElement() {
        return this.currentElement;
    }
    transitionToRight(element) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldElement = this.currentElement;
            this.currentElement = element;
            let transition = new JUITransition(2000, JUINamedTransitionFunction.EASE_IN_OUT, (progress) => {
                this.element.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
            }, [this.element], 0, -100);
            transition.addPreAction(() => {
                this.element.setAlignment(JUIAlignment.LEFT);
                this.element.addChildren(this.currentElement);
            });
            transition.addPostAction(() => {
                this.element.setAlignment(JUIAlignment.RIGHT);
                this.element.removeChild(oldElement.getID());
                this.element.setAlignment(JUIAlignment.CENTER);
                this.element.getHTMLElement().style.transform = "";
            });
            yield transition.play();
        });
    }
    transitionToLeft(element) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldElement = this.currentElement;
            this.currentElement = element;
            let transition = new JUITransition(2000, JUINamedTransitionFunction.EASE_IN_OUT, (progress) => {
                this.element.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
            }, [this.element], 0, 100);
            transition.addPreAction(() => {
                this.element.setAlignment(JUIAlignment.RIGHT);
                this.element.addChildren(this.currentElement);
            });
            transition.addPostAction(() => {
                this.element.setAlignment(JUIAlignment.LEFT);
                this.element.removeChild(oldElement.getID());
                this.element.setAlignment(JUIAlignment.CENTER);
                this.element.getHTMLElement().style.transform = "";
            });
            yield transition.play();
        });
    }
}
export default AUISideScroller;
//# sourceMappingURL=aui-side-scroller.js.map