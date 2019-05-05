/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:28 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFQuestionType from "../../../../../af-structures/descriptors/af-question-type.js";
import JUIFlowContainer from "../../../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../../jui/descriptors/jui-alignment.js";
import JUIFlexWrappingRule from "../../../../../jui/descriptors/jui-flex-wrapping-rule.js";
import JUISingleSelectorLeaf from "../../../../../jui/elements/leaves/control-leaves/selectors/single-selectors/jui-single-selector-leaf.js";
import JUICheckboxSingleSelectorLeaf from "../../../../../jui/elements/leaves/control-leaves/selectors/single-selectors/jui-checkbox-single-selector-leaf.js";
import JUIRadioSingleSelectorLeaf from "../../../../../jui/elements/leaves/control-leaves/selectors/single-selectors/jui-radio-single-selector-leaf.js";
import AUITextLabel from "../../../../global/aui-text-label.js";

/**
 * A checkbox or radio button box containing a piece of text.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISelectableBox extends JUIFlowContainer {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-selectable-box";
	
	private textElement: AUITextLabel;
	private responseID: string;
	private selectable: JUISingleSelectorLeaf;
	
	public constructor(text: string, responseID: string, type: AFQuestionType) {
		
		super(JUIDirection.TO_RIGHT, JUIAlignment.CENTER, JUIFlexWrappingRule.NO_WRAP);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.setFocusability(true);
		
		this.responseID = responseID;
		
		this.textElement = new AUITextLabel(text);
		
		if (type === AFQuestionType.SELECT_ALL_THAT_APPLY) this.selectable = new JUICheckboxSingleSelectorLeaf();
		else if (type === AFQuestionType.MULTIPLE_CHOICE) this.selectable = new JUIRadioSingleSelectorLeaf();
		else throw new TypeError("Attempted to create an AUISelectableBox for a invalid question type.");
		
		this.addChildren(this.textElement, this.selectable);
		
	}
	
	public getResponseID(): string {
		
		return this.responseID;
		
	}
	
	public getText(): string {
		
		return this.textElement.getText();
		
	}
	
	public setText(text: string): string {
		
		return this.textElement.setText(text);
		
	}
	
	public isSelected(): boolean {
		
		return this.selectable.isSelected();
		
	}
	
	public setSelected(isSelected: boolean): boolean {
		
		return this.selectable.setSelected(isSelected);
		
	}
	
}

export default AUISelectableBox;