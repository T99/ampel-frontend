/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:54 AM -- April 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIPage from "../../../jui/jui-page.js";
import AUIContactCaptureInputModule from "./aui-contact-capture-input-module.js";
import JUIFlowContainer from "../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import JUIGridContainer from "../../../jui/elements/multi-containers/jui-grid-container.js";
import AUITextLabel from "../../global/aui-text-label.js";
import JUITextLeafType from "../../../jui/types/leaves/content-leaves/jui-text-leaf-type.js";
import AUIButton from "../../global/aui-button.js";
import AUIKioskButton from "../kiosk-old/context-buttons/aui-kiosk-button.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIContactCapturePage extends JUIPage {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-contact-capture-page";
	
	private flowContainer: JUIFlowContainer;
	
	private headerText: AUITextLabel;
	
	private inputGridContainer: JUIGridContainer;
	
	private firstNameCapture: AUIContactCaptureInputModule;
	
	private lastNameCapture: AUIContactCaptureInputModule;
	
	private emailCapture: AUIContactCaptureInputModule;
	
	private phoneCapture: AUIContactCaptureInputModule;
	
	private submitButton: AUIKioskButton;
	
	public constructor() {
	
		super();
		this.addClasses(this.TYPE_IDENTITY);
		
		this.flowContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		
		this.headerText = new AUITextLabel("Want to receive updates about important new developments?", JUITextLeafType.H2);
		
		this.inputGridContainer = new JUIGridContainer();
		
		this.firstNameCapture = new AUIContactCaptureInputModule("First Name", "John");
		this.lastNameCapture = new AUIContactCaptureInputModule("Last Name", "Smith");
		this.emailCapture = new AUIContactCaptureInputModule("Email", "john@ampelfeedback.com");
		this.phoneCapture = new AUIContactCaptureInputModule("Phone", "(123) 456 - 7890");
		
		this.firstNameCapture.addClasses("cc-first-name");
		this.lastNameCapture.addClasses("cc-last-name");
		this.emailCapture.addClasses("cc-email");
		this.phoneCapture.addClasses("cc-phone");
		
		this.submitButton = new AUIKioskButton("Sign me up!");
		
		this.inputGridContainer.addChildren(this.firstNameCapture, this.lastNameCapture, this.emailCapture, this.phoneCapture);
		
		this.flowContainer.addChildren(this.headerText, this.inputGridContainer, this.submitButton);
		
		this.setChild(this.flowContainer);
	
	}
	
}

export default AUIContactCapturePage;