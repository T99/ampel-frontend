/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:15 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIColor from "./jui-color.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUINamedColor extends JUIColor {
    constructor(cssString) {
        super();
        this.cssString = cssString;
    }
    getCSSString() {
        return this.cssString;
    }
}
JUINamedColor.BLACK = new JUINamedColor("rgba(0, 0, 0, 1)");
JUINamedColor.WHITE = new JUINamedColor("rgba(255, 255, 255, 1)");
JUINamedColor.TRANSPARENT = new JUINamedColor("rgba(0, 0, 0, 0)");
JUINamedColor.RED = new JUINamedColor("rgba(255, 0, 0, 1)");
JUINamedColor.GREEN = new JUINamedColor("rgba(0, 255, 0, 1)");
JUINamedColor.BLUE = new JUINamedColor("rgba(0, 0, 255, 1)");
JUINamedColor.YELLOW = new JUINamedColor("rgba(255, 255, 0, 1)");
JUINamedColor.CYAN = new JUINamedColor("rgba(0, 255, 255, 1)");
export default JUINamedColor;
//# sourceMappingURL=jui-named-color.js.map