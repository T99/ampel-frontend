/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:36 PM -- April 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUINotifier from "../../jui/action/jui-notifier.js";
import JUIModule from "../../jui/jui-module.js";
import AUISplashContainer from "./aui-splash-container.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import AUIButton from "../global/aui-button.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import AUIUserActivity from "../global/aui-user-activity.js";
import AUITextLabel from "../global/aui-text-label.js";
import JUITextLeafType from "../../jui/types/leaves/content-leaves/jui-text-leaf-type.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIActivitySelectorModule extends JUIModule {
    constructor() {
        super(new AUISplashContainer());
        this.selectionNotifier = new JUINotifier();
        this.backButtonNotifier = new JUINotifier();
        this.element.addClasses("aui-activity-selector-module");
        let headerText = new AUITextLabel("What would you like to do?", JUITextLeafType.H4);
        let kioskButton = new AUIButton("Pure Kiosk");
        let ccButton = new AUIButton("Pure Contact Capture");
        let ccKioskButton = new AUIButton("Contact Capture then Kiosk");
        let kioskCCButton = new AUIButton("Kiosk then Contact Capture");
        for (let button of [kioskButton, ccButton, ccKioskButton, kioskCCButton])
            button.addClasses("activity-button");
        kioskButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.selectionNotifier.notify(AUIUserActivity.KIOSK));
        ccButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.selectionNotifier.notify(AUIUserActivity.CONTACT_CAPTURE));
        ccKioskButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.selectionNotifier.notify(AUIUserActivity.CONTACT_CAPTURE_THEN_KIOSK));
        kioskCCButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.selectionNotifier.notify(AUIUserActivity.KIOSK_THEN_CONTACT_CAPTURE));
        let buttonContainer = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
        buttonContainer.addClasses("aui-activity-selector-button-container");
        let backButton = new AUIButton("Back");
        let selectionButton = new AUIButton("Go");
        backButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.backButtonNotifier.notify());
        selectionButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.selectionNotifier.notify(AUIUserActivity.KIOSK));
        buttonContainer.addChildren(backButton, selectionButton);
        this.element.addChildren(headerText, kioskButton, ccButton, ccKioskButton, kioskCCButton, buttonContainer);
    }
    subscribeToSelectionNotifier(handler) {
        return this.selectionNotifier.subscribe(handler);
    }
    subscribeToBackButtonNotifier(handler) {
        return this.backButtonNotifier.subscribe(handler);
    }
}
export default AUIActivitySelectorModule;
//# sourceMappingURL=aui-activity-selector-module.js.map