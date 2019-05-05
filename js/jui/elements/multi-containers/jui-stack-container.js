/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:54 AM -- March 24th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIMultiContainer from "../jui-multi-container.js";
import JUIAlignmentContainer from "../single-containers/jui-alignment-container.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIStackContainer extends JUIMultiContainer {
    // DOC-ME [12/8/18 @ 3:44 PM] - Documentation required!
    constructor(alignment, containerType) {
        super(containerType);
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-stack-container";
        this.alignment = alignment;
        this.addClasses(this.TYPE_IDENTITY, alignment.toString());
    }
    addStackedChild(child) {
        let alignmentContainer = new JUIAlignmentContainer(this.alignment);
        alignmentContainer.setChild(child);
        this.addChild(alignmentContainer);
    }
}
export default JUIStackContainer;
//# sourceMappingURL=jui-stack-container.js.map