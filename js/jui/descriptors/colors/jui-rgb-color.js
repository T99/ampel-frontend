/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:25 AM -- December 13th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIColor from "./jui-color.js";
/**
 * Represents an color within the RGB color scheme.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIRGBColor extends JUIColor {
    /**
     * Initializes a new RGB-type color, given the three required color components.
     *
     * @param {number} red The red value of the color.
     * @param {number} green The green value of the color.
     * @param {number} blue The blue value of the color.
     */
    constructor(red, green, blue) {
        super();
        JUIColor.rangeCheck("red value", red, 0, 255);
        JUIColor.rangeCheck("green value", green, 0, 255);
        JUIColor.rangeCheck("blue value", blue, 0, 255);
        this.red = red;
        this.green = green;
        this.blue = blue;
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
    /**
     * Returns a valid CSS color value-string.
     */
    getCSSString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
}
export default JUIRGBColor;
//# sourceMappingURL=jui-rgb-color.js.map