/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIElement } from "../../jui-element.js";
import JUITextLeafType from "../../../types/element-types/content-leaves/jui-text-leaf-type.js";
import JUINotifier from "../../../action/jui-notifier.js";

/**
 * A {@link JUIElement} that displays text.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class JUITextLeaf extends JUIElement<HTMLElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-text-leaf";
	
	protected readonly events: JUITextLeaf.JUITextLeafEvents;
	
	// DOC-ME [12/14/18 @ 9:52 AM] - Documentation required!
	public constructor(content: string, textType: JUITextLeafType = JUITextLeafType.P) {
		
		super(textType);
		this.addClasses(this.TYPE_IDENTITY);
		this.events = new JUITextLeaf.JUITextLeafEvents(this);
		
		this.setText(content);
		
	}
	
	// DOC-ME [12/14/18 @ 9:52 AM] - Documentation required!
	public setText(content: string): string {
		
		let displaced: string = this.getText();
		this.getElement().innerText = content;
		this.getEventManager().ELEMENT_TEXT_CHANGED.notify(content);
		return displaced;
		
	}
	
	// DOC-ME [12/22/18 @ 4:07 PM] - Documentation required!
	public getText(): string {
		
		return this.getElement().innerText;
		
	}
	
	public getEventManager(): JUITextLeaf.JUITextLeafEvents {
		
		return this.events;
		
	}
	
}

export namespace JUITextLeaf {
	
	export class JUITextLeafEvents extends JUIElement.JUIElementEvents {
	
		public readonly ELEMENT_TEXT_CHANGED: JUINotifier<string>;
		
		public constructor(element: JUITextLeaf) {
			
			super(element);
			
			this.ELEMENT_TEXT_CHANGED = new JUINotifier<string>();
			
		}
	
	}
	
}