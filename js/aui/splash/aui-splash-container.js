/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:22 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import JUIContainerType from "../../jui/types/jui-container-type.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIFlexWrappingRule from "../../jui/descriptors/jui-flex-wrapping-rule.js";
/**
 * A standard content container for AUI.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISplashContainer extends JUIFlowContainer {
    // DOC-ME [12/16/18 @ 7:23 PM] - Documentation required!
    constructor() {
        super(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER, JUIFlexWrappingRule.NO_WRAP, JUIContainerType.DIV);
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-splash-container";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default AUISplashContainer;
//# sourceMappingURL=aui-splash-container.js.map