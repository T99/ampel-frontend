/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:21 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIContainerType from "./types/jui-container-type.js";
import JUIAlignmentContainer from "./elements/single-containers/jui-alignment-container.js";
import JUIAlignment from "./descriptors/jui-alignment.js";
/**
 * One full-viewport page within the {@link JUIWorld}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIPage extends JUIAlignmentContainer {
    constructor(alignment = JUIAlignment.CENTER) {
        super(alignment, JUIContainerType.DIV);
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-page";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUIPage;
//# sourceMappingURL=jui-page.js.map