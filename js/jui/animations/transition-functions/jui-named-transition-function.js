/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:22 PM -- February 03rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Enumerates standard/common transition functions.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUINamedTransitionFunction {
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
/**
 *     |            .
 *     |          .
 *     |        .
 * pos |      .
 *     |    .
 *     |  .
 *     |.
 *     +--------------
 *          time
 *
 * @type {JUINamedTransitionFunction}
 */
JUINamedTransitionFunction.LINEAR = new JUINamedTransitionFunction((point) => {
    return point;
});
/**
 *     |            .
 *     |         .
 *     |       .
 * pos |      .
 *     |     .
 *     |   .
 *     |.
 *     +--------------
 *          time
 *
 * @type {JUINamedTransitionFunction}
 */
JUINamedTransitionFunction.EASE_IN_OUT = new JUINamedTransitionFunction((point) => {
    let numerator = 1;
    /*
     * If there is need to adjust the rate at which the easing occurs, k is the variable to change.
     * Recommended range is {10 <= k <= 20}.
     */
    let k = 15;
    let power = -k * (point - 0.5);
    let denominator = 1 + Math.pow(Math.E, power);
    return (numerator / denominator);
});
/**
 *     |            .
 *     |            .
 *     |            .
 * pos |           .
 *     |         .
 *     |     .
 *     |.
 *     +--------------
 *          time
 *
 * @type {JUINamedTransitionFunction}
 */
JUINamedTransitionFunction.EASE_IN = new JUINamedTransitionFunction((point) => {
    /*
     * If there is need to adjust the rate at which the easing occurs, r is the variable to change.
     * Recommended range is {1.5 <= r <= 4}.
     */
    let r = 2;
    let numerator = Math.pow(point, r);
    let power = r - 1;
    let denominator = Math.pow(1, power);
    return (numerator / denominator);
});
/**
 *     |            .
 *     |       .
 *     |    .
 * pos |  .
 *     | .
 *     |.
 *     |.
 *     +--------------
 *          time
 *
 * @type {JUINamedTransitionFunction}
 */
JUINamedTransitionFunction.EASE_OUT = new JUINamedTransitionFunction((point) => {
    /*
     * If there is need to adjust the rate at which the easing occurs, r is the variable to change.
     * Recommended range is {1.5 <= r <= 2}.
     */
    let r = 2;
    let numerator = Math.pow(point, r);
    let power = r - 1;
    let denominator = Math.pow(1, power);
    return (2 * point) - (numerator / denominator);
});
/**
 *     | .   .   .
 *     |
 *     |
 * pos |. . . . . . .
 *     |
 *     |
 *     |   .   .   .
 *     +--------------
 *          time
 *
 * @type {JUINamedTransitionFunction}
 */
JUINamedTransitionFunction.WOBBLE = new JUINamedTransitionFunction((point) => {
    return Math.sin(6 * Math.PI * point);
});
export default JUINamedTransitionFunction;
//# sourceMappingURL=jui-named-transition-function.js.map