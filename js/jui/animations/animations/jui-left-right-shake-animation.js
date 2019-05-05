/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:23 PM -- February 15th, 2019.
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
import JUIAnimation from "../jui-animation.js";
import JUIWobbleTransitionFunction from "../transition-functions/wobble/jui-wobble-transition-function.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUILeftRightShakeAnimation extends JUIAnimation {
    constructor(element) {
        super(500, new JUIWobbleTransitionFunction(4), (progress) => {
            element.getHTMLElement().style.transform = "translateX(" + (25 * progress) + "px)";
        }, [element], 0, 0);
        this.animatedElement = element;
    }
    before() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    after() {
        return __awaiter(this, void 0, void 0, function* () {
            this.animatedElement.getHTMLElement().style.transform = "";
        });
    }
}
export default JUILeftRightShakeAnimation;
//# sourceMappingURL=jui-left-right-shake-animation.js.map