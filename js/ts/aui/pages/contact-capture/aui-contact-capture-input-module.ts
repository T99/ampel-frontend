/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:58 AM -- April 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUITextLabel from "../../global/aui-text-label.js";
import JUIRichTextField from "../../../jui/elements/leaves/control-leaves/text/jui-rich-text-field.js";
import { JUIModule } from "../../../jui/jui-module.js";
import JUIFlowContainer from "../../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIContactCaptureInputModule extends JUIModule<JUIFlowContainer, HTMLElement> {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-contact-capture-input-module";
	
	private label: AUITextLabel;
	private input: JUIRichTextField;
	private validator: (content: string) => boolean;
	
	public constructor(label: string, hint?: string, validator?: (content: string) => boolean) {
	
		super(new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER));
		
		this.getModuleElement().addClasses(this.TYPE_IDENTITY);
		
		this.label = new AUITextLabel(label);
		this.input = new JUIRichTextField();
		
		if (hint !== undefined) this.input.setHint(hint);
		if (validator !== undefined) {
			
			this.validator = validator;
			
			this.input.getElement().addEventListener("input", () => {
				
				if (this.validator(this.input.getContent())) this.input.removeClasses("invalid-content");
				else this.input.addClasses("invalid-content");
				
			});
			
		}
		
		this.getModuleElement().addChildren(this.label, this.input);
	
	}
	
	public setType(type: string): void {
		
		this.input.setType(type);
		
	}
	
	// public setInputMask(mask: JUIInputMask): void {
	//
	// 	this.input.applyInputMask(mask);
	//
	// }
	//
	// public hasInputMask(mask: JUIInputMask): boolean {
	//
	// 	return this.input.hasInputMask();
	//
	// }
	//
	// public removeInputMask(): void {
	//
	// 	this.input.removeInputMask();
	//
	// }
	
}

export default AUIContactCaptureInputModule;