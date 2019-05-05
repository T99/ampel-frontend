/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:58 AM -- November 09th, 2018.
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
import JUITransition from "./jui-transition.js";
class JUIAnimation {
    // TODO [2/15/19 @ 10:04 PM] - Is there a way to 'auto reset' the transform values of the changed elements?
    constructor(milliseconds, transitionFunction, transitionAction, elements, startValue, endValue) {
        this.internalTransition = new JUITransition(milliseconds, transitionFunction, transitionAction, elements, startValue, endValue);
        this.internalTransition.addPreAction(() => this.before());
        this.internalTransition.addPostAction(() => this.after());
    }
    // DOC-ME [12/8/18 @ 4:50 PM] - Documentation required!
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.internalTransition.play();
        });
    }
    // DOC-ME [12/8/18 @ 4:50 PM] - Documentation required!
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.internalTransition.pause();
        });
    }
    // DOC-ME [12/8/18 @ 4:50 PM] - Documentation required!
    jumpTo() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO [2/15/19 @ 6:15 PM] - I don't know how I'm going to do this yet.
        });
    }
}
export default JUIAnimation;
//# sourceMappingURL=jui-animation.js.map