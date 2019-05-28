/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:58 AM -- April 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUITextLabel from "../../global/aui-text-label.js";
import { JUIModule } from "../../../jui/jui-module.js";
import JUIFlowContainer from "../../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import { JUIRichTextField } from "../../../jui/elements/leaves/control-leaves/text/field/jui-rich-text-field.js";
import JUIInputType from "../../../jui/types/input-types/jui-input-type.js";
import JUITextualInputType from "../../../jui/types/input-types/jui-textual-input-type.js";

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
	
	public constructor(label: string, placeholderText?: string, validator?: (content: string) => boolean) {
	
		super(new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER));
		
		this.getModuleElement().addClasses(this.TYPE_IDENTITY);
		
		this.label = new AUITextLabel(label);
		this.input = new JUIRichTextField();
		
		if (placeholderText !== undefined) this.input.setPlaceholderText(placeholderText);
		if (validator !== undefined) {
			
			this.validator = validator;
			
			this.input.getElement().addEventListener("input", () => {
				
				if (this.validator(this.input.getContent())) this.input.removeClasses("invalid-content");
				else this.input.addClasses("invalid-content");
				
			});
			
		}
		
		this.getModuleElement().addChildren(this.label, this.input);
	
	}
	
	public getInputType(): JUIInputType {
		
		return this.input.getInputType();
		
	}
	
	public setInputType(type: JUITextualInputType): void {
		
		this.input.setInputType(type);
		
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