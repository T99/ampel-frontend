/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:19 AM -- November 05th, 2018.
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
import JUIOverlayState from "./jui-overlay-state.js";
import JUIDirection from "../descriptors/jui-direction.js";
import JUIAlignment from "../descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../elements/single-containers/jui-alignment-container.js";
import JUITransition from "../animations/jui-transition.js";
import JUINamedTransitionFunction from "../animations/transition-functions/jui-named-transition-function.js";
/**
 * An class representing any UI element that does not interrupt JUIPage flow ('position: fixed' for those that
 * understand CSS positioning).
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIOverlay {
    constructor(alignment, transitionDirection, containerType) {
        this.isMouseHovering = false;
        this.container = new JUIAlignmentContainer(JUIAlignment.CENTER, containerType);
        this.state = JUIOverlayState.HIDDEN;
        this.setAlignment(alignment, transitionDirection);
        this.container.addClasses("jui-overlay");
        this.container.getEventManager().ELEMENT_MOUSE_ENTER.subscribe(() => { this.isMouseHovering = true; });
        this.container.getEventManager().ELEMENT_MOUSE_LEAVE.subscribe(() => { this.isMouseHovering = false; });
    }
    static getDefaultTransitionDirection(alignment) {
        switch (alignment) {
            case JUIAlignment.UPPER_LEFT: return JUIDirection.TO_TOP;
            case JUIAlignment.TOP: return JUIDirection.TO_TOP;
            case JUIAlignment.UPPER_RIGHT: return JUIDirection.TO_TOP;
            case JUIAlignment.LEFT: return JUIDirection.TO_LEFT;
            case JUIAlignment.CENTER: return JUIDirection.TO_BOTTOM;
            case JUIAlignment.RIGHT: return JUIDirection.TO_RIGHT;
            case JUIAlignment.LOWER_LEFT: return JUIDirection.TO_BOTTOM;
            case JUIAlignment.BOTTOM: return JUIDirection.TO_BOTTOM;
            case JUIAlignment.LOWER_RIGHT: return JUIDirection.TO_BOTTOM;
        }
    }
    static getOverlayAlignmentClass(alignment) {
        return ("jui-overlay" + alignment.toString().substring(3));
    }
    static getTransitionInfo(isCurrentlyShown, alignment, transitionDirection) {
        let type = "translateY";
        let unit = "%";
        let beginValue;
        let endValue;
        let isNormalTransition = (transitionDirection === JUIOverlay.getDefaultTransitionDirection(alignment));
        if (isNormalTransition) {
            if (alignment === JUIAlignment.CENTER) {
                unit = "vh";
                beginValue = (isCurrentlyShown ? 0 : 100);
                endValue = (isCurrentlyShown ? 100 : 0);
            }
            else if ((alignment === JUIAlignment.LEFT) || alignment === JUIAlignment.RIGHT) {
                type = "translateX";
                if (alignment === JUIAlignment.LEFT) {
                    beginValue = (isCurrentlyShown ? 0 : -100);
                    endValue = (isCurrentlyShown ? -100 : 0);
                }
                else {
                    beginValue = (isCurrentlyShown ? 0 : 100);
                    endValue = (isCurrentlyShown ? 100 : 0);
                }
            }
            else if ((alignment === JUIAlignment.TOP) || (alignment === JUIAlignment.UPPER_LEFT) || (alignment === JUIAlignment.UPPER_RIGHT)) {
                beginValue = (isCurrentlyShown ? 0 : -100);
                endValue = (isCurrentlyShown ? -100 : 0);
            }
            else {
                beginValue = (isCurrentlyShown ? 0 : 100);
                endValue = (isCurrentlyShown ? 100 : 0);
            }
        }
        else {
            if (transitionDirection === JUIDirection.TO_TOP) {
                unit = "vh";
                beginValue = (isCurrentlyShown ? 0 : -100);
                endValue = (isCurrentlyShown ? -100 : 0);
            }
            else if (transitionDirection === JUIDirection.TO_BOTTOM) {
                unit = "vh";
                beginValue = (isCurrentlyShown ? 0 : 100);
                endValue = (isCurrentlyShown ? 100 : 0);
            }
            else if (transitionDirection === JUIDirection.TO_LEFT) {
                type = "translateX";
                unit = "vw";
                beginValue = (isCurrentlyShown ? 0 : -100);
                endValue = (isCurrentlyShown ? -100 : 0);
            }
            else {
                type = "translateX";
                unit = "vw";
                beginValue = (isCurrentlyShown ? 0 : 100);
                endValue = (isCurrentlyShown ? 100 : 0);
            }
        }
        return {
            type,
            unit,
            beginValue,
            endValue
        };
    }
    setAlignment(alignment, transitionDirection) {
        if (this.alignment !== undefined)
            this.container.removeClasses(JUIOverlay.getOverlayAlignmentClass(this.alignment));
        this.alignment = alignment;
        this.container.addClasses(JUIOverlay.getOverlayAlignmentClass(this.alignment));
        this.transitionDirection = (transitionDirection !== undefined ? transitionDirection : JUIOverlay.getDefaultTransitionDirection(this.alignment));
    }
    setChild(child) {
        this.container.setChild(child);
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((this.state !== JUIOverlayState.VISIBLE) &&
                (this.state !== JUIOverlayState.DESTROYED) &&
                (this.state !== JUIOverlayState.TRANSITIONING)) {
                let info = JUIOverlay.getTransitionInfo(false, this.alignment, this.transitionDirection);
                let transition = new JUITransition(2000, JUINamedTransitionFunction.EASE_IN_OUT, (progress) => {
                    this.container.getHTMLElement().style.transform = info.type + "(" + progress + info.unit + ")";
                }, [this.container], info.beginValue, info.endValue);
                transition.addPreAction(() => {
                    this.state = JUIOverlayState.TRANSITIONING;
                    this.container.getHTMLElement().style.transform = (info.type + "(" + info.beginValue + info.unit + ")");
                    document.body.appendChild(this.container.getHTMLElement());
                });
                transition.addPostAction(() => {
                    this.container.getHTMLElement().style.transform = "";
                    this.state = JUIOverlayState.VISIBLE;
                });
                yield transition.play();
            }
        });
    }
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((this.state !== JUIOverlayState.HIDDEN) &&
                (this.state !== JUIOverlayState.DESTROYED) &&
                (this.state !== JUIOverlayState.TRANSITIONING)) {
                let info = JUIOverlay.getTransitionInfo(true, this.alignment, this.transitionDirection);
                let transition = new JUITransition(2000, JUINamedTransitionFunction.EASE_IN_OUT, (progress) => {
                    this.container.getHTMLElement().style.transform = info.type + "(" + progress + info.unit + ")";
                }, [this.container], info.beginValue, info.endValue);
                transition.addPreAction(() => {
                    this.state = JUIOverlayState.TRANSITIONING;
                    this.container.getHTMLElement().style.transform = (info.type + "(" + info.beginValue + info.unit + ")");
                    document.body.appendChild(this.container.getHTMLElement());
                });
                transition.addPostAction(() => {
                    this.container.getHTMLElement().style.transform = "";
                    document.body.removeChild(this.container.getHTMLElement());
                    this.state = JUIOverlayState.HIDDEN;
                });
                yield transition.play();
            }
        });
    }
    scheduleHide(milliseconds, hoverTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                hoverTimeout = (hoverTimeout !== undefined ? hoverTimeout : (milliseconds / 2));
                let leaveSubscription;
                let enterSubscription;
                setTimeout(() => {
                    if (this.isMouseHovering) {
                        let timeoutID;
                        leaveSubscription = this.container.getEventManager().ELEMENT_MOUSE_LEAVE.subscribe(() => {
                            if (timeoutID !== undefined)
                                clearTimeout(timeoutID);
                            timeoutID = setTimeout(() => {
                                leaveSubscription.unsubscribe();
                                enterSubscription.unsubscribe();
                                this.hide().then(() => resolve());
                            }, hoverTimeout);
                        });
                        enterSubscription = this.container.getEventManager().ELEMENT_MOUSE_ENTER.subscribe(() => {
                            if (timeoutID !== undefined)
                                clearTimeout(timeoutID);
                        });
                    }
                    else
                        this.hide().then(() => resolve());
                }, milliseconds);
            });
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state !== JUIOverlayState.DESTROYED) {
                this.state = JUIOverlayState.DESTROYED;
                this.container.orphan();
                this.container = undefined;
            }
        });
    }
}
export default JUIOverlay;
//# sourceMappingURL=jui-overlay.js.map