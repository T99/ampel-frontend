/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:28 PM -- December 18th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIContainer } from "./elements/containers/jui-container.js";
import TSLock from "../util/structures/implementations/ts-lock.js";
import JUINotifier from "./action/jui-notifier.js";
import JUIMouseEvent from "./action/events/jui-mouse-event.js";

/**
 * Describes an item that can be placed inside a {@link JUIContainer}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface JUIContainerable<E extends Element = Element> {
	
	readonly TYPE_IDENTITY: string;
	
	/**
	 * Returns the Element that this JUIContainerable represents.
	 *
	 * @returns {E} The Element that this JUIContainerable represents.
	 */
	getElement(): E;
	
	/**
	 * Sets the ID of the Element that this JUIContainerable represents.
	 *
	 * @param {string} id The ID to set as this JUIContainerable's Element's ID.
	 */
	setID(id: string): void;
	
	/**
	 * Returns the ID of the Element that this JUIContainerable represents.
	 *
	 * @returns {string}
	 */
	getID(): string;
	
	/**
	 * Adds classes to this JUIContainerable's DOM element.
	 *
	 * @param {string[]} classNames The names of the classes to add to this JUIContainerable's DOM element.
	 */
	addClasses(...classNames: string[]): void;
	
	/**
	 * Removes classes from this JUIContainerable's DOM element.
	 *
	 * @param {string[]} classNames The names of the classes to remove from this JUIContainerable's DOM element.
	 */
	removeClasses(...classNames: string[]): void;
	
	/**
	 * Returns true if this JUIContainerable's DOM element has the provided class.
	 *
	 * @param {string} className The name of the class to check for on this JUIContainerable's DOM element.
	 * @returns {boolean} true if this JUIContainerable's DOM element has the provided class.
	 */
	hasClass(className: string): boolean;
	
	/**
	 * Returns a string array of all of the classes on this JUIContainerable's DOM element.
	 *
	 * @returns {string[]} A string array of all of the classes on this JUIContainerable's DOM element.
	 */
	allClasses(): string[];
	
	/**
	 * Returns the JUIContainer that contains this JUIContainerable if one exists, otherwise returns undefined.
	 *
	 * @returns {JUIContainer} The JUIContainer that contains this JUIContainerable if one exists, otherwise returns
	 * undefined.
	 */
	getContainer(): JUIContainer;
	
	/**
	 * Sets the JUIContainer that contains this JUIContainerable.
	 *
	 * Note that this does not actually affect the DOM - it is merely meant to help prevent multi-containerization.
	 *
	 * @param {JUIContainer} container
	 */
	setContainer(container: JUIContainer): void;
	
	/**
	 * If a JUIContainer is passed as an argument, this method returns true if that JUIContainer contains this
	 * JUIContainerable. If no arguments are passed, this method returns true if this element is in *any* JUIContainer.
	 *
	 * @param {JUIContainer} container
	 * @returns {boolean}
	 */
	hasContainer(container?: JUIContainer): boolean;
	
	/**
	 * Gets the transition lock for this JUIContainerable.
	 *
	 * @returns {Promise<TSLock>} A {@link TSLock}-resolving Promise for the transition lock for this JUIContainerable.
	 */
	getTransitionLock(): Promise<TSLock>;
	
	/**
	 * Orphans this JUIContainerable from its container.
	 */
	orphan(): void;
	
	getEventManager(): JUIContainerable.JUIContainerableEvents;
	
}

export namespace JUIContainerable {
	
	export interface JUIContainerableEvents {
		
		/**
		 * A {@link JUINotifier} dispatched whenever the element is clicked (mouse down + mouse up).
		 */
		readonly ELEMENT_MOUSE_CLICKED: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the element is double clicked.
		 */
		readonly ELEMENT_MOUSE_DOUBLE_CLICKED: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the element is right clicked.
		 */
		readonly ELEMENT_MOUSE_RIGHT_CLICKED: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse is depressed over the element.
		 */
		readonly ELEMENT_MOUSE_DOWN: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse is released over the element.
		 */
		readonly ELEMENT_MOUSE_UP: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse enters the element.
		 */
		readonly ELEMENT_MOUSE_ENTER: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse leaves the element.
		 */
		readonly ELEMENT_MOUSE_LEAVE: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever the mouse moves while hovering the element.
		 */
		readonly ELEMENT_MOUSE_MOVE: JUINotifier<JUIMouseEvent>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever this element is added to the page.
		 */
		readonly ELEMENT_ADDED_TO_PAGE: JUINotifier<void>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever this element is removed from the page.
		 */
		readonly ELEMENT_REMOVED_FROM_PAGE: JUINotifier<void>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever this element is added to a container, reporting the container to
		 * which it was added.
		 */
		readonly ELEMENT_ADDED_TO_CONTAINER: JUINotifier<JUIContainer>;
		
		/**
		 * A {@link JUINotifier} dispatched whenever this element is removed from a container, reporting the container
		 * to which is was removed.
		 */
		readonly ELEMENT_REMOVED_FROM_CONTAINER: JUINotifier<JUIContainer>;
		
	}
	
}