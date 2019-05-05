/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:40 PM -- April 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIMultiContainer from "../jui-multi-container.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIGridContainer extends JUIMultiContainer {
    constructor(containerType) {
        super(containerType);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-grid-container";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUIGridContainer;
//# sourceMappingURL=jui-grid-container.js.map