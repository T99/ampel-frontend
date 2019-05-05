/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:27 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIUnitDescriptor from "./jui-unit-descriptor.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIAngleUnitDescriptor extends JUIUnitDescriptor {
    constructor(cssString) {
        super(cssString);
    }
}
/**
 * One standard degree of rotation.
 */
JUIAngleUnitDescriptor.DEG = new JUIAngleUnitDescriptor("deg");
/**
 * One mathematical 'gradian', where a full circle is 400grad.
 */
JUIAngleUnitDescriptor.GRAD = new JUIAngleUnitDescriptor("grad");
/**
 * One mathematical 'radian', where a full circle is 2pi radians.
 */
JUIAngleUnitDescriptor.RAD = new JUIAngleUnitDescriptor("rad");
/**
 * One full turn, equal to 360deg.
 */
JUIAngleUnitDescriptor.TURN = new JUIAngleUnitDescriptor("turn");
export default JUIAngleUnitDescriptor;
//# sourceMappingURL=jui-angle-unit-descriptor.js.map