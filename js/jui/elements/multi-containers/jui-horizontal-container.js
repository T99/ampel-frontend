/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:58 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIMultiContainer from "../jui-multi-container.js";
// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
class JUIHorizontalContainer extends JUIMultiContainer {
    // DOC-ME [12/8/18 @ 4:53 PM] - Documentation required!
    constructor(containerType) {
        super(containerType);
        // DOC-ME [12/9/18 @ 2:31 AM] - Documentation required!
        this.TYPE_IDENTITY = "jui-horizontal-container";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUIHorizontalContainer;
//# sourceMappingURL=jui-horizontal-container.js.map