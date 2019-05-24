/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:38 PM -- November 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainer from "./jui-container.js";
import JUIContainerType from "../../types/element-types/jui-container-type.js";
import JUIContainerable from "../../jui-containerable.js";

/**
 * A {@link JUIContainer} that only holds a single element.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUISingleContainer<T extends JUIContainerable> extends JUIContainer<T> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-single-container";
	
	/**
	 * The single JUIContainerable child of this JUISingleContainer.
	 */
	private child: T = null;
	
	/**
	 * Initializes a new JUISingleContainer, given a {@link JUIContainerType}.
	 *
	 * @param {JUIContainerType} containerType
	 */
	protected constructor(containerType: JUIContainerType = JUIContainerType.DIV) {
		
		super(containerType);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
	/**
	 * Sets the child of this JUISingleContainer to a given JUIContainerable.
	 *
	 * @param child The JUIContainerable to set as this JUISingleContainer's child.
	 */
	public setChild(child: T): void {
		
		if (!this.isEmpty()) this.orphanAllChildren();
		this.adoptChild(child);
		this.child = child;
		
	}
	
	/**
	 * Removes and returns the child of this JUISingleContainer if it has one, otherwise this method returns null.
	 *
	 * @returns The JUIContainerable that was removed from this JUISingleContainer or null if no child was present.
	 */
	public removeChild(): T {
		
		if (!this.isEmpty()) this.orphanAllChildren();
		let result: T = this.child;
		this.child = null;
		return result;
		
	}
	
	/**
	 * Returns the JUIContainerable child of this JUISingleContainer if it has one, otherwise this method returns null.
	 *
	 * @returns The JUIContainerable child of this JUISingleContainer or null if no child was present.
	 */
	public getChild(): T {
		
		return this.child;
		
	}
	
}

export default JUISingleContainer;