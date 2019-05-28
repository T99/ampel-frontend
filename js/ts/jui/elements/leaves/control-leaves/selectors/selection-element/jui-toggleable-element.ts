/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:31 PM -- May 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIToggleable } from "./jui-toggleable.js";
import { JUIModule } from "../../../../../jui-module.js";
import { JUIContainerable } from "../../../../../jui-containerable.js";
import JUINotifier from "../../../../../action/jui-notifier.js";

/**
 * An abstract implementation of any toggleable JUI element.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export abstract class JUIToggleableElement<E extends HTMLElement = HTMLElement, T extends JUIContainerable<E> = JUIContainerable<E>>
	extends JUIModule<T, E> implements JUIToggleable {
	
	protected static readonly INNER_ACTIVE_STATE_ELEMENT_CLASS: string = "jui-active-state-element";
	
	protected static readonly ACTIVE_STATE_CLASS: string = "jui-toggleable-active";
	
	public readonly TYPE_IDENTITY: string = "jui-toggleable-element";
	
	protected readonly events: JUIToggleableElement.JUIToggleableElementEvents;
	
	protected constructor(element: T) {
		
		super(element);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.events = new JUIToggleableElement.JUIToggleableElementEvents(this);
		
		this.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe((): any => this.toggle());
		
	}
	
	public toggle(): boolean {
		
		this.setState(!this.getState());
		return this.getState();
		
	}
	
	public abstract setState(state: boolean): void;
	
	public abstract getState(): boolean;
	
	public getEventManager(): JUIToggleableElement.JUIToggleableElementEvents {
		
		return this.events;
		
	}
	
}

export namespace JUIToggleableElement {
	
	export class JUIToggleableElementEvents extends JUIModule.JUIModuleEvents implements JUIToggleable.JUIToggleableEvents {
		
		public readonly TOGGLEABLE_BECAME_ACTIVE: JUINotifier<void>;
		
		public readonly TOGGLEABLE_BECAME_INACTIVE: JUINotifier<void>;
		
		public readonly TOGGLEABLE_STATE_CHANGE: JUINotifier<boolean>;
		
		public constructor(element: JUIToggleableElement) {
			
			super(element);
			
			this.TOGGLEABLE_STATE_CHANGE = new JUINotifier<boolean>();
			this.TOGGLEABLE_BECAME_ACTIVE = new JUINotifier<void>();
			this.TOGGLEABLE_BECAME_INACTIVE = new JUINotifier<void>();
			
			this.ELEMENT_MOUSE_CLICKED.subscribe(() => {
				
				this.TOGGLEABLE_STATE_CHANGE.notify(element.getState());
				
				if (element.getState()) this.TOGGLEABLE_BECAME_ACTIVE.notify();
				else this.TOGGLEABLE_BECAME_INACTIVE.notify();
				
			});
			
		}
		
	}
	
}