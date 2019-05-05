/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:36 PM -- April 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUINotifier from "../../jui/action/jui-notifier.js";
import JUIModule from "../../jui/jui-module.js";
import AUISplashContainer from "./aui-splash-container.js";
import JUIMouseEvent from "../../jui/action/events/jui-mouse-event.js";
import JUISubscription from "../../jui/action/jui-subscription.js";
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
class AUIActivitySelectorModule extends JUIModule<AUISplashContainer> {
	
	private selectionNotifier: JUINotifier<AUIUserActivity> = new JUINotifier<AUIUserActivity>();
	
	private backButtonNotifier: JUINotifier<void> = new JUINotifier<void>();
	
	public constructor() {
		
		super(new AUISplashContainer());
		
		this.element.addClasses("aui-activity-selector-module");
		
		let headerText: AUITextLabel = new AUITextLabel("What would you like to do?", JUITextLeafType.H4);
		
		let kioskButton: AUIButton = new AUIButton("Pure Kiosk");
		let ccButton: AUIButton = new AUIButton("Pure Contact Capture");
		let ccKioskButton: AUIButton = new AUIButton("Contact Capture then Kiosk");
		let kioskCCButton: AUIButton = new AUIButton("Kiosk then Contact Capture");
		
		for (let button of [kioskButton, ccButton, ccKioskButton, kioskCCButton]) button.addClasses("activity-button");
		
		kioskButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(
			(): any => this.selectionNotifier.notify(AUIUserActivity.KIOSK)
		);
		
		ccButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(
			(): any => this.selectionNotifier.notify(AUIUserActivity.CONTACT_CAPTURE)
		);
		
		ccKioskButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(
			(): any => this.selectionNotifier.notify(AUIUserActivity.CONTACT_CAPTURE_THEN_KIOSK)
		);
		
		kioskCCButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(
			(): any => this.selectionNotifier.notify(AUIUserActivity.KIOSK_THEN_CONTACT_CAPTURE)
		);
		
		let buttonContainer: JUIFlowContainer<AUIButton> = new JUIFlowContainer<AUIButton>(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		
		buttonContainer.addClasses("aui-activity-selector-button-container");
		
		let backButton: AUIButton = new AUIButton("Back");
		let selectionButton: AUIButton = new AUIButton("Go");
		
		backButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(
			(): any => this.backButtonNotifier.notify()
		);
		
		selectionButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(
			(): any => this.selectionNotifier.notify(AUIUserActivity.KIOSK)
		);
		
		buttonContainer.addChildren(backButton, selectionButton);
		
		this.element.addChildren(headerText, kioskButton, ccButton, ccKioskButton, kioskCCButton, buttonContainer);
		
	}
	
	public subscribeToSelectionNotifier(handler: (notification: AUIUserActivity) => any): JUISubscription<AUIUserActivity> {
		
		return this.selectionNotifier.subscribe(handler);
		
	}
	
	public subscribeToBackButtonNotifier(handler: () => any): JUISubscription<void> {
		
		return this.backButtonNotifier.subscribe(handler);
		
	}
	
}

export default AUIActivitySelectorModule;