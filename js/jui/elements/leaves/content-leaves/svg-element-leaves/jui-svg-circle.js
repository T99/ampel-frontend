/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:12 PM -- January 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUISVGGeometry from "./jui-svg-geometry.js";
import JUISVGGeometryType from "../../../../types/leaves/content-leaves/jui-svg-geometry-type.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISVGCircle extends JUISVGGeometry {
    constructor(radius, xOrigin, yOrigin) {
        super(JUISVGGeometryType.CIRCLE);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-svg-circle";
        this.addClasses(this.TYPE_IDENTITY);
        this.setRadius(radius);
        this.setXOrigin(xOrigin);
        this.setYOrigin(yOrigin);
    }
    static createFromCenterPoint(diameter, xOrigin, yOrigin) {
        return new JUISVGCircle(diameter / 2, xOrigin, yOrigin);
    }
    setRadius(radius) {
        this.element.setAttribute("r", radius.toString());
    }
    setDiameter(diameter) {
        this.element.setAttribute("r", (diameter / 2).toString());
    }
    setXOrigin(xOrigin) {
        this.element.setAttribute("cx", xOrigin.toString());
    }
    setYOrigin(yOrigin) {
        this.element.setAttribute("cy", yOrigin.toString());
    }
    move(xDelta, yDelta) {
        return;
    }
    scale(factor, origin) {
        return;
    }
}
export default JUISVGCircle;
//# sourceMappingURL=jui-svg-circle.js.map