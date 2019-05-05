/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:52 PM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFStructure from "./af-structure.js";
import AFStructureListing from "./af-structure-listing.js";
import AFIDObject from "./af-id-object.js";
import AFCollectiveStructureListing from "./af-collective-structure-listing.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class AFConcreteStructureListing<T extends AFStructureListing<T, S>, S extends AFStructure<S> & AFIDObject> extends AFStructureListing<T, S> {
	
	private parentListing: AFCollectiveStructureListing<T, S>;
	
	private idMap: Map<string, S> = new Map<string, S>();
	
	protected constructor() {
		
		super(true);
		
	}
	
	public setParentListing(parentListing: AFCollectiveStructureListing<any, S>): void {
		
		this.parentListing = parentListing;
		this.parentListing.sychronizeWithConcreteStructureListing(this);
		
	}
	
	// TODO [2/7/19 @ 5:11 AM] - Make this method return a boolean indicating whether or not the value was already present.
	protected addMapping(id: string, structure: S): void {
		
		this.idMap.set(id, structure);
		
		if (this.parentListing) this.parentListing.addMapping(id, structure);
		
	}
	
	protected removeMapping(id: string): S {
		
		if (this.hasItemWithID(id)) {
			
			let heldStructure: S = this.getItemWithID(id);
			this.idMap.delete(id);
			return heldStructure;
			
		} else return undefined;
		
	}
	
	public getAllNames(): string[] {
		
		let names: string[] = [];
		
		for (let name of this.idMap.values()) names.push(name.getName());
		
		return names.sort();
		
	}
	
	public getAllIDs(): string[] {
		
		let ids: string[] = [];
		
		for (let id of this.idMap.values()) ids.push(id.getID());
		
		return ids;
		
	}
	
	public getAll(): S[] {
		
		let allItems: S[] = [];
		for (let item of this.idMap.values()) allItems.push(item);
		
		return allItems;
		
	}
	
	public size(): number {
		
		return this.idMap.size;
		
	}
	
	public isEmpty(): boolean {
		
		return (this.size() === 0);
		
	}
	
	public hasItemWithID(id: string): boolean {
		
		return this.idMap.has(id);
		
	}
	
	public getItemWithID(id: string): S {
		
		return this.idMap.get(id);
		
	}
	
	protected getChildrenStructures(): Array<AFStructure<S>> {
		
		return this.getAll();
		
	}
	
}

export default AFConcreteStructureListing;