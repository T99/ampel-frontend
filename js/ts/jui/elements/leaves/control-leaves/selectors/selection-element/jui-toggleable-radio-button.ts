/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:30 PM -- May 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIToggleableElement } from "./jui-toggleable-element.js";
import JUIColor from "../../../../../descriptors/colors/jui-color.js";
import { JUIElement } from "../../../../jui-element.js";
import JUIAlignmentContainer from "../../../../containers/single-containers/jui-alignment-container.js";
import JUIAlignment from "../../../../../descriptors/jui-alignment.js";
import JUIContainerType from "../../../../../types/element-types/jui-container-type.js";

/**
 * A toggleable radio button element.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIToggleableRadioButton extends JUIToggleableElement<HTMLElement, JUIAlignmentContainer<JUIElement>> {
	
	public readonly TYPE_IDENTITY: string = "jui-toggleable-radio-button";
	
	private readonly onActiveElement: JUIElement<HTMLElement>;
	
	public constructor(initialState: boolean = false) {
		
		super(new JUIAlignmentContainer<JUIElement>(JUIAlignment.CENTER));
		this.addClasses(this.TYPE_IDENTITY);
		
		this.onActiveElement = new JUIElement<HTMLElement>(JUIContainerType.DIV);
		this.onActiveElement.addClasses(JUIToggleableElement.INNER_ACTIVE_STATE_ELEMENT_CLASS);
		this.getModuleElement().setChild(this.onActiveElement);
		
		this.setState(initialState);
		
	}
	
	public setState(state: boolean): void {
		
		if (state) this.onActiveElement.addClasses(JUIToggleableElement.ACTIVE_STATE_CLASS);
		else this.onActiveElement.removeClasses(JUIToggleableElement.ACTIVE_STATE_CLASS);
		
	}
	
	public getState(): boolean {
		
		return this.onActiveElement.hasClass(JUIToggleableElement.ACTIVE_STATE_CLASS);
		
	}
	
	public setBackgroundColor(color: JUIColor): void {
		
		this.getModuleElement().getElement().style.backgroundColor = color.getCSSString();
		
	}
	
	public setCheckmarkColor(color: JUIColor): void {
		
		this.onActiveElement.getElement().style.borderBottomColor = color.getCSSString();
		this.onActiveElement.getElement().style.borderRightColor = color.getCSSString();
		
	}
	
}

export default JUIToggleableRadioButton;