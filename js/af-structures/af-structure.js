/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:45 PM -- February 02nd, 2019.
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
/**
 * The most generic possible form of a data structure that exists for use by and in the Ampel API.
 *
 * TODO [2/2/19 @ 9:03 PM] - Keep the below list up-to-date.
 * Implementing classes are as follows:
 * 	- {@link AFClient}
 * 	- {@link AFOrganization}
 * 	- {@link AFOrganizationListing}
 * 	- {@link AFLocation}
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFStructure {
    constructor(shouldMaintainChildren) {
        this.maintainsChildren = shouldMaintainChildren;
    }
    shouldMaintainChildren() {
        return this.maintainsChildren;
    }
    /**
     * Refreshes the information in this AFStructure and all underlying AFStructures recursively, replacing the in-place
     * information with that from the database/API and returning a Promise that resolves once all relevant information
     * has been fully refreshed.
     *
     * @returns {Promise<E>} A Promise that resolves once all relevant information has been fully refreshed.
     */
    deepRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.refresh().then(() => {
                    if (this.shouldMaintainChildren()) {
                        let childrenPromises = [];
                        this.getChildrenStructures().forEach((structure) => {
                            childrenPromises.push(structure.deepRefresh());
                        });
                        // TODO [2/6/19 @ 7:07 PM] - Is this really correct? Is there a better solution?
                        Promise.all(childrenPromises).then(() => resolve(this));
                    }
                    else
                        resolve(this);
                });
            });
        });
    }
}
export default AFStructure;
//# sourceMappingURL=af-structure.js.map