/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:43 PM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import MalformedPatternError from "../errors/malformed-pattern-error.js";
import SaturatedPatternError from "../errors/saturated-pattern-error.js";
import AlphanumericalGenerator from "./alphanumerical-generator.js";
import TSAIterator from "../structures/partials/iterate/ts-a-iterator.js";
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
class JUIIdentityMap {
    // DOC-ME [12/4/18 @ 3:54 AM] - Documentation required!
    constructor(identityContainer) {
        // DOC-ME [12/8/18 @ 3:48 PM] - Documentation required!
        this.childrenIdentityMaps = new Array();
        /**
         * The actual Map that maps strings to objects of type T.
         *
         * @type {Map<string, T>}
         */
        this.idMap = new Map();
        try {
            AlphanumericalGenerator.validatePattern(identityContainer.CONTENT_PATTERN);
            this.container = identityContainer;
        }
        catch (e) {
            if (e instanceof MalformedPatternError) {
                throw new TypeError("ERR | Attempted to initialize an JUIIdentityMap with an invalid pattern.");
            }
            else
                throw e;
        }
    }
    // DOC-ME [12/8/18 @ 3:48 PM] - Documentation required!
    getChildMap(identityContainer) {
        let childMap = new JUIIdentityMap(identityContainer);
        this.childrenIdentityMaps.push(childMap);
        return childMap;
    }
    // DOC-ME [12/4/18 @ 9:40 PM] - Documentation required!
    generateNewId(element) {
        let id;
        let typeIdentity = element.TYPE_IDENTITY;
        let contentPattern = this.container.CONTENT_PATTERN;
        let attempts = 0;
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
    add(element) {
        let id = this.generateNewId(element);
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
    get(id) {
        if (this.contains(id))
            return this.idMap.get(id);
        else
            return null;
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
    search(id) {
        let result = null;
        let mapIterator = this.mapIterator(this);
        mapIterator.forEachRemaining((map) => {
            if (map.contains(id))
                result = map.get(id);
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
    remove(id) {
        if (this.contains(id)) {
            let removedElement = this.idMap.get(id);
            this.idMap.delete(id);
            return removedElement;
        }
        else
            return null;
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
    deepRemove(id) {
        let result = null;
        let mapIterator = this.mapIterator(this);
        mapIterator.forEachRemaining((map) => {
            if (map.contains(id))
                result = map.remove(id);
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
    contains(id) {
        return this.idMap.has(id);
    }
    /**
     * Returns true if this JUIIdentityMap or any of its children contain an element with the provided ID. Differs from
     * {@link contains} in that this method will recurse into its children IdentityMaps while contains will not.
     *
     * @param {string} id The ID to check for in this JUIIdentityMap and it's children.
     * @returns {boolean} true if this JUIIdentityMap or any of it's children contain an element with the provided ID.
     */
    verify(id) {
        let mapIterator = this.mapIterator(this);
        mapIterator.forEachRemaining((map) => {
            if (map.contains(id))
                return true;
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
    mapIterator(instance) {
        return new class extends TSAIterator {
            constructor() {
                super(...arguments);
                this.cursor = 0;
                this.maps = [instance, ...instance.childrenIdentityMaps];
            }
            hasNext() {
                return (this.cursor < this.maps.length);
            }
            next() {
                return this.maps[this.cursor++];
            }
            remove() {
                throw new Error("Unsupported operation.");
                // TODO [3/17/19 @ 9:42 PM] - Could this be done?
            }
            reset() {
                this.cursor = 0;
            }
        };
    }
    /**
     * Returns the number of elements contained within this JUIIdentityMap.
     *
     * @returns {number} The number of elements contained within this JUIIdentityMap.
     */
    size() {
        return this.idMap.size;
    }
    /**
     * Returns true if this JUIIdentityMap is empty (contains no key-value pairs).
     *
     * @returns {boolean} true if this JUIIdentityMap is empty (contains no key-value pairs).
     */
    isEmpty() {
        return (this.size() === 0);
    }
    /**
     * Returns an array of all of the IDs in this JUIIdentityMap.
     *
     * @returns {string[]} An array of all of the IDs in this JUIIdentityMap.
     */
    keySet() {
        return Array.from(this.idMap.keys());
    }
    /**
     * Returns an array of all of the elements in this JUIIdentityMap.
     *
     * @returns An array of all of the elements in this JUIIdentityMap.
     */
    valueSet() {
        return Array.from(this.idMap.values());
    }
}
/**
 * A magic-number constant representing the number of times IDMaps will attempt to find a new ID within the given
 * pattern.
 *
 * @type {number}
 */
JUIIdentityMap.SATURATION_CONSTANT = 100;
export default JUIIdentityMap;
//# sourceMappingURL=jui-identity-map.js.map