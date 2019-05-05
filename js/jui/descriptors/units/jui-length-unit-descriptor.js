/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:28 PM -- February 15th, 2019.
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
class JUILengthUnitDescriptor extends JUIUnitDescriptor {
    constructor(cssString) {
        super(cssString);
    }
}
/**
 * Relative to the length of the '0' character.
 */
JUILengthUnitDescriptor.CH = new JUILengthUnitDescriptor("ch");
/**
 * One metric centimeter.
 */
JUILengthUnitDescriptor.CM = new JUILengthUnitDescriptor("cm");
/**
 * Relative to the 'x-getHeight' of the current font.
 */
JUILengthUnitDescriptor.EM = new JUILengthUnitDescriptor("em");
/**
 * Relative to the 'x-getHeight' of the current font.
 */
JUILengthUnitDescriptor.EX = new JUILengthUnitDescriptor("ex");
/**
 * One imperial inch (96px).
 */
JUILengthUnitDescriptor.IN = new JUILengthUnitDescriptor("in");
/**
 * One metric millimeter.
 */
JUILengthUnitDescriptor.MM = new JUILengthUnitDescriptor("mm");
/**
 * One pica, where one pica is equivalent to your standard 12pt font.
 */
JUILengthUnitDescriptor.PC = new JUILengthUnitDescriptor("pc");
/**
 * Relative to the parent element.
 */
JUILengthUnitDescriptor.PERCENT = new JUILengthUnitDescriptor("%");
/**
 * One point, where one point is 1/96th of an inch.
 */
JUILengthUnitDescriptor.PT = new JUILengthUnitDescriptor("pt");
/**
 * One pixel.
 */
JUILengthUnitDescriptor.PX = new JUILengthUnitDescriptor("px");
/**
 * Relative to the font-size of the root element.
 */
JUILengthUnitDescriptor.REM = new JUILengthUnitDescriptor("rem");
/**
 * Relative to 1% of the getHeight of the viewport.
 */
JUILengthUnitDescriptor.VH = new JUILengthUnitDescriptor("vh");
/**
 * Relative to 1% of the viewport's larger dimension.
 */
JUILengthUnitDescriptor.VMAX = new JUILengthUnitDescriptor("vmax");
/**
 * Relative to 1% of the viewport's smaller dimension.
 */
JUILengthUnitDescriptor.VMIN = new JUILengthUnitDescriptor("vmin");
/**
 * Relative to 1% of the width of the viewport.
 */
JUILengthUnitDescriptor.VW = new JUILengthUnitDescriptor("vw");
export default JUILengthUnitDescriptor;
//# sourceMappingURL=jui-length-unit-descriptor.js.map