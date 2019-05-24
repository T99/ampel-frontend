/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:39 AM -- May 19th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIInputMask from "../../../../input-masks/jui-input-mask.js";
import JUIStackContainer from "../../../containers/multi-containers/jui-stack-container.js";
import JUIAlignment from "../../../../descriptors/jui-alignment.js";
import JUIElement from "../../../jui-element.js";
import JUIControlLeafType from "../../../../types/control-leaves/jui-control-leaf-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUIEditableTextLeaf extends JUIElement<HTMLElement> {
	
	private wrapper: JUIStackContainer;
	
	protected constructor(controlLeafType: JUIControlLeafType) {
	
		super(controlLeafType);
		
		this.wrapper = new JUIStackContainer(JUIAlignment.CENTER);
	
	}
	
	protected getWrapper(): JUIStackContainer {
		
		return this.wrapper;
		
	}
	
	public abstract getContent(): string;
	
	public abstract setContent(content: string): string;
	
	public abstract applyInputMask(mask: JUIInputMask): void;
	
	public abstract hasInputMask(): boolean;
	
	public abstract removeInputMask(): void;
	
}

export default JUIEditableTextLeaf;