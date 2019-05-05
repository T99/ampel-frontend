/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:16 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIWobbleTransitionFunction {
    constructor(wobbles) {
        this.func = (point) => {
            return Math.sin(2 * wobbles * Math.PI * point);
        };
    }
    getFunction() {
        return this.func;
    }
    evaluateAtPoint(point) {
        return this.func(point);
    }
}
export default JUIWobbleTransitionFunction;
//# sourceMappingURL=jui-wobble-transition-function.js.map