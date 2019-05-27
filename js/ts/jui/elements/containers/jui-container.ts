/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:53 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainerType from "../../types/element-types/jui-container-type.js";
import JUIIdentityContainer from "../../../helpers/jui-identity-container.js";
import JUIIdentityMap from "../../../helpers/jui-identity-map.js";
import JUIMasterIdentityMap from "../../../helpers/jui-master-identity-map.js";
import JUIContainerDichotomyError from "../../errors/jui-container-dichotomy-error.js";
import { JUIContainerable } from "../../jui-containerable.js";
import { JUIElement } from "../jui-element.js";
import JUINotifier from "../../action/jui-notifier.js";

/**
 * Defines the most basic form of a container for {@link JUIElement}s. Provides protected methods for operating on the
 * JUIContainer's DOM object. JUIContainers are optionally typed, with the least-specific type being an JUIElement - but
 * if a more specific type of element
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export abstract class JUIContainer<T extends JUIContainerable = JUIContainerable> extends JUIElement<HTMLElement> implements
	JUIIdentityContainer {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-container";
	
	/**
	 * Describes the {@link AlphanumericalGenerator} pattern that JUIIdentityContainers will use to generate new IDs for
	 * this JUIContainer.
	 */
	public readonly CONTENT_PATTERN: string = "3l3n";
	
	/**
	 * The children of this JUIContainer as stored inside of a JUIIdentityMap.
	 */
	protected children: JUIIdentityMap<T>;
	
	protected readonly events: JUIContainer.JUIContainerEvents<T>;
	
	/**
	 * A pass-through constructor that 'casts' the provided {@link JUIContainerType} to an {@link JUIElementType} and
	 * passes the appropriate classes through to the super.
	 *
	 * Removes a {@link JUIElement} with a given ID from this JUIContainer's DOM object as well as its
	 *
	 * @param {JUIContainerType} containerType The JUIContainerType of this JUIContainer.
	 */
	protected constructor(containerType: JUIContainerType = JUIContainerType.DIV) {
		
		super(containerType);
		this.addClasses(this.TYPE_IDENTITY);
		
		if (this.hasContainer()) this.children = this.getContainer().children.getChildMap(this);
		else this.children = JUIMasterIdentityMap.getInstance().getChildMap(this);
		
		this.events = new JUIContainer.JUIContainerEvents<T>(this);
		
	}
	
	/**
	 * Appends a child to this JUIContainer's DOM object as well as its {@link JUIIdentityMap}.
	 *
	 * @param element The {@link JUIElement} to append to this JUIContainer.
	 * @param beforeElement The JUIElement before which to append the previously specified element.
	 * @returns {string} The ID of the newly created T.
	 */
	protected adoptChild(element: T, beforeElement?: T): string {
		
		if (element.hasContainer === undefined) {
			
			try {
				
				element.hasContainer(this);
				
			} catch (e) {
				
				let error: Error = e as Error;
				
				console.log(error);
				
				console.log(element);
				
			}
			
		}
		
		if (element.hasContainer(this)) return element.getID();
		else if (element.hasContainer()) throw new JUIContainerDichotomyError();
		else {
			
			if (beforeElement === undefined) this.getElement().appendChild(element.getElement());
			else this.getElement().insertBefore(element.getElement(), beforeElement.getElement());
			
			this.getEventManager().CHILD_ADDED_TO_CONTAINER.notify(element);
			
			element.setContainer(this);
			return this.children.add(element);
			
		}
		
	}
	
	/**
	 * Removes a {@link JUIElement} with a given ID from this JUIContainer's DOM object as well as its
	 * {@link JUIIdentityMap}.
	 *
	 * @param {string} id The ID of the {@link JUIElement} to orphan.
	 * @returns A child of of this JUIContainer with the given ID if it exists, otherwise null.
	 */
	protected orphanChild(id: string): T {
		
		if (this.hasChild(id)) {
			
			let result: T = this.children.remove(id);
			result.orphan();
			return result;
			
		} else return null;
		
	}
	
	/**
	 * Removes all of the children of this JUIContainer, returning true if any children were actually removed.
	 *
	 * @returns {boolean} A boolean indicating whether or not any children were actually removed.
	 */
	protected orphanAllChildren(): boolean {
		
		let element: Element = this.getElement();
		
		if (element.hasChildNodes()) {
			
			while (element.firstChild) element.removeChild(element.firstChild);
			return true;
			
		} else return false;
		
	}
	
	/**
	 * Returns true if this JUIContainer has a JUIElement with the provided ID.
	 *
	 * @param {string} id The to check for inside this JUIContainer.
	 * @returns {boolean} true if this JUIContainer has a JUIElement with the provided ID.
	 */
	public hasChild(id: string): boolean {
		
		return this.children.contains(id);
		
	}
	
	/**
	 * Returns true if this JUIContainer has no children.
	 *
	 * @returns {boolean} true if this JUIContainer has no children.
	 */
	public isEmpty(): boolean {
		
		return this.children.isEmpty();
		
	}
	
	public getEventManager(): JUIContainer.JUIContainerEvents<T> {
		
		return this.events;
		
	}
	
}

export namespace JUIContainer {
	
	export class JUIContainerEvents<T extends JUIContainerable> extends JUIElement.JUIElementEvents {
		
		public readonly CHILD_ADDED_TO_CONTAINER: JUINotifier<T>;
		
		public readonly CHILD_REMOVED_FROM_CONTAINER: JUINotifier<T>;
		
		public constructor(element: JUIContainer) {
			
			super(element);
			
			this.CHILD_ADDED_TO_CONTAINER = new JUINotifier<T>();
			this.CHILD_REMOVED_FROM_CONTAINER = new JUINotifier<T>();
			
		}
		
	}
	
}