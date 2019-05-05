/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:24 PM -- December 03rd, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUISingleContainer from "../jui-single-container.js";
/**
 * A container that aligns a singular child within itself.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIAlignmentContainer extends JUISingleContainer {
    // DOC-ME [12/8/18 @ 3:44 PM] - Documentation required!
    constructor(alignment, containerType) {
        super(containerType);
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-alignment-container";
        this.alignment = alignment;
        this.addClasses(this.TYPE_IDENTITY, alignment.toString());
    }
    setAlignment(alignment) {
        this.removeClasses(this.alignment.toString());
        this.alignment = alignment;
        this.addClasses(this.alignment.toString());
    }
}
export default JUIAlignmentContainer;
//# sourceMappingURL=jui-alignment-container.js.map