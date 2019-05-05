/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:55 PM -- February 03rd, 2019.
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
import JUINamedTransitionFunction from "./transition-functions/jui-named-transition-function.js";
import TSActionQueue from "../../structures/implementations/queue/ts-action-queue.js";
/**
 * Represents an asynchronous graphical transition.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITransition {
    constructor(duration, transitionFunction, transitionAction, elements, startValue, endValue) {
        this.transitionElements = [];
        this.preActionQueue = new TSActionQueue();
        this.postActionQueue = new TSActionQueue();
        this.transitionPromise = new Promise((resolve) => {
            this.resolveTransitionPromise = resolve;
        });
        this.currentMillisecondCount = 0;
        this.duration = duration;
        this.transitionFunction = transitionFunction;
        this.transitionAction = transitionAction;
        if (elements !== undefined)
            this.transitionElements.push(...elements);
        if ((startValue !== undefined) && (endValue !== undefined)) {
            this.startValue = startValue;
            this.endValue = endValue;
        }
        else {
            this.startValue = 0;
            this.endValue = 1;
        }
        // console.log("Created new " + (this.startValue < this.endValue ? "forward" : "reverse") + " transition with " +
        // 	(this.duration / 1000) + "s duration, transitioning from " + this.startValue + " to " + this.endValue +
        // 	" on a " + JUITransition.TIMING_INCREMENT + "ms increment.");
    }
    static getZeroLengthTransition() {
        let transition = new JUITransition(0, JUINamedTransitionFunction.LINEAR, (progress) => null, [], 0, 0);
        transition.transitionPromise = Promise.resolve();
        return transition;
    }
    getLocks() {
        return __awaiter(this, void 0, void 0, function* () {
            let lockPromises = this.transitionElements.map((element) => element.getTransitionLock());
            return Promise.all(lockPromises);
        });
    }
    relinquishLocks() {
        if (this.elementLocks !== undefined)
            this.elementLocks.forEach((lock) => { lock.relinquish(); });
    }
    addPreAction(action) {
        this.preActionQueue.enqueue(action);
    }
    addPostAction(action) {
        this.postActionQueue.enqueue(action);
    }
    getProgress() {
        if (this.duration === 0)
            return 1;
        else
            return (this.currentMillisecondCount / this.duration);
    }
    getTransitionPromise() {
        return this.transitionPromise;
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.intervalID === undefined) {
                this.elementLocks = yield this.getLocks();
                this.preActionQueue.executeAll();
                this.intervalID = setInterval(() => {
                    this.currentMillisecondCount += JUITransition.TIMING_INCREMENT;
                    if (this.currentMillisecondCount >= this.duration) {
                        clearInterval(this.intervalID);
                        this.intervalID = undefined;
                        this.transitionAction(this.endValue);
                        this.postActionQueue.executeAll();
                        this.relinquishLocks();
                        if (this.resolveTransitionPromise !== undefined)
                            this.resolveTransitionPromise();
                    }
                    else {
                        let functionResult = this.transitionFunction.evaluateAtPoint(this.getProgress());
                        if (this.startValue < this.endValue)
                            this.transitionAction(this.startValue + (functionResult * (this.endValue - this.startValue)));
                        else if (this.startValue === this.endValue)
                            this.transitionAction(this.startValue + functionResult);
                        else
                            this.transitionAction(this.startValue - (functionResult * (this.startValue - this.endValue)));
                    }
                }, JUITransition.TIMING_INCREMENT);
            }
            return this.transitionPromise;
        });
    }
    pause() {
        if (this.intervalID !== undefined) {
            clearInterval(this.intervalID);
            this.intervalID = undefined;
        }
        return this.transitionPromise;
    }
    isPaused() {
        return (this.intervalID === undefined);
    }
    reset() {
        if (this.intervalID !== undefined) {
            clearInterval(this.intervalID);
            this.intervalID = undefined;
        }
        this.currentMillisecondCount = 0;
        this.transitionPromise = new Promise((resolve) => {
            this.resolveTransitionPromise = resolve;
        });
        this.transitionAction(this.startValue);
        return this.play();
    }
    resetPaused() {
        if (this.intervalID !== undefined) {
            clearInterval(this.intervalID);
            this.intervalID = undefined;
        }
        this.currentMillisecondCount = 0;
        this.transitionPromise = new Promise((resolve) => {
            this.resolveTransitionPromise = resolve;
        });
        this.transitionAction(this.startValue);
        return this.transitionPromise;
    }
}
JUITransition.TIMING_INCREMENT = 25;
export default JUITransition;
//# sourceMappingURL=jui-transition.js.map