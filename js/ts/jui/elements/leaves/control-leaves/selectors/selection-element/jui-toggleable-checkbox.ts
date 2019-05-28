/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:01 PM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIElement } from "../../../../jui-element.js";
import JUIAlignment from "../../../../../descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../../../../containers/single-containers/jui-alignment-container.js";
import JUIContainerType from "../../../../../types/element-types/jui-container-type.js";
import JUIColor from "../../../../../descriptors/colors/jui-color.js";
import { JUIToggleableElement } from "./jui-toggleable-element.js";

/**
 * A toggleable checkbox element.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIToggleableCheckbox extends JUIToggleableElement<HTMLElement, JUIAlignmentContainer<JUIElement>> {
	
	public readonly TYPE_IDENTITY: string = "jui-toggleable-checkbox";
	
	private readonly checkmarkElement: JUIElement<HTMLElement>;
	
	public constructor(initialState: boolean = false) {
	
		super(new JUIAlignmentContainer<JUIElement>(JUIAlignment.CENTER));
		this.addClasses(this.TYPE_IDENTITY);
		
		this.checkmarkElement = new JUIElement<HTMLElement>(JUIContainerType.DIV);
		this.checkmarkElement.addClasses(JUIToggleableElement.INNER_ACTIVE_STATE_ELEMENT_CLASS);
		this.getModuleElement().setChild(this.checkmarkElement);
		
		this.setState(initialState);
	
	}
	
	public setState(state: boolean): void {
	
		if (state) this.checkmarkElement.addClasses(JUIToggleableElement.ACTIVE_STATE_CLASS);
		else this.checkmarkElement.removeClasses(JUIToggleableElement.ACTIVE_STATE_CLASS);
	
	}
	
	public getState(): boolean {
		
		return this.checkmarkElement.hasClass(JUIToggleableElement.ACTIVE_STATE_CLASS);
		
	}
	
	public setBackgroundColor(color: JUIColor): void {
		
		this.getModuleElement().getElement().style.backgroundColor = color.getCSSString();
		
	}
	
	public setCheckmarkColor(color: JUIColor): void {
		
		this.checkmarkElement.getElement().style.borderBottomColor = color.getCSSString();
		this.checkmarkElement.getElement().style.borderRightColor = color.getCSSString();
		
	}
	
}

export default JUIToggleableCheckbox;