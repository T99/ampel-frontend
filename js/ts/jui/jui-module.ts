/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:35 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIContainerable } from "./jui-containerable.js";
import { JUIContainer } from "./elements/containers/jui-container.js";
import TSLock from "../util/structures/implementations/ts-lock.js";
import JUINotifier from "./action/jui-notifier.js";
import JUIMouseEventType from "./action/events/types/jui-mouse-event-type.js";
import JUIMouseEvent from "./action/events/jui-mouse-event.js";

/**
 * An immutable
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class JUIModule<T extends JUIContainerable<E>, E extends Element = Element> implements JUIContainerable<E> {
	
	// TODO [4/28/19 @ 3:28 PM] - JUIModules are now the exact same thing as JUIElements. Remove this class in favor of the other.
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-module";
	
	private readonly element: T;
	
	protected readonly events: JUIModule.JUIModuleEvents;
	
	public constructor(element: T) {
		
		this.element = element;
		element.addClasses(this.TYPE_IDENTITY);
		
	}
	
	/**
	 * Returns the JUIContainerable (T) that this JUIModule wraps.
	 *
	 * @returns {T} The JUIContainerable (T) that this JUIModule wraps.
	 */
	protected getModuleElement(): T {
		
		return this.element;
		
	}
	
	public getElement(): E {
		
		return this.element.getElement();
		
	}
	
	public addClasses(...classNames: string[]): void {
		
		for (let className of classNames) {
			
			if (this.hasClass(className)) return;
			else this.getElement().classList.add(className);
			
		}
		
	}
	
	public removeClasses(...classNames: string[]): void {
		
		for (let className of classNames) {
			
			if (this.hasClass(className)) this.getElement().classList.remove(className);
			
		}
		
	}
	
	public hasClass(className: string): boolean {
		
		return this.getElement().classList.contains(className);
		
	}
	
	public allClasses(): string[] {
		
		return Array.from(this.getElement().classList);
		
	}
	
	public getID(): string {
		
		return this.element.getID();
		
	}
	
	public setID(id: string): void {
		
		this.element.setID(id);
		
	}
	
	public hasContainer(container?: JUIContainer): boolean {
		
		return this.element.hasContainer(container);
		
	}
	
	public getContainer(): JUIContainer {
		
		return this.element.getContainer();
		
	}
	
	public setContainer(container: JUIContainer): void {
		
		this.element.setContainer(container);
		
	}
	
	public getTransitionLock(): Promise<TSLock> {
		
		return this.element.getTransitionLock();
		
	}
	
	public orphan(): void {
		
		this.element.orphan();
		
	}
	
	public getEventManager(): JUIModule.JUIModuleEvents {
		
		return this.events;
		
	}
	
}

export namespace JUIModule {
	
	export class JUIModuleEvents implements JUIContainerable.JUIContainerableEvents {
		
		/**
		 * A {@link JUINotifier} dispatched whenever the element is clicked (mouse down + mouse up).
		 */
		public readonly ELEMENT_MOUSE_CLICKED: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the element is double clicked.
		 */
		public readonly ELEMENT_MOUSE_DOUBLE_CLICKED: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the element is right clicked.
		 */
		public readonly ELEMENT_MOUSE_RIGHT_CLICKED: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse is depressed over the element.
		 */
		public readonly ELEMENT_MOUSE_DOWN: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse is released over the element.
		 */
		public readonly ELEMENT_MOUSE_UP: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse enters the element.
		 */
		public readonly ELEMENT_MOUSE_ENTER: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse leaves the element.
		 */
		public readonly ELEMENT_MOUSE_LEAVE: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse moves while hovering the element.
		 */
		public readonly ELEMENT_MOUSE_MOVE: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever this element is added to the page.
		 */
		public readonly ELEMENT_ADDED_TO_PAGE: JUINotifier<void>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever this element is removed from the page.
		 */
		public readonly ELEMENT_REMOVED_FROM_PAGE: JUINotifier<void>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever this element is added to a container, reporting the container to
		 * which it was added.
		 */
		public readonly ELEMENT_ADDED_TO_CONTAINER: JUINotifier<JUIContainer>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever this element is removed from a container, reporting the container
		 * to which is was removed.
		 */
		public readonly ELEMENT_REMOVED_FROM_CONTAINER: JUINotifier<JUIContainer>;
		
		public constructor(element: JUIModule<any, any>) {
			
			this.ELEMENT_MOUSE_CLICKED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(element);
			this.ELEMENT_MOUSE_DOUBLE_CLICKED = JUIMouseEventType.MOUSE_DOUBLE_CLICK.getNotifierForEventType(element);
			this.ELEMENT_MOUSE_RIGHT_CLICKED = JUIMouseEventType.MOUSE_RIGHT_CLICK.getNotifierForEventType(element);
			this.ELEMENT_MOUSE_DOWN = JUIMouseEventType.MOUSE_DOWN.getNotifierForEventType(element);
			this.ELEMENT_MOUSE_UP = JUIMouseEventType.MOUSE_UP.getNotifierForEventType(element);
			this.ELEMENT_MOUSE_ENTER = JUIMouseEventType.MOUSE_ENTER.getNotifierForEventType(element);
			this.ELEMENT_MOUSE_LEAVE = JUIMouseEventType.MOUSE_LEAVE.getNotifierForEventType(element);
			this.ELEMENT_MOUSE_MOVE = JUIMouseEventType.MOUSE_MOVE.getNotifierForEventType(element);
			
		}
	
	}
	
}