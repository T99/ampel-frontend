/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:45 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import BuilderBase from "../../../../../../helpers/builder-base.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISVGGeometryBuilder extends BuilderBase {
    constructor() {
        super();
        this.addOptionals("strokeWidth", "strokeColor", "fillColor", "fillOpacity");
    }
    withStrokeWidth(strokeWidth) {
        this.fulfillRequirement("strokeWidth", strokeWidth);
        return this;
    }
    withStrokeColor(strokeColor) {
        this.fulfillRequirement("strokeColor", strokeColor);
        return this;
    }
    withFillColor(fillColor) {
        this.fulfillRequirement("fillColor", fillColor);
        return this;
    }
    withFillOpacity(fillOpacity) {
        this.fulfillRequirement("fillOpacity", fillOpacity);
        return this;
    }
}
export default JUISVGGeometryBuilder;
//# sourceMappingURL=jui-svg-geometry-builder.js.map