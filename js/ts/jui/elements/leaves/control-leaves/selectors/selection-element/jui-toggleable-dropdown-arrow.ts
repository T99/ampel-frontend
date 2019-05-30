/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:37 PM -- May 29th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIToggleableElement } from "./jui-toggleable-element.js";
import JUIAlignmentContainer from "../../../../containers/single-containers/jui-alignment-container.js";
import { JUIElement } from "../../../../jui-element.js";
import JUIAlignment from "../../../../../descriptors/jui-alignment.js";
import JUIContainerType from "../../../../../types/element-types/jui-container-type.js";
import JUIColor from "../../../../../descriptors/colors/jui-color.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIToggleableDropdownArrow extends JUIToggleableElement<HTMLElement, JUIAlignmentContainer<JUIElement>> {
	
	public readonly TYPE_IDENTITY: string = "jui-toggleable-dropdown-arrow";
	
	private readonly arrowElement: JUIElement<HTMLElement>;
	
	public constructor(initialState: boolean = false) {
		
		super(new JUIAlignmentContainer<JUIElement>(JUIAlignment.CENTER));
		this.addClasses(this.TYPE_IDENTITY);
		
		this.arrowElement = new JUIElement<HTMLElement>(JUIContainerType.DIV);
		this.arrowElement.addClasses(JUIToggleableElement.INNER_ACTIVE_STATE_ELEMENT_CLASS);
		this.getModuleElement().setChild(this.arrowElement);
		
		this.setState(initialState);
		
	}
	
	protected handleStateChange(state: boolean): void {
		
		if (state) this.arrowElement.addClasses(JUIToggleableElement.ACTIVE_STATE_CLASS);
		else this.arrowElement.removeClasses(JUIToggleableElement.ACTIVE_STATE_CLASS);
		
	}
	
	public getState(): boolean {
		
		return this.arrowElement.hasClass(JUIToggleableElement.ACTIVE_STATE_CLASS);
		
	}
	
	public setBackgroundColor(color: JUIColor): void {
		
		this.getModuleElement().getElement().style.backgroundColor = color.getCSSString();
		
	}
	
	public setArrowColor(color: JUIColor): void {
		
		this.arrowElement.getElement().style.borderTopColor = color.getCSSString();
		
	}
	
}

export default JUIToggleableDropdownArrow;