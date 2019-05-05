/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:28 AM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * A custom transition function.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUICustomTransitionFunction {
    constructor(transitionFunction) {
        this.transitionFunction = transitionFunction;
    }
    getFunction() {
        return this.transitionFunction;
    }
    evaluateAtPoint(point) {
        return this.transitionFunction(point);
    }
}
export default JUICustomTransitionFunction;
//# sourceMappingURL=jui-custom-transition-function.js.map