/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:39 AM -- May 19th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIInputMask from "../../../../input-masks/jui-input-mask.js";
import JUIStackContainer from "../../../containers/multi-containers/jui-stack-container.js";
import JUIAlignment from "../../../../descriptors/jui-alignment.js";
import { JUIElement } from "../../../jui-element.js";
import JUIControlLeafType from "../../../../types/element-types/control-leaves/jui-control-leaf-type.js";
import JUINotifier from "../../../../action/jui-notifier.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export abstract class JUIEditableTextLeaf extends JUIElement<HTMLElement> {
	
	private wrapper: JUIStackContainer;
	
	protected readonly events: JUIEditableTextLeaf.JUIEditableTextLeafEvents;
	
	protected constructor(controlLeafType: JUIControlLeafType) {
	
		super(controlLeafType);
		
		this.wrapper = new JUIStackContainer(JUIAlignment.CENTER);
		this.events = new JUIEditableTextLeaf.JUIEditableTextLeafEvents(this);
	
	}
	
	protected getWrapper(): JUIStackContainer {
		
		return this.wrapper;
		
	}
	
	public abstract getContent(): string;
	
	public abstract setContent(content: string): string;
	
	public abstract applyInputMask(mask: JUIInputMask): void;
	
	public abstract hasInputMask(): boolean;
	
	public abstract removeInputMask(): void;
	
	protected abstract getEditingNotifier(): JUINotifier<string>;
	
	public getEventManager(): JUIEditableTextLeaf.JUIEditableTextLeafEvents {

		return this.events;

	}
	
}

export namespace JUIEditableTextLeaf {

	export class JUIEditableTextLeafEvents extends JUIElement.JUIElementEvents {

		public readonly ELEMENT_TEXT_EDITED: JUINotifier<string>;

		public constructor(element: JUIEditableTextLeaf) {

			super(element);

			this.ELEMENT_TEXT_EDITED = null;

		}

	}

}