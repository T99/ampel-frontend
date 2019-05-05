/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:16 PM -- January 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIContentLeaf from "../../jui-content-leaf.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISVGGeometry extends JUIContentLeaf {
    constructor(geometryType) {
        super(geometryType.toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-svg-geometry";
        this.addClasses(this.TYPE_IDENTITY);
    }
    setStrokeWidth(strokeWidth) {
        this.strokeWidth = strokeWidth;
        this.element.setAttribute("stroke-width", strokeWidth.toString());
    }
    setStrokeColor(strokeColor) {
        /*
         * TODO [1/23/19 @ 4:52 PM]
         * 	These properties should be bindable and talk with a JUI CSS system rather than directly with the stylesheet.
         */
        this.strokeColor = strokeColor;
        this.element.setAttribute("stroke", strokeColor.getCSSString());
    }
    setFillColor(fillColor) {
        this.fillColor = fillColor;
        this.element.setAttribute("fill", fillColor.getCSSString());
    }
    setFillOpacity(fillOpacity) {
        // TODO [1/26/19 @ 7:28 PM] - This should only ever be between 0 and 1 (0 <= x <= 1).
        this.fillOpacity = fillOpacity;
        this.element.setAttribute("fill-opacity", fillOpacity.toString());
    }
}
export default JUISVGGeometry;
//# sourceMappingURL=jui-svg-geometry.js.map