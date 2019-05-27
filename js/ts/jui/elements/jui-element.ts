/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:34 AM -- November 03rd, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElementType from "../types/element-types/jui-element-type.js";
import { JUIContainer } from "./containers/jui-container.js";
import TSLockingQueue from "../../util/structures/implementations/queue/ts-locking-queue.js";
import TSLock from "../../util/structures/implementations/ts-lock.js";
import JUINotifier from "../action/jui-notifier.js";
import JUIMouseEvent from "../action/events/jui-mouse-event.js";
import JUIMouseEventType from "../action/events/types/jui-mouse-event-type.js";
import { JUIContainerable } from "../jui-containerable.js";

/**
 * The most basic form of an element, JUIElement serves as the base-most abstract implementation of an item that can
 * exist on the page.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export abstract class JUIElement<E extends Element = Element> implements JUIContainerable<E> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-element";
	
	/**
	 * The actual DOM element that constitutes this JUIElement.
	 */
	protected readonly element: E;
	
	/**
	 * The {@link JUIContainer} that contains this JUIElement.
	 */
	protected container: JUIContainer;
	
	protected readonly events: JUIElement.JUIElementEvents;
	
	private transitionLockManager: TSLockingQueue = new TSLockingQueue();
	
	// private styleCollection: JUIStyleCollection = new JUIStyleCollection(this);
	
	// DOC-ME [12/8/18 @ 4:35 PM] - Documentation required!
	protected constructor(elementType: JUIElementType) {
		
		if (elementType === undefined) console.trace("elementType was undefined");
		
		this.element = elementType.create() as unknown as E;
		
		this.events = new JUIElement.JUIElementEvents(this);
		
		this.getElement()["jui"] = this;
		
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
	// TODO [2/4/19 @ 11:52 PM] - Override this element to return the proper type on all subtypes.
	/**
	 * Returns the DOM element that constitutes this JUIElement.
	 *
	 * @returns {HTMLElement} The DOM element that constitutes this JUIElement.
	 */
	public getElement(): E {
		
		return this.element;
		
	}
	
	public static testMethod(): string {
		
		return "hi";
		
	}
	
	// DOC-ME [12/18/18 @ 6:39 PM] - Documentation required!
	public setContainer(container: JUIContainer): void {
		
		if (this.hasContainer(container)) return;
		else this.container = container;
		
	}
	
	/**
	 * Returns the {@link JUIContainer} to which this JUIElement belongs, or undefined if this element is not in a
	 * container.
	 *
	 * @returns {JUIContainer} The JUIContainer to which this JUIElement belongs, or undefined if this element
	 * is not in a container.
	 */
	public getContainer(): JUIContainer {
		
		return this.container;
		
	}
	
	/**
	 * If a valid {@link JUIContainer} is passed, this method returns true if that container contains this JUIElement,
	 * otherwise returns true if this JUIElement has a container at all.
	 *
	 * @param {JUIContainer} container
	 * @returns {boolean}
	 */
	public hasContainer(container?: JUIContainer): boolean {
		
		if (container) return (this.container === container);
		else return (this.container !== undefined && this.container !== null);
		
	}
	
	/**
	 * Sets the DOM ID of this JUIElement.
	 *
	 * @param {string} id The string to set as this JUIElement's DOM ID.
	 */
	public setID(id: string): void {
		
		this.getElement().id = id;
		
	}
	
	/**
	 * Returns the ID of this T. This ID serves as both the identifier within the JUI framework as well as the
	 * actual HTML/DOM ID of the HTMLElement.
	 *
	 * @returns {string} The ID of this T.
	 */
	public getID(): string {
		
		return this.getElement().id;
		
	}
	
	/**
	 * Adds classes to this JUIElement's DOM element.
	 *
	 * @param {string[]} classNames The names of the classes to add to this JUIElement's DOM element.
	 */
	public addClasses(...classNames: string[]): void {
		
		for (let className of classNames) {
			
			if (this.hasClass(className)) return;
			else this.getElement().classList.add(className);
			
		}
		
	}
	
	/**
	 * Removes classes from this JUIElement's DOM element.
	 *
	 * @param {string[]} classNames The names of the classes to remove from this JUIElement's DOM element.
	 */
	public removeClasses(...classNames: string[]): void {
		
		for (let className of classNames) {
			
			if (this.hasClass(className)) this.getElement().classList.remove(className);
			
		}
		
	}
	
	/**
	 * Returns true if this JUIElement's DOM element has the provided class.
	 *
	 * @param {string} className The name of the class to check for on this JUIElement's DOM element.
	 * @returns {boolean} true if this JUIElement's DOM element has the provided class.
	 */
	public hasClass(className: string): boolean {
		
		return this.getElement().classList.contains(className);
		
	}
	
	/**
	 * Returns a string array of all of the classes on this JUIElement's DOM element.
	 *
	 * @returns {string[]} A string array of all of the classes on this JUIElement's DOM element.
	 */
	public allClasses(): string[] {
		
		return Array.from(this.getElement().classList);
		
	}
	
	public setFocusability(focusability: boolean): void {
		
		this.getElement()["tabIndex"] = (focusability ? 0 : -1);
		
	}
	
	// /**
	//  * The feature is not yet fully implemented.
	//  *
	//  * @returns {JUIStyleCollection}
	//  */
	// public getStyleCollection(): JUIStyleCollection {
	//
	// 	return this.styleCollection;
	//
	// }
	
	/**
	 * Returns the {@link JUIEventManager} for this JUIElement.
	 *
	 * @returns {JUIElementEventManager} The JUIEventManager for this JUIElement.
	 */
	public getEventManager(): JUIElement.JUIElementEvents {
		
		return this.events;
		
	}
	
	public getTransitionLock(): Promise<TSLock> {
		
		return this.transitionLockManager.getLock();
		
	}
	
	/**
	 * Removes this JUIElement from it's container if it is in one, returning the {@link Element} that was removed.
	 *
	 * @returns {E} The Element that was removed.
	 */
	public orphan(): E {
		
		if (this.hasContainer()) {
			
			let container: JUIContainer = this.container;
			
			this.container = undefined;
			
			return container.getElement().removeChild(this.element);
			
		} else return undefined;
		
	}
	
}

export namespace JUIElement {
	
	export class JUIElementEvents implements JUIContainerable.JUIContainerableEvents {
		
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
		
		public constructor(element: JUIElement) {
			
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