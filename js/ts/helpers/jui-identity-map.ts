/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:43 PM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import MalformedPatternError from "../errors/malformed-pattern-error.js";
import SaturatedPatternError from "../errors/saturated-pattern-error.js";
import AlphanumericalGenerator from "./alphanumerical-generator.js";
import JUIIdentityContainer from "./jui-identity-container.js";
import { JUIContainerable } from "../jui/jui-containerable.js";
import TSAIterator from "../util/structures/partials/iterate/ts-a-iterator.js";

/**
 * A map of IDs to some object, T, where IDs are generated by the map.
 *
 * <table style="margin: 20px">
 *     <tr style="background: #FFFFFF">
 *         <td style="color: black; padding: 5px; margin-right: 30px"></td>
 *         <td style="color: black; padding: 5px; margin-right: 30px">this</td>
 *         <td style="color: black; padding: 5px; margin-right: 10px">recursive</td>
 *     </tr>
 *     <tr style="background: #DDDDDD">
 *         <td style="color: black; padding: 5px; margin-right: 30px">get element via ID</td>
 *         <td style="color: black; padding: 5px; margin-right: 30px">{@link get}</td>
 *         <td style="color: black; padding: 5px; margin-right: 10px">{@link search}</td>
 *     </tr>
 *     <tr style="background: #FFFFFF">
 *         <td style="color: black; padding: 5px; margin-right: 30px">check if map has ID</td>
 *         <td style="color: black; padding: 5px; margin-right: 30px">{@link contains}</td>
 *         <td style="color: black; padding: 5px; margin-right: 10px">{@link verify}</td>
 *     </tr>
 *     <tr style="background: #FFFFFF">
 *         <td style="color: black; padding: 5px; margin-right: 30px">remove ID from map</td>
 *         <td style="color: black; padding: 5px; margin-right: 30px">{@link remove}</td>
 *         <td style="color: black; padding: 5px; margin-right: 10px">{@link deepRemove}</td>
 *     </tr>
 * </table>
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIIdentityMap<T extends JUIContainerable> {
	
	/**
	 * A magic-number constant representing the number of times IDMaps will attempt to find a new ID within the given
	 * pattern.
	 *
	 * @type {number}
	 */
	public static SATURATION_CONSTANT: number = 100;
	
	// DOC-ME [12/8/18 @ 3:48 PM] - Documentation required!
	private container: JUIIdentityContainer;
	
	// DOC-ME [12/8/18 @ 3:48 PM] - Documentation required!
	private childrenIdentityMaps: Array<JUIIdentityMap<T>> = new Array<JUIIdentityMap<T>>();
	
	/**
	 * The actual Map that maps strings to objects of type T.
	 *
	 * @type {Map<string, T>}
	 */
	private idMap: Map<string, T> = new Map<string,  T>();
	
	// DOC-ME [12/4/18 @ 3:54 AM] - Documentation required!
	protected constructor(identityContainer: JUIIdentityContainer) {
		
		try {
			
			AlphanumericalGenerator.validatePattern(identityContainer.CONTENT_PATTERN);
			this.container = identityContainer;
		
		} catch (e) {
			
			if (e instanceof MalformedPatternError) {
				
				throw new TypeError("ERR | Attempted to initialize an JUIIdentityMap with an invalid pattern.");
			} else throw e;
		
		}
		
	}
	
	// DOC-ME [12/8/18 @ 3:48 PM] - Documentation required!
	public getChildMap<S extends T>(identityContainer: JUIIdentityContainer): JUIIdentityMap<S> {
		
		let childMap: JUIIdentityMap<S> = new JUIIdentityMap<S>(identityContainer);
		this.childrenIdentityMaps.push(childMap);
		return childMap;
		
	}
	
	// DOC-ME [12/4/18 @ 9:40 PM] - Documentation required!
	private generateNewId(element: T): string {
		
		let id: string;
		let typeIdentity: string = element.TYPE_IDENTITY;
		let contentPattern: string = this.container.CONTENT_PATTERN;
		let attempts: number = 0;
		
		do {
			
			if (++attempts > JUIIdentityMap.SATURATION_CONSTANT) {
				
				throw new SaturatedPatternError("ERR | This JUIIdentityMap's pattern has been saturated (there is " +
					"little room remaining in the pattern for new IDs).");
			
			}
			
			id = typeIdentity + "-" + AlphanumericalGenerator.getIdFromOrderedPattern(contentPattern);
			
		} while (this.contains(id));
		
		return id;
		
	}
	
	/**
	 * Adds a new element to this JUIIdentityMap, returning the new ID for the added element.
	 *
	 * @param element The element to add to this JUIIdentityMap.
	 * @returns {string} The new ID for the added element.
	 */
	public add(element: T): string {
		
		let id: string = this.generateNewId(element);
		this.idMap.set(id, element);
		element.setID(id);
		return id;
		
	}
	
	/**
	 * Retrieves an element out of this JUIIdentityMap given the element's ID. Differs from {@link search} in that
	 * this method will not recurse into its children IdentityMaps, while verify <i>will</i> recurse. This method will
	 * return null if an element with the provided ID does not exist in the map.
	 *
	 * @param {string} id The ID for the element to retrieve.
	 * @returns The element being retrieved or null if the ID does not exist in this JUIIdentityMap.
	 */
	public get(id: string): T {
		
		if (this.contains(id)) return this.idMap.get(id);
		else return null;
		
	}
	
	/**
	 * Retrieves an element out of this JUIIdentityMap or its children given the element's ID. Differs from {@link get}
	 * only in that this method recurses into children maps to find the given ID while get will not. This method will
	 * return null if an element with the provided ID does not exist in this map or any of its children.
	 *
	 * @param {string} id The ID for the element to retrieve.
	 * @returns The element being retrieved or null if the ID does not exist in this JUIIdentityMap or any of its
	 * children.
	 */
	public search(id: string): T {
		
		let result: T = null;
		let mapIterator: TSAIterator<JUIIdentityMap<T>> = this.mapIterator(this);
		
		mapIterator.forEachRemaining((map: JUIIdentityMap<T>) => {
			
			if (map.contains(id)) result = map.get(id);
			
		});
		
		return result;
		
	}
	
	/**
	 * Removes an element from this JUIIdentityMap given the element's ID. This method will return null if an element
	 * with the provided ID does not exist in this map or any of its children. This method will return null if an
	 * element with the provided ID does not exist in the map.
	 *
	 * @param {string} id The ID for the element to remove.
	 * @returns The element being removed or null if the ID does not exist in this JUIIdentityMap.
	 */
	public remove(id: string): T {
		
		if (this.contains(id)) {
			
			let removedElement: T = this.idMap.get(id);
			this.idMap.delete(id);
			return removedElement;
			
		} else return null;
		
	}
	
	/**
	 * Removes an element from this JUIIdentityMap or a child JUIIdentityMap given the element's ID. Differs from
	 * {@link remove} only in that this method recurses into children maps to remove the given ID. This method will
	 * return null if an element with the provided ID does not exist in this map or any of its children.
	 *
	 * @param {string} id The ID for the element to remove.
	 * @returns The element being removed or null if the ID does not exist in this JUIIdentityMap or any of its
	 * children.
	 */
	public deepRemove(id: string): T {
		
		let result: T = null;
		let mapIterator: TSAIterator<JUIIdentityMap<T>> = this.mapIterator(this);
		
		mapIterator.forEachRemaining((map: JUIIdentityMap<T>) => {
			
			if (map.contains(id)) result = map.remove(id);
			
		});
		
		return result;
		
	}
	
	/**
	 * Returns true if this JUIIdentityMap contains an element with the provided ID. Differs from {@link verify} in that
	 * this method will not recurse into its children IdentityMaps, while verify <i>will</i> recurse.
	 *
	 * @param {string} id The ID to check for in this JUIIdentityMap.
	 * @returns {boolean} true if this JUIIdentityMap contains an element with the provided ID.
	 */
	public contains(id: string): boolean {
		
		return this.idMap.has(id);
		
	}
	
	/**
	 * Returns true if this JUIIdentityMap or any of its children contain an element with the provided ID. Differs from
	 * {@link contains} in that this method will recurse into its children IdentityMaps while contains will not.
	 *
	 * @param {string} id The ID to check for in this JUIIdentityMap and it's children.
	 * @returns {boolean} true if this JUIIdentityMap or any of it's children contain an element with the provided ID.
	 */
	public verify(id: string): boolean {
		
		let mapIterator: TSAIterator<JUIIdentityMap<T>> = this.mapIterator(this);
		
		mapIterator.forEachRemaining((map: JUIIdentityMap<T>): any => {
			
			if (map.contains(id)) return true;
			
		});
		
		return false;
		
	}
	
	/**
	 * Returns an iterator over all of the maps relevant to the current instance.
	 *
	 * @param {JUIIdentityMap} instance <code>this</code> needs to be passed in so that the returned anonymous class can
	 * get information off of the instance.
	 * @returns {TSIterator<JUIIdentityMap>} An iterator over all of the maps relevant to the current instance.
	 */
	private mapIterator(instance: JUIIdentityMap<T>): TSAIterator<JUIIdentityMap<T>> {
		
		return new class extends TSAIterator<JUIIdentityMap<T>> {
			
			private cursor: number = 0;
			private maps: Array<JUIIdentityMap<T>> = [instance, ...instance.childrenIdentityMaps];
			
			public hasNext(): boolean {
				
				return (this.cursor < this.maps.length);
				
			}
			
			public next(): JUIIdentityMap<T> {
				
				return this.maps[this.cursor++];
				
			}
			
			public remove(): JUIIdentityMap<T> {
				
				throw new Error("Unsupported operation.");
				// TODO [3/17/19 @ 9:42 PM] - Could this be done?
				
			}
			
			public reset(): void {
				
				this.cursor = 0;
				
			}
			
		};
		
	}
	
	/**
	 * Returns the number of elements contained within this JUIIdentityMap.
	 *
	 * @returns {number} The number of elements contained within this JUIIdentityMap.
	 */
	public size(): number {
		
		return this.idMap.size;
		
	}
	
	/**
	 * Returns true if this JUIIdentityMap is empty (contains no key-value pairs).
	 *
	 * @returns {boolean} true if this JUIIdentityMap is empty (contains no key-value pairs).
	 */
	public isEmpty(): boolean {
		
		return (this.size() === 0);
		
	}
	
	/**
	 * Returns an array of all of the IDs in this JUIIdentityMap.
	 *
	 * @returns {string[]} An array of all of the IDs in this JUIIdentityMap.
	 */
	public keySet(): string[] {
		
		return Array.from(this.idMap.keys());
		
	}
	
	/**
	 * Returns an array of all of the elements in this JUIIdentityMap.
	 *
	 * @returns An array of all of the elements in this JUIIdentityMap.
	 */
	public valueSet(): T[] {
		
		return Array.from(this.idMap.values());
	
	}
	
}

export default JUIIdentityMap;