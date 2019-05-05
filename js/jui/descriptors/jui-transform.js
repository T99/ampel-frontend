/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:31 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITransform {
    constructor(cssString) {
        this.cssString = cssString;
    }
    static scale(xFactor, yFactor) {
        return new JUITransform("scale(" + xFactor + ", " + yFactor + ")");
    }
    static scaleX(factor) {
        return new JUITransform("scaleX(" + factor + ")");
    }
    static scaleY(factor) {
        return new JUITransform("scaleY(" + factor + ")");
    }
    static scaleZ(factor) {
        return new JUITransform("scaleZ(" + factor + ")");
    }
    static translate(xValue, xUnit, yValue, yUnit) {
        return new JUITransform("translate(" + xValue + xUnit.toString() + ", " + yValue + yUnit.toString() + ")");
    }
    static translateX(value, unit) {
        return new JUITransform("translateX(" + value + unit.toString() + ")");
    }
    static translateY(value, unit) {
        return new JUITransform("translateY(" + value + unit.toString() + ")");
    }
    static translateZ(value, unit) {
        return new JUITransform("translateZ(" + value + unit.toString() + ")");
    }
    getCSSString() {
        return this.cssString;
    }
}
export default JUITransform;
//# sourceMappingURL=jui-transform.js.map