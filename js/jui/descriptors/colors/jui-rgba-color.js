/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:45 PM -- January 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIColor from "./jui-color.js";
/**
 * Represents a color within the RGBA color spectrum.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIRGBAColor extends JUIColor {
    /**
     * Initializes a new RGBA-type color, given the three required color components and potentially one optional
     * component (alpha).
     *
     * @param {number} red The red value of the color.
     * @param {number} green The green value of the color.
     * @param {number} blue The blue value of the color.
     * @param {number} alpha The alpha value of the color.
     */
    constructor(red, green, blue, alpha) {
        super();
        this.setRedValue(red);
        this.setGreenValue(green);
        this.setBlueValue(blue);
        this.setAlphaValue((alpha ? alpha : 1));
    }
    getRedValue() {
        return this.red;
    }
    setRedValue(value) {
        JUIColor.rangeCheck("red value", value, 0, 255);
        this.red = value;
    }
    getGreenValue() {
        return this.green;
    }
    setGreenValue(value) {
        JUIColor.rangeCheck("green value", value, 0, 255);
        this.green = value;
    }
    getBlueValue() {
        return this.blue;
    }
    setBlueValue(value) {
        JUIColor.rangeCheck("blue value", value, 0, 255);
        this.blue = value;
    }
    getAlphaValue() {
        return this.alpha;
    }
    setAlphaValue(value) {
        JUIColor.rangeCheck("alpha value", value, 0, 1);
        this.alpha = value;
    }
    /**
     * Returns a valid CSS color value-string.
     */
    getCSSString() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
}
export default JUIRGBAColor;
//# sourceMappingURL=jui-rgba-color.js.map