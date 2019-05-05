/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:13 PM -- March 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIPage from "../../../../jui/jui-page.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIStackContainer from "../../../../jui/elements/multi-containers/jui-stack-container.js";
import JUIImageLeaf from "../../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AUIKioskTextLabel from "./aui-kiosk-text-label.js";
import JUIWorld from "../../../../jui/jui-world.js";
import AUIKioskPage from "./aui-kiosk-page.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskThankYouPage extends JUIPage {
    constructor(nextFolder) {
        super();
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-kiosk-thank-you-page";
        this.addClasses(this.TYPE_IDENTITY);
        this.stackContainer = new JUIStackContainer(JUIAlignment.CENTER);
        this.stackContainer.addStackedChild(new JUIImageLeaf("/img/main-icon.png"));
        this.stackContainer.addStackedChild(new AUIKioskTextLabel("Thanks for helping!"));
        this.setChild(this.stackContainer);
        setTimeout(() => {
            JUIWorld.getInstance().goToPageRight(new AUIKioskPage(nextFolder));
        }, AUIKioskThankYouPage.TIMEOUT);
    }
}
AUIKioskThankYouPage.TIMEOUT = 5000;
export default AUIKioskThankYouPage;
//# sourceMappingURL=aui-kiosk-thank-you-page.js.map