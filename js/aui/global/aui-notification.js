/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:02 PM -- November 08th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
// DOC-ME [12/8/18 @ 4:51 PM] - Documentation required!
import JUIOverlay from "../../jui/overlays/jui-overlay.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import AUITextLabel from "./aui-text-label.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
class AUINotification extends JUIOverlay {
    constructor(content) {
        super(JUIAlignment.BOTTOM, JUIDirection.TO_BOTTOM);
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-notification";
        this.container.addClasses(this.TYPE_IDENTITY);
        this.innerContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
        this.textLabel = new AUITextLabel(content);
        this.innerContainer.addChildren(this.textLabel);
        this.container.setChild(this.innerContainer);
        let timeout = ((content.split(" ").length) * ((60 / AUINotification.AVERAGE_WORDS_PER_MINUTE) * 1000)) + AUINotification.VISUAL_ACQUISITION_TIME;
        this.show();
        this.scheduleHide(timeout);
    }
}
AUINotification.AVERAGE_WORDS_PER_MINUTE = 200;
AUINotification.VISUAL_ACQUISITION_TIME = 1000;
export default AUINotification;
//# sourceMappingURL=aui-notification.js.map