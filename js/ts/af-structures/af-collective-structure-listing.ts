/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:56 PM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFStructureListing from "./af-structure-listing.js";
import AFStructure from "./af-structure.js";
import AFIDObject from "./af-id-object.js";
import AFConcreteStructureListing from "./af-concrete-structure-listing.js";

type CounterObject<E> = {
	
	count: number;
	value: E;
	
};

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class AFCollectiveStructureListing<T extends AFStructureListing<T, S>, S extends AFStructure<S> & AFIDObject> extends AFStructureListing<T, S> {
	
	private idMap: Map<string, CounterObject<S>> = new Map<string, CounterObject<S>>();
	
	protected constructor() {
		
		super(false);
		
	}
	
	public sychronizeWithConcreteStructureListing(concreteStructureListing: AFConcreteStructureListing<T, S>): void {
		
		concreteStructureListing.getAll().forEach(
			(structure: S) => {
				
				this.addMapping(structure.getID(), structure);
				
			}
		);
		
	}
	
	public async refresh(): Promise<T> {
		
		// AFParentStructureListings are not responsible for managing the content that they hold pointers to.
		return this as unknown as T;
		
	}
	
	public addMapping(id: string, structure: S): void {
		
		if (this.hasItemWithID(id)) this.idMap.get(id).count++;
		else {
			
			this.idMap.set(id, {
				
				count: 1,
				value: structure
				
			});
			
		}
		
	}
	
	public removeMapping(id: string): S {
		
		if (this.hasItemWithID(id)) {
			
			let heldStructure: S = this.getItemWithID(id);
			
			if (--this.idMap.get(id).count <= 0) this.idMap.delete(id);
			
			return heldStructure;
			
		} else return undefined;
		
	}
	
	public getAllNames(): string[] {
		
		let names: string[] = [];
		
		for (let name of this.idMap.values()) names.push(name.value.getName());
		
		return names.sort();
		
	}
	
	public getAllIDs(): string[] {
		
		let ids: string[] = [];
		
		for (let id of this.idMap.values()) ids.push(id.value.getID());
		
		return ids;
		
	}
	
	public getAll(): S[] {
		
		let allItems: S[] = [];
		for (let item of this.idMap.values()) allItems.push(item.value);
		
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
		
		return this.idMap.get(id).value;
		
	}
	
	protected getChildrenStructures(): Array<AFStructure<S>> {
		
		// Return an empty array so an not to duplicate the process of refreshing the children of this structure.
		return [];
		
	}
	
}

export default AFCollectiveStructureListing;