/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:56 PM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AFStructureListing from "./af-structure-listing.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFCollectiveStructureListing extends AFStructureListing {
    constructor() {
        super(false);
        this.idMap = new Map();
    }
    sychronizeWithConcreteStructureListing(concreteStructureListing) {
        concreteStructureListing.getAll().forEach((structure) => {
            this.addMapping(structure.getID(), structure);
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            // AFParentStructureListings are not responsible for managing the content that they hold pointers to.
            return this;
        });
    }
    addMapping(id, structure) {
        if (this.hasItemWithID(id))
            this.idMap.get(id).count++;
        else {
            this.idMap.set(id, {
                count: 1,
                value: structure
            });
        }
    }
    removeMapping(id) {
        if (this.hasItemWithID(id)) {
            let heldStructure = this.getItemWithID(id);
            if (--this.idMap.get(id).count <= 0)
                this.idMap.delete(id);
            return heldStructure;
        }
        else
            return undefined;
    }
    getAllNames() {
        let names = [];
        for (let name of this.idMap.values())
            names.push(name.value.getName());
        return names.sort();
    }
    getAllIDs() {
        let ids = [];
        for (let id of this.idMap.values())
            ids.push(id.value.getID());
        return ids;
    }
    getAll() {
        let allItems = [];
        for (let item of this.idMap.values())
            allItems.push(item.value);
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
        return this.idMap.get(id).value;
    }
    getChildrenStructures() {
        // Return an empty array so an not to duplicate the process of refreshing the children of this structure.
        return [];
    }
}
export default AFCollectiveStructureListing;
//# sourceMappingURL=af-collective-structure-listing.js.map