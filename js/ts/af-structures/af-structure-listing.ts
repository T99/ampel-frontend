/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:16 AM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFStructure from "./af-structure.js";
import AFIDObject from "./af-id-object.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class AFStructureListing<T extends AFStructureListing<T, S>, S extends AFStructure<S> & AFIDObject> extends AFStructure<T> {
	
	public abstract getAllNames(): string[];
	
	public abstract getAllIDs(): string[];
	
	public abstract getAll(): S[];
	
	public abstract size(): number;
	
	public abstract isEmpty(): boolean;
	
	public abstract hasItemWithID(id: string): boolean;
	
	public abstract getItemWithID(id: string): S;
	
}

export default AFStructureListing;