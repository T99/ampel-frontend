/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:51 PM -- November 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIContainer } from "./jui-container.js";
import JUIContainerType from "../../types/element-types/jui-container-type.js";
import { JUIContainerable } from "../../jui-containerable.js";

/**
 * A {@link JUIContainer} that can hold multiple {@link JUIElement}s.
 *
 * @see JUISingleContainer
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUIMultiContainer<T extends JUIContainerable> extends JUIContainer<T> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-multi-container";
	
	/**
	 * Initializes a new JUIMultiContainer with a given {@link JUIContainerType}.
	 *
	 * @param {JUIContainerType} containerType
	 */
	protected constructor(containerType: JUIContainerType = JUIContainerType.DIV) {
		
		super(containerType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
	/**
	 * Adds a child {@link JUIElement} to this JUIMultiContainer.
	 *
	 * @param child The child to add to this JUIMultiContainer.
	 * @returns {string} The ID of the newly added child.
	 */
	public addChild(child: T): string {
		
		return this.adoptChild(child);
		
	}
	
	/**
	 * Adds children {@link JUIElement}s to this JUIMultiContainer in bulk.
	 *
	 * @param children The children to add to this JUIMultiContainer.
	 * @returns {string[]} The IDs of the newly added children in insertion order.
	 */
	public addChildren(...children: T[]): string[] {
		
		let ids: string[] = [];
		
		for (let child of children) ids.push(this.addChild(child));
		
		return ids;
		
	}
	
	// DOC-ME [3/14/19 @ 3:19 PM] - Documentation required!
	public addBefore(child: T, before: T): string {
		
		return this.adoptChild(child, before);
		
	}
	
	/**
	 * Returns a child of of this JUIMultiContainer with the given ID if it exists, otherwise this method returns null.
	 *
	 * @param {string} id The ID of the {@link JUIElement} to retrieve.
	 * @returns A child of of this JUIMultiContainer with the given ID if it exists, otherwise null.
	 */
	public getChild(id: string): T {
		
		return this.children.get(id);
		
	}
	
	/**
	 * Returns an array of all of the children of this JUIMultiContainer.
	 *
	 * @returns {T[]} An array of all of the children of this JUIMultiContainer.
	 */
	public getAllChildren(): T[] {
		
		return this.children.valueSet();
		
	}
	
	/**
	 * Removes and returns a child of of this JUIMultiContainer with the given ID if it exists, otherwise this method
	 * returns null.
	 *
	 * @param {string} id The ID of the {@link JUIElement} to remove.
	 * @returns A child of of this JUIMultiContainer with the given ID if it exists, otherwise null.
	 */
	public removeChild(id: string): T {
		
		return this.orphanChild(id);
		
	}
	
	/**
	 * Removes all of this JUIMultiContainer's children.
	 */
	public removeAllChildren(): void {
		
		for (let element of this.getAllChildren()) element.orphan();
		
	}
	
}

export default JUIMultiContainer;