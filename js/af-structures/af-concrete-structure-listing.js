/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:52 PM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import AFStructureListing from "./af-structure-listing.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFConcreteStructureListing extends AFStructureListing {
    constructor() {
        super(true);
        this.idMap = new Map();
    }
    setParentListing(parentListing) {
        this.parentListing = parentListing;
        this.parentListing.sychronizeWithConcreteStructureListing(this);
    }
    // TODO [2/7/19 @ 5:11 AM] - Make this method return a boolean indicating whether or not the value was already present.
    addMapping(id, structure) {
        this.idMap.set(id, structure);
        if (this.parentListing)
            this.parentListing.addMapping(id, structure);
    }
    removeMapping(id) {
        if (this.hasItemWithID(id)) {
            let heldStructure = this.getItemWithID(id);
            this.idMap.delete(id);
            return heldStructure;
        }
        else
            return undefined;
    }
    getAllNames() {
        let names = [];
        for (let name of this.idMap.values())
            names.push(name.getName());
        return names.sort();
    }
    getAllIDs() {
        let ids = [];
        for (let id of this.idMap.values())
            ids.push(id.getID());
        return ids;
    }
    getAll() {
        let allItems = [];
        for (let item of this.idMap.values())
            allItems.push(item);
        return allItems;
    }
    size() {
        return this.idMap.size;
    }
    isEmpty() {
        return (this.size() === 0);
    }
    hasItemWithID(id) {
        return this.idMap.has(id);
    }
    getItemWithID(id) {
        return this.idMap.get(id);
    }
    getChildrenStructures() {
        return this.getAll();
    }
}
export default AFConcreteStructureListing;
//# sourceMappingURL=af-concrete-structure-listing.js.map