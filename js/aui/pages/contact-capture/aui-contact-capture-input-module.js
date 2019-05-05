/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:58 AM -- April 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import AUITextLabel from "../../global/aui-text-label.js";
import JUITextFieldLeaf from "../../../jui/elements/leaves/control-leaves/jui-text-field-leaf.js";
import JUIModule from "../../../jui/jui-module.js";
import JUIFlowContainer from "../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIContactCaptureInputModule extends JUIModule {
    constructor(label, hint, validator) {
        super(new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER));
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-contact-capture-input-module";
        this.element.addClasses(this.TYPE_IDENTITY);
        this.label = new AUITextLabel(label);
        this.input = new JUITextFieldLeaf();
        if (hint !== undefined)
            this.input.setHint(hint);
        if (validator !== undefined) {
            this.validator = validator;
            this.input.getHTMLElement().addEventListener("input", () => {
                if (this.validator(this.input.getContent()))
                    this.input.removeClasses("invalid-content");
                else
                    this.input.addClasses("invalid-content");
            });
        }
        this.element.addChildren(this.label, this.input);
    }
}
export default AUIContactCaptureInputModule;
//# sourceMappingURL=aui-contact-capture-input-module.js.map