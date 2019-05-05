/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:38 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIWobbleOutTransitionFunction {
    constructor(wobbles) {
        this.func = (point) => {
            return (point - 1) * Math.sin(2 * wobbles * Math.PI * point);
        };
    }
    getFunction() {
        return this.func;
    }
    evaluateAtPoint(point) {
        return this.func(point);
    }
}
export default JUIWobbleOutTransitionFunction;
//# sourceMappingURL=jui-wobble-out-transition-function.js.map