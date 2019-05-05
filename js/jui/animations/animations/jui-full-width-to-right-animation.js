/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:56 PM -- March 02nd, 2019.
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
/**
 * Transitions one (and optionally a second) element to the right by one full page width.
 *
 * The first specified element will be transitioned out of the page. If a second element is specified, it will be placed
 * to the left of the initially specified element and transitioned into the page from out of sight on the left.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIFullWidthToRightAnimation /*extends JUIAnimation*/ {
    constructor(element1, element2) {
        /*super(
            2000,
            JUINamedTransitionFunction.EASE_IN_OUT,
            (progress: number): void => {
                
                this.flowContainer.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
                
            },
            0,
            100
        );*/
    }
    after() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
    before() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
export default JUIFullWidthToRightAnimation;
//# sourceMappingURL=jui-full-width-to-right-animation.js.map