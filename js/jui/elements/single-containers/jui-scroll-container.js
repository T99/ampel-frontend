/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:30 AM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUISingleContainer from "../jui-single-container.js";
/**
 * A container that scrolls over the content of a singular child.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIScrollContainer extends JUISingleContainer {
    // DOC-ME [12/8/18 @ 3:44 PM] - Documentation required!
    constructor(scrollY, scrollX, containerType) {
        super(containerType);
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-scroll-container";
        this.scrollX = true;
        this.scrollY = false;
        this.addClasses(this.TYPE_IDENTITY);
        if (scrollX !== undefined)
            this.scrollX = scrollX;
        if (scrollY !== undefined)
            this.scrollY = scrollY;
        if (this.scrollX)
            this.addClasses("scroll-x");
        if (this.scrollY)
            this.addClasses("scroll-y");
    }
}
export default JUIScrollContainer;
//# sourceMappingURL=jui-scroll-container.js.map