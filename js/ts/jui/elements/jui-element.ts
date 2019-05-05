/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:34 AM -- November 03rd, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElementType from "../types/jui-element-type.js";
import JUIContainer from "./jui-container.js";
import JUIContainerable from "../jui-containerable.js";
import JUIStyleCollection from "../styles/jui-style-collection.js";
import JUIElementEventManager from "../action/managers/jui-element-event-manager.js";
import TSLockingQueue from "../../structures/implementations/queue/ts-locking-queue.js";
import TSLock from "../../structures/implementations/ts-lock.js";

/**
 * The most basic form of an element, JUIElement serves as the base-most abstract implementation of an item that can
 * exist on the page.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUIElement<E extends Element = Element> implements JUIContainerable<E> {
	
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
	
	protected eventManager: JUIElementEventManager;
	
	private transitionLockManager: TSLockingQueue = new TSLockingQueue();
	
	private styleCollection: JUIStyleCollection = new JUIStyleCollection(this);
	
	// DOC-ME [12/8/18 @ 4:35 PM] - Documentation required!
	protected constructor(elementType: JUIElementType) {
		
		switch (elementType) {
			
			case JUIElementType.SVG:
			case JUIElementType.CIRCLE:
			case JUIElementType.LINE:
			case JUIElementType.PATH:
			case JUIElementType.POLYGON:
			case JUIElementType.RECT:
			case JUIElementType.TEXT:
			case JUIElementType.TEXTPATH: {
				
				this.element = document.createElementNS("http://www.w3.org/2000/svg", elementType.toString()) as unknown as E;
				break;
				
			}
			
			default: {
				
				this.element = document.createElement(elementType.toString()) as unknown as E;
				break;
				
			}
			
		}
		
		this.eventManager = new JUIElementEventManager(this);
		
		this.getHTMLElement()["jui"] = this;
		
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
	// TODO [2/4/19 @ 11:52 PM] - Override this element to return the proper type on all subtypes.
	/**
	 * Returns the DOM element that constitutes this JUIElement.
	 *
	 * @returns {HTMLElement} The DOM element that constitutes this JUIElement.
	 */
	public getHTMLElement(): E {
		
		return this.element;
		
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
		
		this.getHTMLElement().id = id;
		
	}
	
	/**
	 * Returns the ID of this T. This ID serves as both the identifier within the JUI framework as well as the
	 * actual HTML/DOM ID of the HTMLElement.
	 *
	 * @returns {string} The ID of this T.
	 */
	public getID(): string {
		
		return this.getHTMLElement().id;
		
	}
	
	/**
	 * Adds classes to this JUIElement's DOM element.
	 *
	 * @param {string[]} classNames The names of the classes to add to this JUIElement's DOM element.
	 */
	public addClasses(...classNames: string[]): void {
		
		for (let className of classNames) {
			
			if (this.hasClass(className)) return;
			else this.getHTMLElement().classList.add(className);
			
		}
		
	}
	
	/**
	 * Removes classes from this JUIElement's DOM element.
	 *
	 * @param {string[]} classNames The names of the classes to remove from this JUIElement's DOM element.
	 */
	public removeClasses(...classNames: string[]): void {
		
		for (let className of classNames) {
			
			if (this.hasClass(className)) this.getHTMLElement().classList.remove(className);
			
		}
		
	}
	
	/**
	 * Returns true if this JUIElement's DOM element has the provided class.
	 *
	 * @param {string} className The name of the class to check for on this JUIElement's DOM element.
	 * @returns {boolean} true if this JUIElement's DOM element has the provided class.
	 */
	public hasClass(className: string): boolean {
		
		return this.getHTMLElement().classList.contains(className);
		
	}
	
	/**
	 * Returns a string array of all of the classes on this JUIElement's DOM element.
	 *
	 * @returns {string[]} A string array of all of the classes on this JUIElement's DOM element.
	 */
	public allClasses(): string[] {
		
		return Array.from(this.getHTMLElement().classList);
		
	}
	
	public setFocusability(focusability: boolean): void {
		
		this.getHTMLElement()["tabIndex"] = (focusability ? 0 : -1);
		
	}
	
	/**
	 * The feature is not yet fully implemented.
	 *
	 * @returns {JUIStyleCollection}
	 */
	public getStyleCollection(): JUIStyleCollection {
		
		return this.styleCollection;
		
	}
	
	/**
	 * Returns the {@link JUIEventManager} for this JUIElement.
	 *
	 * @returns {JUIElementEventManager} The JUIEventManager for this JUIElement.
	 */
	public getEventManager(): JUIElementEventManager {
		
		return this.eventManager;
		
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
			
			return container.getHTMLElement().removeChild(this.element);
			
		} else return undefined;
		
	}
	
}

export default JUIElement;