/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:56 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIModule from "../../jui/jui-module.js";
import JUITextFieldLeaf from "../../jui/elements/leaves/control-leaves/jui-text-field-leaf.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUISVGLeaf from "../../jui/elements/leaves/content-leaves/jui-svg-leaf.js";
import JUIControlComponent from "../../jui/control/jui-control-component.js";
import AUITextInputEventManager from "./aui-text-input-event-manager.js";

/**
 * One complete Ampel-flavored text input module.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUITextInputModule extends JUIModule<JUIFlowContainer, HTMLElement> implements JUIControlComponent {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-text-input-module";
	
	private textField: JUITextFieldLeaf;
	
	private icon: JUISVGLeaf;
	
	private eventManager: AUITextInputEventManager;
	
	public constructor(hint: string, icon: JUISVGLeaf, isTextHidden?: boolean) {
		
		super(new JUIFlowContainer(JUIDirection.TO_LEFT, JUIAlignment.CENTER));
		
		this.textField = new JUITextFieldLeaf(isTextHidden);
		
		// Set up the text input.
		this.textField.setHint(hint);
		
		// Set the icon to the one we were passed.
		this.icon = icon;
		
		// Add the relevant class to the module.
		this.element.addClasses("aui-text-input-module");
		
		// Add the two children to the module.
		this.element.addChild(this.textField);
		this.element.addChild(this.icon);
		
		this.eventManager = new AUITextInputEventManager(this.textField);
		
	}
	
	public setTabIndex(tabIndex: number): void {
		
		this.textField.getHTMLElement().tabIndex = tabIndex;
		
	}
	
	public getEventManager(): AUITextInputEventManager {
		
		return this.eventManager;
		
	}
	
	public getComponentValue(): string {
		
		return this.textField.getComponentValue();
		
	}
	
}

export default AUITextInputModule;