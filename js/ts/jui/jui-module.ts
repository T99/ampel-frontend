/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:35 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElement from "./elements/jui-element.js";
import JUIContainerable from "./jui-containerable.js";
import JUIContainer from "./elements/jui-container.js";
import TSLock from "../structures/implementations/ts-lock.js";

/**
 * An immutable
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIModule<T extends JUIElement<E>, E extends Element = Element> implements JUIContainerable<E> {
	
	// TODO [4/28/19 @ 3:28 PM] - JUIModules are now the exact same thing as JUIElements. Remove this class in favor of the other.
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-module";
	
	protected readonly element: T;
	
	public constructor(element: T) {
		
		this.element = element;
		element.addClasses(this.TYPE_IDENTITY);
		
	}
	
	// DOC-ME [12/18/18 @ 7:00 PM] - Documentation required!
	public getHTMLElement(): E {
		
		return this.element.getHTMLElement();
		
	}
	
	/**
	 * Adds classes to this JUIModule's DOM element.
	 *
	 * @param {string[]} classNames The names of the classes to add to this JUIModule's DOM element.
	 */
	public addClasses(...classNames: string[]): void {
		
		for (let className of classNames) {
			
			if (this.hasClass(className)) return;
			else this.getHTMLElement().classList.add(className);
			
		}
		
	}
	
	/**
	 * Removes classes from this JUIModule's DOM element.
	 *
	 * @param {string[]} classNames The names of the classes to remove from this JUIModule's DOM element.
	 */
	public removeClasses(...classNames: string[]): void {
		
		for (let className of classNames) {
			
			if (this.hasClass(className)) this.getHTMLElement().classList.remove(className);
			
		}
		
	}
	
	/**
	 * Returns true if this JUIModule's DOM element has the provided class.
	 *
	 * @param {string} className The name of the class to check for on this JUIModule's DOM element.
	 * @returns {boolean} true if this JUIModule's DOM element has the provided class.
	 */
	public hasClass(className: string): boolean {
		
		return this.getHTMLElement().classList.contains(className);
		
	}
	
	/**
	 * Returns a string array of all of the classes on this JUIModule's DOM element.
	 *
	 * @returns {string[]} A string array of all of the classes on this JUIModule's DOM element.
	 */
	public allClasses(): string[] {
		
		return Array.from(this.getHTMLElement().classList);
		
	}
	
	// DOC-ME [12/18/18 @ 6:46 PM] - Documentation required!
	public getID(): string {
		
		return this.element.getID();
		
	}
	
	// DOC-ME [12/18/18 @ 6:45 PM] - Documentation required!
	public setID(id: string): void {
		
		this.element.setID(id);
		
	}
	
	// DOC-ME [12/18/18 @ 6:45 PM] - Documentation required!
	public hasContainer(container?: JUIContainer): boolean {
		
		return this.element.hasContainer(container);
		
	}
	
	// DOC-ME [12/18/18 @ 6:46 PM] - Documentation required!
	public getContainer(): JUIContainer {
		
		return this.element.getContainer();
		
	}
	
	// DOC-ME [12/18/18 @ 6:45 PM] - Documentation required!
	public setContainer(container: JUIContainer): void {
		
		this.element.setContainer(container);
		
	}
	
	public getTransitionLock(): Promise<TSLock> {
		
		return this.element.getTransitionLock();
		
	}
	
	// DOC-ME [12/18/18 @ 6:45 PM] - Documentation required!
	public orphan(): void {
		
		this.element.orphan();
		
	}
	
}

export default JUIModule;