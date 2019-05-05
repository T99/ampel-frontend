/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:30 PM -- November 02nd, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIOverlay from "./jui-overlay.js";
// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
class JUIModal extends JUIOverlay {
    // DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
    constructor(height, width, headerText, alignment, direction) {
        super(alignment, direction);
        this.titleText = headerText;
    }
}
export default JUIModal;
//# sourceMappingURL=jui-modal.js.map